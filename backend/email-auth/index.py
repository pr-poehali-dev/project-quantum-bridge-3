"""
Авторизация по email и паролю: регистрация, вход, обновление токена, выход.
"""
import json
import os
import hashlib
import hmac
import secrets
import time
import psycopg2
import jwt


def get_db():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    h = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 100000)
    return f"{salt}:{h.hex()}"


def verify_password(password: str, stored: str) -> bool:
    try:
        salt, h = stored.split(":", 1)
        new_h = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 100000)
        return hmac.compare_digest(new_h.hex(), h)
    except Exception:
        return False


def cors_headers():
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    }


def respond(status, body):
    return {
        "statusCode": status,
        "headers": {**cors_headers(), "Content-Type": "application/json"},
        "body": json.dumps(body, ensure_ascii=False),
    }


def make_tokens(user: dict, jwt_secret: str, schema: str):
    now = int(time.time())
    access_token = jwt.encode(
        {"sub": user["id"], "email": user["email"], "exp": now + 900, "iat": now},
        jwt_secret,
        algorithm="HS256",
    )
    refresh_token = secrets.token_hex(32)
    rtoken_hash = hashlib.sha256(refresh_token.encode()).hexdigest()

    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {schema}.refresh_tokens (user_id, token_hash, expires_at) VALUES (%s, %s, NOW() + INTERVAL '30 days')",
        (user["id"], rtoken_hash),
    )
    conn.commit()
    cur.close()
    conn.close()

    return access_token, refresh_token


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers(), "body": ""}

    action = (event.get("queryStringParameters") or {}).get("action", "")
    body = {}
    if event.get("body"):
        try:
            body = json.loads(event["body"])
        except Exception:
            return respond(400, {"error": "Invalid JSON"})

    jwt_secret = os.environ.get("JWT_SECRET", "changeme-secret-32-chars-minimum!")
    schema = os.environ.get("MAIN_DB_SCHEMA", "public")

    if action == "register":
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""
        name = (body.get("name") or "").strip()

        if not email or not password:
            return respond(400, {"error": "Email и пароль обязательны"})
        if len(password) < 6:
            return respond(400, {"error": "Пароль минимум 6 символов"})

        conn = get_db()
        cur = conn.cursor()
        cur.execute(f"SELECT id FROM {schema}.users WHERE email = %s", (email,))
        if cur.fetchone():
            cur.close()
            conn.close()
            return respond(409, {"error": "Email уже зарегистрирован"})

        pw_hash = hash_password(password)
        cur.execute(
            f"INSERT INTO {schema}.users (email, name, password_hash, email_verified, created_at, updated_at) VALUES (%s, %s, %s, TRUE, NOW(), NOW()) RETURNING id, email, name, avatar_url",
            (email, name or None, pw_hash),
        )
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        user = {"id": row[0], "email": row[1], "name": row[2], "avatar_url": row[3]}
        access_token, refresh_token = make_tokens(user, jwt_secret, schema)
        return respond(200, {"access_token": access_token, "refresh_token": refresh_token, "expires_in": 900, "user": user})

    elif action == "login":
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""

        if not email or not password:
            return respond(400, {"error": "Email и пароль обязательны"})

        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, email, name, avatar_url, password_hash FROM {schema}.users WHERE email = %s",
            (email,),
        )
        row = cur.fetchone()

        if not row or not row[4] or not verify_password(password, row[4]):
            cur.close()
            conn.close()
            return respond(401, {"error": "Неверный email или пароль"})

        cur.execute(
            f"UPDATE {schema}.users SET last_login_at = NOW(), updated_at = NOW() WHERE id = %s",
            (row[0],),
        )
        conn.commit()
        cur.close()
        conn.close()

        user = {"id": row[0], "email": row[1], "name": row[2], "avatar_url": row[3]}
        access_token, refresh_token = make_tokens(user, jwt_secret, schema)
        return respond(200, {"access_token": access_token, "refresh_token": refresh_token, "expires_in": 900, "user": user})

    elif action == "refresh":
        refresh_token = body.get("refresh_token") or ""
        if not refresh_token:
            return respond(401, {"error": "Нет токена"})

        rtoken_hash = hashlib.sha256(refresh_token.encode()).hexdigest()
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            f"SELECT rt.user_id, u.email, u.name, u.avatar_url FROM {schema}.refresh_tokens rt JOIN {schema}.users u ON u.id = rt.user_id WHERE rt.token_hash = %s AND rt.expires_at > NOW()",
            (rtoken_hash,),
        )
        row = cur.fetchone()
        cur.close()
        conn.close()

        if not row:
            return respond(401, {"error": "Токен недействителен"})

        user = {"id": row[0], "email": row[1], "name": row[2], "avatar_url": row[3]}
        now = int(time.time())
        access_token = jwt.encode(
            {"sub": user["id"], "email": user["email"], "exp": now + 900, "iat": now},
            jwt_secret,
            algorithm="HS256",
        )
        return respond(200, {"access_token": access_token, "expires_in": 900, "user": user})

    elif action == "logout":
        refresh_token = body.get("refresh_token") or ""
        if refresh_token:
            rtoken_hash = hashlib.sha256(refresh_token.encode()).hexdigest()
            conn = get_db()
            cur = conn.cursor()
            cur.execute(f"DELETE FROM {schema}.refresh_tokens WHERE token_hash = %s", (rtoken_hash,))
            conn.commit()
            cur.close()
            conn.close()
        return respond(200, {"ok": True})

    return respond(400, {"error": "Неизвестный action. Используй: register, login, refresh, logout"})

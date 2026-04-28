import { useState } from "react"
import { X } from "lucide-react"
import { YandexLoginButton } from "@/components/extensions/yandex-auth/YandexLoginButton"
import { useYandexAuth } from "@/components/extensions/yandex-auth/useYandexAuth"

const EMAIL_AUTH_URL = "https://functions.poehali.dev/34d974e4-abe8-46fa-a0e6-b3a7de001620"
const YANDEX_AUTH_URL = "https://functions.poehali.dev/3a5dff54-69f5-4db5-bb6a-3d8c53b9cb8e"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess: (user: { id: number; email: string | null; name: string | null; avatar_url: string | null }) => void
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const yandexAuth = useYandexAuth({
    apiUrls: {
      authUrl: `${YANDEX_AUTH_URL}?action=auth-url`,
      callback: `${YANDEX_AUTH_URL}?action=callback`,
      refresh: `${YANDEX_AUTH_URL}?action=refresh`,
      logout: `${YANDEX_AUTH_URL}?action=logout`,
    },
    onAuthChange: (user) => {
      if (user) {
        onAuthSuccess(user)
        onClose()
      }
    },
  })

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const action = tab === "login" ? "login" : "register"
      const body: Record<string, string> = { email, password }
      if (tab === "register" && name) body.name = name

      const res = await fetch(`${EMAIL_AUTH_URL}?action=${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Произошла ошибка")
        return
      }

      localStorage.setItem("email_auth_access_token", data.access_token)
      localStorage.setItem("email_auth_refresh_token", data.refresh_token)
      onAuthSuccess(data.user)
      onClose()
    } catch {
      setError("Ошибка сети, попробуйте позже")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex flex-col leading-none mb-1">
            <span className="text-white font-black text-lg tracking-widest">
              RED<span className="text-red-500">1</span>DARK
            </span>
            <span className="text-zinc-500 text-[10px] tracking-[0.4em] font-light">S T U D I O</span>
          </div>
          <p className="text-zinc-400 text-sm mt-3">
            {tab === "login" ? "Войдите в аккаунт" : "Создайте аккаунт"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-zinc-800/50 rounded-lg p-1">
          <button
            onClick={() => { setTab("login"); setError("") }}
            className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${
              tab === "login" ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Войти
          </button>
          <button
            onClick={() => { setTab("register"); setError("") }}
            className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${
              tab === "register" ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Регистрация
          </button>
        </div>

        {/* Yandex button */}
        <YandexLoginButton
          onClick={yandexAuth.login}
          isLoading={yandexAuth.isLoading}
          buttonText={tab === "login" ? "Войти через Яндекс" : "Зарегистрироваться через Яндекс"}
          className="w-full mb-4"
        />

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-xs">или</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Email form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          {tab === "register" && (
            <input
              type="text"
              placeholder="Имя (необязательно)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
          />

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-zinc-900 font-semibold rounded-lg py-2.5 text-sm hover:bg-zinc-100 transition-colors disabled:opacity-50"
          >
            {loading ? "Загрузка..." : tab === "login" ? "Войти" : "Создать аккаунт"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthModal

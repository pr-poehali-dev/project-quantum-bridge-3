import { useState } from "react"
import { AuthModal } from "@/components/AuthModal"

export function Navbar() {
  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState<{ id: number; email: string | null; name: string | null; avatar_url: string | null } | null>(null)

  const handleLogout = () => {
    localStorage.removeItem("email_auth_access_token")
    localStorage.removeItem("email_auth_refresh_token")
    setUser(null)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-[#09090B]/80 backdrop-blur-md">
        <div className="w-full flex justify-center px-6 py-4">
          <div className="w-full max-w-5xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex flex-col leading-none">
                <span className="text-white font-black text-lg tracking-widest">RED<span className="text-red-500">1</span>DARK</span>
                <span className="text-zinc-400 text-[10px] tracking-[0.4em] font-light">S T U D I O</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm text-zinc-400 hover:text-white transition-colors">О компании</a>
              <a href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors">Услуги</a>
              <a href="#projects" className="text-sm text-zinc-400 hover:text-white transition-colors">Проекты</a>
              <a href="#partners" className="text-sm text-zinc-400 hover:text-white transition-colors">Партнёры</a>
              <a href="#media" className="text-sm text-zinc-400 hover:text-white transition-colors">Для СМИ</a>
              <a href="#contacts" className="text-sm text-zinc-400 hover:text-white transition-colors">Контакты</a>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="" className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                        <span className="text-red-400 text-xs font-bold">
                          {(user.name || user.email || "?")[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="text-sm text-zinc-300 hidden md:block">
                      {user.name || user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setAuthOpen(true)}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    Войти
                  </button>
                  <button
                    onClick={() => setAuthOpen(true)}
                    className="text-sm text-zinc-900 bg-white hover:bg-zinc-100 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    Начать проект <span aria-hidden="true">→</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />
    </>
  )
}

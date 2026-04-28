export function Navbar() {
  return (
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
            <a href="#about" className="text-sm text-zinc-400 hover:text-white transition-colors">
              О компании
            </a>
            <a href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Услуги
            </a>
            <a href="#projects" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Проекты
            </a>
            <a href="#partners" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Партнёры
            </a>
            <a href="#media" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Для СМИ
            </a>
            <a href="#contacts" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Контакты
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#contacts"
              className="text-sm text-white bg-white text-zinc-900 hover:bg-zinc-100 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Начать проект <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
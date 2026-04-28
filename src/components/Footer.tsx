export function Footer() {
  const footerLinks = {
    "Услуги": ["Лендинги", "Сайты-портфолио", "Многостраничные сайты", "Сайты-визитки", "Telegram-боты", "Интеграции и API"],
    "Компания": ["О нас", "Проекты", "Партнёры", "Для СМИ", "Контакты"],
    "Правовое": ["Политика конфиденциальности", "Условия сотрудничества", "Реквизиты"],
  }

  return (
    <footer className="border-t border-zinc-800 py-16 px-6" style={{ backgroundColor: "#09090B" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo */}
          <div className="col-span-1">
            <div className="flex flex-col leading-none mb-4">
              <span className="text-white font-black text-xl tracking-widest">RED<span className="text-red-500">1</span>DARK</span>
              <span className="text-zinc-500 text-[11px] tracking-[0.4em] font-light">S T U D I O</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Независимая веб-студия.<br />Разработка сайтов и автоматизация для бизнеса.
            </p>
            <div className="mt-4">
              <a href="https://vk.com/red1dark_studio" className="text-zinc-500 hover:text-white transition-colors text-sm">
                ВКонтакте →
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-medium text-sm mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">© 2026 Red1Dark Studio. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-600 hover:text-zinc-400 transition-colors text-sm">Политика конфиденциальности</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-400 transition-colors text-sm">Философия</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
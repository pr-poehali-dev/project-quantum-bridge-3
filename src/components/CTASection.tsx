export function CTASection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#09090B" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border border-zinc-800 rounded-2xl px-10 py-10 bg-zinc-900/30">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              Готовы запустить проект?
            </h2>
            <p className="text-zinc-400 text-base">Расскажите о задаче — бесплатно обсудим и предложим решение.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="px-5 py-2.5 border border-zinc-700 text-white font-medium rounded-lg hover:bg-zinc-800 transition-colors text-sm">
              Смотреть проекты
            </button>
            <button className="px-5 py-2.5 bg-white text-zinc-900 font-semibold rounded-lg hover:bg-zinc-100 transition-colors text-sm flex items-center gap-2">
              Начать проект <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
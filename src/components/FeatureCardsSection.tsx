import { motion } from "framer-motion"
import { ChevronRight, Plus } from "lucide-react"

const featureCards = [
  {
    title: "Сайты под ключ",
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg p-8">
        <div className="w-full space-y-3">
          {["Лендинг", "Портфолио", "Корпоративный", "Визитка"].map((item, i) => (
            <div key={item} className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-zinc-800/60 border border-zinc-700/40" style={{ opacity: 1 - i * 0.18 }}>
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-zinc-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Автоматизация бизнеса",
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-8">
        <div className="w-full space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/40">
            <span className="text-2xl">🤖</span>
            <div>
              <div className="text-white text-xs font-medium">Telegram-бот</div>
              <div className="text-zinc-500 text-[11px]">Принимает заявки 24/7</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/40 border border-zinc-700/30">
            <span className="text-2xl">🔗</span>
            <div>
              <div className="text-zinc-300 text-xs font-medium">Интеграции API</div>
              <div className="text-zinc-500 text-[11px]">CRM, платёжки, сервисы</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/20">
            <span className="text-2xl">⚙️</span>
            <div>
              <div className="text-zinc-400 text-xs font-medium">Скрипты</div>
              <div className="text-zinc-600 text-[11px]">Под любые задачи</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Поддержка после запуска",
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-8">
        <div className="w-full">
          <div className="text-zinc-500 text-xs mb-3">Сопровождение проекта</div>
          <div className="space-y-2">
            {[
              { label: "Консультации", done: true },
              { label: "Обновления", done: true },
              { label: "Доработки", done: true },
              { label: "Техподдержка", done: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${item.done ? "border-red-500 bg-red-500/20" : "border-zinc-700"}`}>
                  {item.done && <span className="text-red-400 text-[10px]">✓</span>}
                </div>
                <span className={`text-sm ${item.done ? "text-zinc-300" : "text-zinc-600"}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
]

export function FeatureCardsSection() {
  return (
    <div className="relative z-20 py-40" style={{ backgroundColor: "#09090B" }}>
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "20%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent 100%)",
        }}
      />
      <div className="w-full flex justify-center px-6">
        <div className="w-full max-w-5xl">
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-white max-w-md"
              style={{
                letterSpacing: "-0.0325em",
                fontVariationSettings: '"opsz" 28',
                fontWeight: 538,
                lineHeight: 1.1,
              }}
            >
              Цифровые решения для вашего бизнеса
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-md"
            >
              <p className="text-zinc-400 leading-relaxed">
                Мы создаём сайты и автоматизируем процессы, которые работают на ваш бизнес:
                быстро, чисто и с реальной поддержкой после запуска.{" "}
                <a href="#" className="text-white inline-flex items-center gap-1 hover:underline">
                  Смотреть проекты <ChevronRight className="w-4 h-4" />
                </a>
              </p>
            </motion.div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer group overflow-hidden relative flex flex-col justify-end"
                style={{
                  aspectRatio: "336 / 360",
                  borderRadius: "30px",
                  height: "360px",
                  isolation: "isolate",
                }}
              >
                <div
                  className="absolute top-0 left-0 w-full flex"
                  style={{
                    maskImage: "linear-gradient(#000 70%, transparent 90%)",
                    WebkitMaskImage: "linear-gradient(#000 70%, transparent 90%)",
                  }}
                >
                  {card.illustration}
                </div>
                <div
                  className="relative z-10 flex items-center justify-between w-full"
                  style={{ padding: "0 24px 40px", gap: "16px" }}
                >
                  <h3 className="text-white font-medium text-lg leading-tight">{card.title}</h3>
                  <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-500 group-hover:border-zinc-500 group-hover:text-zinc-300 transition-colors flex-shrink-0">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
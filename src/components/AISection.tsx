import { motion } from "framer-motion"
import { ChevronRight, Check, Paperclip, Globe, Lightbulb } from "lucide-react"

const agents = [
  { name: "Лендинг под ключ", isAgent: true, selected: true, icon: "◇" },
  { name: "Telegram-бот", isAgent: true, selected: false, icon: "◉" },
  { name: "Корпоративный сайт", isAgent: true, selected: false, icon: "◈" },
  { name: "Дизайн и вёрстка", isAgent: false, selected: false, icon: "○" },
  { name: "Интеграция с CRM", isAgent: true, selected: false, icon: "◎" },
  { name: "Поддержка проекта", isAgent: false, selected: false, icon: "○" },
]

export function AISection() {
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
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-zinc-400 text-sm">Наши услуги</span>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-white max-w-3xl mb-8"
            style={{
              letterSpacing: "-0.0325em",
              fontVariationSettings: '"opsz" 28',
              fontWeight: 538,
              lineHeight: 1.1,
            }}
          >
            Выберите нужную услугу
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 max-w-md mb-8"
          >
            <span className="text-white font-medium">Red1Dark Studio.</span> Расскажите о задаче —
            мы подберём оптимальное решение и возьмёмся за реализацию в кратчайшие сроки.
          </motion.p>

          {/* Learn more button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="px-5 py-2.5 bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-colors text-sm flex items-center gap-2 mb-16"
          >
            Начать проект
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          {/* Agent dropdown mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mb-24"
          >
            <div
              style={{
                perspective: "900px",
                userSelect: "none",
                WebkitUserSelect: "none",
                width: "100%",
                maxWidth: "720px",
                position: "relative",
              }}
            >
              <div
                style={{
                  transformOrigin: "top",
                  willChange: "transform",
                  transform: "translateY(0%) rotateX(30deg) scale(1.15)",
                  position: "relative",
                }}
              >
                {/* Glass overlay effect */}
                <div
                  style={{
                    border: "1px solid rgba(66, 66, 66, 0.5)",
                    background: "linear-gradient(rgba(255, 255, 255, 0.1) 40%, rgba(8, 9, 10, 0.1) 100%)",
                    borderRadius: "8px",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    boxShadow:
                      "inset 0 1.503px 5.261px rgba(255, 255, 255, 0.04), inset 0 -0.752px 0.752px rgba(255, 255, 255, 0.1)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />

                <div
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, #09090B 100%)",
                    height: "80%",
                    position: "absolute",
                    bottom: "-2px",
                    left: "-180px",
                    right: "-180px",
                    pointerEvents: "none",
                    zIndex: 11,
                  }}
                />

                {/* Input field */}
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-t-xl px-5 py-4">
                  <span className="text-zinc-500 italic">Выбрать услугу...</span>
                </div>

                {/* Dropdown options */}
                <div className="bg-zinc-900/80 border border-t-0 border-zinc-700 rounded-b-xl py-1">
                  {agents.map((agent, index) => (
                    <div
                      key={agent.name}
                      style={
                        agent.selected
                          ? {
                              transform: "scale(1.04) rotateX(17deg)",
                              background: "linear-gradient(#343434 0%, #2d2d2d 100%)",
                              borderRadius: "6px",
                              height: "48px",
                              position: "relative",
                              boxShadow:
                                "inset 0 -2.75px 4.75px rgba(255, 255, 255, 0.14), inset 0 -0.752px 0.752px rgba(255, 255, 255, 0.1), 0 54px 73px 3px rgba(0, 0, 0, 0.5)",
                              zIndex: 20,
                              marginLeft: "-12px",
                              marginRight: "-12px",
                            }
                          : {
                              opacity: 1 - index * 0.15,
                              height: "42px",
                            }
                      }
                    >
                      <div
                        className="flex items-center justify-between h-full"
                        style={{
                          paddingLeft: "24px",
                          paddingRight: "24px",
                          gap: "12px",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-400 text-lg">{agent.icon}</span>
                          <span className={agent.selected ? "text-white font-medium" : "text-zinc-300"}>
                            {agent.name}
                          </span>
                          {agent.isAgent && (
                            <span className="text-xs bg-zinc-700 text-zinc-400 px-2 py-0.5 rounded">Агент</span>
                          )}
                        </div>
                        {agent.selected && <Check className="w-4 h-4 text-zinc-400" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom divider with two columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left column */}
              <div className="border-t border-r border-b border-zinc-800/60 pt-12 pr-12 pb-16">
                <h3 className="text-zinc-200 font-medium text-xl mb-3">Прямое общение без посредников</h3>
                <p className="text-zinc-500 text-base mb-8">
                  Работаете напрямую с командой — без менеджеров и накрутки. Быстро, честно, по делу.
                </p>

                <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-red-500">●</span>
                    <span className="text-zinc-300 text-sm font-medium">Как мы работаем</span>
                  </div>

                  {[
                    { step: "01", label: "Обсуждаем задачу", desc: "Бесплатная консультация" },
                    { step: "02", label: "Считаем стоимость", desc: "Фиксированная цена" },
                    { step: "03", label: "Разрабатываем", desc: "Реальные сроки" },
                    { step: "04", label: "Запускаем и поддерживаем", desc: "После запуска" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-4 mb-3">
                      <span className="text-zinc-600 text-xs font-mono w-6">{item.step}</span>
                      <div className="flex-1 flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-800/40">
                        <span className="text-zinc-300 text-sm">{item.label}</span>
                        <span className="text-zinc-600 text-xs">{item.desc}</span>
                      </div>
                    </div>
                  ))}

                  <button className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-sm py-2.5 rounded-md transition-colors mt-4">
                    <Check className="w-4 h-4" />
                    Начать проект
                  </button>
                </div>
              </div>

              {/* Right column */}
              <div className="border-t border-b border-zinc-800/60 pt-12 pl-12 pb-16">
                <h3 className="text-zinc-200 font-medium text-xl mb-3">НПД в России</h3>
                <p className="text-zinc-500 text-base mb-8">
                  Официальный статус самозанятого. Работаем по договору, выдаём чеки, закрывающие документы.
                </p>

                <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-5">
                  <div className="space-y-4">
                    {[
                      { icon: "📄", label: "Договор на каждый проект", color: "text-blue-400" },
                      { icon: "🧾", label: "Чеки и закрывающие документы", color: "text-green-400" },
                      { icon: "🔒", label: "NDA по запросу", color: "text-yellow-400" },
                      { icon: "💳", label: "Оплата на карту или счёт", color: "text-purple-400" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <span className={`text-sm ${item.color}`}>{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-zinc-800/50">
                    <Paperclip className="w-4 h-4 text-zinc-500" />
                    <span className="text-zinc-500 text-sm">Запросить реквизиты и шаблон договора</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
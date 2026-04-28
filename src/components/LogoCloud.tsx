import { motion } from "framer-motion"

const services = [
  { name: "Лендинги", icon: "🖥" },
  { name: "Сайты-портфолио", icon: "📁" },
  { name: "Telegram-боты", icon: "🤖" },
  { name: "Многостраничные сайты", icon: "📄" },
  { name: "Интеграции и API", icon: "🔗" },
  { name: "Сайты-визитки", icon: "📇" },
  { name: "Скрипты и доработки", icon: "⚙️" },
  { name: "Адаптивный дизайн", icon: "📱" },
]

export function LogoCloud() {
  return (
    <div className="relative z-20 pb-24 pt-8" style={{ backgroundColor: "#09090B" }}>
      <div className="w-full flex justify-center px-6">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-red-500 text-lg">🔴</span>
                  <h3 className="text-white font-semibold">Веб-разработка</h3>
                </div>
                <ul className="space-y-1.5 text-zinc-400 text-sm">
                  <li>• Лендинги</li>
                  <li>• Сайты-портфолио</li>
                  <li>• Многостраничные сайты</li>
                  <li>• Сайты-визитки</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-red-500 text-lg">📋</span>
                  <h3 className="text-white font-semibold">Автоматизация</h3>
                </div>
                <ul className="space-y-1.5 text-zinc-400 text-sm">
                  <li>• Telegram-боты</li>
                  <li>• Скрипты и доработка</li>
                  <li>• Интеграции и API</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-red-500 text-lg">⚡</span>
                  <h3 className="text-white font-semibold">Современный подход</h3>
                </div>
                <ul className="space-y-1.5 text-zinc-400 text-sm">
                  <li>• Чистый код</li>
                  <li>• Адаптивный дизайн</li>
                  <li>• Высокая производительность</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-red-500 text-lg">👥</span>
                  <h3 className="text-white font-semibold">Поддержка</h3>
                </div>
                <ul className="space-y-1.5 text-zinc-400 text-sm">
                  <li>• Консультации</li>
                  <li>• Сопровождение проектов</li>
                  <li>• Обновления и доработки</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
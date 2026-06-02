import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Clock, DollarSign, CheckCircle, Phone, Users } from 'lucide-react'

const stats = [
  { icon: Clock, value: 94, suffix: '%', label: 'Ποσοστό Ανάκτησης', sub: 'αναπάντητων κλήσεων', color: '#10b981' },
  { icon: DollarSign, value: 3.2, suffix: 'x', label: 'Αύξηση Εσόδων', sub: 'κατά μέσο όρο', color: '#6366f1' },
  { icon: TrendingUp, value: 12, suffix: 'K+', label: 'Ραντεβού/Μήνα', sub: 'επεξεργάζονται', color: '#f59e0b' },
  { icon: Phone, value: 50, suffix: 'K+', label: 'Κλήσεις/Μήνα', sub: 'διαχειρίζεται το AI', color: '#ec4899' },
  { icon: Users, value: 2400, suffix: '+', label: 'Ενεργά Ιατρεία', sub: 'εμπιστεύονται', color: '#06b6d4' },
  { icon: CheckCircle, value: 99.9, suffix: '%', label: 'Uptime SLA', sub: 'εγγυημένο', color: '#8b5cf6' },
]

function AnimatedNumber({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 1800
    const start = performance.now()
    let raf
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - (1 - progress) * (1 - progress)
      setCount(target * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, target])

  return (
    <span ref={ref} className="text-3xl font-black tabular-nums">
      {count % 1 === 0 ? Math.floor(count) : count.toFixed(1)}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/30 to-dark" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            Αποτελέσματα
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Αριθμοί που <span className="gradient-text">Μιλάνε</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-dark-border bg-dark-card/50 p-6 transition-all duration-300 hover:border-dark-hover hover:bg-dark-card hover:shadow-xl hover:shadow-black/20"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}08)`,
                    boxShadow: `0 0 20px ${stat.color}10`,
                  }}
                >
                  <stat.icon size={26} style={{ color: stat.color }} />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm font-semibold">{stat.label}</p>
                  <p className="text-xs text-text-muted">{stat.sub}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Clock, DollarSign, CheckCircle, Phone, Users, Activity, Building2 } from 'lucide-react'

const stats = [
  { icon: Activity, value: 94, suffix: '%', label: 'Ποσοστό ανάκτησης', sub: 'αναπάντητων κλήσεων', color: '#10b981' },
  { icon: DollarSign, value: 3.2, suffix: 'x', label: 'Αύξηση εσόδων', sub: 'κατά μέσο όρο σε 90 μέρες', color: '#6366f1', decimals: 1 },
  { icon: TrendingUp, value: 47, suffix: '%', label: 'Μείωση no-shows', sub: 'με έξυπνες υπενθυμίσεις', color: '#f59e0b' },
  { icon: Phone, value: 12, suffix: 's', label: 'Χρόνος αντίδρασης AI', sub: 'από αναπάντητη σε callback', color: '#ec4899' },
  { icon: Building2, value: 2400, suffix: '+', label: 'Ενεργά ιατρεία', sub: 'σε όλη την Ελλάδα', color: '#06b6d4' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Διαθεσιμότητα', sub: 'AI ρεσεψιόν χωρίς διακοπές', color: '#8b5cf6' },
  { icon: Users, value: 50, suffix: 'K+', label: 'Κλήσεις/μήνα', sub: 'διαχειρίζεται η πλατφόρμα', color: '#f43f5e' },
  { icon: CheckCircle, value: 99.9, suffix: '%', label: 'Uptime SLA', sub: 'enterprise-grade infrastructure', color: '#10b981', decimals: 1 },
]

function AnimatedNumber({ target, suffix, decimals = 0 }) {
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

  const formatted = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()
  return (
    <span ref={ref} className="text-3xl sm:text-4xl font-black tabular-nums tracking-tight">
      {formatted}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/20 to-dark pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <TrendingUp size={13} />
            Αποτελέσματα
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-balance">
            Αριθμοί που <span className="gradient-text">μετράνε</span>
          </h2>
          <p className="mt-3 text-text-muted max-w-2xl mx-auto">
            Μετρήσιμα αποτελέσματα από 2,400+ ιατρεία που χρησιμοποιούν το ClinicFlow καθημερινά.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 sm:p-6 transition-all duration-300 hover:border-white/10 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${stat.color}10, transparent 60%)` }}
              />

              <div className="relative">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}25, ${stat.color}10)`,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                <div className="flex items-baseline gap-1 mb-2" style={{ color: stat.color }}>
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <p className="text-sm font-bold text-white">{stat.label}</p>
                <p className="text-xs text-text-muted mt-0.5 leading-snug">{stat.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

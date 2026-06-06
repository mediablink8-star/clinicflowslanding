import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Shield, Zap, CheckCircle2, Phone, MessageSquare, Calendar, Bot } from 'lucide-react'

const promises = [
  { icon: CheckCircle2, text: 'Setup σε 24 ώρες' },
  { icon: CheckCircle2, text: '14 μέρες δωρεάν' },
  { icon: CheckCircle2, text: 'Χωρίς πιστωτική κάρτα' },
  { icon: CheckCircle2, text: 'Ακύρωση οποτεδήποτε' },
]

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0f0f2a] via-[#15153a] to-[#0a0a1f] p-8 sm:p-12 lg:p-16 shadow-2xl"
        >
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/15 blur-[120px] animate-pulse-glow" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/15 blur-[120px] animate-pulse-glow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet/5 rounded-full blur-[100px]" />

          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary"
              >
                <Sparkles size={13} className="animate-pulse" />
                Έτοιμος για το επόμενο βήμα;
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-balance mb-5">
                Μεταμόρφωσε το ιατρείο σου{' '}
                <span className="gradient-text">σήμερα</span>
              </h2>
              <p className="text-lg text-text-muted leading-relaxed mb-8 max-w-lg">
                Εντάξου στα 2,400+ ιατρεία που εμπιστεύονται το ClinicFlow για να ανακτήσουν χαμένα ραντεβού, να μειώσουν no-shows και να αυξήσουν τα έσοδά τους.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                <a
                  href="https://clinicflows.vercel.app/register"
                  className="group relative w-full sm:w-auto flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-7 py-4 text-base font-bold text-white transition-all"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-shimmer" />
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    Ξεκίνα δωρεάν για 14 μέρες
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
                <a
                  href="mailto:hello@clinicflows.app"
                  className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-base font-bold text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.06]"
                >
                  Μίλα με την ομάδα
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {promises.map((p) => (
                  <div key={p.text} className="flex items-center gap-1.5 text-xs text-text-muted">
                    <p.icon size={12} className="text-primary shrink-0" />
                    {p.text}
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Phone, label: 'Voice AI', value: '24/7', color: '#10b981' },
                  { icon: MessageSquare, label: 'Smart SMS', value: '100%', color: '#6366f1' },
                  { icon: Calendar, label: 'Auto-booking', value: '94%', color: '#f59e0b' },
                  { icon: Bot, label: 'AI Sophia', value: '∞', color: '#8b5cf6' },
                ].map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4 sm:p-5 transition-all hover:border-white/15 hover:bg-white/[0.05]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 group-hover:rotate-6"
                      style={{
                        background: `linear-gradient(135deg, ${c.color}25, ${c.color}10)`,
                        border: `1px solid ${c.color}30`,
                      }}
                    >
                      <c.icon size={18} style={{ color: c.color }} />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: c.color }}>
                      {c.value}
                    </div>
                    <div className="text-xs text-text-muted mt-0.5">{c.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

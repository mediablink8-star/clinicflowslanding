import { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  UserPlus, Settings, Zap, BarChart3, ArrowRight, CheckCircle2,
  Webhook, PhoneCall, MessageSquare, Brain
} from 'lucide-react'
import { useTilt } from './useEffects'

const steps = [
  {
    icon: UserPlus,
    step: '01',
    color: '#10b981',
    title: 'Δημιούργησε λογαριασμό',
    description: 'Εγγραφή σε λιγότερο από 2 λεπτά. Χωρίς πιστωτική κάρτα, χωρίς δεσμεύσεις.',
    bullets: ['Email verification', '14 μέρες δωρεάν', 'Onboarding wizard'],
  },
  {
    icon: Settings,
    step: '02',
    color: '#6366f1',
    title: 'Σύνδεσε & διαμόρφωσε',
    description: 'Συνδέσε τηλέφωνο, ημερολόγιο, payment και webhooks. Ρύθμισε ωράρια, γιατρούς και υπηρεσίες.',
    bullets: ['Zadarma/Vapi setup', 'Google Calendar sync', 'Custom workflows'],
  },
  {
    icon: Zap,
    step: '03',
    color: '#f59e0b',
    title: 'Ενεργοποίησε τη Sophia',
    description: 'Η Sophia μαθαίνει το ιατρείο σου και ξεκινά να απαντά σε κλήσεις, SMS και αιτήματα.',
    bullets: ['Custom AI persona', 'Voice cloning', 'Knowledge base'],
  },
  {
    icon: BarChart3,
    step: '04',
    color: '#ec4899',
    title: 'Μέτρα & βελτιστοποίησε',
    description: 'Δες real-time ποσοστά ανάκτησης, έσοδα και ικανοποίηση. Βελτιώσου με AI-driven insights.',
    bullets: ['Live dashboard', 'Predictive alerts', 'Custom reports'],
  },
]

function StepCard({ step, index }) {
  const ref = useRef(null)
  const tilt = useTilt(ref, 3)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-8 transition-all duration-500 hover:border-white/10"
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.1s ease, border-color 0.3s ease, y 0.2s ease',
        boxShadow: `0 0 0 1px ${step.color}08`,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at top left, ${step.color}10, transparent 60%)` }}
      />

      <div className="relative flex items-start gap-5">
        <div
          className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
            boxShadow: `0 8px 20px ${step.color}30`,
          }}
        >
          <step.icon size={24} className="text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] font-black tracking-widest uppercase"
              style={{ color: step.color }}
            >
              Step {step.step}
            </span>
            <span className="text-[10px] text-text-muted/60 font-mono">{step.step}/04</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-2">{step.title}</h3>
          <p className="text-sm leading-relaxed text-text-muted mb-4">{step.description}</p>

          <div className="flex flex-wrap gap-2">
            {step.bullets.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.02] px-2.5 py-1 text-[10px] font-semibold text-text-muted"
              >
                <CheckCircle2 size={9} style={{ color: step.color }} />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px divider-gradient" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
            <Zap size={13} />
            Onboarding σε 24 ώρες
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-balance">
            Σε λειτουργία σε <span className="gradient-text">4 βήματα</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted text-pretty">
            Η ομάδα μας αναλαμβάνει το setup, εσύ εστιάζεις στους ασθενείς σου.
          </p>
        </motion.div>

        <div className="relative grid gap-5 sm:grid-cols-2">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              <StepCard step={s} index={i} />
              {i === 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-dark-card border border-white/10 items-center justify-center">
                  <ArrowRight size={11} className="text-text-muted" />
                </div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5">
            <div className="flex -space-x-2">
              {['#10b981', '#6366f1', '#f59e0b', '#8b5cf6'].map((c, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-dark flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: c, zIndex: 4 - i }}
                >
                  {['ΔΓ', 'ΜΚ', 'ΕΔ', 'ΑΜ'][i]}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Θέλεις βοήθεια με το setup;</p>
              <p className="text-xs text-text-muted">Η ομάδα μας απαντάει σε &lt; 2 ώρες</p>
            </div>
            <a
              href="https://clinicflows.vercel.app/register"
              className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
            >
              Ξεκίνα τώρα
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

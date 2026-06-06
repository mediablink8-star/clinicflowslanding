import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Loader2, Sparkles } from 'lucide-react'
import { useTilt } from './useEffects'

const fallbackPlans = [
  { key: 'trial', name: 'Δοκιμαστικό', price: 'Δωρεάν', priceNote: '14 ημέρες', doctorRange: '1', features: ['Βασική αυτοματοποίηση', '30 SMS/μήνα', '20 AI requests/μήνα'], popular: false },
  { key: 'starter', name: 'Starter', price: '$350', priceNote: '/μήνα', doctorRange: '1 γιατρός', features: ['200 SMS/μήνα', '100 AI requests/μήνα', 'Πλήρης αυτοματοποίηση', 'Webhooks', 'Voice AI'], popular: false },
  { key: 'growth', name: 'Growth', price: '$600', priceNote: '/μήνα', doctorRange: '2-3 γιατροί', features: ['600 SMS/μήνα', '250 AI requests/μήνα', 'Προηγμένα webhooks', 'Priority support', 'Custom workflows', 'Διαχείριση γιατρών'], popular: true },
  { key: 'scale', name: 'Scale', price: '$1000', priceNote: '/μήνα', doctorRange: '4-7 γιατροί', features: ['1500 SMS/μήνα', '600 AI requests/μήνα', 'Custom workflows', 'Priority support', 'Dedicated account manager', 'SLA εγγύηση'], popular: false },
  { key: 'enterprise', name: 'Enterprise', price: 'Custom', priceNote: '', doctorRange: 'Custom', features: ['Απεριόριστα SMS', 'Απεριόριστα AI requests', 'Full custom integration', 'Dedicated support', 'On-premise', 'Custom SLA'], popular: false },
]

function PlanCard({ plan, index }) {
  const ref = useRef(null)
  const tilt = useTilt(ref, plan.popular ? 4 : 3)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{
        y: plan.popular ? -10 : -6,
        transition: { duration: 0.2 },
      }}
      className={`relative rounded-2xl border p-6 transition-all duration-300 ${
        plan.popular
          ? 'border-primary/40 bg-dark-card shadow-2xl shadow-primary/10 z-10 scale-105 lg:scale-110'
          : 'border-dark-border bg-dark-card/50 hover:border-dark-hover hover:bg-dark-card hover:shadow-2xl hover:shadow-black/30'
      }`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease, y 0.2s ease',
      }}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-xs font-bold text-white shadow-lg shadow-primary/30">
            <Sparkles size={11} />
            Πιο Δημοφιλές
          </span>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-lg font-bold">{plan.name}</h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-3xl font-black">{plan.price}</span>
          {plan.priceNote && <span className="text-sm text-text-muted">{plan.priceNote}</span>}
        </div>
        <p className="mt-1.5 text-xs text-text-muted">{plan.doctorRange}</p>
      </div>
      <ul className="mb-8 space-y-3">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-sm">
            <Check size={15} className="mt-0.5 shrink-0 text-primary" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
      <a
        href={plan.key === 'enterprise' ? '#contact' : 'https://clinicflows.vercel.app/register'}
        className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-bold transition-all ${
          plan.popular
            ? 'text-white'
            : 'border border-dark-border text-white hover:border-primary/30 hover:bg-dark-hover'
        }`}
      >
        {plan.popular && (
          <>
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-100 group-hover:opacity-90 transition-opacity" />
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
          </>
        )}
        <span className="relative flex items-center gap-1.5">
          {plan.key === 'enterprise' ? 'Επικοινωνία' : plan.key === 'trial' ? 'Δωρεάν Δοκιμή' : 'Ξεκίνα Τώρα'}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </span>
      </a>
    </motion.div>
  )
}

export default function Pricing() {
  const [plans, setPlans] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetched, setFetched] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (fetched) return
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !fetched) {
          setFetched(true)
          setLoading(true)
          const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://clinicflows-backend.onrender.com'
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000)
          fetch(`${API_BASE}/api/public/plans`, { signal: controller.signal })
            .then((res) => res.json())
            .then((data) => {
              if (data?.success && Array.isArray(data.data) && data.data.length > 0) {
                setPlans(data.data)
              }
            })
            .catch(() => {})
            .finally(() => {
              clearTimeout(timeoutId)
              setLoading(false)
            })
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [fetched])

  const data = plans || fallbackPlans

  return (
    <section ref={sectionRef} id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
            Τιμολόγηση
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Απλή, Διάφανη{' '}
            <span className="gradient-text">Τιμολόγηση</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            {loading ? 'Φόρτωση πακέτων...' : 'Ξεκίνα δωρεάν, αναβάθμισε καθώς μεγαλώνεις. Χωρίς κρυφές χρεώσεις.'}
          </p>
        </motion.div>

        {loading && plans === null ? (
          <div className="mt-20 flex flex-col items-center gap-3">
            <Loader2 size={32} className="animate-spin text-primary" />
            <span className="text-sm text-text-muted">Φόρτωση τιμολογίων...</span>
          </div>
        ) : (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {data.map((plan, i) => (
              <PlanCard key={plan.key} plan={plan} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles } from 'lucide-react'

const plans = [
  {
    key: 'trial',
    name: 'Δοκιμαστικό',
    price: 'Δωρεάν',
    priceNote: '14 ημέρες',
    doctorRange: '1 γιατρός',
    features: [
      '20 SMS κατά τη δοκιμή',
      '30 AI calls κατά τη δοκιμή',
      'AI receptionist',
      'Missed-call recovery',
      'Online booking',
    ],
    popular: false,
  },
  {
    key: 'starter',
    name: 'Starter',
    price: '€350',
    priceNote: '/ γιατρό / μήνα',
    doctorRange: '1 γιατρός',
    features: [
      'AI receptionist & missed-call recovery',
      'Online booking & ημερολόγιο',
      'Υπενθυμίσεις και follow-ups',
      'Dashboard για την ομάδα',
      'SMS & Voice AI',
    ],
    popular: false,
  },
  {
    key: 'growth',
    name: 'Growth',
    price: '€600',
    priceNote: '/ μήνα',
    doctorRange: '2–3 γιατροί',
    features: [
      'Όλα του Starter',
      'Προηγμένα workflows',
      'Περισσότερα SMS & AI calls',
      'Διαχείριση πολλών γιατρών',
      'Priority support',
    ],
    popular: true,
  },
  {
    key: 'scale',
    name: 'Scale',
    price: '€1.000',
    priceNote: '/ μήνα',
    doctorRange: '4–7 γιατροί',
    features: [
      'Όλα του Growth',
      'Custom workflows',
      'Μεγαλύτερα usage limits',
      'Priority support',
      'Dedicated account management',
    ],
    popular: false,
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    priceNote: '',
    doctorRange: 'Μεγάλες κλινικές',
    features: [
      'Απεριόριστα SMS & AI usage',
      'Full custom integrations',
      'Custom workflows',
      'Dedicated support',
      'Custom SLA',
    ],
    popular: false,
  },
]

function PlanCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: plan.popular ? -8 : -5 }}
      className={`relative flex h-full flex-col rounded-3xl border p-6 transition-all duration-300 ${
        plan.popular
          ? 'z-10 border-primary/40 bg-dark-card shadow-2xl shadow-primary/10 lg:scale-[1.03]'
          : 'border-dark-border bg-dark-card hover:border-primary/20 hover:shadow-xl'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-primary/20">
            <Sparkles size={11} />
            Προτεινόμενο για ανάπτυξη
          </span>
        </div>
      )}

      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{plan.name}</p>
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="text-3xl font-black tracking-tight">{plan.price}</span>
          {plan.priceNote && <span className="text-sm text-text-muted">{plan.priceNote}</span>}
        </div>
        <p className="mt-1.5 text-xs font-medium text-text-muted">{plan.doctorRange}</p>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check size={15} className="mt-0.5 shrink-0 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={plan.key === 'enterprise' ? '#contact' : 'https://clinicflows.vercel.app/register'}
        className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3.5 text-sm font-bold transition-all ${
          plan.popular
            ? 'text-white'
            : 'border border-dark-border text-dark hover:border-primary/30 hover:bg-dark-hover'
        }`}
      >
        {plan.popular && (
          <>
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-md opacity-30" />
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
  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
            <Sparkles size={14} />
            Τιμολόγηση
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Επιλέξτε το επίπεδο που ταιριάζει <span className="gradient-text">στην κλινική σας.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Ξεκινήστε με 14 ημέρες δωρεάν και αναβαθμίστε καθώς μεγαλώνει η ομάδα και ο όγκος της κλινικής.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {plans.map((plan, index) => (
            <PlanCard key={plan.key} plan={plan} index={index} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-text-muted">
          Οι τιμές αφορούν τη χρήση του ClinicFlow και εμφανίζονται ανάλογα με το μέγεθος της κλινικής.
        </p>
      </div>
    </section>
  )
}

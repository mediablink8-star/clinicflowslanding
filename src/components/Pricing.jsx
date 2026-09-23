import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles } from 'lucide-react'

const plan = {
  name: 'ClinicFlow',
  price: '€350',
  priceNote: '/ γιατρό / μήνα',
  features: [
    '14 ημέρες δωρεάν δοκιμή',
    '20 SMS κατά τη δοκιμή',
    '30 AI calls κατά τη δοκιμή',
    'AI receptionist & missed-call recovery',
    'Online booking & ημερολόγιο',
    'Υπενθυμίσεις και follow-ups',
    'Dashboard για την ομάδα και τον ιδιοκτήτη',
  ],
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
            <Sparkles size={14} />
            Απλή τιμολόγηση
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Ένα σύστημα. <span className="gradient-text">Μία ξεκάθαρη τιμή.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Δοκιμάστε το ClinicFlow για 14 ημέρες και δείτε πώς ταιριάζει στη δική σας κλινική.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-14 max-w-2xl rounded-3xl border border-primary/30 bg-dark-card p-7 shadow-2xl shadow-primary/10 sm:p-10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold text-primary">CLINICFLOW</p>
              <h3 className="mt-2 text-2xl font-black">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black">{plan.price}</span>
                <span className="text-sm text-text-muted">{plan.priceNote}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/[0.08] px-4 py-3 text-center">
              <p className="text-xs font-bold text-primary">ΞΕΚΙΝΑ ΔΩΡΕΑΝ</p>
              <p className="mt-1 text-sm font-semibold">14 ημέρες</p>
            </div>
          </div>

          <div className="my-8 h-px bg-white/[0.08]" />

          <ul className="grid gap-3 sm:grid-cols-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm">
                <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href="https://clinicflows.vercel.app/register"
            className="group mt-9 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-4 text-sm font-black text-white shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
          >
            Ξεκίνα τη δωρεάν δοκιμή
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>

          <p className="mt-4 text-center text-xs text-text-muted">
            €350 ανά γιατρό / μήνα · χωρίς χρέωση setup
          </p>
        </motion.div>
      </div>
    </section>
  )
}

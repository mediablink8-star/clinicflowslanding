import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/20 to-dark" />

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-dark-card via-dark-card to-dark-card/80 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-primary/5"
        >
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent/8 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary/5 rounded-full blur-[80px]" />

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-lg shadow-primary/5"
            >
              <Sparkles size={13} className="animate-pulse" />
              Ξεκίνα Σήμερα
            </motion.div>

            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Έτοιμος να Μεταμορφώσεις{' '}
              <span className="gradient-text">το Ιατρείο σου;</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-text-muted">
              Εντάξου στο μέλλον της διαχείρισης ιατρείων με το ClinicFlow και
              αυτοματοποίησε την πρακτική σου σήμερα.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <a
                href="https://clinicflows.vercel.app/register"
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl px-8 py-3.5 text-base font-bold text-white transition-all"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-100 group-hover:opacity-90 transition-opacity" />
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Δωρεάν Δοκιμή
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <a
                href="#features"
                className="group flex items-center gap-2 rounded-xl border border-dark-border bg-dark-card/50 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-primary/30 hover:bg-dark-card hover:shadow-lg hover:shadow-primary/5"
              >
                Μάθε Περισσότερα
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted"
            >
              <span className="flex items-center gap-1.5"><Shield size={12} /> Χωρίς πιστωτική κάρτα</span>
              <span className="flex items-center gap-1.5"><Zap size={12} /> 14 μέρες δωρεάν</span>
              <span className="flex items-center gap-1.5"><ArrowRight size={12} /> Ακύρωση οποτεδήποτε</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
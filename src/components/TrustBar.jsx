import { motion } from 'framer-motion'
import { Shield, Lock, HardDrive, Award, Building2, Stethoscope, Sparkles } from 'lucide-react'

const trustItems = [
  { icon: Shield, label: 'GDPR Compliant' },
  { icon: Lock, label: 'End-to-end encryption' },
  { icon: HardDrive, label: 'EU-hosted data' },
  { icon: Award, label: 'ISO 27001 ready' },
  { icon: Building2, label: 'Multi-tenant SaaS' },
]

const specialties = [
  'Οδοντιατρεία', 'Δερματολογικά', 'Παιδιατρικά', 'Καρδιολογικά',
  'Γυναικολογικά', 'Οφθαλμιατρεία', 'Ορθοπαιδικά', 'Φυσικοθεραπευτήρια',
  'Ψυχολόγοι', 'Διαιτολόγοι', 'Γενική Ιατρική', 'Μαιευτήρια',
]

export default function TrustBar() {
  return (
    <section className="relative border-y border-white/5 bg-gradient-to-b from-dark-card/30 via-dark to-dark-card/30 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-text-muted">
            <span className="text-white font-bold">2,400+ ιατρεία</span> σε όλη την Ελλάδα εμπιστεύονται το ClinicFlow
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-10">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-2 text-text-muted/80"
            >
              <item.icon size={14} className="text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
          <div className="marquee-container overflow-hidden py-3">
            <div className="flex animate-marquee-slow">
              {[...specialties, ...specialties, ...specialties].map((s, i) => (
                <div
                  key={`${s}-${i}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 mx-2 shrink-0 hover:border-primary/30 hover:bg-white/[0.04] transition-all"
                >
                  <Stethoscope size={12} className="text-primary/60" />
                  <span className="text-xs font-semibold text-text-muted whitespace-nowrap">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted/70"
        >
          <div className="flex items-center gap-1.5">
            <Sparkles size={11} className="text-amber-400" />
            <span>Featured in <span className="text-white font-semibold">Startupper.gr</span></span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <span className="text-white font-semibold">4.9/5</span>
            <span className="text-amber-400">★★★★★</span>
            <span>από 240+ κριτικές</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <span className="text-white font-semibold">99.9%</span>
            <span>uptime SLA</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

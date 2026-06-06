import { motion } from 'framer-motion'
import {
  Shield, Lock, KeyRound, FileText, HardDrive, Database,
  Eye, Fingerprint, CheckCircle2, AlertTriangle, FileCheck
} from 'lucide-react'

const securityFeatures = [
  {
    icon: Shield,
    title: 'GDPR Compliant',
    description: 'Πλήρης συμμόρφωση με τον κανονισμό GDPR. DPA διαθέσιμο κατόπιν αιτήματος.',
    color: '#10b981',
  },
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'AES-256 encryption σε όλα τα data at rest. TLS 1.3 για data in transit.',
    color: '#6366f1',
  },
  {
    icon: KeyRound,
    title: 'MFA & SSO',
    description: 'Multi-factor authentication, account lockout, και SSO με Google/Microsoft.',
    color: '#8b5cf6',
  },
  {
    icon: FileText,
    title: 'Audit Logs',
    description: 'Πλήρες audit trail σε κάθε ενέργεια χρήστη. Immutable, signed, exportable.',
    color: '#f59e0b',
  },
  {
    icon: HardDrive,
    title: 'EU-Hosted Data',
    description: 'Όλα τα δεδομένα φιλοξενούνται σε EU data centers. Χωρίς μεταφορά σε τρίτες χώρες.',
    color: '#06b6d4',
  },
  {
    icon: Database,
    title: 'AMKA Anonymization',
    description: 'Αυτόματη ανωνυμοποίηση ΑΜΚΑ μετά από καθορισμένο retention period.',
    color: '#ec4899',
  },
  {
    icon: Eye,
    title: 'Role-Based Access',
    description: 'Granular permissions, principle of least privilege, custom roles per clinic.',
    color: '#f43f5e',
  },
  {
    icon: Fingerprint,
    title: 'Webhook Signing',
    description: 'HMAC-SHA256 signing σε όλα τα outgoing webhooks. Replay attack protection.',
    color: '#a855f7',
  },
]

const compliance = [
  { label: 'GDPR', desc: 'EU Data Protection' },
  { label: 'ISO 27001', desc: 'Information Security' },
  { label: 'HIPAA-aligned', desc: 'Health Data Standards' },
  { label: 'SOC 2 Type II', desc: 'In progress' },
  { label: 'Cyber Essentials+', desc: 'UK Certified' },
  { label: 'DPA Available', desc: 'On request' },
]

export default function Security() {
  return (
    <section id="security" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/10 to-dark pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px divider-gradient" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Shield size={13} />
              Enterprise-grade security
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-balance mb-6">
              Τα δεδομένα των ασθενών σου είναι{' '}
              <span className="gradient-text">ασφαλή</span>
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-8">
              Ξέρουμε ότι τα medical data είναι τα πιο ευαίσθητα. Γι' αυτό χτίσαμε το ClinicFlow με security-first αρχιτεκτονική από την πρώτη μέρα.
            </p>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle size={18} className="text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Health data compliance</h4>
                  <p className="text-xs text-text-muted leading-relaxed mb-3">
                    Όλα τα health-related data αποθηκεύονται encrypted, με audit logs σε κάθε πρόσβαση και αυτόματη ανωνυμοποίηση.
                  </p>
                  <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-light">
                    <FileCheck size={12} />
                    Δες το Security Whitepaper
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              {securityFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="group rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 transition-all hover:border-white/10"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${f.color}25, ${f.color}10)`,
                      border: `1px solid ${f.color}30`,
                    }}
                  >
                    <f.icon size={18} style={{ color: f.color }} />
                  </div>
                  <h3 className="text-sm font-bold mb-1.5">{f.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/[0.06] bg-gradient-to-r from-primary/[0.04] to-accent/[0.04] p-6"
            >
              <h4 className="text-sm font-bold mb-4">Compliance & Certifications</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {compliance.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center gap-2 rounded-lg border border-white/5 bg-black/30 px-3 py-2.5"
                  >
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{c.label}</div>
                      <div className="text-[9px] text-text-muted truncate">{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, MessageSquare, Brain, BarChart3, Workflow,
  PhoneCall, Mic, Voicemail, Sparkles, Zap, MessageCircle,
  Send, Bot, TrendingUp, LineChart, Target, Webhook, Calendar,
  Activity, Shield, Lock, KeyRound, FileBarChart, PieChart,
  ArrowUpRight, Building2, UserCheck, Inbox, Hash
} from 'lucide-react'
import { useTilt } from './useEffects'

const categories = [
  {
    id: 'voice',
    label: 'Voice AI',
    short: 'Voice',
    icon: Phone,
    accent: '#10b981',
    description: 'Η Sophia μιλάει στους ασθενείς σου σαν πραγματικός υπάλληλος. Απαντά σε κλήσεις, κλείνει ραντεβού και ακολουθεί τις οδηγίες του ιατρείου σου.',
    features: [
      {
        icon: PhoneCall,
        title: 'Ανάκτηση αναπάντητων',
        description: 'Όταν χάνεις μια κλήση, η Sophia καλεί πίσω μέσα σε 30 δευτερόλεπτα και κλείνει ραντεβού στο πρόγραμμά σου.',
        bullets: ['Vapi & Bland AI engines', 'Φυσική ελληνική ομιλία', '30s χρόνος αντίδρασης'],
      },
      {
        icon: Mic,
        title: 'Voice agent 24/7',
        description: 'Εξυπηρέτηση ασθενών όλο το 24ωρο χωρίς να χρειάζεται γραμματεία εκτός ωραρίου.',
        bullets: ['Inbound + outbound κλήσεις', 'Multilingual support', 'Custom voice persona'],
      },
      {
        icon: Voicemail,
        title: 'Transcription & summaries',
        description: 'Κάθε κλήση μεταγράφεται και συνοψίζεται αυτόματα — βλέπεις ακριβώς τι ειπώθηκε.',
        bullets: ['Sentiment analysis', 'Αυτόματη καταχώρηση', 'Αναζήτηση σε transcripts'],
      },
      {
        icon: UserCheck,
        title: 'Smart caller ID',
        description: 'Αναγνωρίζει ασθενείς, εμφανίζει το ιστορικό τους και εξατομικεύει τη συνομιλία.',
        bullets: ['Patient history', 'AMKA lookup', 'Risk scoring'],
      },
    ],
  },
  {
    id: 'sms',
    label: 'Smart SMS',
    short: 'SMS',
    icon: MessageSquare,
    accent: '#6366f1',
    description: 'Αμφίδρομο SMS με AI που καταλαβαίνει τι θέλει ο ασθενής. Επιβεβαιώσεις, υπενθυμίσεις και follow-ups αυτόματα.',
    features: [
      {
        icon: MessageCircle,
        title: 'Two-way SMS',
        description: 'Ο ασθενής απαντάει ελεύθερα και η Sophia κατανοεί πρόθεση, προτείνει ώρες και κλείνει ραντεβού.',
        bullets: ['AI intent detection', 'Auto-reply σε ελληνικά', 'Context-aware'],
      },
      {
        icon: Send,
        title: 'Bulk campaigns',
        description: 'Στείλε εξατομικευμένα SMS σε χιλιάδες ασθενείς με μεταβλητές και segments.',
        bullets: ['Templates & variables', 'Opt-out management', 'Delivery tracking'],
      },
      {
        icon: Calendar,
        title: 'Έξυπνες υπενθυμίσεις',
        description: 'Υπενθυμίσεις 24ω & 2ω με confirmation, μείωση no-shows έως 47%.',
        bullets: ['Auto-confirm flow', 'Reschedule links', 'Holiday aware'],
      },
      {
        icon: Inbox,
        title: 'Unified inbox',
        description: 'Όλα τα SMS, οι κλήσεις και τα webhooks σε ένα μέρος για κάθε ασθενή.',
        bullets: ['Cross-channel', 'Searchable history', 'Team assignments'],
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI Assistant',
    short: 'Sophia',
    icon: Brain,
    accent: '#8b5cf6',
    description: 'Η Sophia είναι ο προσωπικός βοηθός του ιατρείου σου. Μπορείς να της μιλήσεις, να της γράψεις ή να τη ρωτήσεις οτιδήποτε.',
    features: [
      {
        icon: Sparkles,
        title: 'Φυσική γλώσσα',
        description: '«Κλείσε ραντεβού με την Άννα αύριο στις 5» — η Sophia καταλαβαίνει και εκτελεί.',
        bullets: ['Gemini-powered', 'Greek-first', 'Context memory'],
      },
      {
        icon: Bot,
        title: 'Multi-step commands',
        description: 'Σύνθετες εντολές που εκτελούν πολλές ενέργειες: «Στείλε υπενθύμιση σε όλους τους ασθενείς της Πέμπτης».',
        bullets: ['Chain actions', 'Bulk operations', 'Audit trail'],
      },
      {
        icon: TrendingUp,
        title: 'Predictive insights',
        description: 'Η Sophia εντοπίζει patterns και σου προτείνει ενέργειες για να αυξήσεις τα έσοδα.',
        bullets: ['No-show prediction', 'Slot optimization', 'Revenue opportunities'],
      },
      {
        icon: Zap,
        title: 'AI triage',
        description: 'Αυτόματη κατηγοριοποίηση αιτημάτων ασθενών και δρομολόγηση στον κατάλληλο γιατρό.',
        bullets: ['Urgency scoring', 'Specialty routing', 'Auto-escalation'],
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Αναλυτικά',
    short: 'Insights',
    icon: BarChart3,
    accent: '#f59e0b',
    description: 'Μετρήσιμα δεδομένα για κάθε πτυχή του ιατρείου. Δες πού χάνεις χρήματα και πού κερδίζεις.',
    features: [
      {
        icon: LineChart,
        title: 'Recovery funnel',
        description: 'Παρακολούθησε κάθε αναπάντητη κλήση μέχρι να γίνει ραντεβού — και τα έσοδα που ανακτήθηκαν.',
        bullets: ['Real-time tracking', 'Per-doctor breakdown', 'Cohort analysis'],
      },
      {
        icon: PieChart,
        title: 'Revenue analytics',
        description: 'Πόσα έσοδα έφερε το AI; Ποιος γιατρός έχει τα περισσότερα no-shows; Όλα σε ένα dashboard.',
        bullets: ['Doctor-level KPIs', 'AI vs human revenue', 'Trend forecasting'],
      },
      {
        icon: FileBarChart,
        title: 'Custom reports',
        description: 'Φτιάξε τις δικές σου αναφορές, πρόγραμμα exports και μοιράσου με την ομάδα.',
        bullets: ['Drag & drop builder', 'PDF/CSV exports', 'Scheduled emails'],
      },
      {
        icon: Target,
        title: 'Goal tracking',
        description: 'Στόχοι ανάκτησης, conversion και revenue. Ειδοποιήσεις όταν πέσεις κάτω από τα όρια.',
        bullets: ['Smart alerts', 'Team goals', 'Slack notifications'],
      },
    ],
  },
  {
    id: 'automation',
    label: 'Automation',
    short: 'Flows',
    icon: Workflow,
    accent: '#06b6d4',
    description: 'Συνδέσε τα πάντα με n8n, webhooks και API. Δημιούργησε workflows που τρέχουν μόνα τους.',
    features: [
      {
        icon: Webhook,
        title: 'Webhooks out',
        description: 'Στείλε events σε οποιοδήποτε σύστημα: CRM, ERP, accounting, custom apps.',
        bullets: ['HMAC signing', 'Retry logic', 'Delivery logs'],
      },
      {
        icon: Hash,
        title: 'n8n workflows',
        description: 'Έτοιμα templates για τα πιο συνηθισμένα σενάρια, ή φτιάξε τα δικά σου.',
        bullets: ['20+ templates', 'Visual editor', 'Self-host option'],
      },
      {
        icon: Activity,
        title: 'Automation logs',
        description: 'Πλήρες audit trail κάθε automation που τρέχει — πότε, γιατί και τι έκανε.',
        bullets: ['Real-time stream', 'Error notifications', 'Replay capability'],
      },
      {
        icon: Building2,
        title: 'Multi-tenant',
        description: 'Διαχειρίσου πολλά ιατρεία από ένα account, με διαφορετικά workflows και permissions.',
        bullets: ['Org hierarchy', 'Role-based access', 'Cross-clinic reports'],
      },
    ],
  },
]

function FeatureCard({ feature, accent, index }) {
  const ref = useRef(null)
  const tilt = useTilt(ref, 4)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition-all duration-500 hover:border-white/10"
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: `0 0 0 1px ${accent}05`,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${accent}10, transparent 60%)` }}
      />

      <div
        className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
        style={{
          background: `linear-gradient(135deg, ${accent}25, ${accent}10)`,
          border: `1px solid ${accent}30`,
        }}
      >
        <feature.icon size={20} style={{ color: accent }} />
      </div>

      <h3 className="relative text-lg font-bold tracking-tight mb-2">{feature.title}</h3>
      <p className="relative text-sm leading-relaxed text-text-muted/90 mb-4">{feature.description}</p>

      <ul className="relative space-y-1.5">
        {feature.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-xs text-text-muted/80">
            <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
            {b}
          </li>
        ))}
      </ul>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-1 group-hover:translate-x-0">
        <ArrowUpRight size={14} style={{ color: accent }} />
      </div>
    </motion.div>
  )
}

export default function Features() {
  const [active, setActive] = useState('voice')
  const activeCategory = categories.find((c) => c.id === active)

  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px divider-gradient" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles size={13} />
            Όλα όσα χρειάζεσαι
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-balance">
            Μία πλατφόρμα. <span className="gradient-text">Όλες οι δυνατότητες.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted text-pretty">
            Voice AI, έξυπνο SMS, αναλυτικά και automation — όλα σχεδιασμένα ειδικά για ιατρεία.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = active === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`relative flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'border-transparent text-white'
                    : 'border-white/5 bg-white/[0.02] text-text-muted hover:text-white hover:border-white/10'
                }`}
                style={isActive ? { background: `linear-gradient(135deg, ${cat.accent}20, ${cat.accent}08)`, borderColor: `${cat.accent}40` } : {}}
              >
                <cat.icon size={15} style={{ color: isActive ? cat.accent : 'currentColor' }} />
                {cat.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mb-10 max-w-3xl mx-auto text-center"
          >
            <p className="text-base text-text-muted leading-relaxed">
              {activeCategory.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={active + '-grid'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
          >
            {activeCategory.features.map((f, i) => (
              <FeatureCard
                key={f.title}
                feature={f}
                accent={activeCategory.accent}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-text-muted"
        >
          <span className="flex items-center gap-2">
            <Shield size={14} className="text-primary" />
            GDPR & HIPAA-aligned
          </span>
          <span className="flex items-center gap-2">
            <KeyRound size={14} className="text-primary" />
            MFA & SSO ready
          </span>
          <span className="flex items-center gap-2">
            <Lock size={14} className="text-primary" />
            End-to-end encrypted
          </span>
          <span className="flex items-center gap-2">
            <Server size={14} className="text-primary" />
            EU-hosted
          </span>
        </motion.div>
      </div>
    </section>
  )
}

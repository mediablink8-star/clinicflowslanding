import { motion } from 'framer-motion'
import {
  Stethoscope, Smile, Baby, Heart, Eye, Bone, Activity, Brain,
  ArrowUpRight, Mic, MessageSquare, Calendar, TrendingUp
} from 'lucide-react'

const useCases = [
  {
    icon: Smile,
    specialty: 'Οδοντιατρεία',
    color: '#06b6d4',
    challenge: 'Χαμένα ραντεβού λόγω απασχολημένης γραμμής & no-shows που στοιχίζουν €2-4K/μήνα',
    solution: 'Sophia καλεί πίσω ασθενείς σε 30s, στέλνει SMS reminders και κλείνει follow-up αυτόματα',
    stat: '+42% booked appointments',
    features: ['Voice callbacks', 'SMS reminders', 'Recall campaigns'],
  },
  {
    icon: Baby,
    specialty: 'Παιδιατρικά',
    color: '#ec4899',
    challenge: 'Πολυάσχολοι γονείς που δεν απαντούν και κενές ώρες στο πρόγραμμα',
    solution: 'Two-way SMS σε πραγματικό χρόνο, αυτόματη επιβεβαίωση εμβολίων και εύκολο reschedule',
    stat: '94% γονείς επιβεβαιώνουν',
    features: ['Vaccine reminders', 'Auto-reschedule', 'Parent portal'],
  },
  {
    icon: Heart,
    specialty: 'Καρδιολογικά',
    color: '#ef4444',
    challenge: 'Επείγοντα περιστατικά που χάνονται στα τηλέφωνα & μεγάλη λίστα αναμονής',
    solution: 'AI triage που δρομολογεί επείγοντα αμέσως και αυτόματη διαχείριση waiting list',
    stat: '0 χαμένα emergencies',
    features: ['Urgency scoring', 'Waitlist automation', 'Direct routing'],
  },
  {
    icon: Stethoscope,
    specialty: 'Δερματολογικά',
    color: '#8b5cf6',
    challenge: 'Ακριβές marketing & υψηλό acquisition cost για aesthetic procedures',
    solution: 'Lead capture 24/7, follow-up sequences και reactivation campaigns για παλιούς ασθενείς',
    stat: '5.2x ROAS',
    features: ['Lead nurturing', 'Reactivation flows', 'Treatment reminders'],
  },
  {
    icon: Activity,
    specialty: 'Φυσικοθεραπευτήρια',
    color: '#10b981',
    challenge: 'Συχνά follow-ups & μεγάλη διάρκεια θεραπείας (10+ sessions)',
    solution: 'Αυτόματος προγραμματισμός series, εύκολο reschedule & progress tracking',
    stat: '78% adherence',
    features: ['Series booking', 'Progress notes', 'Recurring SMS'],
  },
  {
    icon: Brain,
    specialty: 'Ψυχολόγοι / Ψυχίατροι',
    color: '#f59e0b',
    challenge: 'Ευαίσθητα προσωπικά δεδομένα & ανάγκη απόλυτης εμπιστευτικότητας',
    solution: 'End-to-end encryption, audit logs σε κάθε πρόσβαση, AMKA anonymization μετά τη θεραπεία',
    stat: '100% GDPR compliant',
    features: ['E2E encryption', 'Audit trails', 'AMKA anonymization'],
  },
]

function UseCaseCard({ uc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition-all duration-500 hover:border-white/10 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${uc.color}10, transparent 60%)` }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
            style={{
              background: `linear-gradient(135deg, ${uc.color}25, ${uc.color}10)`,
              border: `1px solid ${uc.color}30`,
            }}
          >
            <uc.icon size={22} style={{ color: uc.color }} />
          </div>
          <div
            className="rounded-full px-2.5 py-1 text-[10px] font-black tracking-wider uppercase"
            style={{
              background: `${uc.color}15`,
              color: uc.color,
              border: `1px solid ${uc.color}30`,
            }}
          >
            {uc.stat}
          </div>
        </div>

        <h3 className="text-lg font-bold tracking-tight mb-3">{uc.specialty}</h3>

        <div className="space-y-3 mb-5">
          <div>
            <div className="text-[10px] font-black tracking-widest uppercase text-text-muted/60 mb-1">
              Πρόβλημα
            </div>
            <p className="text-xs text-text-muted/90 leading-relaxed">{uc.challenge}</p>
          </div>
          <div>
            <div className="text-[10px] font-black tracking-widest uppercase mb-1" style={{ color: uc.color }}>
              Λύση
            </div>
            <p className="text-xs text-white/90 leading-relaxed">{uc.solution}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {uc.features.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.02] px-2.5 py-1 text-[10px] font-semibold text-text-muted"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function UseCases() {
  return (
    <section id="use-cases" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px divider-gradient" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Stethoscope size={13} />
            Εξειδικευμένο για κάθε ειδικότητα
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-balance">
            Δουλεύει για <span className="gradient-text">κάθε ιατρείο</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted text-pretty">
            Είτε είσαι οδοντίατρος, είτε παιδίατρος, είτε ψυχολόγος — το ClinicFlow προσαρμόζεται στις ανάγκες σου.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc, i) => (
            <UseCaseCard key={uc.specialty} uc={uc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

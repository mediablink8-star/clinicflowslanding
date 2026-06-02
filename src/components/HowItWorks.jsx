import { useRef } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Settings, Zap, BarChart3, ArrowDown } from 'lucide-react'
import { useTilt } from './useEffects'

const steps = [
  {
    icon: UserPlus, step: '01', color: '#10b981',
    title: 'Δημιούργησε Λογαριασμό',
    description: 'Εγγραφή σε λιγότερο από 2 λεπτά. Χωρίς πιστωτική κάρτα. Ρύθμισε το προφίλ του ιατρείου σου και προσάρμοσε τις προτιμήσεις σου.',
  },
  {
    icon: Settings, step: '02', color: '#6366f1',
    title: 'Διαμόρφωσε Αυτοματισμούς',
    description: 'Σύνδεσε τα κανάλια επικοινωνίας σου, ρύθμισε τον φωνητικό βοηθό AI, διαμόρφωσε webhooks και προσάρμοσε αυτόματες υπενθυμίσεις.',
  },
  {
    icon: Zap, step: '03', color: '#f59e0b',
    title: 'Ξεκίνα & Αυτοματοποίησε',
    description: 'Το AI διαχειρίζεται αναπάντητες κλήσεις, στέλνει υπενθυμίσεις και επικοινωνεί με ασθενείς 24/7.',
  },
  {
    icon: BarChart3, step: '04', color: '#ec4899',
    title: 'Παρακολούθησε & Ανέπτυξε',
    description: 'Παρακολούθησε ποσοστά ανάκτησης, αναλύσεις εσόδων και ικανοποίηση ασθενών. Βελτιστοποίησε με βάση δεδομένα.',
  },
]

function StepCard({ step, index }) {
  const ref = useRef(null)
  const tilt = useTilt(ref, 4)

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      <div className={`flex flex-col items-center gap-6 lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
        <div className="flex-1">
          <div
            ref={ref}
            className="group relative rounded-2xl border border-dark-border bg-dark-card/50 p-6 sm:p-8 transition-all duration-300 hover:border-dark-hover hover:bg-dark-card hover:shadow-2xl hover:shadow-black/30"
            style={{
              transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transition: 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease',
            }}
          >
            <span
              className="absolute -top-4 left-4 lg:left-6 text-7xl font-black select-none pointer-events-none transition-colors duration-500"
              style={{ color: `${step.color}15` }}
            >
              {step.step}
            </span>
            <div className="relative">
              <h3 className="text-xl font-bold sm:text-2xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-text-muted">{step.description}</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex shrink-0 items-center justify-center">
          <div className="relative">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 hover:rotate-6"
              style={{
                background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                boxShadow: `0 0 30px ${step.color}30`,
              }}
            >
              <step.icon size={28} className="text-white" />
            </div>
            {index < steps.length - 1 && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden lg:block">
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown size={20} style={{ color: step.color }} />
                </motion.div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 hidden lg:block" />
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
            Απλή Ρύθμιση
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Ξεκίνα σε{' '}
            <span className="gradient-text">4 Απλά Βήματα</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Από την εγγραφή στην πλήρη αυτοματοποίηση σε λίγα λεπτά. Χωρίς τεχνικές γνώσεις.
          </p>
        </motion.div>

        <div className="relative mt-20">
          {steps.map((s, i) => (
            <StepCard key={s.step} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
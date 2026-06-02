import { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarCheck, Users, Bot, PhoneCall, MessageSquare,
  BarChart3, Shield, Webhook, Brain, Timer,
} from 'lucide-react'
import { useTilt } from './useEffects'

const features = [
  {
    icon: CalendarCheck, title: 'Έξυπνα Ραντεβού',
    description: 'Προγραμματισμός με αποτροπή διπλοεγγραφών, αυτόματες υπενθυμίσεις και κράτηση από πολλαπλά κανάλια.',
    color: '#10b981',
  },
  {
    icon: Bot, title: 'AI Βοηθός Sophia',
    description: 'Φωνητικές εντολές με τεχνητή νοημοσύνη Gemini. Διαχειρίσου το ιατρείο σου με απλές εντολές.',
    color: '#6366f1',
  },
  {
    icon: PhoneCall, title: 'AI Φωνητικές Κλήσεις',
    description: 'Αυτόματες κλήσεις ασθενών με φυσική ροή συνομιλίας και SMS backup.',
    color: '#f59e0b',
  },
  {
    icon: MessageSquare, title: 'Συνομιλίες SMS',
    description: 'Αμφίδρομη επικοινωνία με έξυπνη κράτηση. Οι ασθενείς απαντούν φυσικά και το AI διαχειρίζεται τα πάντα.',
    color: '#ec4899',
  },
  {
    icon: Users, title: 'Διαχείριση Ασθενών',
    description: 'Πλήρες ιστορικό ασθενών, αρχεία και επικοινωνία. Όλα σε ένα μέρος.',
    color: '#06b6d4',
  },
  {
    icon: BarChart3, title: 'Αναλύσεις & Αναφορές',
    description: 'Παρακολούθηση ποσοστών ανάκτησης, εσόδων και απόδοσης σε πραγματικό χρόνο.',
    color: '#8b5cf6',
  },
  {
    icon: Shield, title: 'Ασφάλεια',
    description: 'Συμμόρφωση GDPR, κρυπτογράφηση, έλεγχος πρόσβασης βάσει ρόλων.',
    color: '#f43f5e',
  },
  {
    icon: Webhook, title: 'Ενσωματώσεις n8n',
    description: 'Σύνδεση με τα εργαλεία σου μέσω webhooks. Αυτοματοποίηση ροών εργασίας.',
    color: '#14b8a6',
  },
  {
    icon: Brain, title: 'Ανάκτηση Κλήσεων',
    description: 'Αυτόματη ανίχνευση αναπάντητων, αποστολή SMS και follow-up.',
    color: '#f97316',
  },
  {
    icon: Timer, title: 'Υπενθυμίσεις',
    description: 'Αυτόματες υπενθυμίσεις ραντεβού, follow-up και ειδοποιήσεις.',
    color: '#a855f7',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const tilt = useTilt(ref, 6)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`group relative rounded-2xl border border-dark-border bg-dark-card/50 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-black/30 ${
        index % 3 === 1 ? 'lg:translate-y-6' : index % 3 === 2 ? 'lg:translate-y-3' : ''
      }`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = feature.color + '40' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '' }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${feature.color}08, transparent)` }}
      />
      <div
        className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg"
        style={{ background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}08)`, boxShadow: `0 0 20px ${feature.color}10` }}
      >
        <feature.icon size={22} style={{ color: feature.color }} />
      </div>
      <h3 className="relative mb-2 text-lg font-bold">{feature.title}</h3>
      <p className="relative text-sm leading-relaxed text-text-muted">{feature.description}</p>
      <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
      />
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-lg shadow-primary/5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" /></svg>
            Όλα όσα Χρειάζεσαι
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Ισχυρές Δυνατότητες για{' '}
            <span className="gradient-text">Σύγχρονα Ιατρεία</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted text-lg">
            Από αυτοματοποίηση με AI μέχρι ασφάλεια επιχειρησιακού επιπέδου — όλα όσα χρειάζεσαι σε μία πλατφόρμα.
          </p>
        </motion.div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
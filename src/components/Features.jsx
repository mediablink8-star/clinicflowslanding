import { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarCheck, Users, Bot, PhoneCall, MessageSquare,
  BarChart3, Shield, Webhook, Brain, Timer, ArrowUpRight
} from 'lucide-react'
import { useTilt } from './useEffects'

const features = [
  {
    icon: Brain, title: 'Μηδενικές Αναπάντητες',
    description: 'Το AI απαντά αμέσως σε κάθε κλήση που χάνετε, κλείνοντας ραντεβού ενώ εσείς εξετάζετε.',
    color: '#10b981',
  },
  {
    icon: CalendarCheck, title: 'Αυτόματη Γραμματεία',
    description: 'Πλήρης διαχείριση προγράμματος χωρίς την ανάγκη για έξτρα προσωπικό ή χειροκίνητες καταχωρήσεις.',
    color: '#6366f1',
  },
  {
    icon: Timer, title: 'Μείωση No-Shows',
    description: 'Έξυπνες υπενθυμίσεις που επιβεβαιώνουν την παρουσία του ασθενή, προστατεύοντας τα έσοδά σας.',
    color: '#f59e0b',
  },
  {
    icon: Shield, title: 'Απόλυτη Συμμόρφωση',
    description: 'Πλήρης προστασία ιατρικού απορρήτου και συμμόρφωση με GDPR για την ασφάλεια των ασθενών σας.',
    color: '#ec4899',
  },
  {
    icon: BarChart3, title: 'Μετρήσιμη Ανάπτυξη',
    description: 'Δείτε ακριβώς πόσα έσοδα ανακτήθηκαν από το AI και βελτιστοποιήστε την κερδοφορία του ιατρείου.',
    color: '#06b6d4',
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
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`group relative rounded-3xl border border-dark-border bg-dark-card/40 p-8 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
        index % 3 === 1 ? 'lg:translate-y-8' : index % 3 === 2 ? 'lg:translate-y-4' : ''
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = feature.color + '50' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '' }}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${feature.color}15, transparent 70%)` }}
      />
      <div
        className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-xl"
        style={{ background: `linear-gradient(135deg, ${feature.color}25, ${feature.color}10)`, boxShadow: `0 0 30px ${feature.color}15` }}
      >
        <feature.icon size={26} style={{ color: feature.color }} />
      </div>
      <h3 className="relative mb-3 text-xl font-bold tracking-tight">{feature.title}</h3>
      <p className="relative text-sm leading-relaxed text-text-muted/90 group-hover:text-text-muted transition-colors">{feature.description}</p>
      
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
        <ArrowUpRight size={18} style={{ color: feature.color }} />
      </div>

      <div className="absolute bottom-0 left-8 right-8 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
        style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
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
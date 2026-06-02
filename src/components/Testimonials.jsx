import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useTilt } from './useEffects'

const testimonials = [
  {
    name: 'Δρ. Μαρία Κ.',
    role: 'Γενικός Ιατρός, Αθήνα',
    content: 'Το ClinicFlow μεταμόρφωσε το ιατρείο μου. Το σύστημα ανάκτησης με AI ανέκτησε πάνω από €12K σε χαμένα ραντεβού τον πρώτο μήνα.',
    rating: 5, color: '#10b981',
  },
  {
    name: 'Γιώργος Π.',
    role: 'Διαχειριστής Ιατρείου, Θεσσαλονίκη',
    content: 'Από 3 άτομα προσωπικό στα τηλέφωνα, περάσαμε σε πλήρη αυτοματοποίηση. Οι συνομιλίες SMS και ο έξυπνος προγραμματισμός μας έσωσαν αμέτρητες ώρες.',
    rating: 5, color: '#6366f1',
  },
  {
    name: 'Δρ. Ελένη Δ.',
    role: 'Δερματολόγος, Ηράκλειο',
    content: 'Η Sophia, ο AI βοηθός, είναι εκπληκτική. Διαχειρίζομαι ραντεβού και ασθενείς με φωνητικές εντολές ενώ εξετάζω.',
    rating: 5, color: '#f59e0b',
  },
  {
    name: 'Δρ. Αντώνης Μ.',
    role: 'Οδοντίατρος, Πάτρα',
    content: 'Η αυτοματοποίηση υπενθυμίσεων μείωσε τις ακυρώσεις κατά 40%. Τα ποσοστά ανάκτησης είναι εντυπωσιακά.',
    rating: 5, color: '#ec4899',
  },
  {
    name: 'Νίκη Α.',
    role: 'Γραμματέας Ιατρείου, Λάρισα',
    content: 'Το πιο εύκολο σύστημα που έχουμε χρησιμοποιήσει. Η διεπαφή διαισθητική, η υποστήριξη άμεση, και η AI Sophia χειρίζεται τα πάντα.',
    rating: 5, color: '#06b6d4',
  },
  {
    name: 'Δρ. Σοφία Λ.',
    role: 'Παιδίατρος, Πειραιάς',
    content: 'Απίστευτη διαφορά στην καθημερινότητά μας. Τα παιδιά μου οι ασθενείς, και το ClinicFlow φροντίζει για όλα τα υπόλοιπα.',
    rating: 5, color: '#8b5cf6',
  },
  {
    name: 'Δρ. Κώστας Ν.',
    role: 'Καρδιολόγος, Αθήνα',
    content: 'Η ενσωμάτωση με το n8n μας επέτρεψε να συνδέσουμε όλα μας τα εργαλεία. Αυτοματοποιήσαμε ροές εργασίας που έπαιρναν ώρες.',
    rating: 5, color: '#f97316',
  },
]

function TestimonialCard({ t }) {
  const ref = useRef(null)
  const tilt = useTilt(ref, 5)

  return (
    <div
      ref={ref}
      className="inline-block w-[340px] shrink-0 rounded-2xl border border-dark-border bg-dark-card/50 p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/30 mx-3"
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.color + '30' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '' }}
    >
      <Quote size={18} style={{ color: `${t.color}40` }} className="mb-2" />
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star key={j} size={13} style={{ fill: t.color, color: t.color }} />
        ))}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-text-muted">&ldquo;{t.content}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shrink-0"
          style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}dd)` }}
        >
          {t.name.split(' ')[0][0]}{t.name.split(' ')[1]?.[0] ?? ''}
        </div>
        <div>
          <p className="text-sm font-semibold">{t.name}</p>
          <p className="text-xs text-text-muted">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/20 to-dark" />
      <div className="absolute -left-20 top-1/3 w-72 h-72 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute -right-20 bottom-1/3 w-72 h-72 bg-accent/5 rounded-full blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-14"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            Κριτικές
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Εμπιστεύονται{' '}
            <span className="gradient-text">Επαγγελματίες Υγείας</span>
          </h2>
        </motion.div>

        <div className="marquee-container overflow-hidden">
          <div className="flex animate-marquee">
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={`${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>

        <div className="mt-8 marquee-container overflow-hidden">
          <div className="flex animate-marquee-reverse">
            {[...testimonials, ...testimonials, ...testimonials].reverse().map((t, i) => (
              <TestimonialCard key={`rev-${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
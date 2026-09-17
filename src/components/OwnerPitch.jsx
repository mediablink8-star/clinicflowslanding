import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BellRing, CalendarCheck2, HeartHandshake, ChevronRight, CheckCircle2 } from 'lucide-react'

const moments = [
  {
    icon: BellRing,
    label: 'Όταν χτυπά το τηλέφωνο',
    before: 'Η γραμματεία είναι απασχολημένη. Η κλήση χάνεται και ο ασθενής περιμένει.',
    after: 'Η Sophia απαντά άμεσα, καταλαβαίνει το αίτημα και βρίσκει την κατάλληλη ώρα.',
    result: 'Κανένα αίτημα δεν μένει χωρίς απάντηση.',
  },
  {
    icon: CalendarCheck2,
    label: 'Πριν από το ραντεβού',
    before: 'Υπενθυμίσεις και πληροφορίες στέλνονται χειροκίνητα — όταν υπάρχει χρόνος.',
    after: 'Ο ασθενής λαμβάνει έγκαιρα επιβεβαίωση, οδηγίες και εύκολο τρόπο αλλαγής ώρας.',
    result: 'Πιο ήρεμη ημέρα, λιγότερες κενές θέσεις.',
  },
  {
    icon: HeartHandshake,
    label: 'Μετά την επίσκεψη',
    before: 'Η επικοινωνία τελειώνει όταν ο ασθενής φύγει από την κλινική.',
    after: 'Ένα προσεγμένο follow-up κρατά τη σχέση ζωντανή και βοηθά τον ασθενή στο επόμενο βήμα.',
    result: 'Φροντίδα που οι ασθενείς θυμούνται και προτείνουν.',
  },
]

export default function OwnerPitch() {
  const [active, setActive] = useState(0)
  const moment = moments[active]
  const Icon = moment.icon

  return (
    <section id="owner-demo" className="relative overflow-hidden border-y border-white/5 bg-dark-card/30 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,.11),transparent_30%),radial-gradient(circle_at_15%_85%,rgba(99,102,241,.1),transparent_32%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
            Η καθημερινότητα της κλινικής
          </span>
          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl text-balance">
            Δείτε τη διαφορά <span className="gradient-text">σε κάθε επαφή.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-text-muted">
            Ένα demo φτιαγμένο για τον ιδιοκτήτη: όχι τεχνικές δυνατότητες, αλλά η εμπειρία που κερδίζει η ομάδα και ο ασθενής σας.
          </p>
          <div className="mt-8 space-y-2">
            {moments.map((item, index) => {
              const ItemIcon = item.icon
              const selected = index === active
              return <button key={item.label} onClick={() => setActive(index)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${selected ? 'bg-white/[.07] text-white shadow-lg shadow-primary/5' : 'text-text-muted hover:bg-white/[.035] hover:text-white'}`}>
                <span className={`grid h-9 w-9 place-items-center rounded-lg ${selected ? 'bg-primary/20 text-primary' : 'bg-white/[.04]'}`}><ItemIcon size={17} /></span>
                <span className="flex-1 text-sm font-bold">{item.label}</span><ChevronRight size={16} className={selected ? 'text-primary' : 'opacity-40'} />
              </button>
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-white/[.08] bg-gradient-to-br from-white/[.07] to-white/[.02] p-5 shadow-2xl backdrop-blur-xl sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: .25 }}>
              <div className="mb-7 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white"><Icon size={20} /></span><div><p className="text-xs font-bold uppercase tracking-wider text-primary">Σενάριο {String(active + 1).padStart(2, '0')}</p><h3 className="text-xl font-black">{moment.label}</h3></div></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-2xl border border-rose-400/10 bg-rose-500/[.045] p-5"><p className="text-xs font-bold uppercase tracking-wider text-rose-300">Χωρίς ClinicFlow</p><p className="mt-3 text-sm leading-relaxed text-text-muted">{moment.before}</p></article>
                <article className="rounded-2xl border border-primary/20 bg-primary/[.07] p-5"><p className="text-xs font-bold uppercase tracking-wider text-primary">Με ClinicFlow</p><p className="mt-3 text-sm leading-relaxed text-white/85">{moment.after}</p></article>
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/[.07] bg-black/20 p-4"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" /><div><p className="text-xs font-bold text-text-muted">ΤΙ ΑΛΛΑΖΕΙ ΓΙΑ ΤΗΝ ΚΛΙΝΙΚΗ</p><p className="mt-1 text-sm font-semibold text-white">{moment.result}</p></div></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

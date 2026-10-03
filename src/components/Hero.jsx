import { motion } from 'framer-motion'
import { ArrowRight, PhoneMissed, CalendarCheck2, Clock3 } from 'lucide-react'
import Tilt from './Tilt'
import { useReducedMotion } from './useTilt'

const REGISTER_URL = 'https://clinicflows.vercel.app/register'

const day = [
  {
    time: '09:10',
    title: 'Επιβεβαίωση επίσκεψης',
    detail: 'Σταύρος Π. · Καρδιολογία',
    tone: 'muted',
  },
  {
    time: '13:42',
    title: 'Αναπάντητη κλήση',
    detail: 'Ανακτήθηκε αυτόματα σε 1:24',
    tone: 'alert',
  },
  {
    time: '13:44',
    title: 'Ραντεβού κλείσμένο',
    detail: 'Μαρία Π. · Πέμπτη 16:00',
    tone: 'live',
  },
  {
    time: '16:00',
    title: 'Υπενθύμιση στάλθηκε',
    detail: '24 ώρες πριν την επίσκεψη',
    tone: 'muted',
  },
]

const toneClass = {
  muted: 'text-ink-3',
  alert: 'text-alert',
  live: 'text-primary',
}

export default function Hero() {
  const reduced = useReducedMotion()

  const rise = (delay) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay },
        }

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 rule-grid rule-grid-fade opacity-70" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <div>
          <motion.p
            {...rise(0)}
            className="eyebrow"
          >
            Για ιατρεία και κλινικές
          </motion.p>

          <motion.h1
            {...rise(0.06)}
            className="mt-5 text-[2.5rem] leading-[1.06] sm:text-[3.25rem] lg:text-[3.5rem]"
          >
            Κάθε ασθενής που σας
            <br className="hidden sm:block" /> προσπαθεί να επικοινωνήσει,
            <span className="text-primary"> παίρνει απάντηση.</span>
          </motion.h1>

          <motion.p
            {...rise(0.12)}
            className="mt-7 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-2"
          >
            Το ClinicFlow παρακολουθεί τις κλήσεις και τα μηνύματα, ανακτά ό,τι χάθηκε,
            κλείνει ραντεβού και στέλνει υπενθυμίσεις. Η ομάδα σας παρεμβαίνει μόνο όταν
            χρειάζεται — όχι για να κυνηγάει κάθε ασθενή.
          </motion.p>

          <motion.div
            {...rise(0.18)}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#demo"
              className="group inline-flex items-center justify-center gap-2 bg-ink px-5 py-3 text-sm font-medium text-canvas transition-colors hover:bg-ink-2"
            >
              Δοκιμάστε το demo
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={REGISTER_URL}
              className="inline-flex items-center justify-center gap-2 border border-line bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink-4"
            >
              14 ημέρες δωρεάν
            </a>
          </motion.div>

          <motion.p
            {...rise(0.26)}
            className="mt-7 text-[0.8125rem] leading-relaxed text-ink-3"
          >
            Χωρίς εγκατάσταση στον υπολογιστή σας. Χωρίς αλλαγή στο σύστημα που
            κρατάτε ήδη αρχεία. Οι υπηρεσίες είναι σύμφωνες με τον GDPR.
          </motion.p>
        </div>

        <motion.div
          {...rise(0.2)}
          className="relative"
        >
          <Tilt max={5} scale={1.008} className="panel overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span className="text-[0.8125rem] font-medium text-ink">Σήμερα</span>
                <span className="text-[0.8125rem] text-ink-4">Τρίτη 14 Οκτωβρίου</span>
              </div>
              <span className="text-[0.75rem] text-ink-4">Κλινική Αγίου Νικολάου</span>
            </div>

            <ul className="divide-y divide-line-2">
              {day.map((item, i) => (
                <motion.li
                  key={item.time}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={
                    reduced ? { duration: 0.25 } : { duration: 0.4, delay: 0.35 + i * 0.09 }
                  }
                  className="flex items-start gap-4 px-5 py-3.5"
                >
                  <span data-numeric className="w-11 shrink-0 pt-px text-[0.8125rem] text-ink-4">
                    {item.time}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.875rem] font-medium leading-snug text-ink">{item.title}</p>
                    <p className="mt-0.5 truncate text-[0.8125rem] text-ink-3">{item.detail}</p>
                  </div>
                  <span className={`shrink-0 pt-px ${toneClass[item.tone]}`}>
                    {item.tone === 'alert' && <PhoneMissed size={15} />}
                    {item.tone === 'live' && <CalendarCheck2 size={15} />}
                    {item.tone === 'muted' && <Clock3 size={15} className="text-ink-4" />}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="grid grid-cols-3 border-t border-line">
              {[
                ['11', 'κλήσεις'],
                ['8', 'ραντεβού'],
                ['0', 'χειροκίνητα'],
              ].map(([value, label], i) => (
                <div
                  key={label}
                  className={`px-5 py-4 ${i > 0 ? 'border-l border-line' : ''}`}
                >
                  <p data-numeric className="font-serif text-2xl leading-none text-ink">
                    {value}
                  </p>
                  <p className="mt-1.5 text-[0.75rem] text-ink-3">{label}</p>
                </div>
              ))}
            </div>
          </Tilt>

          <p className="mt-4 text-center text-[0.8125rem] text-ink-4 lg:text-left">
            Η μέρα του γραφείου, όπως τη βλέπει η ομάδα σας.
          </p>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-20 max-w-6xl px-6">
        <p className="max-w-2xl border-l-2 border-line pl-5 text-[0.875rem] leading-relaxed text-ink-3">
          Δεν σας ζητάμε να αλλάξετε το σύστημα που κρατά ήδη τα αρχεία σας. Το ClinicFlow
          μπαίνει δίπλα του και συνδέεται με το τηλέφωνο, το ημερολόγιο και το booking
          που χρησιμοποιείτε ήδη.
        </p>
      </div>
    </section>
  )
}

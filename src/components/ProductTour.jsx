import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  Check,
  Clock3,
  Globe,
  Mic,
  Phone,
  PhoneMissed,
  Play,
  Square,
  UserRound,
  Volume2,
} from 'lucide-react'
import { useSpeech } from './useSpeech'

/* ------------------------------------------------------------------ *
 * Screen 1 — Recovery feed
 * ------------------------------------------------------------------ */

const recovery = [
  { time: '13:42', name: 'Μαρία Παπαδοπούλου', line: 'Γενική ιατρική', state: 'booked', note: 'Ραντεβού Πέμπτη 16:00', took: '1:24' },
  { time: '13:31', name: 'Δημήτρης Βαρβάρης', line: 'Καρδιολογία', state: 'booked', note: 'Ραντεβού Τρίτη 09:00', took: '0:51' },
  { time: '13:18', name: 'Αγγελική Νικολάου', line: 'Δερματολογία', state: 'calling', note: 'Η Sophia καλεί τώρα', took: '—' },
  { time: '13:02', name: 'Κωνσταντίνος Μ.', line: 'Ορθοπεδική', state: 'human', note: 'Επαφή από γραμματεία', took: '4:12' },
]

const recoveryState = {
  booked: { label: 'Έκλεισε', className: 'text-primary border-primary/30 bg-primary-tint' },
  calling: { label: 'Σε κλήση', className: 'text-clay border-clay/30 bg-clay-tint' },
  human: { label: 'Άνθρωπος', className: 'text-ink-3 border-line bg-surface-2' },
}

function RecoveryFeed() {
  return (
    <div>
      <div className="grid grid-cols-3 border-b border-line">
        {[
          ['12', 'αναπάντητες'],
          ['9', 'έκλεισαν'],
          ['2:10', 'μέση ανάκτηση'],
        ].map(([value, label], i) => (
          <div key={label} className={`px-5 py-4 ${i > 0 ? 'border-l border-line' : ''}`}>
            <p data-numeric className="font-serif text-[1.5rem] leading-none text-ink">
              {value}
            </p>
            <p className="mt-1.5 text-[0.75rem] text-ink-3">{label}</p>
          </div>
        ))}
      </div>

      <ul className="divide-y divide-line-2">
        {recovery.map((row) => {
          const state = recoveryState[row.state]
          return (
            <li key={row.time} className="flex items-center gap-4 px-5 py-3.5">
              <span data-numeric className="w-11 shrink-0 text-[0.8125rem] text-ink-4">
                {row.time}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.875rem] font-medium text-ink">{row.name}</p>
                <p className="mt-0.5 truncate text-[0.75rem] text-ink-3">
                  {row.line} · {row.note}
                </p>
              </div>

              {row.state === 'calling' ? (
                <span className="flex shrink-0 items-center gap-1.5 border border-clay/30 bg-clay-tint px-2 py-1 text-[0.6875rem] font-medium text-clay">
                  <Phone size={11} />
                  {state.label}
                </span>
              ) : (
                <span
                  className={`shrink-0 border px-2 py-1 text-[0.6875rem] font-medium ${state.className}`}
                >
                  {state.label}
                </span>
              )}

              <span data-numeric className="w-10 shrink-0 text-right text-[0.75rem] text-ink-4">
                {row.took}
              </span>
            </li>
          )
        })}
      </ul>

      <p className="border-t border-line px-5 py-3 text-[0.75rem] text-ink-4">
        Οι χρόνοι ανάκτησης μετρούν από το κλείσιμο της γραμμής έως την επικοινωνία με τον
        ασθενή.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Screen 2 — Live AI call, with working audio
 * ------------------------------------------------------------------ */

// Each Sophia line is pre-split so the sentence being spoken can highlight.
const call = [
  { speaker: 'sophia', parts: ['Καλησπέρα! Είμαι η Sophia από την κλινική.'] },
  { speaker: 'patient', text: 'Ναι, ήθελα να κλείσω ραντεβού για καθαρισμό.' },
  {
    speaker: 'sophia',
    parts: [
      'Βεβαίως, κανένα πρόβλημα.',
      'Έχω Τετάρτη στις δέκα και μισή ή Πέμπτη στις τέσσερις.',
      'Τι σας εξυπηρετεί περισσότερο;',
    ],
  },
  { speaker: 'patient', text: 'Η Πέμπτη στις τέσσερις είναι μια χαρά.' },
  {
    speaker: 'sophia',
    parts: [
      'Τέλεια, το έχω.',
      'Σας κλείνω για Πέμπτη στις τέσσερις.',
      'Θα σας έρθει και SMS με την επιβεβαίωση.',
    ],
  },
]

const WAVE = [0.4, 0.7, 0.95, 0.55, 0.8, 1, 0.6, 0.35, 0.75, 0.9, 0.5, 0.65, 0.85, 0.45, 0.3, 0.7, 0.55, 0.35]

function VoiceCall() {
  const { supported, hasGreek, speaking, activePart, speak, stop } = useSpeech()
  const [line, setLine] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    startedRef.current = false
    stop()
    setLine(0)
  }, [stop])

  const sophiaLine = call[line]
  const isSophia = sophiaLine?.speaker === 'sophia'

  const handlePlay = () => {
    if (!supported || !sophiaLine) return

    if (speaking) {
      stop()
      return
    }

    setLine((prev) => (prev >= call.length - 1 ? 0 : prev + 1))

    const parts = isSophia ? sophiaLine.parts : [sophiaLine.text]
    if (!startedRef.current) {
      startedRef.current = true
      speak(parts.join(' '))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-clay-tint text-clay">
            <Mic size={12} />
          </span>
          <div>
            <p className="text-[0.875rem] font-medium leading-tight text-ink">
              Sophia · εξερχόμενη κλήση
            </p>
            <p data-numeric className="text-[0.75rem] text-ink-4">
              +30 694 *** 0987
            </p>
          </div>
        </div>
        <span
          data-numeric
          className={`flex items-center gap-1.5 text-[0.75rem] ${speaking ? 'text-clay' : 'text-ink-4'}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full bg-clay ${speaking ? 'pulse-live' : ''}`} />
          {speaking ? 'σε συνομιλία' : 'σε αναμονή'}
        </span>
      </div>

      {/* Waveform */}
      <div className="flex h-16 items-center justify-center gap-1 border-b border-line-2 bg-surface-2 px-5">
        {WAVE.map((height, i) => (
          <span
            key={i}
            className={`wave-bar w-1 rounded-full ${speaking ? 'is-speaking bg-clay' : 'bg-ink-4/40'}`}
            style={{
              height: `${Math.round(height * 100)}%`,
              animationDelay: `${(i % 7) * 0.09}s`,
            }}
          />
        ))}
      </div>

      {/* Transcript */}
      <div className="flex flex-col gap-3 px-5 py-4">
        {call.slice(0, line + 1).map((entry, i) => {
          const active = i === line
          if (entry.speaker === 'patient') {
            return (
              <p key={i} className="max-w-[80%] self-end text-[0.8125rem] leading-relaxed text-ink-3">
                {entry.text}
              </p>
            )
          }
          return (
            <p key={i} className="max-w-[85%] text-[0.875rem] leading-relaxed">
              {entry.parts.map((part, j) => (
                <span
                  key={j}
                  className={
                    active && speaking && j === activePart
                      ? 'text-clay'
                      : active
                        ? 'text-ink'
                        : 'text-ink-4'
                  }
                >
                  {part}{' '}
                </span>
              ))}
            </p>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 border-t border-line px-5 py-3.5">
        <button
          type="button"
          onClick={handlePlay}
          disabled={!supported}
          className="inline-flex items-center gap-2 bg-ink px-4 py-2 text-[0.8125rem] font-medium text-canvas transition-colors hover:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {speaking ? <Square size={13} /> : <Play size={13} />}
          {speaking ? 'Διακοπή' : 'Ακούστε τη Sophia'}
        </button>

        <span className="text-[0.75rem] text-ink-4">
          {supported
            ? 'Φωνή του browser, χωρίς εγγραφή.'
            : 'Ο browser σας δεν υποστηρίζει φωνή.'}
        </span>
      </div>

      {supported && !hasGreek && (
        <p className="flex gap-2 border-t border-line bg-surface-2 px-5 py-3 text-[0.75rem] leading-relaxed text-ink-3">
          <AlertTriangle size={13} className="mt-0.5 shrink-0 text-clay" />
          Δεν βρέθηκε ελληνική φωνή στον browser σας, οπότε η φωνή μπορεί να μην διαβάζει
          σωστά. Σε Chrome ή Edge συνήθως υπάρχει διαθέσιμη.
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Screen 3 — Sophia's configuration
 * ------------------------------------------------------------------ */

const knowledge = [
  'Ωράριο γιατρών και διαθεσιμότητα',
  'Τιμοκατάλογος και τρόποι πληρωμής',
  'Οδηγίες προετοιμασίας επίσκεψης',
  'Πού να παρκάρει ο ασθενής',
  'Ποια έγγραφα να φέρει ο ασθενής',
]

const rules = [
  { when: 'Ασθενής ζητά συγκεκριμένη διάγνωση', then: 'Κλείδωμα και προώθηση σε γιατρό' },
  { when: 'Επείγον σύμπτωμα ή πόνος', then: 'Άμεσος τηλεφωνικός χειρισμός' },
  { when: 'Ασθενής ζητά τιμή εκτός καταλόγου', then: 'Προώθηση στη γραμματεία' },
]

function SophiaConfig() {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-clay-tint text-clay">
            <UserRound size={12} />
          </span>
          <p className="text-[0.875rem] font-medium text-ink">Ρυθμίσεις Sophia</p>
        </div>
        <span className="border border-primary/30 bg-primary-tint px-2 py-1 text-[0.6875rem] font-medium text-primary">
          Ενεργή
        </span>
      </div>

      <div className="grid grid-cols-2 gap-px border-b border-line bg-line sm:grid-cols-4">
        {[
          ['Φωνή', 'Athena'],
          ['Γλώσσα', 'el-GR'],
          ['Τόνος', 'Επίσημος'],
          ['Λέξεις', '~40'],
        ].map(([label, value]) => (
          <div key={label} className="bg-surface px-5 py-3.5">
            <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink-4">{label}</p>
            <p className="mt-1.5 text-[0.875rem] font-medium text-ink">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-px bg-line sm:grid-cols-2">
        <div className="bg-surface px-5 py-4">
          <p className="flex items-center gap-1.5 text-[0.75rem] font-medium text-ink">
            <Globe size={12} className="text-ink-4" />
            Βάση γνώσεων
          </p>
          <ul className="mt-3 flex flex-col gap-1.5">
            {knowledge.map((item) => (
              <li key={item} className="flex gap-2 text-[0.8125rem] leading-relaxed text-ink-2">
                <Check size={12} className="mt-1 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface px-5 py-4">
          <p className="flex items-center gap-1.5 text-[0.75rem] font-medium text-ink">
            <AlertTriangle size={12} className="text-ink-4" />
            Κανόνες παραπομπής
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {rules.map((rule) => (
              <li key={rule.when} className="text-[0.8125rem] leading-relaxed">
                <span className="text-ink-3">{rule.when}</span>
                <span className="mt-0.5 block text-ink-2">→ {rule.then}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="border-t border-line px-5 py-3 text-[0.75rem] leading-relaxed text-ink-4">
        Οι κανόνες παραπομπής είναι το σημείο όπου η αυτοματοποίηση σταματά και αναλαμβάνει
        κάποιος από την ομάδα σας.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Screen 4 — Patient booking page
 * ------------------------------------------------------------------ */

const slots = ['09:00', '10:00', '11:30', '13:15', '16:00', '17:30']

function BookingPage() {
  const [day, setDay] = useState(1)
  const [time, setTime] = useState('10:00')

  const days = [
    { d: 'Τρίτη', n: 12 },
    { d: 'Τετάρτη', n: 13 },
    { d: 'Πέμπτη', n: 14 },
    { d: 'Παρασκευή', n: 15 },
  ]

  return (
    <div className="bg-surface-2 px-5 py-5">
      <div className="mx-auto max-w-sm border border-line bg-surface">
        <div className="border-b border-line px-4 py-3.5">
          <p className="font-serif text-[1.0625rem] leading-none text-ink">Κλινική Αγίου Νικολάου</p>
          <p className="mt-1.5 text-[0.75rem] text-ink-3">Γενική ιατρική · 30 λεπτά</p>
        </div>

        <div className="px-4 py-3.5">
          <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink-4">Ημερομηνία</p>
          <div className="mt-2.5 grid grid-cols-4 gap-1.5">
            {days.map((d, i) => (
              <button
                key={d.n}
                type="button"
                onClick={() => setDay(i)}
                className={`border px-1 py-2 text-center transition-colors ${
                  day === i
                    ? 'border-ink bg-ink text-canvas'
                    : 'border-line bg-surface text-ink-2 hover:border-ink-4'
                }`}
              >
                <span className="block text-[0.625rem]">{d.d.slice(0, 3)}</span>
                <span data-numeric className="mt-0.5 block text-[0.875rem] leading-none">
                  {d.n}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.12em] text-ink-4">
            Διαθέσιμες ώρες
          </p>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            {slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setTime(s)}
                data-numeric
                className={`border px-1 py-2 text-[0.8125rem] transition-colors ${
                  time === s
                    ? 'border-primary bg-primary-tint font-medium text-primary'
                    : 'border-line bg-surface text-ink-2 hover:border-ink-4'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-line px-4 py-3.5">
          <button
            type="button"
            className="w-full bg-primary px-4 py-2.5 text-[0.875rem] font-medium text-canvas transition-colors hover:bg-primary-hover"
          >
            Κλείσιμο ραντεβού · {time}
          </button>
          <p className="mt-2.5 text-center text-[0.6875rem] text-ink-4">
            Λαμβάνετε SMS επιβεβαίωση και υπενθύμιση 24 ώρες πριν.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Section
 * ------------------------------------------------------------------ */

const screens = [
  {
    id: 'recovery',
    label: 'Ανακτήσεις',
    kicker: 'Ό,τι χάθηκε, επιστρέφει',
    blurb: 'Μία λίστα με όλες τις αναπάντητες κλήσεις της μέρας, με το αποτέλεσμα και τον χρόνο που πήρε η κάθε ανάκτηση.',
    render: RecoveryFeed,
  },
  {
    id: 'voice',
    label: 'AI Voice Call',
    kicker: 'Ακούστε τη Sophia',
    blurb: 'Η φωνή που απαντάει όταν δεν υπάρχει άνθρωπος στο τηλέφωνο. Πατήστε και ακούστε την πραγματική συνομιλία.',
    render: VoiceCall,
  },
  {
    id: 'sophia',
    label: 'AI Sophia',
    kicker: 'Δική σας persona',
    blurb: 'Η Sophia δεν λέει πάντα τα ίδια. Ορίζετε τι ξέρει, πώς μιλάει και πότε πρέπει να παραδώσει σε άνθρωπο.',
    render: SophiaConfig,
  },
  {
    id: 'booking',
    label: 'Patient Booking',
    kicker: 'Η σελίδα κράτησης',
    blurb: 'Η σελίδα που βλέπει ο ασθενής στο κινητό του. Συμπληρώνεται σε δεκάδες δευτερόλεπτα, ακόμα και στις 11 το βράδυ.',
    render: BookingPage,
  },
]

export default function ProductTour() {
  const [active, setActive] = useState(0)
  const Current = screens[active].render

  return (
    <section id="product" className="border-t border-line bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <p className="eyebrow">Το προϊόν</p>
            <h2 className="mt-4 text-[2rem] leading-[1.1] sm:text-[2.5rem]">
              Τέσσερα σημεία που βλέπει η ομάδά σας κάθε μέρα.
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-2">
              Δεν είναι mockup. Είναι οι ίδιες οθόνες που χρησιμοποιείτε κάθε μέρα στη
              κλινική, με τα πεδία και τις ενέργειες που σας αφορούν.
            </p>
          </div>

          {/* Screen picker */}
          <div className="grid grid-cols-2 gap-px self-end bg-line lg:grid-cols-4">
            {screens.map((screen, i) => (
              <button
                key={screen.id}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`group bg-surface px-4 py-4 text-left transition-colors ${
                  active === i ? '' : 'hover:bg-surface-2'
                }`}
              >
                <span
                  data-numeric
                  className={`text-[0.75rem] ${active === i ? 'text-primary' : 'text-ink-4'}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`mt-1.5 block text-[0.875rem] font-medium leading-snug ${
                    active === i ? 'text-ink' : 'text-ink-2'
                  }`}
                >
                  {screen.label}
                </span>
                <span
                  className={`mt-2 block h-0.5 transition-colors ${
                    active === i ? 'bg-primary' : 'bg-line group-hover:bg-ink-4'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={screens[active].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <h3 className="text-[1.375rem] leading-snug">{screens[active].kicker}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
                  {screens[active].blurb}
                </p>

                {screens[active].id === 'voice' && (
                  <div className="mt-8 border-l-2 border-clay bg-clay-tint px-5 py-4">
                    <p className="flex items-center gap-2 text-[0.8125rem] font-medium text-clay">
                      <Volume2 size={14} />
                      Ζωντανή φωνή
                    </p>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-2">
                      Η αναπαραγωγή χρησιμοποιεί τη φωνή του browser σας, οπότε δεν χρειάζεται
                      λογαριασμός ούτε εγγραφή. Αν δεν ακούγεται σωστά, μπορείτε να συνδεθείτε
                      για δοκιμή με φωνή ElevenLabs.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* The screen itself */}
          <div className="panel overflow-hidden shadow-[0_1px_2px_rgba(13,14,16,0.04),0_16px_40px_-16px_rgba(13,14,16,0.12)]">
            <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-5 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-line" />
              <span className="h-1.5 w-1.5 rounded-full bg-line" />
              <span className="h-1.5 w-1.5 rounded-full bg-line" />
              <span className="ml-2 text-[0.75rem] text-ink-4">
                clinicflows.app · {screens[active].label.toLowerCase().replace(/\s+/g, '-')}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={screens[active].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <Current />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

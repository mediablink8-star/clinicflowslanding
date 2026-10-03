import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownToLine,
  Check,
  Circle,
  CornerUpLeft,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react'

const scenarios = [
  {
    id: 'missed',
    label: 'Αναπάντητη κλήση',
    when: '13:42',
    patient: { name: 'Μαρία Παπαδοπούλου', phone: '+30 694 *** 0987', reason: 'Γενική ιατρική' },
    steps: [
      {
        time: '13:42',
        title: 'Κλήση χωρίς απάντηση',
        body: 'Η γραμματεία ήταν σε γραμμή. Η κλήση μένει χωρίς απάντηση — το σημείο όπου χάνονται οι ασθενείς.',
        tone: 'alert',
      },
      {
        time: '13:42',
        title: 'Αναγνώριση ασθενή',
        body: 'Το ClinicFlow αναγνωρίζει το νούμερο από το ιστορικό της κλινικής και ξέρει ήδη τι είχε ζητήσει.',
        tone: 'run',
      },
      {
        time: '13:43',
        title: 'Πρώτο SMS, αμέσως',
        body: 'Ο ασθενής παίρνει απάντηση πριν προλάβει να τηλεφωνήσει ξανά μόνος του.',
        tone: 'run',
        sms: {
          dir: 'out',
          text: 'Γεια χάσαμε την κλήση σας στο Κλινική Αγίου Νικολάου. Κλείστε ραντεβού εδώ: clinicflows.app/book',
        },
      },
      {
        time: '13:43',
        title: 'AI καλεί πίσω',
        body: 'Η Sophia ζητά συγκεκριμένη ημερομηνία, όχι «σύντομα». Μπορεί να κλείσει το ραντεβού ή να ζητήσει επανάκληση.',
        tone: 'run',
        sms: { dir: 'in', text: 'Ναι, την Πέμπτη αν γίνεται, μετά τις 4.' },
      },
      {
        time: '13:44',
        title: 'Ραντεβού κλείσμένο',
        body: 'Πέμπτη 16:00 με τον κ. Βασιλείου. Ο κανόνας της κλινικής επιβάλλεται αυτόματα.',
        tone: 'done',
        sms: {
          dir: 'out',
          text: 'Σας κλείσαμε Πέμπτη 14/10 στις 16:00. Για αλλαγές απαντήστε σε αυτό το μήνυμα.',
        },
      },
      {
        time: '13:44',
        title: 'Ενημέρωση γραμματείας',
        body: 'Η ροή ενημερώνεται στο ίδιο αρχείο που κρατά ήδη η κλινική — όχι σε δεύτερο σύστημα.',
        tone: 'done',
      },
    ],
    outcome: 'Μία αναπάντητη κλήση έγινε ραντεβού, χωρίς να αγγίξει κανείς το τηλέφωνο.',
  },
  {
    id: 'booking',
    label: 'Κράτηση μετά τις ώρες',
    when: '21:14',
    patient: { name: 'Νικόλας Αντωνίου', phone: '+30 697 *** 6543', reason: 'Δερματολογία' },
    steps: [
      {
        time: '21:14',
        title: 'Επίσκεψη εκτός ωρών',
        body: 'Ο ασθενής θέλει να κλείσει επίσκεψη ενώ η κλινική είναι κλειστή. Δεν χρειάζεται να περιμένει το πρωί.',
        tone: 'alert',
      },
      {
        time: '21:14',
        title: 'Στοιχεία εισόδου',
        body: 'Όνομα, τηλέφωνο και υπηρεσία. Η γραμματεία δεν αφιερώνει χρόνο καθόλου.',
        tone: 'run',
      },
      {
        time: '21:15',
        title: 'Πραγματική διαθεσιμότητα',
        body: 'Προτείνονται ώρες διαβασμένες από το πραγματικό ωράριο του γιατρού, όχι από σταθερές προεπιλογές.',
        tone: 'run',
        sms: { dir: 'out', text: 'Διαθέσιμες ώρες: Τρίτη 10:00, Τρίτη 11:30, Τετάρτη 09:15. Ποια σας βολεύει;' },
      },
      {
        time: '21:15',
        title: 'Επιλογή ασθενή',
        body: 'Ο ασθενής διαλέγει μόνος του και κλείνει αμέσως.',
        tone: 'run',
        sms: { dir: 'in', text: 'Τρίτη στις 10:00 θα πάω.' },
      },
      {
        time: '21:15',
        title: 'Θέση κλεισμένη',
        body: 'Μπαίνει στο ημερολόγιο του γιατρού και έρχεται επιβεβαίωση.',
        tone: 'done',
        sms: {
          dir: 'out',
          text: 'Επιβεβαιώθηκε: Τρίτη 10:00, Δερματολογία. Θα σας θυμίσουμε 24 ώρες πριν.',
        },
      },
      {
        time: '10:00 π.μ.',
        title: 'Υπενθύμιση πριν την επίσκεψη',
        body: 'Στέλνεται αυτόματα, με σύνδεσμο ακύρωσης αν κάτι αλλάξει.',
        tone: 'done',
      },
    ],
    outcome: 'Ραντεβού κλεισμένο στις 21:15. Κανείς δεν χρειάστηκε να ξυπνήσει.',
  },
  {
    id: 'stale',
    label: 'Χωρίς απάντηση',
    when: '24 ώρες μετά',
    patient: { name: 'Ελένη Δημητρίου', phone: '+30 693 *** 3210', reason: 'Οφθαλμολογία' },
    steps: [
      {
        time: '13:44',
        title: 'SMS στάλθηκε',
        body: 'Ο ασθενής πήρε το μήνυμα με τον σύνδεσμο κράτησης. Η κλήση είχε γίνει εντός ωρών λειτουργίας.',
        tone: 'done',
      },
      {
        time: '13:44',
        title: 'Καμία απάντηση',
        body: 'Ο ασθενής δεν απάντησε και δεν άνοιξε τον σύνδεσμο. Η περίπτωση παραμένει ενεργή.',
        tone: 'alert',
      },
      {
        time: '13:44',
        title: 'Παράλειψη 6 ωρών',
        body: 'Το σύστημα δεν στέλνει δεύτερο SMS στον ίδιο ασθενή μέσα σε ένα 6ωρο παράθυρο, για να μην γίνεται επιθετικό.',
        tone: 'run',
      },
      {
        time: '13:44',
        title: 'Επισήμανση στο Action Center',
        body: 'Μετά από 24 ώρες χωρίς απάντηση η περίπτωση εμφανίζεται αυτόματα στην ομάδα, μαζί με όλο το ιστορικό.',
        tone: 'run',
      },
      {
        time: '13:45',
        title: 'Η ομάδα παρεμβαίνει',
        body: 'Ο γιατρός βλέπει τι στάλθηκε, πότε, και αν είχε απαντήσει. Στέλνει follow-up ή κλείνει την περίπτωση.',
        tone: 'done',
      },
      {
        time: '13:45',
        title: 'Χωρίς επιστροφή στην ίδια ώρα',
        body: 'Μια περίπτωση που δεν προχωράει δεν σπρώχνει άλλες κλήσεις προς τα πίσω — οι ασθενείς βλέπουν μία καθαρή, σωστή επικοινωνία.',
        tone: 'done',
      },
    ],
    outcome:
      'Η περίπτωση δεν χάνεται στο χάος: εμφανίζεται στη σωστή στιγμή, με όλο το ιστορικό.',
  },
]

function Step({ step, state }) {
  const done = state === 'done'
  const active = state === 'active'

  return (
    <li className="flex gap-4 px-5 py-4">
      <div className="relative flex w-4 shrink-0 justify-center pt-1">
        {done ? (
          <Check size={15} className="text-primary" strokeWidth={2.5} />
        ) : active ? (
          <span className="block h-2 w-2 rounded-full bg-primary" />
        ) : (
          <Circle size={15} className="text-line" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <span data-numeric className="w-11 shrink-0 text-[0.8125rem] text-ink-4">
            {step.time}
          </span>
          <p
            className={`text-[0.9375rem] font-medium leading-snug ${
              done || active ? 'text-ink' : 'text-ink-4'
            }`}
          >
            {step.title}
          </p>
        </div>
        <AnimatePresence initial={false}>
          {(done || active) && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-1.5 pl-14 text-[0.8125rem] leading-relaxed text-ink-3"
            >
              {step.body}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </li>
  )
}

export default function Demo() {
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const phoneRef = useRef(null)
  const rootRef = useRef(null)

  const scenario = scenarios[index]
  const finished = step >= scenario.steps.length

  useEffect(() => {
    if (!playing || finished) return
    const t = setTimeout(() => setStep((s) => s + 1), 1150)
    return () => clearTimeout(t)
  }, [playing, step, finished])

  useEffect(() => {
    setPlaying(false)
  }, [finished])

  useEffect(() => {
    const el = phoneRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [step, index])

  const messages = useMemo(
    () =>
      scenario.steps.slice(0, step).flatMap((s) => (s.sms ? [s.sms] : [])),
    [scenario, step],
  )

  const selectScenario = (i) => {
    setIndex(i)
    setStep(0)
    setPlaying(false)
  }

  const reset = () => {
    setStep(0)
    setPlaying(false)
  }

  const toggle = () => {
    if (finished) {
      reset()
      setPlaying(true)
      return
    }
    setPlaying((p) => !p)
  }

  const stepTo = (n) => {
    setPlaying(false)
    setStep(Math.max(0, Math.min(n, scenario.steps.length)))
  }

  // Presenting shortcuts: Space runs/pauses, arrows scrub, R resets.
  // Bound to the section so the page's other number-key handler does not
  // fight with it while someone is mid-sentence on the demo.
  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const onKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const tag = event.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      if (event.key === ' ') {
        event.preventDefault()
        toggle()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        stepTo(step + 1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        stepTo(step - 1)
      } else if (event.key.toLowerCase() === 'r') {
        reset()
      }
    }

    node.addEventListener('keydown', onKey)
    return () => node.removeEventListener('keydown', onKey)
  })

  return (
    <section id="demo" ref={rootRef} className="border-t border-line bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">Ζωντανή επίδειξη</p>
          <h2 className="mt-4 text-[2rem] leading-[1.1] sm:text-[2.5rem]">
            Δοκιμάστε το ClinicFlow εδώ, πριν το δοκιμάσετε στην κλινική σας.
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-2">
            Επιλέξτε ένα σενάριο και δείτε τι κάνει το σύστημα βήμα βήμα: τι λαμβάνει ο
            ασθενής, πότε το ξέρει η ομάδα σας και πού μένει αναφορά.
          </p>
        </div>

        <div className="mt-12 overflow-hidden border border-line bg-canvas">
          {/* App chrome */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-5 py-3">
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-[0.9375rem] font-semibold text-ink">ClinicFlow</span>
              <span className="text-ink-4">/</span>
              <span className="text-[0.8125rem] text-ink-3">Demo σενάριο</span>
            </div>
            <span className="text-[0.75rem] text-ink-4">
              Προσωποποιημένα δεδομένα · χωρίς πραγματικούς ασθενείς
            </span>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,17rem)]">
            {/* Scenario picker + patient */}
            <div className="border-b border-line p-5 lg:border-b-0 lg:border-r">
              <p className="eyebrow">Σενάριο</p>
              <ul className="mt-4 flex flex-col gap-1.5 lg:flex-col">
                {scenarios.map((s, i) => {
                  const isActive = i === index
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => selectScenario(i)}
                        className={`w-full rounded-sm border px-3 py-2.5 text-left transition-colors ${
                          isActive
                            ? 'border-ink bg-ink text-canvas'
                            : 'border-line bg-surface text-ink-2 hover:border-ink-4'
                        }`}
                      >
                        <span className="block text-[0.875rem] font-medium leading-snug">
                          {s.label}
                        </span>
                        <span
                          data-numeric
                          className={`mt-0.5 block text-[0.75rem] ${
                            isActive ? 'text-canvas/60' : 'text-ink-4'
                          }`}
                        >
                          {s.when}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-6 border-t border-line pt-5">
                <p className="eyebrow">Ασθενής</p>
                <p className="mt-3 text-[0.875rem] font-medium leading-snug text-ink">
                  {scenario.patient.name}
                </p>
                <p data-numeric className="mt-1 text-[0.8125rem] text-ink-3">
                  {scenario.patient.phone}
                </p>
                <p className="mt-3 text-[0.8125rem] text-ink-3">{scenario.patient.reason}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="border-b border-line lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between border-b border-line-2 px-5 py-3">
                <p className="eyebrow">Τι βλέπει η ομάδα σας</p>
                <p data-numeric className="text-[0.75rem] text-ink-4">
                  {Math.min(step, scenario.steps.length)} / {scenario.steps.length} βήματα
                </p>
              </div>

              <ul className="divide-y divide-line-2">
                {scenario.steps.map((s, i) => (
                  <Step
                    key={s.title}
                    step={s}
                    state={i < step ? 'done' : i === step ? 'active' : 'idle'}
                  />
                ))}
              </ul>

              <div className="border-t border-line p-4">
                <AnimatePresence mode="wait">
                  {finished ? (
                    <motion.div
                      key="outcome"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="border border-primary/25 bg-primary-tint px-4 py-3.5"
                    >
                      <p className="text-[0.8125rem] font-medium leading-relaxed text-primary-hover">
                        {scenario.outcome}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="hint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="px-1 text-[0.8125rem] text-ink-4"
                    >
                      {playing ? 'Εκτελείται η ροή…' : 'Πατήστε «Εκτέλεση» για να δείτε τη ροή.'}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* SMS thread */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between border-b border-line-2 px-5 py-3">
                <p className="eyebrow">Το κινητό του ασθενή</p>
                <ArrowDownToLine size={13} className="text-ink-4" />
              </div>

              <div ref={phoneRef} className="flex min-h-[16rem] flex-1 flex-col gap-3 overflow-y-auto p-4">
                {messages.length === 0 && (
                  <p className="mt-auto pb-2 text-center text-[0.8125rem] text-ink-4">
                    Δεν έχει σταλείτεί ακόμη τίποτα.
                  </p>
                )}

                {messages.map((m, i) => (
                  <motion.div
                    key={`${m.text}-${i}`}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28 }}
                    className={`flex ${m.dir === 'out' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 text-[0.8125rem] leading-relaxed ${
                        m.dir === 'out'
                          ? 'bg-ink text-canvas'
                          : 'border border-line bg-surface text-ink-2'
                      }`}
                    >
                      {m.dir === 'in' && (
                        <CornerUpLeft size={11} className="mb-1 text-ink-4" strokeWidth={2.5} />
                      )}
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {step > 0 && (
                <div className="border-t border-line-2 px-4 py-3">
                  <p className="text-[0.75rem] leading-relaxed text-ink-4">
                    {scenario.steps[Math.min(step, scenario.steps.length) - 1].time} ·{' '}
                    {scenario.steps[Math.min(step, scenario.steps.length) - 1].title}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-surface px-5 py-3.5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggle}
                className="inline-flex items-center gap-2 bg-ink px-4 py-2 text-[0.8125rem] font-medium text-canvas transition-colors hover:bg-ink-2"
              >
                {finished ? (
                  <RotateCcw size={14} />
                ) : playing ? (
                  <Pause size={14} />
                ) : (
                  <Play size={14} />
                )}
                {finished ? 'Ξανά' : playing ? 'Παύση' : 'Εκτέλεση'}
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={step === 0}
                className="border border-line px-3.5 py-2 text-[0.8125rem] text-ink-2 transition-colors hover:border-ink-4 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Επαναφορά
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {scenario.steps.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => {
                    setPlaying(false)
                    setStep(i + 1)
                  }}
                  aria-label={`Βήμα ${i + 1}: ${s.title}`}
                  className={`h-1.5 w-8 transition-colors ${
                    i < step ? 'bg-primary' : 'bg-line hover:bg-ink-4'
                  }`}
                />
              ))}
            </div>

<p className={`text-[0.8125rem] ${finished ? 'text-primary' : 'text-ink-4'}`}>
              {finished
                ? 'Η ροή ολοκληρώθηκε'
                : `Βήμα ${Math.min(step + 1, scenario.steps.length)} από ${scenario.steps.length}`}
            </p>
          </div>

          <p className="border-t border-line-2 px-5 py-2.5 text-[0.75rem] text-ink-4">
            Συντομεύσεις: <kbd className="font-sans">Space</kbd> εκτέλεση/παύση ·{' '}
            <kbd className="font-sans">←</kbd> <kbd className="font-sans">→</kbd> βήμα πίσω/μπροστά ·{' '}
            <kbd className="font-sans">R</kbd> επαναφορά
          </p>
        </div>
      </div>
    </section>
  )
}

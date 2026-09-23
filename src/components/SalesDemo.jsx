import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, BarChart3, Bell, Calendar, Check, CheckCircle2,
  Clock, MessageSquare, PhoneMissed, ShieldCheck, Sparkles, Users, Workflow,
  PhoneCall, Send, UserRound
} from 'lucide-react'

const stages = [
  {
    number: '01',
    label: 'ΤΟ ΠΡΟΒΛΗΜΑ',
    title: 'Μία χαμένη κλήση μπορεί να γίνει χαμένη ευκαιρία.',
    description: 'Δεν ξεκινάμε από AI. Ξεκινάμε από το σημείο όπου η ομάδα χάνει χρόνο ή ο ασθενής μένει χωρίς απάντηση.',
    items: [
      ['Αναπάντητες κλήσεις', 'Ο ασθενής καλεί όταν η γραμματεία είναι απασχολημένη.'],
      ['Χειροκίνητα callbacks', 'Κάποιος πρέπει να θυμηθεί ποιον να καλέσει και πότε.'],
      ['Booking & αλλαγές', 'Ραντεβού, επιβεβαιώσεις και αλλαγές δημιουργούν συνεχή μικροδουλειά.'],
      ['Follow-ups', 'Μετά την επίσκεψη, πολλές επικοινωνίες μένουν για αργότερα.'],
    ],
  },
  {
    number: '02',
    label: 'Η ΑΠΑΝΤΗΣΗ',
    title: 'Το ClinicFlow μετατρέπει το χάος σε μία αυτόματη ροή.',
    description: 'Η AI αναλαμβάνει τα επαναλαμβανόμενα βήματα και αφήνει την ομάδα να παρεμβαίνει όπου πραγματικά χρειάζεται.',
    items: [
      ['01 · Κλήση', 'Η αναπάντητη κλήση ενεργοποιεί αυτόματα τη σωστή ροή.'],
      ['02 · AI / SMS', 'Ο ασθενής λαμβάνει άμεση απάντηση μέσω Voice AI ή SMS.'],
      ['03 · Booking', 'Η διαδικασία συνεχίζει προς διαθέσιμη ώρα και ημερολόγιο.'],
      ['04 · Follow-up', 'Υπενθυμίσεις και follow-ups γίνονται χωρίς χειροκίνητο κυνήγι.'],
    ],
  },
]

const liveSteps = [
  { icon: PhoneMissed, title: 'Αναπάντητη κλήση', text: 'Η κλινική δεν προλαβαίνει να απαντήσει.' },
  { icon: Bell, title: 'ClinicFlow ενεργοποιείται', text: 'Η σωστή recovery ροή ξεκινά αυτόματα.' },
  { icon: PhoneCall, title: 'Η Sophia καλεί πίσω', text: 'Η AI ρεσεψιόν συνεχίζει την επικοινωνία.' },
  { icon: Calendar, title: 'Το ραντεβού κλείνεται', text: 'Η διαθέσιμη ώρα περνά στη ροή booking.' },
]

const outcomes = [
  [Workflow, 'Λιγότερη χειροκίνητη δουλειά', 'Επαναλαμβανόμενες επικοινωνίες μπαίνουν σε αυτοματισμούς.'],
  [Calendar, 'Πιο οργανωμένο booking', 'Η διαθεσιμότητα και τα ραντεβού γίνονται μέρος της ίδιας διαδικασίας.'],
  [Users, 'Η ομάδα κρατά τον έλεγχο', 'Οι άνθρωποι παρεμβαίνουν όταν χρειάζεται — δεν αντικαθίστανται από ένα μαύρο κουτί.'],
  [BarChart3, 'Καθαρότερη εικόνα', 'Calls, bookings και follow-ups συγκεντρώνονται σε ένα σημείο.'],
]

function RecoveryResult({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mt-5 rounded-3xl border border-emerald-500/25 bg-emerald-50 p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black tracking-[0.16em] text-emerald-700">
                <CheckCircle2 size={15} /> RECOVERY COMPLETE
              </div>
              <h4 className="mt-2 text-xl font-black text-slate-950">Η χαμένη κλήση έγινε ραντεβού.</h4>
              <p className="mt-1 text-sm text-slate-600">Η ομάδα δεν χρειάστηκε να κάνει callback.</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-right shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">Παράδειγμα αξίας</p>
              <p className="mt-0.5 text-2xl font-black text-emerald-700">€95</p>
              <p className="text-[10px] text-slate-500">ενδεικτική αξία ραντεβού</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <PhoneMissed size={17} className="text-rose-500" />
              <p className="mt-2 text-xs font-black text-slate-900">Χαμένη κλήση</p>
              <p className="mt-1 text-[11px] text-slate-500">13:42 · +30 698 ***</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <Calendar size={17} className="text-emerald-600" />
              <p className="mt-2 text-xs font-black text-slate-900">Κλεισμένο ραντεβού</p>
              <p className="mt-1 text-[11px] text-slate-500">Πέμπτη · 16:00</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <Send size={17} className="text-indigo-600" />
              <p className="mt-2 text-xs font-black text-slate-900">Confirmation sent</p>
              <p className="mt-1 text-[11px] text-slate-500">SMS επιβεβαίωσης</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function SalesDemo() {
  const [stage, setStage] = useState(0)
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => () => clearInterval(timerRef.current), [])

  const runDemo = () => {
    if (running) return
    setRunning(true)
    setCompleted(0)
    let n = 0
    timerRef.current = setInterval(() => {
      n += 1
      setCompleted(n)
      if (n >= liveSteps.length) {
        clearInterval(timerRef.current)
        setRunning(false)
      }
    }, 850)
  }

  const current = stages[stage]
  const recoveryComplete = completed >= liveSteps.length

  return (
    <section id="sales-demo" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.025] to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-xs font-black tracking-wide text-primary">
            <Sparkles size={13} /> DOCTOR PITCH · 60–90 SECOND DEMO
          </span>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Δείξτε πρώτα το πρόβλημα.<br />
            <span className="gradient-text">Μετά δείξτε ότι λύνεται.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-text-muted">
            Μία σύντομη ιστορία που ένας γιατρός μπορεί να καταλάβει αμέσως — χωρίς να χρειάζεται να γνωρίζει τίποτα για AI.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl items-center justify-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm sm:gap-2">
          {stages.map((item, index) => (
            <button
              key={item.number}
              onClick={() => setStage(index)}
              className={`flex-1 rounded-xl px-2 py-3 text-xs font-black transition-all sm:px-4 ${
                stage === index ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <span className="hidden sm:inline">{item.number} · </span>{index === 0 ? 'Πρόβλημα' : 'Λύση'}
            </button>
          ))}
          <a href="#command-center" className="hidden flex-1 rounded-xl px-4 py-3 text-center text-xs font-black text-slate-600 hover:bg-slate-50 hover:text-slate-950 sm:block">
            03 · Απόδειξη
          </a>
          <a href="#pricing" className="hidden flex-1 rounded-xl px-4 py-3 text-center text-xs font-black text-slate-600 hover:bg-slate-50 hover:text-slate-950 sm:block">
            04 · Pilot
          </a>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={stage} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mt-10">
            <div className="mb-7 text-center">
              <p className="text-xs font-black tracking-[0.18em] text-primary">{current.number} · {current.label}</p>
              <h3 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">{current.title}</h3>
              <p className="mx-auto mt-3 max-w-2xl text-text-muted">{current.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {current.items.map(([title, text], index) => (
                <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-xs font-black text-primary">
                      {stage === 0 ? '!' : title.split(' · ')[0]}
                    </span>
                    <div>
                      <p className="font-black text-slate-950">{stage === 0 ? title : title.replace(/^\d+ · /, '')}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.18em] text-primary">03 · LIVE PROOF</p>
              <h3 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">«Τι γίνεται όταν χάνω μία κλήση;»</h3>
              <p className="mt-2 text-sm text-slate-600">Εδώ σταματάμε να εξηγούμε και δείχνουμε τη ροή.</p>
            </div>
            <button
              onClick={runDemo}
              disabled={running}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50"
            >
              {running ? 'Η ροή εκτελείται…' : recoveryComplete ? '↻ Ξανά το demo' : '▶ Ξεκίνα το demo'}
            </button>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-4">
            {liveSteps.map((item, index) => {
              const Icon = item.icon
              const active = completed >= index + 1
              return (
                <motion.div
                  key={item.title}
                  animate={active ? { scale: [1, 1.02, 1] } : {}}
                  className={`rounded-2xl border p-4 transition-all ${
                    active ? 'border-primary/30 bg-emerald-50' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className={`mb-4 grid h-9 w-9 place-items-center rounded-xl ${
                    active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                  }`}><Icon size={17} /></div>
                  <p className="text-sm font-black text-slate-950">{item.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.text}</p>
                  {active && <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-black text-emerald-700"><Check size={11}/> Ολοκληρώθηκε</span>}
                </motion.div>
              )
            })}
          </div>

          <RecoveryResult visible={recoveryComplete} />
        </div>

        <div className="mt-10">
          <div className="text-center">
            <p className="text-xs font-black tracking-[0.18em] text-primary">ΤΙ ΑΛΛΟ ΑΥΤΟΜΑΤΟΠΟΙΕΙΤΑΙ</p>
            <h3 className="mt-2 text-3xl font-black text-slate-950">Από το τηλέφωνο μέχρι το follow-up.</h3>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {outcomes.map(([Icon, title, text]) => (
              <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <Icon size={20} className="text-primary" />
                <p className="mt-4 font-black text-slate-950">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-black tracking-[0.18em] text-primary">04 · ΠΡΙΝ ΑΠΟ ΤΟ PILOT</p>
            <h3 className="mt-2 text-2xl font-black text-slate-950">Δεν ζητάμε να αλλάξετε όλη την κλινική σας.</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Ξεκινάμε με μία συγκεκριμένη ροή, τη συνδέουμε με το υπάρχον workflow και μετράμε τι πραγματικά συμβαίνει.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                [PhoneMissed, '1 κρίσιμη ροή', 'π.χ. αναπάντητες κλήσεις'],
                [Calendar, '1 ημερολόγιο', 'με σαφείς κανόνες booking'],
                [Users, '1 ομάδα', 'με ξεκάθαρο human handoff'],
                [BarChart3, '1 dashboard', 'για να βλέπετε τι συνέβη'],
              ].map(([Icon, title, text]) => (
                <div key={title} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Icon size={17} className="mt-0.5 shrink-0 text-primary" />
                  <div><p className="text-sm font-black text-slate-950">{title}</p><p className="mt-1 text-xs text-slate-600">{text}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-emerald-50 to-indigo-50 p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2 text-xs font-black tracking-[0.18em] text-primary"><ShieldCheck size={15}/> 05 · ΕΠΟΜΕΝΟ ΒΗΜΑ</div>
            <h3 className="mt-4 text-3xl font-black leading-tight text-slate-950">Ας το δοκιμάσουμε στην πραγματική ροή σας.</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">14 ημέρες δωρεάν. Ξεκινάμε με συγκεκριμένο scope και βλέπουμε μαζί αν το ClinicFlow ταιριάζει στην κλινική.</p>
            <div className="mt-6 space-y-3">
              {['AI receptionist & missed-call recovery', 'Online booking & ημερολόγιο', 'Υπενθυμίσεις & follow-ups', 'Dashboard για ομάδα και ιδιοκτήτη'].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-sm font-semibold text-slate-800"><CheckCircle2 size={15} className="text-primary"/>{item}</div>
              ))}
            </div>
            <a href="#pricing" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 font-black text-white transition-transform hover:-translate-y-0.5">
              Δείτε τα πακέτα <ArrowRight size={16}/>
            </a>
            <p className="mt-3 text-center text-[11px] text-slate-500">14 ημέρες δωρεάν · €350 / γιατρό / μήνα μετά τη δοκιμή · 20 SMS + 30 AI calls στη δοκιμή</p>
          </div>
        </div>
      </div>
    </section>
  )
}

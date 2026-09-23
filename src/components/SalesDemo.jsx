import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, BarChart3, Bell, Calendar, Check, CheckCircle2, Clock,
  Phone, PhoneMissed, ShieldCheck, Sparkles, TrendingUp, UserRound, X
} from 'lucide-react'

const steps = [
  { icon: PhoneMissed, title: 'Αναπάντητη κλήση', text: 'Ο ασθενής καλεί ενώ η γραμματεία είναι απασχολημένη.' },
  { icon: Bell, title: 'Αυτόματη ανάκτηση', text: 'Το ClinicFlow ενεργοποιεί AI callback και SMS fallback.' },
  { icon: Calendar, title: 'Ραντεβού', text: 'Η AI βοηθά τον ασθενή να βρει διαθέσιμη ώρα.' },
  { icon: BarChart3, title: 'Αποτέλεσμα', text: 'Η ομάδα βλέπει τι ανακτήθηκε και τι χρειάζεται follow-up.' },
]

const beforeItems = [
  ['Αναπάντητες κλήσεις', 'Μένουν για callback όταν βρεθεί χρόνος'],
  ['Ραντεβού', 'Χειροκίνητα τηλεφωνήματα και μηνύματα'],
  ['Follow-ups', 'Εξαρτώνται από τη μνήμη της ομάδας'],
  ['Εικόνα ιδιοκτήτη', 'Δύσκολο να ξέρει πόσες ευκαιρίες χάθηκαν'],
]

const afterItems = [
  ['Αναπάντητες κλήσεις', 'Αυτόματη ροή ανάκτησης'],
  ['Ραντεβού', 'AI + online booking με διαθεσιμότητα'],
  ['Follow-ups', 'Αυτοματοποιημένες υπενθυμίσεις και εργασίες'],
  ['Εικόνα ιδιοκτήτη', 'Ένα dashboard για calls, bookings και recovery'],
]

function ComparisonCard({ after }) {
  const items = after ? afterItems : beforeItems
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl border p-6 sm:p-8 ${after ? 'border-primary/30 bg-primary/[0.06]' : 'border-white/10 bg-white/[0.025]'}`}
    >
      <div className="flex items-center justify-between mb-7">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted mb-2">{after ? 'Με ClinicFlow' : 'Χωρίς ClinicFlow'}</p>
          <h3 className="text-2xl font-black">{after ? 'Η ροή δουλεύει μόνη της' : 'Η ομάδα κυνηγάει χαμένες ευκαιρίες'}</h3>
        </div>
        {after ? <CheckCircle2 className="text-primary" size={28} /> : <X className="text-white/30" size={28} />}
      </div>
      <div className="space-y-4">
        {items.map(([label, value]) => (
          <div key={label} className="flex gap-3 border-t border-white/[0.06] pt-4">
            {after ? <Check size={16} className="mt-0.5 text-primary shrink-0" /> : <Clock size={16} className="mt-0.5 text-white/30 shrink-0" />}
            <div>
              <p className="text-sm font-bold">{label}</p>
              <p className="text-sm text-text-muted mt-1">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function SalesDemo() {
  const [mode, setMode] = useState('after')
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(0)
  const [missed, setMissed] = useState(20)
  const [value, setValue] = useState(85)
  const recoveryRate = 0.25
  const recovered = Math.round(missed * recoveryRate)
  const monthlyValue = recovered * value * 4.33

  const runDemo = () => {
    setRunning(true)
    setCompleted(0)
    let n = 0
    const timer = setInterval(() => {
      n += 1
      setCompleted(n)
      if (n >= 4) {
        clearInterval(timer)
        setRunning(false)
      }
    }, 700)
  }

  const headline = useMemo(() => mode === 'before'
    ? 'Δείτε τι συμβαίνει όταν μια κλήση χάνεται.'
    : 'Τώρα δείτε τι αλλάζει όταν η κλινική έχει ClinicFlow.', [mode])

  return (
    <section id="sales-demo" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.025] to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-xs font-bold text-primary mb-5">
            <Sparkles size={13} /> DOCTOR DEMO · 3–5 MINUTES
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-balance">
            Από τη <span className="gradient-text">χαμένη κλήση</span> στο αποτέλεσμα.
          </h2>
          <p className="mt-5 text-lg text-text-muted leading-relaxed">
            Ένα demo σχεδιασμένο για να το δείχνεις στον γιατρό μπροστά του — πρόβλημα, λύση, πραγματική ροή και οικονομική λογική.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
            <button onClick={() => setMode('before')} className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${mode === 'before' ? 'bg-white/10 text-white' : 'text-text-muted'}`}>Χωρίς ClinicFlow</button>
            <button onClick={() => setMode('after')} className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${mode === 'after' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted'}`}>Με ClinicFlow</button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="mb-8 text-center">
              <p className="text-2xl sm:text-3xl font-black">{headline}</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
              <ComparisonCard after={false} />
              <ComparisonCard after />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary font-bold mb-2">Live recovery simulation</p>
              <h3 className="text-2xl font-black">Δείξε το σε πραγματικό χρόνο</h3>
              <p className="text-sm text-text-muted mt-2">Πατάς ένα κουμπί και ο γιατρός βλέπει την ιστορία από call → AI → booking → αποτέλεσμα.</p>
            </div>
            <button onClick={runDemo} disabled={running} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-dark px-5 py-3 text-sm font-black disabled:opacity-50">
              {running ? 'Εκτελείται…' : '▶ Ξεκίνα το demo'}
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-3">
            {steps.map((step, i) => {
              const active = completed >= i + 1
              const Icon = step.icon
              return (
                <motion.div key={step.title} animate={active ? { scale: [1, 1.02, 1] } : {}} className={`rounded-2xl border p-4 transition-colors ${active ? 'border-primary/40 bg-primary/[0.08]' : 'border-white/[0.07] bg-white/[0.02]'}`}>
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center mb-4 ${active ? 'bg-primary/20 text-primary' : 'bg-white/5 text-text-muted'}`}><Icon size={17} /></div>
                  <p className="font-bold text-sm">{step.title}</p>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed">{step.text}</p>
                  {active && <span className="inline-flex items-center gap-1 text-[10px] text-primary font-bold mt-3"><Check size={11}/> Ολοκληρώθηκε</span>}
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-2xl bg-accent/15 flex items-center justify-center text-accent shrink-0"><TrendingUp size={20}/></div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Illustrative ROI calculator</p>
                <h3 className="text-2xl font-black mt-1">Πόσο αξίζει μια χαμένη κλήση;</h3>
                <p className="text-sm text-text-muted mt-2">Χρησιμοποίησε τα δικά του νούμερα. Δεν είναι πρόβλεψη εσόδων — είναι απλό σενάριο για τη συζήτηση.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              <label className="block">
                <span className="text-xs font-bold text-text-muted">Αναπάντητες / εβδομάδα: {missed}</span>
                <input type="range" min="5" max="80" value={missed} onChange={e => setMissed(Number(e.target.value))} className="w-full mt-3 accent-emerald-400"/>
              </label>
              <label className="block">
                <span className="text-xs font-bold text-text-muted">Μέση αξία ραντεβού: €{value}</span>
                <input type="range" min="30" max="300" step="5" value={value} onChange={e => setValue(Number(e.target.value))} className="w-full mt-3 accent-indigo-400"/>
              </label>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/[0.04] p-4"><p className="text-xs text-text-muted">Σενάριο ανάκτησης</p><p className="text-2xl font-black mt-1">{recovered}</p><p className="text-[11px] text-text-muted">/ εβδομάδα</p></div>
              <div className="rounded-2xl bg-white/[0.04] p-4"><p className="text-xs text-text-muted">Αξία / εβδομάδα</p><p className="text-2xl font-black mt-1">€{(recovered * value).toLocaleString()}</p><p className="text-[11px] text-text-muted">illustrative</p></div>
              <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4"><p className="text-xs text-primary">Μηνιαίο σενάριο</p><p className="text-2xl font-black mt-1 text-primary">€{Math.round(monthlyValue).toLocaleString()}</p><p className="text-[11px] text-text-muted">με 4.33 εβδομάδες</p></div>
            </div>
          </div>

          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.09] to-accent/[0.07] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.18em]"><ShieldCheck size={15}/> The close</div>
            <h3 className="text-3xl font-black mt-4 leading-tight">Μην αγοράσετε «AI».<br/>Δοκιμάστε τη ροή.</h3>
            <p className="text-sm text-text-muted leading-relaxed mt-4">
              Το σωστό επόμενο βήμα είναι ένα ελεγχόμενο pilot με τη δική σας κλινική, τα δικά σας ωράρια και πραγματικό workflow.
            </p>
            <div className="space-y-3 mt-7">
              {['AI receptionist για χαμένες κλήσεις', 'Online booking & ημερολόγιο', 'Υπενθυμίσεις και follow-ups', 'Dashboard για την ομάδα και τον ιδιοκτήτη'].map(x => (
                <div key={x} className="flex items-center gap-2.5 text-sm"><CheckCircle2 size={15} className="text-primary"/><span>{x}</span></div>
              ))}
            </div>
            <a href="#pricing" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white text-dark px-5 py-4 font-black hover:translate-y-[-1px] transition-transform">
              Δείτε το pilot <ArrowRight size={16}/>
            </a>
            <p className="text-[11px] text-text-muted text-center mt-3">14 ημέρες δοκιμή · χωρίς να αλλάξεις όλο το workflow από την πρώτη μέρα</p>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center">
          {[
            [UserRound, 'Για τον γιατρό', 'Λιγότερες χαμένες ευκαιρίες και καθαρή εικόνα.'],
            [Phone, 'Για τη γραμματεία', 'Η AI αναλαμβάνει επαναλαμβανόμενες επικοινωνίες.'],
            [Calendar, 'Για τον ασθενή', 'Άμεση απάντηση και εύκολο κλείσιμο ραντεβού.'],
          ].map(([Icon, title, text]) => (
            <div key={title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <Icon size={18} className="mx-auto text-primary mb-3"/>
              <p className="font-bold">{title}</p>
              <p className="text-xs text-text-muted mt-1.5 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

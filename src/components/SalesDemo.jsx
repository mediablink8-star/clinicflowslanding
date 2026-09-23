import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, BarChart3, Bell, Calendar, Check, CheckCircle2, Clock, Phone, PhoneMissed, ShieldCheck, Sparkles, MessageSquare, Users, Workflow } from 'lucide-react'

const steps = [
  { icon: PhoneMissed, title: 'Η κλήση χάνεται', text: 'Ο ασθενής καλεί ενώ η γραμματεία μιλάει με άλλον ασθενή.' },
  { icon: Bell, title: 'ClinicFlow αντιδρά', text: 'Η AI callback/SMS ροή ξεκινά αυτόματα — χωρίς να κυνηγάει κανείς τη λίστα.' },
  { icon: MessageSquare, title: 'Ο ασθενής απαντά', text: 'Παίρνει άμεση βοήθεια και μπορεί να συνεχίσει τη διαδικασία.' },
  { icon: Calendar, title: 'Το ραντεβού προχωρά', text: 'Η διαθέσιμη ώρα περνά στο ημερολόγιο και η ομάδα βλέπει το αποτέλεσμα.' },
]

const beforeItems = [
  ['Αναπάντητη κλήση', 'Ο ασθενής περιμένει να τον πάρει κάποιος πίσω.'],
  ['Γραμματεία', 'Κρατά σημειώσεις, callbacks και follow-ups μέσα στη μέρα.'],
  ['Ραντεβού', 'Πολλές μικρές εργασίες γίνονται χειροκίνητα.'],
  ['Ιδιοκτήτης', 'Δεν έχει πάντα καθαρή εικόνα για το τι χάθηκε.'],
]

const afterItems = [
  ['Αναπάντητη κλήση', 'Ενεργοποιείται αυτόματη ροή ανάκτησης.'],
  ['Γραμματεία', 'Η AI αναλαμβάνει επαναλαμβανόμενη επικοινωνία.'],
  ['Ραντεβού', 'Booking και ημερολόγιο συνδέονται στη ροή.'],
  ['Ιδιοκτήτης', 'Βλέπει calls, bookings και follow-ups σε ένα dashboard.'],
]

function ComparisonCard({ after }) {
  const items = after ? afterItems : beforeItems
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl border p-6 sm:p-8 ${after ? 'border-primary/30 bg-primary/[0.06]' : 'border-white/10 bg-white/[0.025]'}`}>
      <div className="flex items-center justify-between mb-7">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted mb-2">{after ? 'ΜΕ CLINICFLOW' : 'ΧΩΡΙΣ CLINICFLOW'}</p>
          <h3 className="text-2xl font-black">{after ? 'Η ομάδα δουλεύει με σύστημα' : 'Η ομάδα διαχειρίζεται κάθε περίπτωση χειροκίνητα'}</h3>
        </div>
        {after ? <CheckCircle2 className="text-primary" size={28} /> : <Clock className="text-white/30" size={28} />}
      </div>
      <div className="space-y-4">
        {items.map(([label, value]) => <div key={label} className="flex gap-3 border-t border-white/[0.06] pt-4"><div className={`mt-0.5 shrink-0 ${after ? 'text-primary' : 'text-white/30'}`}>{after ? <Check size={16}/> : <Clock size={16}/>}</div><div><p className="text-sm font-bold">{label}</p><p className="text-sm text-text-muted mt-1">{value}</p></div></div>)}
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
  const [recoveryRate, setRecoveryRate] = useState(25)
  const recovered = Math.round(missed * recoveryRate / 100)
  const monthlyValue = recovered * value * 4.33

  const runDemo = () => {
    setRunning(true); setCompleted(0)
    let n = 0
    const timer = setInterval(() => { n += 1; setCompleted(n); if (n >= 4) { clearInterval(timer); setRunning(false) } }, 750)
  }

  const headline = useMemo(() => mode === 'before' ? 'Πρώτα, ας δούμε το πρόβλημα χωρίς να το ωραιοποιήσουμε.' : 'Τώρα ας δούμε τι μπορεί να αυτοματοποιηθεί.', [mode])

  return (
    <section id="sales-demo" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.025] to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-xs font-bold text-primary mb-5"><Sparkles size={13}/> DOCTOR PITCH · 3–5 MINUTES</div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-balance">Δεν πουλάμε <span className="gradient-text">AI</span>.<br className="sm:hidden"/> Δείχνουμε τι αλλάζει στην κλινική.</h2>
          <p className="mt-5 text-lg text-text-muted leading-relaxed">Ξεκίνα από μία πραγματική καθημερινή απώλεια, δείξε τη ροή live και μετά βάλε τα δικά σας νούμερα.</p>
        </div>

        <div className="flex justify-center mb-10"><div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
          <button onClick={() => setMode('before')} className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${mode === 'before' ? 'bg-white/10 text-white' : 'text-text-muted'}`}>1 · Το πρόβλημα</button>
          <button onClick={() => setMode('after')} className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${mode === 'after' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted'}`}>2 · Η ροή</button>
        </div></div>

        <AnimatePresence mode="wait"><motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          <div className="mb-8 text-center"><p className="text-2xl sm:text-3xl font-black">{headline}</p></div>
          <div className="grid lg:grid-cols-2 gap-5"><ComparisonCard after={false}/><ComparisonCard after/></div>
        </motion.div></AnimatePresence>

        <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
            <div><p className="text-xs uppercase tracking-[0.18em] text-primary font-bold mb-2">3 · LIVE SIMULATION</p><h3 className="text-2xl font-black">«Μία χαμένη κλήση. Δείξτε μου τι γίνεται.»</h3><p className="text-sm text-text-muted mt-2">Αυτό είναι το σημείο του pitch όπου σταματάς να εξηγείς και απλώς πατάς το κουμπί.</p></div>
            <button onClick={runDemo} disabled={running} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-dark px-5 py-3 text-sm font-black disabled:opacity-50">{running ? 'Εκτελείται…' : '▶ Ξεκίνα τη ροή'}</button>
          </div>
          <div className="grid md:grid-cols-4 gap-3">{steps.map((step, i) => { const active = completed >= i + 1; const Icon = step.icon; return <motion.div key={step.title} animate={active ? { scale: [1, 1.02, 1] } : {}} className={`rounded-2xl border p-4 transition-colors ${active ? 'border-primary/40 bg-primary/[0.08]' : 'border-white/[0.07] bg-white/[0.02]'}`}>
            <div className={`h-9 w-9 rounded-xl flex items-center justify-center mb-4 ${active ? 'bg-primary/20 text-primary' : 'bg-white/5 text-text-muted'}`}><Icon size={17}/></div><p className="font-bold text-sm">{step.title}</p><p className="text-xs text-text-muted mt-2 leading-relaxed">{step.text}</p>{active && <span className="inline-flex items-center gap-1 text-[10px] text-primary font-bold mt-3"><Check size={11}/> Ολοκληρώθηκε</span>}
          </motion.div> })}</div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
          <div className="flex items-start gap-4"><div className="h-11 w-11 rounded-2xl bg-accent/15 flex items-center justify-center text-accent shrink-0"><BarChart3 size={20}/></div><div><p className="text-xs uppercase tracking-[0.18em] text-text-muted">4 · ΒΑΛΕ ΤΑ ΔΙΚΑ ΣΑΣ ΝΟΥΜΕΡΑ</p><h3 className="text-2xl font-black mt-1">«Πόσες κλήσεις χάνετε; Πόσο αξίζει ένα ραντεβού;»</h3><p className="text-sm text-text-muted mt-2">Το αποτέλεσμα είναι ένα illustrative scenario — όχι υπόσχεση εσόδων.</p></div></div>
          <div className="grid lg:grid-cols-3 gap-5 mt-8">
            <label className="block"><span className="text-xs font-bold text-text-muted">Αναπάντητες / εβδομάδα: {missed}</span><input type="range" min="5" max="80" value={missed} onChange={e => setMissed(Number(e.target.value))} className="w-full mt-3 accent-emerald-400"/></label>
            <label className="block"><span className="text-xs font-bold text-text-muted">Μέση αξία ραντεβού: €{value}</span><input type="range" min="30" max="300" step="5" value={value} onChange={e => setValue(Number(e.target.value))} className="w-full mt-3 accent-indigo-400"/></label>
            <label className="block"><span className="text-xs font-bold text-text-muted">Υποθετική ανάκτηση: {recoveryRate}%</span><input type="range" min="5" max="50" step="5" value={recoveryRate} onChange={e => setRecoveryRate(Number(e.target.value))} className="w-full mt-3 accent-emerald-400"/></label>
          </div>
          <div className="mt-7 grid sm:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/[0.04] p-4"><p className="text-xs text-text-muted">Σενάριο ανάκτησης</p><p className="text-2xl font-black mt-1">{recovered}</p><p className="text-[11px] text-text-muted">ραντεβού / εβδομάδα</p></div>
            <div className="rounded-2xl bg-white/[0.04] p-4"><p className="text-xs text-text-muted">Illustrative / εβδομάδα</p><p className="text-2xl font-black mt-1">€{(recovered * value).toLocaleString()}</p><p className="text-[11px] text-text-muted">δυνητική αξία</p></div>
            <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4"><p className="text-xs text-primary">Illustrative / μήνα</p><p className="text-2xl font-black mt-1 text-primary">€{Math.round(monthlyValue).toLocaleString()}</p><p className="text-[11px] text-text-muted">4.33 εβδομάδες</p></div>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1.05fr_.95fr] gap-5">
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8"><p className="text-xs uppercase tracking-[0.18em] text-primary font-bold">5 · ΤΙ ΘΑ ΕΛΕΓΧΑ ΠΡΙΝ ΑΠΟ ΑΓΟΡΑ</p><h3 className="text-2xl font-black mt-2">Ας το δοκιμάσουμε πάνω στο δικό σας workflow.</h3>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">{[
              [Phone, 'Πραγματικές κλήσεις', 'Τι γίνεται όταν δεν προλαβαίνει η γραμματεία?'],
              [Calendar, 'Πραγματικό ημερολόγιο', 'Πώς αποφεύγουμε διπλοκρατήσεις?'],
              [Workflow, 'Πραγματικά follow-ups', 'Τι μπορεί να αυτοματοποιηθεί με ασφάλεια?'],
              [Users, 'Πραγματική ομάδα', 'Ποιος βλέπει τι και ποιος παρεμβαίνει?'],
            ].map(([Icon,title,text]) => <div key={title} className="rounded-2xl border border-white/[0.06] bg-black/10 p-4"><Icon size={17} className="text-primary mb-3"/><p className="font-bold text-sm">{title}</p><p className="text-xs text-text-muted mt-1 leading-relaxed">{text}</p></div>)}</div>
          </div>
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.09] to-accent/[0.07] p-6 sm:p-8"><div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.18em]"><ShieldCheck size={15}/> 6 · THE CLOSE</div><h3 className="text-3xl font-black mt-4 leading-tight">Δεν χρειάζεται να το πιστέψετε.<br/>Ας το μετρήσουμε.</h3><p className="text-sm text-text-muted leading-relaxed mt-4">Προτείνω ένα μικρό pilot στη δική σας κλινική. Με πραγματικό workflow, σαφές scope και μετρήσιμα αποτελέσματα.</p>
            <div className="space-y-3 mt-7">{['AI receptionist για επιλεγμένες ροές','Online booking & ημερολόγιο','Υπενθυμίσεις και follow-ups','Dashboard για την ομάδα και τον ιδιοκτήτη'].map(x => <div key={x} className="flex items-center gap-2.5 text-sm"><CheckCircle2 size={15} className="text-primary"/><span>{x}</span></div>)}</div>
            <a href="#pricing" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white text-dark px-5 py-4 font-black hover:translate-y-[-1px] transition-transform">Δείτε το pilot <ArrowRight size={16}/></a>
            <p className="text-[11px] text-text-muted text-center mt-3">14 ημέρες δωρεάν · €350 / γιατρό / μήνα μετά τη δοκιμή · 20 SMS + 30 AI calls στη δοκιμή</p>
          </div>
        </div>
      </div>
    </section>
  )
}
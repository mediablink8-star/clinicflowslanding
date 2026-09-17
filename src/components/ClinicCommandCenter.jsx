import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, CalendarCheck2, CheckCircle2, Clock3, HeartPulse, MessageCircleHeart, PhoneCall, Sparkles, UserRoundCheck } from 'lucide-react'

const events = [
  { time: '08:42', icon: PhoneCall, title: 'Αναπάντητη κλήση ανακτήθηκε', detail: 'Η Sophia κάλεσε την Άννα Κ. σε 12″', color: 'text-primary', bg: 'bg-primary/15' },
  { time: '08:47', icon: CalendarCheck2, title: 'Νέο ραντεβού επιβεβαιώθηκε', detail: 'Οδοντιατρικός καθαρισμός · Πέμπτη 11:30', color: 'text-accent-light', bg: 'bg-accent/15' },
  { time: '09:03', icon: MessageCircleHeart, title: 'Follow-up στάλθηκε', detail: 'Μετά την επίσκεψη της Ελένης Π.', color: 'text-amber-400', bg: 'bg-amber/15' },
]

function Metric({ value, label, accent }) {
  return <div className="rounded-2xl border border-white/[.07] bg-white/[.035] p-4"><p className={`text-xl font-black ${accent}`}>{value}</p><p className="mt-1 text-[11px] font-semibold leading-snug text-text-muted">{label}</p></div>
}

export default function ClinicCommandCenter() {
  const [mode, setMode] = useState('today')
  const [eventIndex, setEventIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setEventIndex(i => (i + 1) % events.length), 3600)
    return () => clearInterval(timer)
  }, [])

  const active = events[eventIndex]
  return (
    <section id="command-center" className="relative overflow-hidden bg-dark py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(99,102,241,.14),transparent_28%),radial-gradient(circle_at_88%_75%,rgba(16,185,129,.14),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent-light"><Sparkles size={13} /> Η εικόνα που θα έπρεπε να έχετε κάθε πρωί</span>
          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl text-balance">Η κλινική σας, <span className="gradient-text">ένα βήμα μπροστά.</span></h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">Όχι άλλο κυνήγι τηλεφωνημάτων και υποθέσεων. Δείτε τι συμβαίνει, τι χρειάζεται προσοχή και πού κερδίζετε χρόνο — σε μία ήρεμη οθόνη.</p>
        </div>

        <div className="relative mx-auto mt-14 max-w-6xl rounded-[28px] border border-white/[.1] bg-[#0c0d22]/90 p-3 shadow-[0_40px_100px_rgba(0,0,0,.45)] sm:p-5">
          <div className="absolute -inset-px -z-10 rounded-[29px] bg-gradient-to-r from-primary/20 via-accent/35 to-primary/20 blur-xl" />
          <div className="flex items-center justify-between border-b border-white/[.07] px-2 pb-4 sm:px-3">
            <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent"><HeartPulse size={18} /></div><div><p className="text-sm font-black">Κλινική Αθηνών</p><p className="text-[10px] font-semibold text-primary">● Όλα λειτουργούν ομαλά</p></div></div>
            <div className="flex rounded-xl border border-white/[.07] bg-white/[.035] p-1">{[['today','Σήμερα'],['week','Αυτή η εβδομάδα']].map(([key,label])=><button key={key} onClick={() => setMode(key)} className={`rounded-lg px-2.5 py-1.5 text-[10px] font-bold transition-all sm:px-3 ${mode===key?'bg-white/10 text-white shadow':'text-text-muted hover:text-white'}`}>{label}</button>)}</div>
          </div>

          <div className="grid gap-4 pt-4 lg:grid-cols-[1.05fr_.95fr]">
            <div className="rounded-2xl border border-white/[.07] bg-gradient-to-b from-white/[.045] to-transparent p-5">
              <div className="flex items-start justify-between"><div><p className="text-xs font-bold text-text-muted">ΚΑΛΗΜΕΡΑ, ΔΡ. ΜΑΡΙΑ</p><h3 className="mt-1 text-2xl font-black">Η ημέρα σας είναι <span className="text-primary">σε ροή.</span></h3></div><span className="hidden rounded-xl bg-primary/10 px-3 py-2 text-xs font-bold text-primary sm:block">Τρίτη · 17 Σεπ</span></div>
              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                <Metric value={mode==='today' ? '12' : '68'} label={mode==='today' ? 'ραντεβού σήμερα' : 'ραντεβού αυτή την εβδομάδα'} accent="text-white" />
                <Metric value={mode==='today' ? '3' : '14'} label="αιτήματα που η Sophia ανέλαβε" accent="text-primary" />
                <Metric value="0" label="ασθενείς χωρίς απάντηση" accent="text-accent-light" />
              </div>
              <div className="mt-5 rounded-2xl border border-primary/15 bg-primary/[.055] p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-primary"><Activity size={14} /> Ζωντανή φροντίδα ασθενών</div>
                <AnimatePresence mode="wait"><motion.div key={active.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .24 }} className="mt-3 flex items-center gap-3"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${active.bg} ${active.color}`}><active.icon size={17} /></span><div><p className="text-sm font-bold text-white">{active.title}</p><p className="text-xs text-text-muted">{active.detail}</p></div><span className="ml-auto text-[10px] font-mono text-text-muted">{active.time}</span></motion.div></AnimatePresence>
                <div className="mt-3 flex gap-1.5">{events.map((_,i)=><button key={i} aria-label={`Εκδήλωση ${i+1}`} onClick={()=>setEventIndex(i)} className={`h-1.5 rounded-full transition-all ${i===eventIndex?'w-6 bg-primary':'w-1.5 bg-white/15'}`} />)}</div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[.07] bg-black/20 p-5">
              <div className="flex items-center justify-between"><div><p className="text-xs font-bold text-text-muted">ΤΟ ΕΠΟΜΕΝΟ ΡΑΝΤΕΒΟΥ</p><h3 className="mt-1 text-lg font-black">Ελένη Παπαδοπούλου</h3></div><span className="rounded-lg bg-accent/15 px-2 py-1 text-xs font-black text-accent-light">10:30</span></div>
              <div className="mt-4 flex gap-3 rounded-xl border border-white/[.06] bg-white/[.025] p-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose-300 to-amber-200 text-xs font-black text-dark">ΕΠ</div><div><p className="text-xs font-bold">Προληπτικός έλεγχος</p><p className="mt-1 text-[11px] text-text-muted">Οι οδηγίες επίσκεψης στάλθηκαν · Επιβεβαιώθηκε</p></div><CheckCircle2 size={17} className="ml-auto shrink-0 text-primary" /></div>
              <div className="mt-4"><p className="text-[10px] font-black tracking-wider text-text-muted">ΤΙ ΚΑΝΕΙ ΤΟ CLINICFLOW ΓΙΑ ΕΣΑΣ</p><div className="mt-3 space-y-3">{[['1','Επιβεβαιώνει το ραντεβού'],['2','Ενημερώνει την ομάδα'],['3','Φροντίζει το follow-up']].map(([n,text],i)=><div key={n} className="flex items-center gap-3"><span className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-black ${i===0?'bg-primary text-dark':'bg-white/[.07] text-text-muted'}`}>{n}</span><span className={`text-xs font-semibold ${i===0?'text-white':'text-text-muted'}`}>{text}</span><span className={`ml-auto h-1.5 w-1.5 rounded-full ${i===0?'bg-primary animate-pulse':'bg-white/20'}`} /></div>)}</div></div>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-xl border border-white/[.06] bg-white/[.025] px-4 py-3 sm:flex-row"><p className="flex items-center gap-2 text-xs text-text-muted"><Clock3 size={14} className="text-primary" /> Το ClinicFlow κερδίζει χρόνο για την ομάδα σας — ώστε να τον επιστρέφετε στους ασθενείς.</p><span className="flex items-center gap-1.5 text-xs font-bold text-white"><UserRoundCheck size={14} className="text-primary" /> Έτοιμο για δράση</span></div>
        </div>
      </div>
    </section>
  )
}

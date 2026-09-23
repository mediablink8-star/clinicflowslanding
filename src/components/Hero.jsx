import { motion } from 'framer-motion'
import { ArrowRight, Calendar, CheckCircle2, Clock3, MessageSquare, Phone, ShieldCheck, Users, Bot } from 'lucide-react'

const flow = [
  { icon: Phone, label: 'Αναπάντητη κλήση', value: '13:42', tone: 'rose' },
  { icon: Bot, label: 'AI callback', value: 'Αυτόματα', tone: 'indigo' },
  { icon: Calendar, label: 'Ραντεβού', value: 'Πέμπτη · 16:00', tone: 'emerald' },
]

const toneClasses = {
  rose: 'bg-rose-50 text-rose-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  emerald: 'bg-emerald-50 text-emerald-600',
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute left-1/2 top-20 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.045] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold tracking-wide text-slate-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            AI automation για ιατρεία και κλινικές
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}
            className="text-balance text-5xl font-black leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
            Κάθε ασθενής που επικοινωνεί
            <br className="hidden sm:block" />
            <span className="gradient-text"> πρέπει να παίρνει απάντηση.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Το ClinicFlow αυτοματοποιεί την επικοινωνία της κλινικής σας — από την αναπάντητη κλήση και το booking μέχρι τα SMS, τις υπενθυμίσεις και τα follow-ups.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#sales-demo" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800 sm:w-auto">
              Δείτε πώς λειτουργεί <ArrowRight size={16} />
            </a>
            <a href="#pricing" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 sm:w-auto">
              Δείτε την τιμολόγηση
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-600" />14 ημέρες δωρεάν</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-600" />Με έμφαση στην ασφάλεια</span>
            <span className="flex items-center gap-1.5"><Users size={14} className="text-emerald-600" />Για ομάδες και ιδιοκτήτες κλινικών</span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.42 }}
          className="mx-auto mt-16 max-w-5xl">
          <div className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_25px_70px_rgba(15,23,42,0.10)] sm:p-4">
            <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">ClinicFlow · Live workflow</p>
                  <h2 className="mt-2 text-xl font-black text-slate-950 sm:text-2xl">Μία χαμένη κλήση. Μία αυτόματη ροή.</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                    Το σύστημα εντοπίζει την αναπάντητη κλήση, ενεργοποιεί την κατάλληλη επικοινωνία και συνεχίζει προς το booking.
                  </p>
                </div>
                <div className="hidden h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 sm:grid"><Bot size={22} /></div>
              </div>

              <div className="mt-7 grid gap-3 md:grid-cols-3">
                {flow.map(({ icon: Icon, label, value, tone }, index) => (
                  <div key={label} className="relative rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className={"grid h-9 w-9 place-items-center rounded-xl " + toneClasses[tone]}><Icon size={17} /></div>
                      {index < flow.length - 1 && <ArrowRight className="hidden text-slate-300 md:block" size={16} />}
                    </div>
                    <p className="mt-4 text-sm font-black text-slate-950">{label}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      {index === 1 ? <Clock3 size={12} /> : <MessageSquare size={12} />}
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                  <CheckCircle2 size={17} className="text-emerald-600" />
                  Ο ασθενής έλαβε επιβεβαίωση.
                </div>
                <span className="text-xs font-semibold text-emerald-700">Η ομάδα ενημερώνεται αυτόματα</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

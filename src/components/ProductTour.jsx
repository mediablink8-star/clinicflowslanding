import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity, Phone, MessageSquare, Brain, Calendar,
  TrendingUp, Sparkles, PhoneCall, Mic, Send, CheckCircle2,
  ArrowRight, User, Clock, ChevronRight, Zap, Bot, Search,
  Stethoscope, ChevronLeft, Bell, ChevronDown, ArrowUpRight,
  X, Plus, Check, Loader2, MessageCircle, Inbox
} from 'lucide-react'

const tours = [
  {
    id: 'recovery',
    label: 'Recovery Feed',
    short: 'Recovery',
    icon: Activity,
    color: '#10b981',
    description: 'Παρακολούθησε real-time κάθε αναπάντητη κλήση μέχρι να γίνει ραντεβού — με μετρήσιμα έσοδα.',
  },
  {
    id: 'voice',
    label: 'AI Voice Call',
    short: 'Voice',
    icon: PhoneCall,
    color: '#6366f1',
    description: 'Δες πώς η Sophia μιλάει σε έναν ασθενή σε φυσική ελληνική γλώσσα και κλείνει ραντεβού.',
  },
  {
    id: 'sophia',
    label: 'AI Sophia',
    short: 'Sophia',
    icon: Brain,
    color: '#8b5cf6',
    description: 'Ο προσωπικός AI βοηθός. Γράψε ή μίλα — εκτελεί εντολές και απαντάει σε ερωτήσεις.',
  },
  {
    id: 'booking',
    label: 'Patient Booking',
    short: 'Booking',
    icon: Calendar,
    color: '#f59e0b',
    description: 'Public booking page που οι ασθενείς σου λατρεύουν — branded, mobile-first, 30s completion.',
  },
]

function RecoveryView() {
  const recoveryCases = [
    { name: 'Ελένη Αποστόλου', phone: '+30 698 *** 4567', type: 'Αναπάντητη κλήση', status: 'recovered', duration: '1:24', time: '13:28', revenue: '€85' },
    { name: 'Γιάννης Κώστας', phone: '+30 694 *** 0987', type: 'SMS ανάκτηση', status: 'recovered', duration: '0:58', time: '12:22', revenue: '€120' },
    { name: 'Σοφία Αλεξάνδρου', phone: '+30 690 *** 5678', type: 'Follow-up', status: 'recovered', duration: '2:05', time: '11:15', revenue: '€95' },
    { name: 'Άννα Χριστοδούλου', phone: '+30 693 *** 3210', type: 'Νέο ραντεβού', status: 'booked', duration: '3:47', time: '12:45', revenue: '€150' },
    { name: 'Μαρία Παπαδοπούλου', phone: '+30 695 *** 7890', type: 'Επιβεβαίωση', status: 'confirmed', duration: '2:12', time: '12:00', revenue: '€80' },
    { name: 'Νίκος Βασιλείου', phone: '+30 697 *** 6543', type: 'Αναμονή', status: 'pending', duration: '—', time: '13:15', revenue: '—' },
  ]

  const statusStyles = {
    recovered: { bg: 'rgba(16,185,129,0.12)', color: '#10b981', label: 'Ανακτήθηκε' },
    booked: { bg: 'rgba(99,102,241,0.12)', color: '#6366f1', label: 'Κλεισμένο' },
    confirmed: { bg: 'rgba(139,92,246,0.12)', color: '#8b5cf6', label: 'Επιβεβ.' },
    pending: { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', label: 'Εκκρεμεί' },
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#fafbff] to-[#f1f3f9] text-[#0f172a] h-full">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200/60 bg-white/60 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="ml-3 text-[11px] font-semibold text-slate-700">ClinicFlow — Recovery Feed</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE
          </span>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-[10px] font-bold text-white">ΔΓ</div>
        </div>
      </div>

      <div className="p-5 grid grid-cols-3 gap-3">
        <div className="col-span-2 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 p-4 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp size={11} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Έσοδα από AI (μήνας)</span>
          </div>
          <div className="text-3xl font-black tracking-tight">€3,420</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] font-bold bg-white/15 px-2 py-0.5 rounded">+€640</span>
            <span className="text-[10px] text-white/80">vs προηγ. μήνα</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="rounded-xl bg-white p-3 border border-slate-200/60">
            <div className="text-[9px] font-bold text-slate-500 uppercase">Ανάκτηση</div>
            <div className="text-xl font-black text-emerald-600">94%</div>
          </div>
          <div className="rounded-xl bg-white p-3 border border-slate-200/60">
            <div className="text-[9px] font-bold text-slate-500 uppercase">Ασθενείς</div>
            <div className="text-xl font-black">28</div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="rounded-2xl bg-white border border-slate-200/60 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-slate-200/60 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Live Activity</span>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <Search size={10} />
              Αναζήτηση
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {recoveryCases.map((c, i) => {
              const s = statusStyles[c.status]
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50/60"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                    <PhoneCall size={13} style={{ color: s.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold text-slate-900">{c.name}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                    </div>
                    <div className="text-[10px] text-slate-500">{c.type} · {c.duration} · {c.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12px] font-bold text-slate-900">{c.revenue}</div>
                    <div className="text-[9px] text-slate-400">{c.phone}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function VoiceView() {
  const transcript = [
    { speaker: 'sophia', text: 'Καλησπέρα σας, λέγομαι Sophia από το ιατρείο του Δρ. Παπαδόπουλου. Είδα ότι μας καλέσατε πριν λίγο.', time: '0:02' },
    { speaker: 'patient', text: 'Ναι, ήθελα να κλείσω ραντεβού για καθαρισμό.', time: '0:09' },
    { speaker: 'sophia', text: 'Φυσικά! Έχω διαθεσιμότητα την Τετάρτη 11 Ιουνίου στις 10:30 ή την Πέμπτη 12 Ιουνίου στις 16:00. Ποια σας βολεύει;', time: '0:14' },
    { speaker: 'patient', text: 'Η Πέμπτη στις 4 το απόγευμα.', time: '0:24' },
    { speaker: 'sophia', text: 'Τέλεια, σας κλείνω Πέμπτη 12 Ιουνίου στις 16:00 με τον Δρ. Παπαδόπουλο. Θα σας στείλω SMS επιβεβαίωσης. Μπορώ να σας βοηθήσω σε κάτι άλλο;', time: '0:28' },
    { speaker: 'patient', text: 'Όχι, ευχαριστώ πολύ!', time: '0:38' },
    { speaker: 'sophia', text: 'Ευχαρίστως, καλό σας απόγευμα!', time: '0:40' },
  ]

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a0a1f] to-[#15153a] h-full flex flex-col">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="text-[11px] font-semibold text-white/80">Live Call · +30 698 123 4567</div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[10px] font-bold text-rose-400">REC</span>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-indigo-500/30">
              <Bot size={26} className="text-white" />
            </div>
            <div className="text-[11px] font-bold text-white">Sophia AI</div>
            <div className="text-[9px] text-white/50">Voice Agent</div>
          </div>

          <div className="flex flex-col items-center gap-1 flex-1 max-w-[200px]">
            <div className="flex items-center gap-0.5 h-8">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="wave-bar"
                  style={{
                    width: '2px',
                    height: `${8 + Math.abs(Math.sin(i * 0.6) * 24)}px`,
                    animationDelay: `${i * 0.08}s`,
                    background: i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#34d399' : '#6366f1',
                  }}
                />
              ))}
            </div>
            <div className="text-[10px] font-mono text-white/40">0:42 / call in progress</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-emerald-500/30">
              <User size={26} className="text-white" />
            </div>
            <div className="text-[11px] font-bold text-white">Ελένη Α.</div>
            <div className="text-[9px] text-white/50">Ασθενής</div>
          </div>
        </div>

        <div className="flex-1 rounded-2xl bg-white/[0.02] border border-white/5 p-4 overflow-y-auto space-y-2.5 max-h-[280px]">
          {transcript.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.3 }}
              className={`flex gap-2.5 ${line.speaker === 'sophia' ? '' : 'flex-row-reverse'}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  line.speaker === 'sophia'
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                {line.speaker === 'sophia' ? <Bot size={13} /> : <User size={13} />}
              </div>
              <div className={`flex-1 ${line.speaker === 'patient' ? 'text-right' : ''}`}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[9px] font-bold text-white/50">
                    {line.speaker === 'sophia' ? 'SOPHIA' : 'ΑΣΘΕΝΗΣ'} · {line.time}
                  </span>
                </div>
                <div
                  className={`inline-block text-[12px] leading-relaxed px-3 py-2 rounded-2xl ${
                    line.speaker === 'sophia'
                      ? 'bg-indigo-500/15 text-white border border-indigo-500/20'
                      : 'bg-emerald-500/15 text-white border border-emerald-500/20'
                  }`}
                >
                  {line.text}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
            <CheckCircle2 size={11} />
            Ραντεβού κλεισμένο αυτόματα
          </span>
          <span className="text-white/30">·</span>
          <span className="text-[10px] text-white/50">12 Ιουν 16:00 · Δρ. Παπαδόπουλος</span>
        </div>
      </div>
    </div>
  )
}

function SophiaView() {
  const commands = [
    { from: 'user', text: 'Κλείσε ραντεβού με την Άννα αύριο στις 5' },
    { from: 'sophia', text: 'Έκλεισα ραντεβού με την Άννα Γ. αύριο 6 Ιουνίου στις 17:00. Θέλεις να στείλω SMS επιβεβαίωσης;' },
    { from: 'user', text: 'Ναι, και στείλε υπενθύμιση και σε όλους τους ασθενείς της Πέμπτης' },
    { from: 'sophia', text: 'Έγινε. Έστειλα SMS επιβεβαίωσης στην Άννα και υπενθυμίσεις 24ω σε 8 ασθενείς της Πέμπτης.' },
  ]

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#fafbff] to-[#f1f3f9] text-[#0f172a] h-full flex flex-col">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200/60 bg-white/60 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="text-[11px] font-semibold text-slate-700">Sophia · AI Assistant</div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-[10px] font-bold text-white">ΔΓ</div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/5 border border-indigo-200/40 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Brain size={22} className="text-white" />
            </div>
            <div>
              <div className="text-[14px] font-black text-slate-900">Sophia</div>
              <div className="text-[10px] text-slate-500">Powered by Gemini · Greek-first</div>
            </div>
            <div className="ml-auto flex items-center gap-1 text-[10px] font-bold text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </div>
          </div>
          <p className="text-[12px] text-slate-600 leading-relaxed">
            Ρώτησέ με οτιδήποτε ή δώσε μου εντολές — «κλείσε ραντεβού», «στείλε SMS», «δες τα σημερινά», «πόσα ραντεβού είχαμε τον Μάιο;»
          </p>
        </div>

        <div className="flex-1 space-y-2.5 overflow-y-auto">
          {commands.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.4 }}
              className={`flex gap-2.5 ${c.from === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  c.from === 'sophia'
                    ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {c.from === 'sophia' ? <Brain size={13} /> : <User size={13} />}
              </div>
              <div className={`flex-1 max-w-[80%] ${c.from === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`inline-block text-[12px] leading-relaxed px-3 py-2 rounded-2xl ${
                    c.from === 'sophia'
                      ? 'bg-white border border-slate-200/60 text-slate-800'
                      : 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white'
                  }`}
                >
                  {c.text}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex gap-2.5"
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
              <Brain size={13} />
            </div>
            <div className="bg-white border border-slate-200/60 rounded-2xl px-4 py-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-typing-dot" style={{ animationDelay: '0s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-typing-dot" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-typing-dot" style={{ animationDelay: '0.4s' }} />
            </div>
          </motion.div>
        </div>

        <div className="rounded-xl border border-slate-200/60 bg-white px-3 py-2 flex items-center gap-2">
          <Sparkles size={14} className="text-indigo-500" />
          <input
            type="text"
            value="Στείλε υπενθύμιση σε όσους δεν επιβεβαίωσαν"
            readOnly
            className="flex-1 text-[12px] text-slate-700 outline-none bg-transparent"
          />
          <button className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Send size={12} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

function BookingView() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white h-full flex flex-col">
      <div className="bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700 p-5 text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Stethoscope size={18} />
            </div>
            <div>
              <div className="text-[15px] font-black">Δρ. Γεώργιος Παπαδόπουλος</div>
              <div className="text-[10px] text-white/80">Οδοντιατρείο · Κηφισιά</div>
            </div>
          </div>
          <div className="text-[18px] font-black leading-tight">Κλείστε το ραντεβού σας online</div>
          <div className="text-[11px] text-white/80 mt-1">3 απλά βήματα · 30 δευτερόλεπτα</div>
        </div>
      </div>

      <div className="flex-1 p-5 grid grid-cols-3 gap-3">
        {[
          { day: 'Δε', date: '9', available: true },
          { day: 'Τρ', date: '10', available: false },
          { day: 'Τε', date: '11', available: true, selected: true },
          { day: 'Πε', date: '12', available: true },
          { day: 'Πα', date: '13', available: false },
          { day: 'Σα', date: '14', available: true },
        ].map((d) => (
          <button
            key={d.date}
            disabled={!d.available}
            className={`p-3 rounded-xl border-2 text-center transition-all ${
              d.selected
                ? 'border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-500/20'
                : d.available
                ? 'border-slate-200 hover:border-indigo-300'
                : 'border-slate-100 bg-slate-50 opacity-50'
            }`}
          >
            <div className="text-[9px] font-bold text-slate-500 uppercase">{d.day}</div>
            <div className={`text-lg font-black ${d.selected ? 'text-indigo-600' : 'text-slate-900'}`}>{d.date}</div>
            <div className={`text-[8px] font-bold ${d.selected ? 'text-indigo-600' : 'text-slate-400'}`}>
              {d.selected ? 'ΕΠΙΛΕΓΜΕΝΟ' : d.available ? 'Διαθέσιμο' : '—'}
            </div>
          </button>
        ))}
      </div>

      <div className="px-5 pb-5">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Διαθέσιμες ώρες · 11 Ιουνίου</div>
        <div className="grid grid-cols-4 gap-2">
          {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'].map((t, i) => (
            <button
              key={t}
              className={`py-2 rounded-lg text-[11px] font-bold transition-all ${
                i === 4
                  ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-indigo-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-3 flex items-center gap-2.5">
          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
          <div className="flex-1 text-[10px] text-slate-600">
            <div className="font-bold text-slate-900">Αυτόματη επιβεβαίωση</div>
            <div>Θα λάβετε SMS & email αμέσως μόλις ολοκληρωθεί η κράτηση</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const viewComponents = {
  recovery: RecoveryView,
  voice: VoiceView,
  sophia: SophiaView,
  booking: BookingView,
}

export default function ProductTour() {
  const [active, setActive] = useState('recovery')
  const ActiveView = viewComponents[active]
  const activeTour = tours.find((t) => t.id === active)

  return (
    <section id="product-tour" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/20 to-dark pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px divider-gradient" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Activity size={13} />
            Live Product Tour
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-balance">
            Δες το <span className="gradient-text">ClinicFlow</span> σε δράση
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted text-pretty">
            Κάθε οθόνη είναι το πραγματικό interface που χρησιμοποιούν τα ιατρεία καθημερινά.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-2">
            {tours.map((t) => {
              const isActive = active === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isActive
                      ? 'border-white/10 bg-white/[0.04]'
                      : 'border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${t.color}30, ${t.color}15)`
                          : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isActive ? t.color + '40' : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      <t.icon size={18} style={{ color: isActive ? t.color : '#8b92a8' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">{t.label}</h3>
                        {isActive && <ChevronRight size={14} style={{ color: t.color }} />}
                      </div>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">{t.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div
                  className="absolute -inset-4 rounded-3xl blur-3xl opacity-30 animate-pulse-glow"
                  style={{ background: `radial-gradient(circle, ${activeTour.color}, transparent 70%)` }}
                />
                <div className="relative aspect-[16/12] lg:aspect-[16/11]">
                  <ActiveView />
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-text-muted">
              {tours.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`h-1.5 rounded-full transition-all ${
                    active === t.id ? 'w-8' : 'w-1.5 bg-white/20'
                  }`}
                  style={active === t.id ? { background: t.color } : {}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

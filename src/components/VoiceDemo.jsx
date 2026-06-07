import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, PhoneCall, PhoneOff, Mic, Volume2, Sparkles, Bot, User,
  MessageSquare, CheckCircle2, Calendar, Clock, ArrowRight, Zap,
  Play, Pause, VolumeX
} from 'lucide-react'

const scenes = [
  {
    id: 'missed',
    type: 'event',
    title: 'Αναπάντητη κλήση',
    description: 'Ασθενής καλεί αλλά η γραμμή είναι απασχολημένη',
    icon: PhoneOff,
    color: '#ef4444',
    detail: '+30 698 123 4567 · 13:42',
  },
  {
    id: 'sophia-action',
    type: 'action',
    title: 'Sophia ενεργοποιείται',
    description: 'Αυτόματη ανάλυση κλήσης και έναρξη recovery',
    icon: Bot,
    color: '#8b5cf6',
    detail: 'Ανάκτηση σε 12 δευτερόλεπτα',
  },
  {
    id: 'call-back',
    type: 'call',
    title: 'Outbound κλήση',
    description: 'Η Sophia καλεί πίσω τον ασθενή',
    icon: PhoneCall,
    color: '#6366f1',
    detail: 'Vapi voice engine',
  },
  {
    id: 'conversation',
    type: 'conversation',
    title: 'Φυσικός διάλογος',
    description: 'Η Sophia μιλάει ελληνικά, κατανοεί πρόθεση και κλείνει ραντεβού',
    icon: MessageSquare,
    color: '#10b981',
    detail: '2:14 διάρκεια',
  },
  {
    id: 'booked',
    type: 'success',
    title: 'Το ραντεβού κλείστηκε',
    description: 'Αυτόματη καταχώρηση, επιβεβαίωση SMS και email',
    icon: CheckCircle2,
    color: '#10b981',
    detail: '12 Ιουνίου, 16:00 · €95 revenue',
  },
]

const conversationFlow = [
  { speaker: 'sophia', text: 'Καλησπέρα, λέγομαι Sophia. Είδα ότι μας καλέσατε.', delay: 0 },
  { speaker: 'patient', text: 'Ναι, ήθελα ραντεβού για καθαρισμό.', delay: 2200 },
  { speaker: 'sophia', text: 'Φυσικά. Έχω Τετάρτη 10:30 ή Πέμπτη 16:00. Ποια σας βολεύει;', delay: 4200 },
  { speaker: 'patient', text: 'Πέμπτη στις 4.', delay: 7500 },
  { speaker: 'sophia', text: 'Σας κλείνω Πέμπτη 12 Ιουνίου στις 16:00. Θα στείλω SMS επιβεβαίωσης.', delay: 9000 },
  { speaker: 'patient', text: 'Ευχαριστώ πολύ!', delay: 12500 },
  { speaker: 'sophia', text: 'Ευχαρίστως, καλό απόγευμα!', delay: 13500 },
]

function Waveform({ playing, color = '#10b981' }) {
  return (
    <div className="flex items-center justify-center gap-0.5 h-8">
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="wave-bar"
          style={{
            width: '2.5px',
            height: playing ? `${6 + Math.abs(Math.sin(i * 0.5) * 22) + Math.cos(i * 0.3) * 8}px` : '4px',
            animationPlayState: playing ? 'running' : 'paused',
            animationDelay: `${i * 0.06}s`,
            background: `linear-gradient(to top, ${color}, ${color}99)`,
            opacity: playing ? 1 : 0.3,
            transition: 'height 0.3s ease, opacity 0.3s ease',
          }}
        />
      ))}
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="phone-frame">
        <div className="phone-screen">
          {children}
        </div>
      </div>
    </div>
  )
}

function CallScreen({ step, playing, onToggle, elapsed, audioEnabled, onAudioToggle, speaking }) {
  return (
    <div className="p-5 bg-gradient-to-b from-[#0a0a1f] to-[#15153a] h-[520px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
        <div className="text-[10px] font-mono text-white/40">live call</div>
        <div className="flex items-center gap-2">
          <button
            onClick={onAudioToggle}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            aria-label={audioEnabled ? 'Μετάφραση ήχου' : 'Ενεργοποίηση ήχου'}
          >
            {audioEnabled ? (speaking ? <Volume2 size={14} className="text-emerald-400" /> : <Volume2 size={14} className="text-white/50" />) : <VolumeX size={14} className="text-white/30" />}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-around mb-4">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/40">
              <Bot size={22} className="text-white" />
            </div>
            <div className="text-[10px] font-bold text-white mt-2">Sophia</div>
            <div className="text-[9px] text-white/50">AI Voice</div>
          </div>

          <Waveform playing={playing} color="#10b981" />

          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/40">
              <User size={22} className="text-white" />
            </div>
            <div className="text-[10px] font-bold text-white mt-2">Ελένη Α.</div>
            <div className="text-[9px] text-white/50">+30 698 ***</div>
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="text-[10px] text-white/50 font-mono">
            {Math.floor(elapsed / 60).toString().padStart(2, '0')}:{(elapsed % 60).toString().padStart(2, '0')}
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-400">ΕΝΕΡΓΗ ΚΛΗΣΗ</span>
          </div>
        </div>

        <div className="flex-1 rounded-2xl bg-white/[0.02] border border-white/5 p-3 space-y-2 overflow-y-auto max-h-[260px]">
          <AnimatePresence>
            {conversationFlow.slice(0, step + 1).map((line, i) => {
              if (i > step) return null
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${line.speaker === 'sophia' ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                      line.speaker === 'sophia' ? 'bg-indigo-500/30' : 'bg-emerald-500/30'
                    }`}
                  >
                    {line.speaker === 'sophia' ? <Bot size={10} className="text-indigo-200" /> : <User size={10} className="text-emerald-200" />}
                  </div>
                  <div
                    className={`flex-1 text-[10.5px] leading-snug px-2.5 py-1.5 rounded-xl ${
                      line.speaker === 'sophia'
                        ? 'bg-indigo-500/10 text-white border border-indigo-500/15'
                        : 'bg-emerald-500/10 text-white border border-emerald-500/15'
                    }`}
                  >
                    {line.text}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <button
          onClick={onToggle}
          className="mt-3 self-center w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/40 hover:scale-105 transition-transform"
        >
          {playing ? <PhoneOff size={18} className="text-white" /> : <Play size={18} className="text-white ml-0.5" />}
        </button>
      </div>
    </div>
  )
}

function TimelineStep({ scene, index, currentStep }) {
  const isActive = index === currentStep
  const isDone = index < currentStep
  const Icon = scene.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex gap-4 items-start"
    >
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
            isActive ? 'scale-110' : isDone ? 'opacity-100' : 'opacity-50'
          }`}
          style={{
            background: isActive || isDone
              ? `linear-gradient(135deg, ${scene.color}30, ${scene.color}10)`
              : 'rgba(255,255,255,0.04)',
            border: `1px solid ${isActive || isDone ? scene.color + '40' : 'rgba(255,255,255,0.06)'}`,
            boxShadow: isActive ? `0 0 20px ${scene.color}40` : 'none',
          }}
        >
          {isDone ? <CheckCircle2 size={18} style={{ color: scene.color }} /> : <Icon size={18} style={{ color: isActive ? scene.color : '#8b92a8' }} />}
        </div>
        {index < scenes.length - 1 && (
          <div
            className="w-px h-12 mt-2"
            style={{
              background: isDone
                ? `linear-gradient(to bottom, ${scene.color}60, ${scenes[index + 1]?.color}40)`
                : 'rgba(255,255,255,0.06)',
            }}
          />
        )}
      </div>
      <div className="pt-1.5 flex-1 min-w-0">
        <h4
          className={`text-sm font-bold transition-colors ${isActive ? 'text-white' : isDone ? 'text-white/80' : 'text-text-muted'}`}
        >
          {scene.title}
        </h4>
        <p className={`text-xs mt-0.5 leading-relaxed ${isActive ? 'text-text-muted' : 'text-text-muted/60'}`}>
          {scene.description}
        </p>
        <p className="text-[10px] font-mono mt-1" style={{ color: isActive ? scene.color : '#8b92a8' }}>
          {scene.detail}
        </p>
      </div>
    </motion.div>
  )
}

function useSpeechSynthesis() {
  const [speaking, setSpeaking] = useState(false)
  const [greekVoice, setGreekVoice] = useState(null)
  const [voicesLoaded, setVoicesLoaded] = useState(false)
  const utteranceRef = useRef(null)

  useEffect(() => {
    if (!('speechSynthesis' in window)) return
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length === 0) return
      const greek = voices.find(v => v.lang.startsWith('el') || v.lang.startsWith('gr')) ||
                    voices.find(v => v.name.toLowerCase().includes('greek')) ||
                    voices.find(v => v.lang === 'el-GR')
      if (greek) setGreekVoice(greek)
      setVoicesLoaded(true)
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    return () => { window.speechSynthesis.onvoiceschanged = null }
  }, [])

  const speak = useCallback((text, rate = 0.95) => {
    if (!('speechSynthesis' in window)) return
    try {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(text)
      if (greekVoice) utter.voice = greekVoice
      utter.lang = 'el-GR'
      utter.rate = Math.max(0.1, Math.min(10, rate))
      utter.pitch = Math.max(0, Math.min(2, 1))
      utter.volume = Math.max(0, Math.min(1, 1))
      utter.onstart = () => setSpeaking(true)
      utter.onend = () => setSpeaking(false)
      utter.onerror = (e) => {
        console.error('Speech synthesis error:', e)
        setSpeaking(false)
      }
      utteranceRef.current = utter
      window.speechSynthesis.speak(utter)
    } catch (e) {
      console.error('Speech synthesis failed:', e)
      setSpeaking(false)
    }
  }, [greekVoice])

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  return { speak, cancel, speaking, voicesLoaded, greekVoice }
}

export default function VoiceDemo() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const timerRef = useRef(null)
  const lastSpokenStepRef = useRef(-1)
  const { speak, cancel, speaking, voicesLoaded, greekVoice } = useSpeechSynthesis()

  const sophiaLines = conversationFlow.filter(l => l.speaker === 'sophia')

  useEffect(() => {
    if (playing && audioEnabled && step !== lastSpokenStepRef.current) {
      const currentLine = conversationFlow[step]
      if (currentLine && currentLine.speaker === 'sophia') {
        if (voicesLoaded || greekVoice) {
          speak(currentLine.text, 0.9)
        } else {
          // Voices not loaded yet, wait a bit and retry
          const timeout = setTimeout(() => {
            speak(currentLine.text, 0.9)
          }, 100)
          return () => clearTimeout(timeout)
        }
        lastSpokenStepRef.current = step
      }
    }
    if (!playing) {
      lastSpokenStepRef.current = -1
    }
  }, [playing, step, audioEnabled, speak, voicesLoaded, greekVoice])

  useEffect(() => {
    if (playing) {
      const start = Date.now() - elapsed * 1000
      timerRef.current = setInterval(() => {
        const e = Math.floor((Date.now() - start) / 1000)
        setElapsed(e)
        const currentStep = conversationFlow.findIndex((l, i) => e * 1000 < l.delay) - 1
        const newStep = currentStep < 0 ? conversationFlow.length - 1 : Math.min(currentStep, conversationFlow.length - 1)
        setStep(newStep)
        if (e >= 16) {
          setPlaying(false)
        }
      }, 100)
    } else {
      clearInterval(timerRef.current)
      cancel()
    }
    return () => {
      clearInterval(timerRef.current)
      cancel()
    }
  }, [playing, cancel])

  const handleToggle = () => {
    if (!playing && step >= conversationFlow.length - 1 && elapsed > 14) {
      setStep(0)
      setElapsed(0)
      setTimeout(() => setPlaying(true), 100)
    } else {
      setPlaying(!playing)
    }
  }

  const handleAudioToggle = () => {
    setAudioEnabled(!audioEnabled)
    if (!audioEnabled) {
      cancel()
    }
  }

  return (
    <section id="voice-demo" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute -left-40 top-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute -right-40 bottom-1/3 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Mic size={13} />
            Voice AI Live Demo
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-balance">
            Δες τη Sophia να <span className="gradient-text">ανακτά</span> μια κλήση
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted text-pretty">
            Πάτησε play και άκου πώς η AI ρεσεψιόν μας μετατρέπει μια χαμένη κλήση σε κλεισμένο ραντεβού.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PhoneFrame>
              <CallScreen
                step={step}
                playing={playing}
                onToggle={handleToggle}
                elapsed={elapsed}
                audioEnabled={audioEnabled}
                onAudioToggle={handleAudioToggle}
                speaking={speaking}
              />
            </PhoneFrame>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-1"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-black tracking-tight mb-2">Πώς λειτουργεί η ανάκτηση</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Η Sophia παρακολουθεί κάθε κλήση σε πραγματικό χρόνο. Μόλις χαθεί μία, ενεργοποιείται αυτόματα η ροή ανάκτησης.
              </p>
            </div>

            {scenes.map((s, i) => (
              <TimelineStep
                key={s.id}
                scene={s}
                index={i}
                currentStep={playing ? Math.min(step + 1, scenes.length - 1) : step}
              />
            ))}

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { label: 'Μέσος χρόνος ανάκτησης', value: '28s', icon: Clock, color: '#10b981' },
                { label: 'Ποσοστό επιτυχίας', value: '94%', icon: CheckCircle2, color: '#6366f1' },
                { label: 'Κόστος / κλήση', value: '€0.12', icon: Zap, color: '#f59e0b' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <s.icon size={14} style={{ color: s.color }} className="mb-1.5" />
                  <div className="text-lg font-black" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[10px] text-text-muted leading-tight mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

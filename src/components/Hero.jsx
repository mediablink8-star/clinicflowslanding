import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, Sparkles, Phone, MessageSquare, Calendar,
  CheckCircle2, TrendingUp, Shield, Activity, Bot
} from 'lucide-react'
import MagneticButton from './MagneticButton'

const liveNotifications = [
  { type: 'call', name: 'Ελένη Α.', action: 'ανακτήθηκε μέσω AI Voice', time: 'τώρα', icon: Phone, color: '#10b981' },
  { type: 'sms', name: 'Γιάννης Κ.', action: 'κλείστηκε ραντεβού μέσω SMS', time: '1λ πριν', icon: MessageSquare, color: '#6366f1' },
  { type: 'booking', name: 'Μαρία Π.', action: 'έκλεισε online ραντεβού', time: '2λ πριν', icon: Calendar, color: '#8b5cf6' },
  { type: 'call', name: 'Δημήτρης Ν.', action: 'AI Voice επιβεβαίωσε ραντεβού', time: '3λ πριν', icon: Phone, color: '#10b981' },
  { type: 'sms', name: 'Σοφία Α.', action: 'έλαβε υπενθύμιση 24ω', time: '5λ πριν', icon: MessageSquare, color: '#f59e0b' },
]

function Waveform() {
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="wave-bar"
          style={{
            height: `${20 + Math.sin(i * 0.5) * 14 + Math.cos(i * 0.8) * 10}px`,
            animationDelay: `${i * 0.05}s`,
            opacity: 0.7 + (i % 3) * 0.1,
          }}
        />
      ))}
    </div>
  )
}

function Notification({ n, x, y, delay, rotate, floatDuration, floatDelay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="absolute hidden xl:block z-20"
      style={{ left: x, top: y, transform: `rotate(${rotate})` }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-black/40 px-3.5 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl shrink-0"
          style={{ background: `${n.color}20`, border: `1px solid ${n.color}30` }}
        >
          <n.icon size={14} style={{ color: n.color }} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-white whitespace-nowrap">
            {n.name} <span className="text-text-muted font-medium">{n.action}</span>
          </p>
          <p className="text-[10px] text-text-muted/70 font-medium">{n.time}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute inset-0 dots-pattern opacity-15" />
        <div className="beam-effect left-1/4" style={{ animationDelay: '0s' }} />
        <div className="beam-effect left-2/3" style={{ animationDelay: '1.5s' }} />
        <div className="beam-effect left-3/4" style={{ animationDelay: '0.8s' }} />
      </div>

      <div
        className="pointer-events-none absolute hidden lg:block w-[700px] h-[700px] bg-primary/8 rounded-full blur-[140px] transition-transform duration-1000 ease-out z-0"
        style={{
          transform: `translate(${mousePos.x - 350}px, ${mousePos.y - 350}px)`,
          left: 0, top: 0
        }}
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[180px] animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ai-orb mix-blend-screen opacity-20" />

      <Notification n={liveNotifications[0]} x="3%" y="18%" delay={0.8} rotate="-4deg" floatDuration={5} floatDelay={0} />
      <Notification n={liveNotifications[1]} x="80%" y="14%" delay={1.4} rotate="3deg" floatDuration={6} floatDelay={0.5} />
      <Notification n={liveNotifications[2]} x="76%" y="48%" delay={1.8} rotate="-3deg" floatDuration={4.5} floatDelay={1} />
      <Notification n={liveNotifications[3]} x="5%" y="52%" delay={1.1} rotate="4deg" floatDuration={5.5} floatDelay={1.5} />
      <Notification n={liveNotifications[4]} x="14%" y="78%" delay={2.0} rotate="-2deg" floatDuration={4} floatDelay={2} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-6xl px-6 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] pl-1.5 pr-4 py-1.5 text-sm font-medium text-white shadow-2xl backdrop-blur-xl"
        >
          <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-2.5 py-0.5 text-[11px] font-bold text-white">
            <Sparkles size={10} />
            v2.0
          </span>
          <span className="text-text-muted">Η Sophia μόλις αναβαθμίστηκε</span>
          <ArrowRight size={12} className="text-primary" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-balance text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-[0.96] tracking-[-0.04em]"
        >
          Η AI ρεσεψιόν <br className="hidden sm:block" />
          <span className="relative inline-block">
            <span className="shimmer-text glow-text">που δεν κοιμάται</span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none" style={{ height: '12px' }}>
              <motion.path
                d="M2 8 Q 75 2, 150 6 T 298 5"
                stroke="url(#hero-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="hero-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-text-muted font-light text-pretty"
        >
          Η <span className="text-white font-semibold">Sophia</span> απαντά σε κλήσεις, στέλνει SMS και κλείνει ραντεβού 24/7.
          Χωρίς επιπλέον προσωπικό, χωρίς αναπάντητες κλήσεις, χωρίς χαμένα έσοδα.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <MagneticButton href="https://clinicflows.vercel.app/register">
            <span className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-7 py-4 text-base font-bold text-white transition-all">
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-shimmer" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Ξεκίνα δωρεάν για 14 μέρες
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </MagneticButton>
          <MagneticButton>
            <a href="#product-tour" className="group flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-4 text-base font-bold text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.06]">
              <Activity size={15} className="text-primary" />
              Δες το προϊόν
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-muted"
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-primary" />
            Χωρίς πιστωτική κάρτα
          </span>
          <span className="flex items-center gap-1.5">
            <Shield size={13} className="text-primary" />
            GDPR compliant
          </span>
          <span className="flex items-center gap-1.5">
            <TrendingUp size={13} className="text-primary" />
            Μέσος όρος 3.2x αύξηση εσόδων
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20 sm:mt-28"
        >
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-[40px] blur-2xl opacity-40 animate-pulse-glow" />

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-dark-card/80 to-dark-card/40 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-col items-center gap-5">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/40">
                    <Bot size={18} className="text-white" />
                    <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-primary border-2 border-dark-card" />
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">Sophia μιλάει τώρα</p>
                    <p className="text-xs text-text-muted">Voice AI — Ανάκτηση αναπάντητης κλήσης</p>
                  </div>
                </div>

                <Waveform />

                <div className="w-full max-w-xl rounded-2xl border border-white/5 bg-black/30 p-4 text-left">
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                      <Bot size={13} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-primary mb-0.5">SOPHIA · 13:28</p>
                      <p className="text-sm text-white/90 leading-relaxed">
                        «Καλησπέρα σας, σας βλέπω ότι προσπαθήσατε να μας καλέσετε. Λέγομαι Sophia και μπορώ να σας βοηθήσω να κλείσετε ραντεβού. Πότε σας βολεύει;»
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-text-muted">1.24 λεπτά διάρκεια</span>
                  </div>
                  <div className="text-text-muted">•</div>
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Phone size={11} />
                    Outbound call
                  </div>
                  <div className="text-text-muted hidden sm:block">•</div>
                  <div className="hidden sm:flex items-center gap-1.5 text-text-muted">
                    <Calendar size={11} />
                    Προγραμματίστηκε
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

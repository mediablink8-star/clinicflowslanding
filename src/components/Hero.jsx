import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Shield, Zap, HeartPulse, Calendar, Bot, ChevronDown } from 'lucide-react'
import MagneticButton from './MagneticButton'
import InteractiveDemo from './InteractiveDemo'

const floatingBadges = [
  { Icon: Calendar, label: 'Έξυπνα Ραντεβού', x: '5%', y: '22%', delay: 0, color: '#10b981', rotate: '-6deg' },
  { Icon: Bot, label: 'AI Βοηθός', x: '78%', y: '18%', delay: 1.5, color: '#6366f1', rotate: '5deg' },
  { Icon: Shield, label: 'GDPR', x: '88%', y: '55%', delay: 0.8, color: '#f59e0b', rotate: '-4deg' },
  { Icon: HeartPulse, label: 'Ασθενείς 24/7', x: '7%', y: '60%', delay: 2, color: '#ec4899', rotate: '7deg' },
  { Icon: Zap, label: 'Auto', x: '46%', y: '78%', delay: 1.2, color: '#06b6d4', rotate: '-3deg' },
  { Icon: Sparkles, label: 'AI Sophia', x: '92%', y: '78%', delay: 0.4, color: '#a855f7', rotate: '6deg' },
]

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-5xl will-change-transform px-4"
    >
      <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-40 blur-2xl animate-pulse-glow" />
      <div className="relative rounded-[2rem] p-1 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm shadow-2xl">
        <InteractiveDemo />
      </div>
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 dots-pattern opacity-30" />
      
      {/* Mouse Follower Glow */}
      <div 
        className="pointer-events-none absolute hidden lg:block w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] transition-transform duration-700 ease-out z-0"
        style={{ 
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
          left: 0,
          top: 0
        }}
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] animate-pulse-glow" />
      
      {/* Dynamic AI Background Element */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 ai-orb mix-blend-screen opacity-20" />

      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-accent/4 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '0.8s' }} />

      {floatingBadges.map(({ Icon, label, x, y, delay, color, rotate }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: delay + 0.5, ease: "easeOut" }}
          className="absolute hidden lg:block will-change-transform animate-float"
          style={{ left: x, top: y, rotate, animationDelay: `${delay}s` }}
        >
          <div className="flex items-center gap-2 rounded-2xl border border-dark-border/40 bg-dark-card/40 px-3.5 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl hover:border-primary/50 transition-all duration-500 group cursor-default">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ background: `${color}25` }}>
              <Icon size={16} style={{ color }} />
            </div>
            <span className="text-xs font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">{label}</span>
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-md shadow-xl"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
            <Sparkles size={12} className="animate-pulse" />
          </div>
          <span className="tracking-tight">Η επόμενη γενιά στην Υγειονομική Περίθαλψη</span>
          <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">v2.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl font-black leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter"
        >
          Το Μέλλον της{' '}
          <span className="shimmer-text">Φροντίδας</span>
          <br />
          Είναι Εδώ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-2xl font-medium"
        >
          Απελευθερώστε το χρόνο σας με την AI Sophia. Αυτοματοποιημένα ραντεβού, 
          έξυπνη επικοινωνία και πλήρης διαχείριση σε μία μαγική πλατφόρμα.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
        >
          <MagneticButton href="https://clinicflows.vercel.app/register">
            <span className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl px-10 py-4.5 text-lg font-black text-white transition-all">
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-100 transition-opacity" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Ξεκινήστε Δωρεάν
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </MagneticButton>
          <MagneticButton>
            <a href="#features" className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-10 py-4.5 text-lg font-bold text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-2xl">
              Δείτε τις Δυνατότητες
            </a>
          </MagneticButton>
        </motion.div>

        <div className="mt-24 sm:mt-32">
          <DashboardMockup />
        </div>
      </div>
    </section>
  )
}
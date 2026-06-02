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
      initial={{ opacity: 0, y: 100, rotateX: 20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-5xl will-change-transform px-4 perspective-1000"
    >
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 opacity-30 blur-3xl animate-pulse-glow" />
      <div className="relative rounded-[2.5rem] p-[2px] bg-gradient-to-b from-white/20 via-white/5 to-white/10 backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="scan-line" />
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 dots-pattern opacity-20" />
        
        {/* Animated Beams */}
        <div className="beam-effect left-1/4" style={{ animationDelay: '0s' }} />
        <div className="beam-effect left-2/3" style={{ animationDelay: '1.5s' }} />
        <div className="beam-effect left-3/4" style={{ animationDelay: '0.8s' }} />
      </div>
      
      {/* Mouse Follower Glow */}
      <div 
        className="pointer-events-none absolute hidden lg:block w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px] transition-transform duration-1000 ease-out z-0"
        style={{ 
          transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)`,
          left: 0,
          top: 0
        }}
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[180px] animate-pulse-glow" />
      
      {/* Dynamic AI Background Element */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ai-orb mix-blend-screen opacity-25" />

      {floatingBadges.map(({ Icon, label, x, y, delay, color, rotate }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute hidden lg:block will-change-transform z-20"
          style={{ left: x, top: y, rotate }}
        >
          <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl hover:border-primary/50 transition-all duration-500 group cursor-default">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]" style={{ background: `${color}30` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <span className="text-sm font-black tracking-tight text-white/80 group-hover:text-white transition-colors uppercase tracking-widest leading-none">{label}</span>
          </div>
        </motion.div>
      ))}

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-6 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="mb-10 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold text-white shadow-2xl backdrop-blur-xl"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
          <span className="tracking-[0.15em] uppercase text-xs">Clinical Intelligence v2.0</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl font-black leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter"
        >
          Intelligence<br />
          <span className="shimmer-text glow-text">Beyond Care</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-10 max-w-3xl text-xl leading-relaxed text-text-muted sm:text-3xl font-light tracking-tight"
        >
          Elevate your practice with the world's first <span className="text-white font-bold">Neural Clinic Operating System</span>. 
          The future isn't automated—it's intelligent.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-14 flex flex-col items-center gap-6 sm:flex-row sm:justify-center"
        >
          <MagneticButton href="https://clinicflows.vercel.app/register">
            <span className="group relative flex items-center justify-center gap-4 overflow-hidden rounded-2xl px-12 py-5 text-xl font-black text-white transition-all">
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-shimmer" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-3">
                DEPLOY SYSTEM
                <ArrowRight size={24} className="transition-transform group-hover:translate-x-2" />
              </span>
            </span>
          </MagneticButton>
          <MagneticButton>
            <a href="#features" className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-white/10 bg-white/5 px-12 py-5 text-xl font-black text-white backdrop-blur-xl transition-all hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              EXPLORE CORE
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-32 sm:mt-48"
        >
          <DashboardMockup />
        </motion.div>
      </motion.div>
    </section>
  )
}
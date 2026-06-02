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
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative mx-auto max-w-4xl will-change-transform"
    >
      <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-30 blur-xl animate-pulse-glow" />
      <InteractiveDemo />
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 dots-pattern opacity-60" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] animate-pulse-glow will-change-transform" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse-glow will-change-transform" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-accent/4 rounded-full blur-[100px] animate-pulse-glow will-change-transform" style={{ animationDelay: '0.8s' }} />

      {floatingBadges.map(({ Icon, label, x, y, delay, color, rotate }) => (
        <div
          key={label}
          className="absolute hidden lg:block will-change-transform animate-float"
          style={{ left: x, top: y, rotate, animationDelay: `${delay}s` }}
        >
          <div className="flex items-center gap-2 rounded-2xl border border-dark-border/60 bg-dark-card/70 px-3.5 py-2.5 shadow-2xl shadow-black/30 backdrop-blur-md hover:border-primary/30 transition-colors duration-300 will-change-transform">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${color}18` }}>
              <Icon size={16} style={{ color }} />
            </div>
            <span className="text-xs font-semibold whitespace-nowrap">{label}</span>
          </div>
        </div>
      ))}

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center will-change-transform">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-lg shadow-primary/5"
        >
          <Sparkles size={13} className="animate-pulse" />
          Διαχείριση Ιατρείου με AI
          <span className="ml-1 rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold">NEW</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Το Μέλλον της{' '}
          <span className="shimmer-text">Διαχείρισης Ιατρείου</span>
          <br />
          Ξεκινά Εδώ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl"
        >
          Αυτοματοποίησε ραντεβού, ανάκτησε χαμένες κλήσεις με AI, βελτιστοποίησε
          την επικοινωνία με ασθενείς και ανέπτυξε το ιατρείο σου — από μία πλατφόρμα.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <MagneticButton href="https://clinicflows.vercel.app/register">
            <span className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl px-8 py-3.5 text-base font-bold text-white">
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-100 group-hover:opacity-90 transition-opacity" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Δωρεάν Δοκιμή
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </MagneticButton>
          <MagneticButton>
            <a href="#features" className="flex items-center justify-center gap-2 rounded-xl border border-dark-border bg-dark-card/50 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-primary/30 hover:bg-dark-card hover:shadow-lg hover:shadow-primary/5">
              Δες το Demo
              <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </MagneticButton>
        </motion.div>

          <div className="mt-10 sm:mt-16">
            <DashboardMockup />
          </div>
        </div>
    </section>
  )
}
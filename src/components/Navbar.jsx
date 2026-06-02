import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Building2, Sparkles } from 'lucide-react'

const navLinks = [
  { label: 'Δυνατότητες', href: '#features' },
  { label: 'Πώς Λειτουργεί', href: '#how-it-works' },
  { label: 'Τιμολόγηση', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'py-3 bg-dark/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-2xl shadow-primary/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
            <Building2 size={20} className="text-white" />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-xl font-black tracking-tighter">
              Clinic<span className="text-primary">Flow</span>
            </span>
            <span className="text-[10px] font-bold text-text-muted/60 uppercase tracking-[0.2em] leading-none">Intelligence</span>
          </div>
        </a>

        <div className="hidden items-center gap-2 md:flex bg-white/5 rounded-2xl p-1 border border-white/5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative rounded-xl px-5 py-2.5 text-sm font-bold text-text-muted transition-all hover:text-white group"
            >
              {link.label}
              <span className="absolute inset-x-5 -bottom-1 h-1 bg-primary rounded-full scale-x-0 transition-transform group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://clinicflows.vercel.app"
            className="text-sm font-bold text-text-muted transition-all hover:text-white"
          >
            Σύνδεση
          </a>
          <a
            href="https://clinicflows.vercel.app/register"
            className="group relative flex items-center gap-2 overflow-hidden rounded-xl px-6 py-2.5 text-sm font-black text-white"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent transition-transform group-hover:scale-105" />
            <span className="relative">Δοκιμή</span>
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-text-muted transition-colors hover:bg-white/5 hover:text-white md:hidden"
          aria-label="Μενού"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-dark-border/50 glass-strong md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-all hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-2 border-dark-border/50" />
              <a
                href="https://clinicflows.vercel.app"
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-text-muted hover:text-white"
              >
                Σύνδεση
              </a>
              <a
                href="https://clinicflows.vercel.app/register"
                className="rounded-xl bg-gradient-to-r from-primary to-accent px-3 py-2.5 text-center text-sm font-bold text-white shadow-lg"
              >
                Δωρεάν Δοκιμή
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
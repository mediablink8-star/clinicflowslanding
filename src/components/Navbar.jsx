import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Building2, Sparkles } from 'lucide-react'

const navLinks = [
  { label: 'Δυνατότητες', href: '#features' },
  { label: 'Πώς Λειτουργεί', href: '#how-it-works' },
  { label: 'Τιμολόγηση', href: '#pricing' },
  { label: 'Κριτικές', href: '#testimonials' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-2xl shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-primary/40">
            <Building2 size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Clinic<span className="text-primary">Flow</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary border border-primary/20">
            <Sparkles size={10} />
            AI
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative rounded-lg px-3.5 py-2 text-sm font-medium text-text-muted transition-all hover:bg-white/5 hover:text-white group"
            >
              {link.label}
              <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
          <div className="ml-4 flex items-center gap-3">
            <a
              href="https://clinicflows.vercel.app"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-text-muted transition-all hover:text-white"
            >
              Σύνδεση
            </a>
            <a
              href="https://clinicflows.vercel.app/register"
              className="group relative rounded-xl px-5 py-2 text-sm font-bold text-white transition-all"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent opacity-100 transition-opacity group-hover:opacity-90" />
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
              <span className="relative flex items-center gap-1.5">
                Δωρεάν Δοκιμή
                <Sparkles size={13} />
              </span>
            </a>
          </div>
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
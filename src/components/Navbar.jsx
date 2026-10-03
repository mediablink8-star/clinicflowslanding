import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Demo', href: '#demo' },
  { label: 'Προϊόν', href: '#product' },
  { label: 'Τι κάνει', href: '#capabilities' },
  { label: 'Τιμολόγηση', href: '#pricing' },
  { label: 'Ερωτήσεις', href: '#faq' },
]

const APP_URL = 'https://clinicflows.vercel.app'
const REGISTER_URL = 'https://clinicflows.vercel.app/register'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled ? 'border-b border-line bg-canvas/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-baseline gap-1.5" aria-label="ClinicFlow">
          <span className="font-serif text-[1.375rem] font-semibold tracking-tight text-ink">ClinicFlow</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.875rem] text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a href={APP_URL} className="text-[0.875rem] text-ink-2 transition-colors hover:text-ink">
            Σύνδεση
          </a>
          <a
            href={REGISTER_URL}
            className="border border-ink bg-ink px-4 py-2 text-[0.8125rem] font-medium text-canvas transition-colors hover:bg-ink-2 hover:border-ink-2"
          >
            Δοκιμή δωρεάν
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-1 p-2 text-ink md:hidden"
          aria-label={open ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-canvas md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line-2 py-3 text-[0.9375rem] text-ink-2 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 py-4">
              <a
                href={REGISTER_URL}
                className="bg-ink px-4 py-2.5 text-center text-sm font-medium text-canvas"
              >
                Δοκιμή δωρεάν
              </a>
              <a href={APP_URL} className="text-center text-sm text-ink-2">
                Σύνδεση
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

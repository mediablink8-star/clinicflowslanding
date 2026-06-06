import { Building2, Github, Twitter, Linkedin, Mail, Heart, ArrowUp, Sparkles, Shield, MapPin } from 'lucide-react'

const footerLinks = {
  Προϊόν: [
    { label: 'Δυνατότητες', href: '#features' },
    { label: 'Product Tour', href: '#product-tour' },
    { label: 'Voice AI Demo', href: '#voice-demo' },
    { label: 'Ενσωματώσεις', href: '#integrations' },
    { label: 'Ασφάλεια', href: '#security' },
    { label: 'Τιμολόγηση', href: '#pricing' },
    { label: 'API & Webhooks', href: '#integrations' },
  ],
  Λύσεις: [
    { label: 'Οδοντιατρεία', href: '#use-cases' },
    { label: 'Παιδιατρικά', href: '#use-cases' },
    { label: 'Καρδιολογικά', href: '#use-cases' },
    { label: 'Δερματολογικά', href: '#use-cases' },
    { label: 'Φυσικοθεραπευτήρια', href: '#use-cases' },
    { label: 'Ψυχολόγοι', href: '#use-cases' },
  ],
  Εταιρεία: [
    { label: 'Σχετικά με εμάς', href: '#' },
    { label: 'Ιστολόγιο', href: '#' },
    { label: 'Καριέρα', href: '#' },
    { label: 'Συνεργάτες', href: '#' },
    { label: 'Επικοινωνία', href: 'mailto:hello@clinicflows.app' },
    { label: 'Status', href: '#' },
  ],
  Νομικά: [
    { label: 'Πολιτική Απορρήτου', href: '#' },
    { label: 'Όροι Χρήσης', href: '#' },
    { label: 'DPA / GDPR', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Security', href: '#security' },
  ],
}

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/5 bg-gradient-to-b from-dark-card/10 to-dark overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#" className="mb-5 inline-flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Building2 size={18} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight">
                  Clinic<span className="text-primary">Flow</span>
                </span>
                <span className="text-[9px] font-bold text-text-muted/60 uppercase tracking-[0.2em] leading-none">Intelligence</span>
              </div>
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-text-muted mb-5">
              Η AI πλατφόρμα που μεταμορφώνει τον τρόπο διαχείρισης ιατρείων. Voice AI, έξυπνο SMS και αυτοματοποίηση — όλα σε ένα μέρος.
            </p>

            <div className="flex items-start gap-2 text-xs text-text-muted mb-5">
              <MapPin size={13} className="text-primary mt-0.5 shrink-0" />
              <span>Αθήνα, Ελλάδα · EU-hosted infrastructure</span>
            </div>

            <div className="flex gap-2 mb-5">
              {[
                { Icon: Twitter, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Github, href: '#' },
                { Icon: Mail, href: 'mailto:hello@clinicflows.app' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="rounded-lg p-2 text-text-muted transition-all hover:bg-white/5 hover:text-white hover:scale-110 border border-white/5"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-bold text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Όλα τα συστήματα λειτουργούν
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-2">
              <h4 className="mb-4 text-xs font-black tracking-widest uppercase text-text-muted/60">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-muted transition-all hover:text-white hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="grid sm:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-text-muted">
              <p>&copy; {new Date().getFullYear()} ClinicFlow. Με επιφύλαξη παντός δικαιώματος.</p>
              <p className="flex items-center gap-1">
                Φτιαγμένο με <Heart size={11} className="text-primary" /> για επαγγελματίες υγείας
              </p>
            </div>
            <div className="flex flex-wrap sm:justify-end items-center gap-3">
              <div className="flex items-center gap-3 text-[10px] text-text-muted">
                <span className="flex items-center gap-1">
                  <Shield size={11} className="text-primary" />
                  GDPR
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles size={11} className="text-accent" />
                  AI-First
                </span>
                <span>EU-Hosted</span>
              </div>
              <button
                onClick={scrollToTop}
                className="rounded-lg p-2 text-text-muted transition-all hover:bg-white/5 hover:text-white hover:scale-110 border border-white/5"
                aria-label="Επιστροφή στην κορυφή"
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

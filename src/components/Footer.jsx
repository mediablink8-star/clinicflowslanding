import { Building2, Github, Twitter, Mail, Heart, ArrowUp } from 'lucide-react'

const footerLinks = {
  Προϊόν: [
    { label: 'Δυνατότητες', href: '#features' },
    { label: 'Τιμολόγηση', href: '#pricing' },
    { label: 'Πώς Λειτουργεί', href: '#how-it-works' },
    { label: 'Κριτικές', href: '#testimonials' },
  ],
  Εταιρεία: [
    { label: 'Σχετικά', href: '#' },
    { label: 'Ιστολόγιο', href: '#' },
    { label: 'Καριέρα', href: '#' },
    { label: 'Επικοινωνία', href: '#' },
  ],
  Νομικά: [
    { label: 'Πολιτική Απορρήτου', href: '#' },
    { label: 'Όροι Χρήσης', href: '#' },
    { label: 'Επεξεργασία Δεδομένων', href: '#' },
    { label: 'Συμμόρφωση GDPR', href: '#' },
  ],
}

export default function Footer({ onFeatures, onPricing }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-dark-border bg-dark-card/20">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="mb-4 inline-flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-primary/30">
                <Building2 size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Clinic<span className="text-primary">Flow</span>
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              Η πλατφόρμα με τεχνητή νοημοσύνη που μεταμορφώνει τον τρόπο
              διαχείρισης ραντεβού, επικοινωνίας με ασθενείς και ανάπτυξης ιατρείων.
            </p>
            <div className="mt-6 flex gap-3">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-lg p-2 text-text-muted transition-all hover:bg-dark-hover hover:text-white hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-bold tracking-wider uppercase text-text-muted/60">
                {category}
              </h4>
              <ul className="space-y-3">
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

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-dark-border pt-8 text-sm text-text-muted sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} ClinicFlow. Με επιφύλαξη παντός δικαιώματος.</p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1">
              Φτιαγμένο με <Heart size={13} className="text-primary" /> για επαγγελματίες υγείας
            </p>
            <button
              onClick={scrollToTop}
              className="rounded-lg p-2 text-text-muted transition-all hover:bg-dark-hover hover:text-white hover:scale-110"
              aria-label="Επιστροφή στην κορυφή"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
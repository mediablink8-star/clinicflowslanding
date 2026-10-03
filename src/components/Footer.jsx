const APP_URL = 'https://clinicflows.vercel.app'
const REGISTER_URL = 'https://clinicflows.vercel.app/register'
const EMAIL = 'hello@clinicflows.app'

const columns = [
  {
    title: 'Προϊόν',
    links: [
      { label: 'Demo', href: '#demo' },
      { label: 'Δυνατότητες', href: '#capabilities' },
      { label: 'Τιμολόγηση', href: '#pricing' },
      { label: 'Σύνδεση', href: APP_URL },
    ],
  },
  {
    title: 'Εταιρεία',
    links: [
      { label: 'Ερωτήσεις', href: '#faq' },
      { label: 'Επικοινωνία', href: `mailto:${EMAIL}` },
      { label: 'Δωρεάν δοκιμή', href: REGISTER_URL },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <span className="font-serif text-[1.375rem] font-semibold tracking-tight text-ink">
              ClinicFlow
            </span>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-3">
              Επικοινωνία με ασθενείς για ιατρεία και κλινικές. Κάθε ασθενής παίρνει
              απάντηση, ακόμα και όταν δεν είστε εκεί.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} className="flex flex-col gap-8 sm:flex-row sm:gap-16">
              <div>
                <p className="eyebrow">{col.title}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[0.875rem] text-ink-2 transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-ink-4">
            © {new Date().getFullYear()} ClinicFlow
          </p>
          <p className="text-[0.8125rem] text-ink-4">
            Το ClinicFlow δεν δίνει ιατρικές συμβουλές και δεν υποκαθιστά τον ιατρό.
          </p>
        </div>
      </div>
    </footer>
  )
}

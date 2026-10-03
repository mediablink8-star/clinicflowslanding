import { Check } from 'lucide-react'

const REGISTER_URL = 'https://clinicflows.vercel.app/register'

const trial = [
  '20 SMS κατά τη διάρκεια της δοκιμής',
  '30 AI κλήσεις κατά τη διάρκεια της δοκιμής',
  'Όλες οι βασικές λειτουργίες, χωρίς περιορισμό',
]

const plans = [
  {
    name: 'Starter',
    price: '350',
    unit: '€ / γιατρό / μήνα',
    for: 'Μία ιδιωτική πράξη',
    features: [
      'AI ρεσεψιόνις & ανάκτηση αναπάντητων κλήσεων',
      'Online booking & ημερολόγιο',
      'Υπενθυμίσεις και follow-ups',
      'SMS και Voice AI',
      'Dashboard για την ομάδα',
    ],
  },
  {
    name: 'Growth',
    price: '600',
    unit: '€ / μήνα',
    for: '2–3 γιατροί',
    featured: true,
    features: [
      'Όλα του Starter',
      'Προηγμένα workflows ανά ειδικότητα',
      'Αυξημένα όρια SMS και AI κλήσεων',
      'Διαχείριση πολλών γιατρών',
      'Υποστήριξη προτεραιότητας',
    ],
  },
  {
    name: 'Scale',
    price: '1.000',
    unit: '€ / μήνα',
    for: '4–7 γιατροί',
    features: [
      'Όλα του Growth',
      'Custom workflows',
      'Μεγαλύτερα όρια χρήσης',
      'Υποστήριξη προτεραιότητας',
      'Αφοσιωμένος διαχειριστής λογαριασμού',
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-line bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end">
          <div>
            <p className="eyebrow">Τιμολόγηση</p>
            <h2 className="mt-4 text-[2rem] leading-[1.1] sm:text-[2.5rem]">
              Ξεκινάτε με 14 ημέρες δωρεάν.
            </h2>
          </div>
          <p className="text-[1.0625rem] leading-relaxed text-ink-2 lg:pb-2">
            Δοκιμάζετε σε μία πραγματική ροή της κλινικής σας και μετά αποφασίζετε. Χωρίς
            δέσμευση, χωρίς κρυφές χρεώσεις εγκατάστασης.
          </p>
        </div>

        {/* Trial band */}
        <div className="mt-12 flex flex-col gap-6 border border-primary/25 bg-primary-tint px-6 py-7 lg:flex-row lg:items-center lg:justify-between sm:px-8">
          <div>
            <p className="font-serif text-[1.5rem] leading-none text-primary-hover">
              Δοκιμαστικό · 14 ημέρες
            </p>
            <p className="mt-2 text-[0.9375rem] text-ink-2">
              Με όλο το περιεχόμενο της υπηρεσίας, για να δοκιμάσετε πραγματικές κλήσεις και
              κρατήσεις.
            </p>
          </div>
          <ul className="flex flex-col gap-1.5 lg:min-w-[20rem]">
            {trial.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.875rem] text-ink-2">
                <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href={REGISTER_URL}
            className="shrink-0 bg-ink px-6 py-3.5 text-center text-sm font-medium text-canvas transition-colors hover:bg-ink-2"
          >
            Ξεκινήστε τη δοκιμή
          </a>
        </div>

        {/* Plans */}
        <div className="mt-16 grid gap-y-12 md:grid-cols-3 md:gap-y-0">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`flex flex-col md:px-8 ${
                i > 0 ? 'md:border-l md:border-line' : ''
              } ${i === 0 ? 'md:pl-0' : ''}`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-[1.25rem]">{plan.name}</h3>
                {plan.featured && (
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary">
                    Δημοφιλές
                  </span>
                )}
              </div>

              <p className="mt-3 text-[0.8125rem] text-ink-3">{plan.for}</p>

              <div className="mt-5 flex items-baseline gap-2">
                <span data-numeric className="font-serif text-[2.5rem] leading-none text-ink">
                  €{plan.price}
                </span>
                <span className="text-[0.8125rem] text-ink-3">{plan.unit}</span>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-ink-2">
                    <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={REGISTER_URL}
                className={`mt-8 px-5 py-3 text-center text-sm font-medium transition-colors ${
                  plan.featured
                    ? 'bg-ink text-canvas hover:bg-ink-2'
                    : 'border border-line bg-canvas text-ink hover:border-ink-4'
                }`}
              >
                Ξεκινήστε
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9375rem] text-ink-2">
            Μεγαλύτερη κλινική ή ειδικές απαιτήσεις;{' '}
            <a href="mailto:hello@clinicflows.app" className="text-primary underline underline-offset-4">
              Γράψτε μας
            </a>{' '}
            και στέλνουμε προσφορά.
          </p>
          <p className="text-[0.8125rem] text-ink-4">
            Οι τιμές αφορούν τη χρήση του ClinicFlow και εμφανίζονται ανάλογα με το μέγεθος της
            κλινικής.
          </p>
        </div>
      </div>
    </section>
  )
}

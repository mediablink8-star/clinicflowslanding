const REGISTER_URL = 'https://clinicflows.vercel.app/register'
const APP_URL = 'https://clinicflows.vercel.app'
const EMAIL = 'hello@clinicflows.app'

export default function CTA() {
  return (
    <section className="border-t border-line px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="bg-ink px-8 py-14 sm:px-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
            <div>
              <p className="eyebrow text-canvas/50">Επόμενο βήμα</p>
              <h2 className="mt-4 max-w-2xl text-[2rem] leading-[1.08] text-canvas sm:text-[2.75rem]">
                Δοκιμάστε το σε μία πραγματική ροή της κλινικής σας.
              </h2>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-canvas/70">
                Ξεκινάμε με μία συγκεκριμένη ροή, τη συνδέουμε με το υπάρχον workflow σας και
                μετράμε τι πραγματικά αλλάζει. Αν δεν ταιριάζει, δεν συνεχίζουμε.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={REGISTER_URL}
                className="bg-canvas px-6 py-3.5 text-center text-sm font-medium text-ink transition-colors hover:bg-line-2"
              >
                Ξεκινήστε 14 ημέρες δωρεάν
              </a>
              <a
                href={APP_URL}
                className="border border-canvas/25 px-6 py-3.5 text-center text-sm text-canvas/85 transition-colors hover:border-canvas/50"
              >
                Ή συνδεθείτε στην πλατφόρμα
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="pt-2 text-center text-[0.8125rem] text-canvas/50 transition-colors hover:text-canvas/80"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

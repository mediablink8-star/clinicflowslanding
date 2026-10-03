const faqs = [
{
    q: 'Τι ακριβώς κάνει η Sophia;',
    a: 'Υπάρχουν δύο διαφορετικά πράγματα με αυτό το όνομα. Η φωνητική Sophia είναι AI που τηλεφωνεί πίσω τους ασθενείς μετά από αναπάντητη κλήση, μέσω Vapi, και μπορεί να κλείσει ραντεβού ή να ζητήσει επανάκληση. Η Sophia στο chat είναι βοηθός μέσα στην εφαρμογή, βασισμένη σε Google Gemini, που κατανοεί εντολές σε φυσική γλώσσα και εκτελεί πράγματα μέσα στο σύστημα.',
  },
  {
    q: 'Τι ακριβώς κάνει η AI στους ασθενείς και πού σταματά;',
    a: 'Στην ανάκτηση κλήσεων στέλνει SMS με σύνδεσμο κράτησης και δοκιμάζει κλήση επιστροφής. Δεν δίνει ιατρικές συμβουλές και δεν κλείνει ραντεβού χωρίς να το επιβεβαιώσει η ομάδα σας. Οι περιπτώσεις που δεν έχουν απάντηση εμφανίζονται στο Action Center για χειροκίνητη διεκπεραίωση.',
  },
  {
    q: 'Πόσο γρήγορα μπορώ να ξεκινήσω;',
    a: 'Η εγγραφή παίρνει περίπου δύο λεπτά. Το πλήρες setup — τηλέφωνο, ωράριο, γιατροί, κανόνες κράτησης — ολοκληρώνεται με τη βοήθεια του προσωπικού μας. Δεν απαιτείται τεχνική γνώση.',
  },
  {
    q: 'Τι γίνεται όταν ο ασθενής δεν απαντήσει;',
    a: 'Μετά από 24 ώρες χωρίς απάντηση η περίπτωση εμφανίζεται στο Action Center με όλο το ιστορικό. Από εκεί η ομάδα στέλνει follow-up, επαναλαμβάνει SMS που απέτυχε ή κλείνει την περίπτωση. Οι ασθενείς μπορούν να διακόψουν τα μηνύματα απαντώντας STOP.',
  },
  {
    q: 'Πώς διαχειρίζεται τα προσωπικά δεδομένα;',
    a: 'Το ΑΜΚΑ και τα κλειδιά των παρόχων αποθηκεύονται κρυπτογραφημένα με AES-256-GCM. Το ΑΜΚΑ εμφανίζεται μόνο στον ιδιοκτήτη της κλινικής και αποκρύπτεται από τις απαντήσεις του API για τους υπόλοιπους ρόλους. Υπάρχει καταγραφή ενεργειών και διαθέσιμη συμβατική επεξεργασίας δεδομένων. Οι τελικές δηλώσεις συμμόρφωσης απαιτούν νομική αναθεώρηση.',
  },
  {
    q: 'Ενσωματώνεται με το σύστημα που χρησιμοποιώ ήδη;',
    a: 'Ναι. Υποστηρίζουμε REST API και webhooks με επαλήθευση HMAC, καθώς και ενσωματώσεις με Google Calendar, n8n και Make.com. Δεν χρειάζεται να αλλάξετε το σύστημα που κρατά ήδη τα αρχεία σας.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <p className="eyebrow">Ερωτήσεις</p>
            <h2 className="mt-4 text-[2rem] leading-[1.1] sm:text-[2.5rem]">
              Τι ρωτάνε οι περισσότεροι ιδιοκτήτες κλινικών.
            </h2>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-2">
              Κάτι δεν καλύπτεται εδώ;{' '}
              <a
                href="mailto:hello@clinicflows.app"
                className="text-primary underline underline-offset-4"
              >
                Γράψτε μας
              </a>{' '}
              και απαντάμε συγκεκριμένα.
            </p>
          </div>

          <dl className="border-t border-line">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-line">
                <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium leading-snug text-ink">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-ink-4 transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <dd className="pb-6 pr-10 text-[0.9375rem] leading-relaxed text-ink-2">
                  {faq.a}
                </dd>
              </details>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

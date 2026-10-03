const faqs = [
  {
    q: 'Τι ακριβώς κάνει η Sophia;',
    a: 'Η Sophia είναι το AI voice agent του ClinicFlow. Μιλάει φυσικά ελληνικά, κατανοεί τι ζητά ο ασθενής, κλείνει ραντεβού, στέλνει SMS επιβεβαίωσης και κάνει follow-up. Μπορείτε να ορίσετε δική σας persona, φωνή και βάση γνώσεων για το ιατρείο σας.',
  },
  {
    q: 'Πόσο γρήγορα μπορώ να ξεκινήσω;',
    a: 'Η εγγραφή παίρνει περίπου δύο λεπτά. Το πλήρες setup — τηλέφωνο, ωράρια, γιατροί, κανόνες booking — ολοκληρώνεται σε 24 με 48 ώρες με τη βοήθεια του προσωπικού μας. Δεν απαιτείται τεχνική γνώση.',
  },
  {
    q: 'Τι γίνεται αν η Sophia δεν καταλάβει τι θέλει ο ασθενής;',
    a: 'Ζητάει διευκρίνιση, προσφέρει να μεταφέρει την κλήση σε γραμματέα, ή στέλνει SMS με σύνδεσμο επιλογής. Κάθε ασφαμνής περίπτωση σημειώνεται για έλεγχο από άνθρωπο — δεν κλείνεται ποτέ αυτόματα μια συνομιλία σε λάθος βάση.',
  },
  {
    q: 'Είναι σύμφωνο με τον GDPR;',
    a: 'Ναι. Τα δεδομένα φιλοξενούνται σε διακοπές εντός ΕΕ, τα δεδομένα κρυπτογραφούνται κατά τη μεταφορά και την αποθήκευση, κάθε πρόσβαση καταγράφεται, και δίνουμε Data Processing Agreement κατόπιν αιτήματος.',
  },
  {
    q: 'Ενσωματώνεται με το σύστημα που χρησιμοποιώ ήδη;',
    a: 'Ναι. Υποστηρίζουμε REST API, webhooks με HMAC signing και n8n workflows, καθώς και ενσωματώσεις με Google Calendar και συστήματα κρατήσεων όπως Practica και ClinicRunner. Δεν χρειάζεται να αλλάξετε το σύστημα που κρατά ήδη τα αρχεία σας.',
  },
  {
    q: 'Πώς διαφέρει από ένα CRM ή ένα ημερολόγιο;',
    a: 'Το CRM και το ημερολόγιο χρειάζονται κάποιον στο τηλέφωνο για να τα λειτουργήσει. Το ClinicFlow αναλαμβάνει αυτή τη δουλειά όλο το 24ωρο, ανακτά χαμένες κλήσεις, μειώνει τα no-shows και δείχνει από πού χάνονται ασθενείς.',
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

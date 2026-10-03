import { motion } from 'framer-motion'

const capabilities = [
  {
    n: '01',
    title: 'Ανακτά αναπάντητες κλήσεις',
    body: 'Μόλις χαθεί μια κλήση, ο ασθενής παίρνει SMS και AI καλεί πίσω εντός 90 δευτερολέπτων — ενώ το πρόγραμμα της γραμματείας είναι γεμάτο.',
  },
  {
    n: '02',
    title: 'Κλείνει ραντεβού 24/7',
    body: 'Ο ασθενής κλείνει μόνος του, από το κινητό, με τους κανόνες της κλινικής σας: ώρες, διάρκεια, είδος επίσκεψης, διαθεσιμότητα ανά γιατρό.',
  },
  {
    n: '03',
    title: 'Θυμίζει χωρίς να το ζητήσει',
    body: 'Υπενθύμιση 24 ώρες πριν με σύνδεσμο ακύρωσης. Οι ακυρώσεις επιστρέφουν την ώρα στο ημερολόγιο αμέσως, όχι στο τέλος του μήνα.',
  },
  {
    n: '04',
    title: 'Σώζει απότυχες παρουσίες',
    body: 'Λίγα λεπτά μετά τη λήξη της ώρας, το σύστημα ρωτά τον ασθενή και του προσφέρει συγκεκριμένες νέες ώρες.',
  },
  {
    n: '05',
    title: 'Δίνει τον έλεγχο στην ομάδα',
    body: 'Κάθε αυτοματοποιημένο βήμα μπορεί να περάσει σε ανθρώπινο χειρισμό με ένα κλικ. Η AI δεν κρύβεται πίσω από ένα μαύρο κουτί.',
  },
  {
    n: '06',
    title: 'Δείχνει πού χάνονται ασθενείς',
    body: 'Αναφορές ανά αιτία, ώρα και κανάλι. Ξέρετε αν η απώλεια έρχεται από κλήσεις, από χαμένα follow-ups ή από χαμένες θέσεις.',
  },
]

const security = [
  'Δεδομένα ασθενών φιλοξενούνται στην Ευρωπαϊκή Ένωση',
  'Κρυπτογράφηση σε μεταφορά και σε αποθήκευση',
  'Πρόσβαση μόνο γ το προσωπικό της κλινικής σας, με καταγραφή ενεργειών',
  'Επεξεργασία σύμφωνη με GDPR και συμβατή με συμβάσεις επεξεργασίας δεδομένων',
]

const integrations = [
  'Ημερολόγιο γιατρού (Google Calendar, Cal.com)',
  'Εταιρικά τηλέφωνα και IVR',
  'Συστήματα κρατήσεων (Practica, ClinicRunner)',
  'Email και ειδοποιήσεις εφαρμογής',
  'Open API για σύνδεση με το δικό σας σύστημα',
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <p className="eyebrow">Τι κάνει</p>
            <h2 className="mt-4 text-[2rem] leading-[1.1] sm:text-[2.5rem]">
              Έξι λειτουργίες, όλες γύρω από την ίδια επικοινωνία με τον ασθενή.
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-2">
              Δεν προσθέτουμε ένα ακόμα σύστημα που πρέπει να μαθαίνετε. Αλλάζουμε τον τρόπο
              που η κλινική σας επικοινωνεί με τον ασθενή, από την πρώτη κλήση μέχρι τη
              υπενθύμιση του επόμενου ραντεβού.
            </p>

            <div className="mt-10 border-t border-line pt-8">
              <p className="eyebrow">Ασφάλεια και δεδομένα</p>
              <ul className="mt-5 flex flex-col gap-3">
                {security.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <ol className="border-t border-line">
              {capabilities.map((c, i) => (
                <motion.li
                  key={c.n}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="grid gap-x-8 gap-y-2 border-b border-line py-7 sm:grid-cols-[3rem_1fr]"
                >
                  <span data-numeric className="text-[0.8125rem] text-ink-4">
                    {c.n}
                  </span>
                  <div>
                    <h3 className="text-[1.125rem] leading-snug sm:text-[1.25rem]">{c.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{c.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <div className="mt-10">
              <p className="eyebrow">Ενσωματώσεις</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {integrations.map((item) => (
                  <li
                    key={item}
                    className="border border-line bg-surface px-3 py-1.5 text-[0.8125rem] text-ink-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-3">
                Δεν χρειάζεται να αλλάξετε το σύστημα που κρατά ήδη αρχεία. Το ClinicFlow
                συνδέεται δίπλα του και γράφει πίσω σε αυτό.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

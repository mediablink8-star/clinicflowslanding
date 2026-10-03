import { motion } from 'framer-motion'

const capabilities = [
  {
    n: '01',
    title: 'Ανακτά αναπάντητες κλήσεις',
    body: 'Μόλις χαθεί μια κλήση, ο ασθενής παίρνει SMS με σύνδεσμο κράτησης και η Sophia προσπαθεί να τον καλέσει πίσω. Γίνεται αυτόματα, μέσα στις ώρες λειτουργίας της κλινικής.',
  },
  {
    n: '02',
    title: 'Κλείνει ραντεβού μόνος του',
    body: 'Ο ασθενής μπαίνει στη σελίδα κράτησης όποτε θέλει και κλείνει μόνος του, χωρίς να χρειάζεται να τηλεφωνήσει. Οι διαθέσιμες ώρες προέρχονται από το πραγματικό ωράριο και τις διαθέσιμες ώρες του γιατρού.',
  },
  {
    n: '03',
    title: 'Θυμίζει πριν την επίσκεψη',
    body: 'Υπενθύμιση 24 ώρες πριν, που προγραμματίζεται μόλις κλείσει το ραντεβού. Ο ασθενής μπορεί να ακυρώσει απευθείας από το μήνυμα.',
  },
  {
    n: '04',
    title: 'Επιστρέφει όταν δεν απαντηθεί',
    body: 'Αν ο ασθενής δεν απαντήσει, η περίπτωση εμφανίζεται στο Action Center μετά από 24 ώρες. Η ομάδα βλέπει αναλυτικά τι έχει γίνει και στέλνει follow-up.',
  },
  {
    n: '05',
    title: 'Δίνει τον έλεγχο στην ομάδα',
    body: 'Κάθε περίπτωση εμφανίζεται με όλο το ιστορικό της. Η ομάδα επιβεβαιώνει το κλεισίμο, στέλνει follow-up ή επαναλαμβάνει μήνυμα που απέτυχε.',
  },
  {
    n: '06',
    title: 'Μετράει πού χάνονται ασθενείς',
    body: 'Αναφορές ανάκτησης ανά γιατρό, με το ποσοστό σε κάθε βήμα: αναπάντητες κλήσεις, SMS που στάλθηκαν, απαντήσεις, κλεισμένα ραντεβού.',
  },
]

const security = [
  'Κρυπτογράφηση AES-256-GCM των ευαίσθητων πεδίων, όπως ΑΜΚΑ και κλειδιά πάροχων',
  'Πρόσβαση βάσει ρόλου (OWNER, ADMIN, DOCTOR, RECEPTIONIST, ASSISTANT) με καταγραφή ενεργειών',
  'Το ΑΜΚΑ εμφανίζεται μόνο στον OWNER και αποκρύπτεται από τις απαντήσεις του API για τους υπόλοιπους ρόλους',
  'Webhooks με επαλήθευση HMAC, ώστε να μην εκτελούνται αυτόματες ενέργειες από μη εξουσιοδοτημένη πηγή',
  'Διαχείριση δεδομένων με γνώμη GDPR και διαθέσιμη συμβατική επεξεργασίας δεδομένων (DPA)',
]

const integrations = [
  'Twilio για SMS',
  'Vapi για φωνητικές κλήσεις',
  'Zadarma για τηλεφωνικό δίκτυο',
  'Google Gemini για τη βοηθό AI',
  'Google Calendar',
  'Stripe για τιμολόγηση',
  'n8n και Make για αυτοματισμούς',
  'Webhooks με υπογραφή HMAC',
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
                Δεν χρειάζεται να αλλάξετε το σύστημα που κρατά ήδη αρχεία. Οι ενσωματώσεις
                δουλεύουν παράλληλα και το ClinicFlow γράφει πίσω στο ίδιο ημερολόγιο.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

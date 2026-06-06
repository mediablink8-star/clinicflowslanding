import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, MessageCircle, Mail, Phone, Sparkles, ArrowRight } from 'lucide-react'

const faqs = [
  {
    q: 'Τι ακριβώς κάνει η Sophia και πώς μιλάει στους ασθενείς;',
    a: 'Η Sophia είναι ένα AI voice agent που βασίζεται σε Vapi και Bland AI. Μιλάει φυσικά ελληνικά, κατανοεί πρόθεση και μπορεί να απαντήσει σε ερωτήσεις, να κλείσει ραντεβού, να στείλει SMS επιβεβαίωσης και να κάνει follow-up. Μπορείτε να της δώσετε custom persona, voice και knowledge base για το ιατρείο σας.',
  },
  {
    q: 'Πόσο κοστίζει το ClinicFlow;',
    a: 'Ξεκινάτε με 14 μέρες δωρεάν trial χωρίς πιστωτική κάρτα. Μετά, τα πακέτα ξεκινούν από $350/μήνα (Starter) μέχρι Enterprise με custom τιμολόγηση. Δείτε τα αναλυτικά πακέτα στην ενότητα Τιμολόγηση ή μιλήστε μαζί μας για custom ανάγκες.',
  },
  {
    q: 'Είναι συμβατό με GDPR και τα ιατρικά δεδομένα των ασθενών μου;',
    a: 'Ναι, πλήρως. Το ClinicFlow είναι GDPR compliant, με data hosting σε EU servers, end-to-end encryption, audit logs σε κάθε πρόσβαση, και αυτόματη AMKA anonymization. Διαθέτουμε DPA (Data Processing Agreement) κατόπιν αιτήματος.',
  },
  {
    q: 'Μπορώ να ενσωματώσω το ClinicFlow με το σύστημά μου (CRM, ERP, accounting);',
    a: 'Απολύτως. Υποστηρίζουμε webhooks (incoming & outgoing με HMAC signing), n8n workflows, REST API, και έτοιμα integrations με Google Calendar, Stripe, Slack, Gmail και 25+ ακόμη εργαλεία. Η ομάδα μας μπορεί να σας βοηθήσει με custom integrations στο Enterprise πακέτο.',
  },
  {
    q: 'Πόσο γρήγορα μπορώ να ξεκινήσω;',
    a: 'Η εγγραφή παίρνει 2 λεπτά και η πλατφόρμα λειτουργεί αμέσως. Το πλήρες setup με το ιατρείο σας (τηλέφωνο, ωράρια, γιατροί, workflows) ολοκληρώνεται σε 24-48 ώρες με τη βοήθεια της ομάδας μας. Δεν χρειάζεται τεχνική γνώση.',
  },
  {
    q: 'Τι γίνεται αν η Sophia δεν καταλάβει τι θέλει ο ασθενής;',
    a: 'Η Sophia έχει multi-layer fallback. Αν δεν καταλάβει, ζητάει διευκρίνιση, προσφέρει να μεταφέρει την κλήση σε γραμματέα, ή στέλνει SMS με link για να επιλέξει ο ασθενής τι θέλει. Κάθε ambiguous περίπτωση flag-γίνεται για human review.',
  },
  {
    q: 'Μπορώ να ακυρώσω οποτεδήποτε;',
    a: 'Ναι, χωρίς ποινές ή δεσμεύσεις. Μπορείτε να ακυρώσετε ή να αλλάξετε πακέτο οποιαδήποτε στιγμή. Τα δεδομένα σας παραμένουν διαθέσιμα για export για 30 μέρες μετά την ακύρωση.',
  },
  {
    q: 'Πώς διαφέρει το ClinicFlow από ένα απλό CRM ή calendar;',
    a: 'Τα CRM και τα calendars απαιτούν γραμματέα που κάθεται στο τηλέφωνο. Το ClinicFlow αντικαθιστά αυτή τη δουλειά με AI που απαντάει 24/7, χωρίς να χρειάζεται επιπλέον προσωπικό. Μειώνει no-shows, ανακτά χαμένες κλήσεις και μετράει τα έσοδα που φέρνει — κάτι που κανένα CRM δεν κάνει.',
  },
]

function FAQItem({ faq, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-colors hover:border-white/10"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 sm:p-6 text-left"
      >
        <span className="flex-1 text-sm sm:text-base font-bold text-white pr-4">
          {faq.q}
        </span>
        <div
          className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
            isOpen ? 'bg-primary/20 text-primary rotate-180' : 'bg-white/5 text-text-muted'
          }`}
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
              <div className="text-sm text-text-muted leading-relaxed pl-0 border-l-2 border-primary/30 pl-4">
                {faq.a}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px divider-gradient" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <MessageCircle size={13} />
              Συχνές ερωτήσεις
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-balance mb-6">
              Έχεις <span className="gradient-text">απορίες;</span>
            </h2>
            <p className="text-text-muted leading-relaxed mb-8">
              Οι πιο συχνές ερωτήσεις που μας κάνουν τα ιατρεία. Αν δεν βρεις αυτό που ψάχνεις, μίλα μαζί μας.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:hello@clinicflows.app"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-all hover:border-white/10 hover:bg-white/[0.04]"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold">Email</div>
                  <div className="text-xs text-text-muted truncate">hello@clinicflows.app</div>
                </div>
                <ArrowRight size={14} className="text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </a>
              <a
                href="tel:+302100000000"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-all hover:border-white/10 hover:bg-white/[0.04]"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold">Τηλέφωνο</div>
                  <div className="text-xs text-text-muted">+30 210 000 0000</div>
                </div>
                <ArrowRight size={14} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </motion.div>

          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

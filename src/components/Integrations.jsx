import { motion } from 'framer-motion'
import {
  Phone, Bot, Sparkles, Workflow, CreditCard, CalendarDays,
  MessageSquare, MapPin, Hash, Send, Globe, Webhook, Zap,
  PhoneCall, Brain
} from 'lucide-react'

const integrations = [
  {
    category: 'Voice AI',
    items: [
      { name: 'Vapi', desc: 'Voice AI agents', icon: PhoneCall, color: '#10b981' },
      { name: 'Bland AI', desc: 'Conversational AI', icon: Bot, color: '#6366f1' },
      { name: 'Zadarma', desc: 'Τηλεφωνία VoIP', icon: Phone, color: '#8b5cf6' },
    ],
  },
  {
    category: 'AI & Data',
    items: [
      { name: 'Gemini', desc: 'AI reasoning', icon: Sparkles, color: '#4285f4' },
      { name: 'n8n', desc: 'Workflow automation', icon: Workflow, color: '#ea4b71' },
      { name: 'OpenAI', desc: 'GPT models', icon: Brain, color: '#10a37f' },
    ],
  },
  {
    category: 'Productivity',
    items: [
      { name: 'Google Calendar', desc: '2-way sync', icon: CalendarDays, color: '#4285f4' },
      { name: 'Slack', desc: 'Team alerts', icon: Hash, color: '#4a154b' },
      { name: 'Gmail', desc: 'Email automation', icon: Send, color: '#ea4335' },
    ],
  },
  {
    category: 'Business',
    items: [
      { name: 'Stripe', desc: 'Payments & billing', icon: CreditCard, color: '#635bff' },
      { name: 'Google Maps', desc: 'Patient directions', icon: MapPin, color: '#ea4335' },
      { name: 'Webhooks', desc: 'Custom integrations', icon: Webhook, color: '#06b6d4' },
    ],
  },
]

export default function Integrations() {
  return (
    <section id="integrations" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/10 to-dark pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px divider-gradient" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Globe size={13} />
            25+ ενσωματώσεις
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-balance">
            Συνδέεται με <span className="gradient-text">ό,τι ήδη χρησιμοποιείς</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted text-pretty">
            Από voice AI engines μέχρι payment και calendars — το ClinicFlow μιλάει τη γλώσσα των εργαλείων σου.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.08 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <div className="text-[10px] font-black tracking-widest uppercase text-text-muted/60 mb-4">
                {group.category}
              </div>
              <div className="space-y-2">
                {group.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.08 + i * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.03]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}25, ${item.color}10)`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <item.icon size={18} style={{ color: item.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-text-muted">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-white/[0.06] bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-6 sm:p-8"
        >
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={14} className="text-amber-400" />
                <span className="text-[10px] font-black tracking-widest uppercase text-amber-400">Developer friendly</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Public REST API & webhooks</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Χτίσε τα πάντα πάνω στο ClinicFlow. REST API, GraphQL endpoints, HMAC-signed webhooks και SDKs για Node, Python και PHP.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                '99.9% uptime',
                'HMAC signing',
                'Retry logic',
                'Rate limit: 1k/min',
              ].map((t) => (
                <div key={t} className="rounded-lg border border-white/5 bg-black/30 px-3 py-2 font-mono text-text-muted">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Calendar, Users, TrendingUp, Settings,
  Brain, Plus, LogOut, Bell, Search, ChevronDown, X,
  BarChart2, CalendarCheck, Clock, PhoneCall, MessageSquare,
  TrendingUp as Trending, Activity, Zap, CheckCircle2,
  MoreHorizontal, ArrowUpRight, Building2, LineChart,
  ChevronRight, Star,
} from 'lucide-react'

const navSections = [
  {
    label: 'Κύρια Μενού',
    items: [
      { id: 'dashboard', label: 'Πίνακας Ελέγχου', icon: LayoutDashboard },
      { id: 'calendar', label: 'Ημερολόγιο', icon: Calendar },
      { id: 'appointments', label: 'Ραντεβού', icon: CalendarCheck },
      { id: 'patients', label: 'Ασθενείς', icon: Users },
    ],
  },
  {
    label: 'Εργαλεία',
    items: [
      { id: 'ai', label: 'Τεχνητή Νοημοσύνη', icon: Brain },
      { id: 'analytics', label: 'Αναλυτικά Ανάκτησης', icon: BarChart2 },
      { id: 'reports', label: 'Αναφορές', icon: TrendingUp },
    ],
  },
  {
    label: 'Διαχείριση',
    items: [
      { id: 'settings', label: 'Ρυθμίσεις Ιατρείου', icon: Settings },
    ],
  },
]

const todayAppointments = []

const SectionHeader = ({ children, icon: Icon }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.3rem' }}>
    {Icon && (
      <div style={{ padding: '5px', borderRadius: '7px', background: 'rgba(99,91,255,0.08)', color: '#635BFF', display: 'flex' }}>
        <Icon size={13} strokeWidth={2.5} />
      </div>
    )}
    <h3 style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.04em', textTransform: 'uppercase', margin: 0 }}>
      {children}
    </h3>
    <div style={{ flex: 1, height: '1px', background: 'rgba(226,232,240,0.8)', marginLeft: '4px' }} />
  </div>
)

const glassCard = {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.72) 100%)',
  backdropFilter: 'blur(28px) saturate(185%)',
  WebkitBackdropFilter: 'blur(28px) saturate(185%)',
  border: '1px solid rgba(255,255,255,0.78)',
  boxShadow: '0 10px 28px -22px rgba(16,24,40,0.24), 0 8px 20px -20px rgba(16,24,40,0.16)',
}

const badgeStyles = {
  urgent: { bg: '#fff1f2', color: '#dc2626', border: '1px solid rgba(220,38,38,0.12)', label: 'Επείγον' },
  confirmed: { bg: '#ecfdf5', color: '#059669', border: '1px solid rgba(5,150,105,0.12)', label: 'Επιβεβ.' },
  pending: { bg: '#fffbeb', color: '#d97706', border: '1px solid rgba(217,119,6,0.12)', label: 'Εκκρεμεί' },
}

function DashboardView() {
  const revenue = 0
  const weeklyRevenue = 0
  const recovered = 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 sm:p-5 demo-root"
      style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%', background: '#f8fafc', overflow: 'hidden' }}
    >
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, gap: '8px' }}>
        <h1 className="demo-greeting" style={{ fontSize: '1.6rem', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.05em', margin: 0 }}>
          Καλημέρα, Δρ. Γιώργο
        </h1>
        <div className="demo-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '3px', background: 'linear-gradient(180deg,rgba(255,255,255,0.34) 0%,rgba(255,255,255,0.14) 100%)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.28)', backdropFilter: 'blur(10px) saturate(180%)', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.04)' }}>
            <button className="hide-mobile" style={{ border: 'none', background: 'transparent', padding: '4px 9px', fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', borderRadius: '8px' }}>
              <LineChart size={14} /> Αναφορές
            </button>
            <button className="hide-mobile" style={{ background: 'linear-gradient(135deg, #635BFF, #8b5cf6)', color: 'white', border: 'none', padding: '5px 11px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', boxShadow: '0 16px 32px -20px rgba(99,91,255,0.4)' }}>
              <Plus size={14} strokeWidth={3} /> Νέο Ραντεβού
            </button>
            <div style={{ width: '1px', height: '16px', background: 'rgba(226,232,240,0.8)' }} />
            <button style={{ border: 'none', background: 'transparent', padding: '4px', cursor: 'pointer', borderRadius: '8px', position: 'relative', color: '#94a3b8' }}>
              <Bell size={16} />
              <span style={{ position: 'absolute', top: '2px', right: '2px', width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444' }} />
            </button>
          </div>
        </div>
      </div>

      {/* REVENUE CARD */}
      <div className="demo-hero" style={{ flexShrink: 0 }}>
        <div className="demo-revenue-card" style={{
          background: 'linear-gradient(135deg, #635BFF 0%, #4338CA 100%)',
          borderRadius: '28px',
          padding: '1.75rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: '0 20px 40px -12px rgba(99,91,255,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
          border: '1px solid rgba(255,255,255,0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ padding: '4px', borderRadius: '6px', background: 'rgba(255,255,255,0.2)', display: 'flex' }}>
              <Trending size={12} color="white" />
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Συνολική Ανάκτηση AI
            </span>
          </div>
          <span className="demo-revenue-amount" style={{ fontSize: '3.2rem', fontWeight: 950, color: 'white', letterSpacing: '-0.05em', lineHeight: 1, textAlign: 'left' }}>
            €{revenue.toLocaleString()}
          </span>
          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="demo-revenue-badge" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '8px' }}>
              +€{weeklyRevenue} <span style={{ opacity: 0.8, fontSize: '0.75rem' }}>7ημερο</span>
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>
              {recovered} ασθενείς επανήλθαν
            </span>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.75rem', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {/* Left column — Live Feed only */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ ...glassCard, borderRadius: '20px', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            <div style={{ padding: '0.7rem 1rem 0.2rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <SectionHeader icon={Activity}>Live Δραστηριότητα</SectionHeader>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.62rem', fontWeight: 700, color: '#10b981' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981' }} />
                Live
              </span>
            </div>
            <div style={{ padding: '0 0.5rem 0.5rem', flex: 1, minHeight: 0, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent' }}>
              {[].map((item, i) => {
                const statusLabel = item.status === 'missed' ? 'Αναπάντητη' : item.status === 'recovered' ? 'Ανακτήθηκε' : 'Απαντήθηκε'
                return (
                  <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 8px', borderRadius: '10px', alignItems: 'center', marginBottom: '2px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: `${item.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <PhoneCall size={14} color={item.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>{item.caller}</span>
                        <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px', background: item.status === 'missed' ? '#fef2f2' : item.status === 'recovered' ? '#ecfdf5' : '#f0f0ff', color: item.color }}>
                          {statusLabel}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.68rem', color: '#64748b', fontWeight: 500, marginTop: '1px' }}>
                        <span>{item.phone}</span>
                        <span style={{ color: '#cbd5e1' }}>|</span>
                        <span>{item.duration}</span>
                        <span style={{ color: '#cbd5e1' }}>|</span>
                        <span>{item.action}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#94a3b8', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.time}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: 0, overflowY: 'auto' }}>
          {/* Action Center */}
          <div className="demo-action-center" style={{ ...glassCard, borderRadius: '20px', padding: '1rem' }}>
            <SectionHeader icon={Zap}>Κέντρο Ενεργειών</SectionHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '14px', background: 'rgba(99,91,255,0.04)', border: '1px solid rgba(99,91,255,0.1)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(99,91,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#635BFF' }}>
                  <PhoneCall size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>2 αναπάντητες κλήσεις</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Αποστολή SMS ανάκτησης</div>
                </div>
                <button style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', background: '#635BFF', color: 'white', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Αποστολή</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '14px', background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                  <MessageSquare size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>3 ασθενείς απάντησαν</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Χρειάζονται απάντηση</div>
                </div>
                <button style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)', background: 'transparent', color: '#10b981', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Προβολή</button>
              </div>
            </div>
          </div>
          {/* Quick Actions */}
          <div style={{ ...glassCard, borderRadius: '20px', padding: '1rem' }}>
            <SectionHeader icon={Zap}>Γρήγορες Ενέργειες</SectionHeader>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {[
                { label: 'Νέο Ραντεβού', icon: CalendarCheck, color: '#635BFF' },
                { label: 'Νέος Ασθενής', icon: Users, color: '#10b981' },
                { label: 'Αποστολή SMS', icon: MessageSquare, color: '#f59e0b' },
                { label: 'Αναφορές', icon: BarChart2, color: '#8b5cf6' },
              ].map((action) => (
                <button key={action.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '12px', border: '1px solid rgba(226,232,240,0.8)', background: 'linear-gradient(180deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.38) 100%)', fontSize: '0.72rem', fontWeight: 700, color: '#475569', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${action.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <action.icon size={13} color={action.color} />
                  </div>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function AppointmentsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3 sm:p-4" style={{ background: '#f8fafc', height: '100%' }}>
      <SectionHeader icon={CalendarCheck}>Σημερινά Ραντεβού</SectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
        {todayAppointments.map((apt, i) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={apt.status === 'urgent' ? 'urgent' : ''}
            style={{ ...glassCard, borderRadius: '14px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', ...(apt.status === 'urgent' ? {} : {}) }}
          >
            <div style={{ minWidth: '80px' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#635BFF' }}>{apt.time}</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>{apt.date}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '4px' }}>{apt.patient}</div>
              <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 600 }}>{apt.type}</div>
              <div style={{ fontSize: '0.72rem', color: '#635BFF', fontStyle: 'italic', marginTop: '4px' }}>AI: {apt.doctor}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ padding: '4px 12px', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 700, background: badgeStyles[apt.status].bg, color: badgeStyles[apt.status].color, border: badgeStyles[apt.status].border }}>
                {badgeStyles[apt.status].label}
              </span>
              <button style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #635BFF, #8b5cf6)', color: 'white', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 16px 32px -20px rgba(99,91,255,0.4)' }}>
                Επιβεβαίωση
              </button>
              <button style={{ padding: '6px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>
                <MoreHorizontal size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function PatientsView() {
    const patients = []
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3 sm:p-4" style={{ background: '#f8fafc', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <SectionHeader icon={Users}>Πρόσφατοι Ασθενείς</SectionHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', borderRadius: '8px', background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.8)' }}>
          <Search size={12} color="#94a3b8" />
          <input type="text" placeholder="Αναζήτηση..." style={{ border: 'none', background: 'transparent', fontSize: '0.78rem', outline: 'none', width: '100px', color: '#0f172a' }} readOnly />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {patients.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '12px', transition: 'all 0.2s', cursor: 'pointer' }}
            className="hover:bg-white/60"
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #635BFF, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'white', flexShrink: 0 }}>
              {p.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.phone}</div>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{p.lastVisit}</span>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.status === 'new' ? '#10b981' : p.status === 'followup' ? '#8b5cf6' : '#cbd5e1' }} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function AnalyticsView() {
  const monthlyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const months = ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαι', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ']
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3 sm:p-4" style={{ background: '#f8fafc', height: '100%' }}>
      <SectionHeader icon={BarChart2}>Αναλυτικά Στοιχεία</SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px', marginBottom: '12px' }}>
        {[
          { label: 'Σύνολο Ραντεβού', value: '0', change: '0%', color: '#635BFF' },
          { label: 'Ποσοστό Ανάκτησης', value: '0%', change: '0%', color: '#10b981' },
          { label: 'Νέοι Ασθενείς', value: '0', change: '0', color: '#f59e0b' },
          { label: 'Έσοδα Μήνα', value: '€0', change: '€0', color: '#8b5cf6' },
        ].map((s) => (
          <div key={s.label} style={{ ...glassCard, borderRadius: '14px', padding: '0.9rem 1rem' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{s.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.03em' }}>{s.value}</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: s.color }}>{s.change}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ ...glassCard, borderRadius: '16px', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <div style={{ padding: '4px', borderRadius: '6px', background: 'rgba(16,185,129,0.08)', display: 'flex' }}>
            <Trending size={12} color="#10b981" />
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Μηνιαία Απόδοση</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '120px' }}>
          {monthlyData.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.4, delay: i * 0.02 }}
              style={{ flex: 1, borderRadius: '3px 3px 0 0', cursor: 'pointer', background: `linear-gradient(to top, ${i > 5 ? '#635BFF' : '#8b5cf6'}40, ${i > 5 ? '#635BFF' : '#8b5cf6'}90)` }}
              className="hover:opacity-80"
            >
              <div style={{ fontSize: '6px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', paddingTop: '2px', opacity: 0, transition: 'opacity 0.2s' }} className="hover:opacity-100">{h}</div>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '7px', color: '#94a3b8' }}>
          {months.map(m => <span key={m}>{m}</span>)}
        </div>
      </div>
    </motion.div>
  )
}

function AIView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3 sm:p-4" style={{ background: '#f8fafc', height: '100%' }}>
      <SectionHeader icon={Brain}>Τεχνητή Νοημοσύνη</SectionHeader>
      <div style={{ ...glassCard, borderRadius: '20px', padding: '1.5rem', textAlign: 'center', marginTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '24px', background: 'linear-gradient(135deg, #635BFF, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 24px 48px -24px rgba(99,91,255,0.6)' }}>
            <Brain size={32} color="white" />
          </div>
        </div>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 4px' }}>Sophia</h4>
        <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '16px' }}>Ο AI βοηθός σου — πες μου τι θες να κάνω</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '14px', background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.8)' }}>
          <Brain size={16} color="#635BFF" />
          <input type="text" placeholder="Π.χ. Κλείσε ραντεβού για..." style={{ border: 'none', background: 'transparent', fontSize: '0.82rem', outline: 'none', flex: 1, color: '#0f172a' }} readOnly />
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#635BFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={14} color="white" />
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginTop: '12px' }}>
          {['Κλείσε ραντεβού', 'Στείλε SMS', 'Προγραμμάτισε', 'Ανάκτηση'].map((tag) => (
            <span key={tag} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, background: 'rgba(99,91,255,0.06)', color: '#635BFF' }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ReportsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3 sm:p-4" style={{ background: '#f8fafc', height: '100%' }}>
      <SectionHeader icon={TrendingUp}>Αναφορές</SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
        {[
          { label: 'Μηνιαία Έκθεση', desc: 'Ιούνιος 2026', color: '#635BFF', icon: BarChart2 },
          { label: 'Ανάκτηση Κλήσεων', desc: '0% επιτυχία', color: '#10b981', icon: PhoneCall },
          { label: 'Ικανοποίηση Ασθενών', desc: '0/5.0 βαθμολογία', color: '#f59e0b', icon: Star },
          { label: 'Οικονομικά Στοιχεία', desc: '€0 έσοδα', color: '#8b5cf6', icon: Trending },
        ].map((r) => (
          <div key={r.label} style={{ ...glassCard, borderRadius: '16px', padding: '1rem 1.25rem', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:shadow-md">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${r.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <r.icon size={15} color={r.color} />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>{r.label}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{r.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function CalendarView() {
  const days = ['Δε', 'Τρ', 'Τε', 'Πε', 'Πα', 'Σα', 'Κυ']
  const today = 26
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3 sm:p-4" style={{ background: '#f8fafc', height: '100%' }}>
      <SectionHeader icon={Calendar}>Ημερολόγιο</SectionHeader>
      <div style={{ ...glassCard, borderRadius: '20px', padding: '1.25rem', marginTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Μάιος 2026</span>
          <button style={{ padding: '4px 12px', borderRadius: '8px', border: 'none', background: 'rgba(99,91,255,0.08)', color: '#635BFF', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}>Σήμερα</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
          {days.map((d, i) => <div key={`h-${i}`} style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', padding: '6px 0' }}>{d}</div>)}
          {Array.from({ length: 35 }).map((_, i) => {
            const day = i - 3
            const isToday = day === today
            const hasEvent = [24, 26, 28, 29].includes(day)
            return (
              <div key={i} style={{
                fontSize: '0.78rem',
                padding: '8px 0',
                borderRadius: '10px',
                fontWeight: isToday ? 800 : hasEvent ? 700 : 500,
                background: isToday ? '#635BFF' : hasEvent ? 'rgba(99,91,255,0.08)' : 'transparent',
                color: isToday ? 'white' : day > 0 && day <= 31 ? '#0f172a' : '#cbd5e1',
                cursor: hasEvent || isToday ? 'pointer' : 'default',
              }}>
                {day > 0 && day <= 31 ? day : ''}
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

function SettingsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3 sm:p-4" style={{ background: '#f8fafc', height: '100%' }}>
      <SectionHeader icon={Settings}>Ρυθμίσεις Ιατρείου</SectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
        {[
          { label: 'Προφίλ Ιατρείου', desc: 'Όνομα, διεύθυνση, τηλέφωνο', active: true },
          { label: 'Ωράριο Λειτουργίας', desc: 'Δευ-Παρ: 09:00-17:00', active: true },
          { label: 'Ενσωματώσεις', desc: 'n8n, Webhooks, API', active: true },
          { label: 'AI Βοηθός', desc: 'Gemini API, φωνητικές εντολές', active: false },
          { label: 'Ομάδα', desc: '3 μέλη προσωπικού', active: false },
        ].map((item) => (
          <div key={item.label} style={{ ...glassCard, borderRadius: '14px', padding: '0.9rem 1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{item.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.desc}</div>
            </div>
            <div style={{ width: '40px', height: '22px', borderRadius: '99px', background: item.active ? '#635BFF' : '#e2e8f0', position: 'relative', transition: 'background 0.2s', cursor: 'pointer', flexShrink: 0 }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', transition: 'left 0.2s', left: item.active ? '21px' : '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const viewComponents = {
  dashboard: DashboardView,
  calendar: CalendarView,
  appointments: AppointmentsView,
  patients: PatientsView,
  ai: AIView,
  analytics: AnalyticsView,
  reports: ReportsView,
  settings: SettingsView,
}

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const ActiveView = viewComponents[activeTab] || DashboardView

  return (
    <div className="rounded-xl overflow-hidden border shadow-2xl" style={{
      background: '#f8fafc',
      borderColor: 'rgba(255,255,255,0.5)',
      boxShadow: '0 24px 60px -8px rgba(5,11,27,0.12), 0 8px 24px -8px rgba(5,11,27,0.08)',

    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(40px) saturate(190%)',
        borderBottom: '1px solid rgba(226,232,240,0.8)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f87171' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fbbf24' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399' }} />
          </div>
          <span style={{ marginLeft: '8px', fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>ClinicFlow — Πίνακας Ελέγχου</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: '6px', fontSize: '9px', fontWeight: 700, background: 'rgba(99,91,255,0.08)', color: '#635BFF' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            Live Demo
          </span>
          <button style={{ padding: '4px', borderRadius: '6px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>
            <Bell size={12} />
          </button>
        </div>
      </div>

      <div className="demo-container" style={{ display: 'flex' }}>
        <div className="demo-sidebar" style={{
          display: 'flex', flexDirection: 'column', width: '220px', flexShrink: 0,
          borderRight: '1px solid rgba(226,232,240,0.8)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.76) 100%)',
          backdropFilter: 'blur(40px) saturate(190%)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 18px 12px', borderBottom: '1px solid rgba(226,232,240,0.8)' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 950, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #0f172a 0%, #635bff 54%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ClinicFlow
            </span>
          </div>
          <div style={{ padding: '10px 14px' }}>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #635BFF, #8b5cf6)', color: 'white', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 16px 32px -20px rgba(99,91,255,0.5)' }}>
              <Plus size={18} /> Νέο Ραντεβού
            </button>
          </div>
          <nav style={{ flex: 1, overflowY: 'auto', padding: '0 10px' }}>
            {navSections.map((section, si) => (
              <div key={section.label} style={{ marginBottom: si < navSections.length - 1 ? '16px' : 0 }}>
                <div style={{ padding: '10px 10px 6px', fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{section.label}</div>
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.id
                  return (
                    <button key={item.id} onClick={() => setActiveTab(item.id)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 12px',
                        fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                        border: isActive ? '1px solid rgba(99,91,255,0.24)' : '1px solid transparent',
                        borderRadius: '12px',
                        background: isActive ? 'linear-gradient(135deg, rgba(255,255,255,0.66) 0%, rgba(99,91,255,0.16) 100%)' : 'transparent',
                        color: isActive ? '#635BFF' : '#667085',
                        boxShadow: isActive ? 'inset 0 1px 0 rgba(255,255,255,0.62)' : 'none',
                        marginBottom: '3px',
                      }}
                      onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = 'rgba(99,91,255,0.04)'; e.currentTarget.style.color = '#635BFF' } }}
                      onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#667085' } }}
                    >
                      <Icon size={16} />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>
          <div style={{ borderTop: '1px solid rgba(226,232,240,0.8)', padding: '12px 14px', background: 'rgba(255,255,255,0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #635BFF, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white' }}>ΔΓ</div>
              <div style={{ fontSize: '11px' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>Δρ. Γιώργος</div>
                <div style={{ color: '#94a3b8', fontSize: '10px' }}>Ιδιοκτήτης</div>
              </div>
              <button style={{ marginLeft: 'auto', padding: '5px', borderRadius: '6px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>
                <LogOut size={13} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid rgba(226,232,240,0.8)', background: 'rgba(255,255,255,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                {navSections.flatMap(s => s.items).find(n => n.id === activeTab)?.label || 'Πίνακας Ελέγχου'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button style={{ display: 'none', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '8px', border: '1px solid rgba(226,232,240,0.8)', background: 'transparent', fontSize: '9px', fontWeight: 600, color: '#64748b', cursor: 'pointer' }} className="sm:flex">
                <Search size={10} /> Αναζήτηση
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #635BFF, #8b5cf6)', color: 'white', fontSize: '9px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 16px -12px rgba(99,91,255,0.4)' }}>
                <Plus size={10} /> Νέο
              </button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', background: '#f8fafc' }}>
            <AnimatePresence mode="wait">
              <ActiveView key={activeTab} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

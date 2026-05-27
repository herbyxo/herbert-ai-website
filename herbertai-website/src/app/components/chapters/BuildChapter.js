'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import RevealOnScroll from '../motion/RevealOnScroll'

const CARD = 'bg-white rounded-3xl border border-ink/25'

export default function BuildChapter() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const y1 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [80, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [50, -50])
  const y3 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [100, -100])

  return (
    <section ref={ref} className="bg-cream relative overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-28 md:py-44">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ─── Left: sticky opener ─── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <span className="w-8 h-px bg-ink" />
                <span>Chapter 03 of 03</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2
                className="font-display text-ink"
                style={{
                  fontSize: 'var(--text-display-lg)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.04em',
                  fontWeight: 800,
                }}
              >
                Build.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="mt-7 md:mt-10 text-[22px] md:text-[26px] text-ink leading-[1.25] font-medium max-w-[24ch]">
                Custom software, yours to keep.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <p className="mt-6 text-[15px] md:text-[16px] text-muted leading-[1.6] max-w-[42ch]">
                Operator consoles. Customer portals. Bespoke booking flows.
                Built from scratch on Next.js + Supabase &mdash; not Calendly with a logo, not a
                Shopify template. You own the code, the data, and the domain.
              </p>
            </RevealOnScroll>
          </div>

          {/* ─── Right: zigzag mockups ─── */}
          <div className="lg:col-span-7 space-y-10 lg:space-y-14">
            <MockupSlot y={y1} index="01" side="right" rotate="rotate-[-2.5deg]" bleed label="Operator console">
              <MockDashboard />
            </MockupSlot>

            <MockupSlot y={y2} index="02" side="left"  rotate="rotate-[2deg]"    delay={0.1} label="Customer booking flow">
              <MockBookingFlow />
            </MockupSlot>

            <MockupSlot y={y3} index="03" side="right" rotate="rotate-[-3deg]"   delay={0.2} bleed label="Internal customer database">
              <MockAdminPanel />
            </MockupSlot>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Label above each mockup ───────────────────────────────────── */
function MockupLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
      <span className="w-6 h-px bg-muted/60" />
      <span>{children}</span>
    </div>
  )
}

/* ─── Wrapper: zigzag + giant ghosted index, never left-bleeds ─── */
function MockupSlot({ y, index, side, rotate, bleed = false, delay = 0, label, children }) {
  const isLeft = side === 'left'
  const alignClass = isLeft
    ? 'justify-start'
    : `justify-end ${bleed ? 'lg:-mr-12 xl:-mr-20' : ''}`
  const indexPosClass = isLeft
    ? 'right-0 lg:-right-8 xl:-right-16'
    : 'left-0  lg:-left-8  xl:-left-16'

  return (
    <motion.div style={{ y }} className="relative w-full">
      <span
        aria-hidden
        className={`hidden lg:block absolute top-1/2 -translate-y-1/2 ${indexPosClass} font-display font-bold leading-none tracking-tighter text-ink/[0.08] select-none pointer-events-none z-0`}
        style={{ fontSize: 'clamp(140px, 17vw, 260px)' }}
      >
        {index}
      </span>
      <div className={`relative z-10 flex ${alignClass}`}>
        <RevealOnScroll delay={delay}>
          <div className={rotate}>
            <MockupLabel>{label}</MockupLabel>
            {children}
          </div>
        </RevealOnScroll>
      </div>
    </motion.div>
  )
}

/* ─── Mock #1: Operator console (the dashboard you'd actually use) ─── */
function MockDashboard() {
  const navItems = [
    { label: 'Overview', active: true },
    { label: 'Classes' },
    { label: 'Members' },
    { label: 'Reports' },
    { label: 'Settings' },
  ]
  return (
    <div className={`${CARD} max-w-[560px] overflow-hidden`}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-line bg-cream-alt">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green hi-pulse" />
          <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-ink-soft">
            studio twenty &middot; admin
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-ink flex items-center justify-center">
            <span className="text-cream text-[9px] font-bold">S</span>
          </div>
        </div>
      </div>

      {/* Body: sidebar + main */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-32 shrink-0 border-r border-line bg-cream-alt/60 py-3 px-2 space-y-0.5">
          {navItems.map((n) => (
            <div
              key={n.label}
              className={`px-2.5 py-1.5 rounded-md text-[12px] ${
                n.active ? 'bg-ink text-cream font-medium' : 'text-ink-soft'
              }`}
            >
              {n.label}
            </div>
          ))}
        </div>

        {/* Main area */}
        <div className="flex-1 p-4 min-w-0">
          {/* KPI tiles */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <Tile label="This week" value="$5,860" trend="+9%" />
            <Tile label="Classes" value="42" trend="+4" />
            <Tile label="Attendance" value="89%" trend="+6%" />
          </div>

          {/* Mini bar chart */}
          <div className="border border-line rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                Class attendance by day
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">7d</div>
            </div>
            <div className="flex items-end gap-1 h-12">
              {[55, 70, 60, 85, 75, 92, 88].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-green-deep/80" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Recent rows */}
          <div className="border border-line rounded-lg overflow-hidden">
            <div className="px-3 py-1.5 bg-cream-alt/60 border-b border-line font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
              Latest bookings
            </div>
            {[
              { name: 'Sarah K.', service: 'Reformer · 7am Thu', time: '2m' },
              { name: 'Brett L.', service: 'Mat class · 6am Fri', time: '23m' },
              { name: 'Maya T.', service: '1:1 Reformer · 9am Sat', time: '1h' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 text-[11px] border-b border-line last:border-b-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-deep shrink-0" />
                <span className="font-medium text-ink truncate">{r.name}</span>
                <span className="text-muted truncate flex-1">&middot; {r.service}</span>
                <span className="font-mono text-[10px] text-muted shrink-0">{r.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Tile({ label, value, trend }) {
  return (
    <div className="border border-line rounded-lg px-2.5 py-2">
      <div className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted mb-1">{label}</div>
      <div className="font-display text-[18px] font-bold text-ink tracking-[-0.02em] leading-none">{value}</div>
      <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-green-deep mt-1 flex items-center gap-0.5">
        <span aria-hidden>↑</span>
        <span>{trend}</span>
      </div>
    </div>
  )
}

/* ─── Mock #2: Customer-facing booking flow ────────────────────── */
function MockBookingFlow() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const dates = [4, 5, 6, 7, 8, 9, 10]
  return (
    <div className={`${CARD} max-w-md overflow-hidden`}>
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
          Step 02 of 03 &middot; Pick a time
        </div>
        <div className="text-[18px] font-semibold text-ink tracking-[-0.01em]">
          Reformer Pilates &middot; group class
        </div>
        <div className="text-[12px] text-muted mt-0.5">60 min &middot; $45 drop-in</div>
      </div>

      {/* Calendar strip */}
      <div className="px-5">
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((d, i) => (
            <div
              key={i}
              className={`text-center py-2.5 rounded-lg border ${
                i === 3
                  ? 'bg-ink text-cream border-ink'
                  : 'border-line text-ink-soft'
              }`}
            >
              <div className="font-mono text-[8.5px] uppercase tracking-[0.14em] opacity-70 mb-0.5">{d}</div>
              <div className="text-[14px] font-semibold leading-none">{dates[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div className="p-5">
        <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted mb-2.5">
          Thursday, June 7 &middot; available slots
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {['6:00am', '7:30am', '9:00am', '12:00pm', '5:30pm', '6:45pm'].map((t, i) => (
            <button
              key={t}
              className={`text-[12px] rounded-md py-2 border ${
                i === 1
                  ? 'bg-green text-ink border-green font-semibold'
                  : 'border-line text-ink hover:border-ink/40'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Selected</div>
          <div className="text-[12px] font-medium text-ink mt-0.5 truncate">Thu Jun 7 &middot; 7:30am</div>
        </div>
        <button className="bg-ink text-cream px-4 py-2 rounded-full text-[12px] font-semibold inline-flex items-center gap-1.5">
          Continue <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  )
}

/* ─── Mock #3: Internal customer database (table view) ─────────── */
function MockAdminPanel() {
  const rows = [
    { name: 'Sarah Kim',     phone: '0412 …', status: 'active', plan: 'Unlimited',  date: '2d ago' },
    { name: 'Brett Lewis',   phone: '0408 …', status: 'trial',  plan: '2 weeks',    date: 'Today' },
    { name: 'Maya Thompson', phone: '0421 …', status: 'active', plan: '10-pack',    date: 'Today' },
    { name: 'Sam Patel',     phone: '0455 …', status: 'lapsed', plan: 'Unlimited',  date: '5d ago' },
    { name: 'Jen O\'Brien',  phone: '0467 …', status: 'active', plan: '10-pack',    date: 'Yesterday' },
  ]
  const statusColor = {
    active: 'bg-green-deep/15 text-green-deep',
    trial:  'bg-ink/8 text-ink-soft',
    lapsed: 'bg-amber-100 text-amber-700',
  }
  return (
    <div className={`${CARD} max-w-[580px] overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-cream-alt">
        <div className="flex items-center gap-2">
          <div className="text-[12px] font-semibold text-ink">Members</div>
          <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">183 records</div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="border border-line bg-white rounded-md px-2 py-1 font-mono text-[10px] text-muted">All</div>
          <button className="bg-ink text-cream rounded-md px-2.5 py-1 text-[10px] font-semibold flex items-center gap-1">
            <span aria-hidden>+</span> Add
          </button>
        </div>
      </div>

      {/* Column heads */}
      <div className="grid grid-cols-[2fr_1.2fr_1fr_0.9fr_0.8fr] gap-3 px-4 py-2 border-b border-line font-mono text-[8.5px] uppercase tracking-[0.16em] text-muted bg-cream-alt/40">
        <div>Name</div>
        <div>Phone</div>
        <div>Status</div>
        <div>Plan</div>
        <div>Joined</div>
      </div>

      {/* Rows */}
      <div>
        {rows.map((r, i) => (
          <div
            key={i}
            className="grid grid-cols-[2fr_1.2fr_1fr_0.9fr_0.8fr] gap-3 px-4 py-2.5 items-center border-b border-line last:border-b-0 text-[12px]"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 rounded-full bg-cream-alt border border-line flex items-center justify-center text-[9px] font-semibold text-ink shrink-0">
                {r.name[0]}
              </div>
              <span className="font-medium text-ink truncate">{r.name}</span>
            </div>
            <div className="font-mono text-[11px] text-muted truncate">{r.phone}</div>
            <div>
              <span className={`font-mono text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded ${statusColor[r.status]}`}>
                {r.status}
              </span>
            </div>
            <div className="font-mono text-[11px] text-ink truncate">{r.plan}</div>
            <div className="font-mono text-[10px] text-muted truncate">{r.date}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-cream-alt/60 border-t border-line px-4 py-2 flex items-center justify-between">
        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
          Showing 5 of 183
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] text-ink-soft">
          <button className="px-1.5 py-0.5 border border-line rounded">‹</button>
          <button className="px-1.5 py-0.5 border border-line rounded">›</button>
        </div>
      </div>
    </div>
  )
}

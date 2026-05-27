'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import RevealOnScroll from '../motion/RevealOnScroll'

const CARD = 'bg-white rounded-3xl border border-ink/25'

export default function GrowChapter() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Reduced-motion users get static positioning — no parallax.
  const y1 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [100, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -40])
  const y4 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [80, -80])

  return (
    <section ref={ref} className="bg-cream relative overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-28 md:py-44">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ─── Left: opener (sticky on desktop) ─── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <span className="w-8 h-px bg-ink" />
                <span>Chapter 01 of 03</span>
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
                Grow.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="mt-7 md:mt-10 text-[22px] md:text-[26px] text-ink leading-[1.25] font-medium max-w-[24ch]">
                Bring new business in.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <p className="mt-6 text-[15px] md:text-[16px] text-muted leading-[1.6] max-w-[42ch]">
                Paid ad campaigns. SEO that ranks you on page one. Automated SMS &mdash; reminders,
                review requests, follow-ups. Conversion analytics so you know what&rsquo;s working &mdash;
                and what isn&rsquo;t.
              </p>
            </RevealOnScroll>
          </div>

          {/* ─── Right: zigzag mockups with parallax + rotation ─── */}
          <div className="lg:col-span-7 space-y-10 lg:space-y-14">
            <MockupSlot y={y1} index="01" side="right" rotate="rotate-[-2.5deg]" bleed label="Paid ad campaign">
              <MockAdCreative />
            </MockupSlot>

            <MockupSlot y={y2} index="02" side="left"  rotate="rotate-[2deg]"    delay={0.1} label="SEO ranking">
              <MockSEOResult />
            </MockupSlot>

            <MockupSlot y={y3} index="03" side="right" rotate="rotate-[-3deg]"   delay={0.2} bleed label="Automated SMS funnel">
              <MockSMSConversation />
            </MockupSlot>

            <MockupSlot y={y4} index="04" side="left"  rotate="rotate-[2.5deg]"  delay={0.3} label="Conversion analytics">
              <MockAnalyticsDashboard />
            </MockupSlot>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Description label above each mockup ─────────────────────── */
function MockupLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
      <span className="w-6 h-px bg-muted/60" />
      <span>{children}</span>
    </div>
  )
}

/* ─── Wrapper: zigzag positioning + giant ghosted index on opposite side ─ */
function MockupSlot({ y, index, side, rotate, bleed = false, delay = 0, label, children }) {
  const isLeft = side === 'left'
  // Card alignment + optional bleed past column edge for sticker feel
  // LEFT side stays inside the col-span-7 lane (respects the sticky H2 to its left).
  // Bleed is only permitted on RIGHT side, pushing toward the page edge where nothing collides.
  const alignClass = isLeft
    ? 'justify-start'
    : `justify-end ${bleed ? 'lg:-mr-12 xl:-mr-20' : ''}`
  // Ghosted index sits opposite the card, centred vertically
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

/* ─── Mock: SEO ranking (Google search result) ────────────────── */
function MockSEOResult() {
  return (
    <div className={`${CARD} max-w-md overflow-hidden`}>
      {/* Search bar */}
      <div className="flex items-center gap-3 p-4 border-b border-line">
        <svg className="w-4 h-4 text-muted shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <div className="text-[14px] text-ink-soft flex-1">barber adelaide cbd</div>
        <div className="text-[10px] text-muted font-mono uppercase tracking-[0.12em]">Search</div>
      </div>
      {/* Results meta */}
      <div className="px-4 pt-3 text-[11px] text-muted">
        About 312,000 results &middot; 0.38 seconds
      </div>
      {/* #1 organic result */}
      <div className="p-4 pt-2">
        <div className="flex items-center gap-1.5 text-[12px] text-muted mb-1">
          <span className="w-4 h-4 rounded-full bg-cream-alt flex items-center justify-center text-[8px] font-bold text-ink shrink-0">F</span>
          <span className="truncate">forgebarber.com.au</span>
        </div>
        <div className="text-[16px] md:text-[17px] font-medium text-ink leading-[1.25] mb-1.5 hover:underline cursor-default">
          Forge Barber &mdash; Sharp cuts in the CBD | Walk-ins welcome
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-amber-500 text-[12px] leading-none">★★★★★</div>
          <span className="text-[11px] text-muted">Rating: 4.9 &middot; 280 reviews</span>
        </div>
        <p className="text-[13px] text-ink-soft leading-[1.45]">
          Adelaide&rsquo;s busiest CBD barbershop. Skin fades, beard work, kids cuts. 5★ rated by 280+ regulars&hellip;
        </p>
      </div>
      {/* Ranking-change badge */}
      <div className="bg-cream-alt px-4 py-2.5 flex items-center gap-2 border-t border-line">
        <span className="text-green-deep text-[14px] leading-none" aria-hidden>↑</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">Now #1 &mdash; up from page 2</span>
      </div>
    </div>
  )
}

/* ─── Mock #2: Paid ad campaign (richer, trade-specific) ───────── */
function MockAdCreative() {
  return (
    <div className={`${CARD} max-w-md overflow-hidden`}>
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center shrink-0">
          <span className="text-green text-[14px] font-bold">F</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <div className="text-[14px] font-semibold text-ink truncate">Forge Barber</div>
            <svg className="w-3.5 h-3.5 text-green-deep shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-[10px] text-muted font-mono uppercase tracking-[0.16em] mt-0.5">Sponsored</div>
        </div>
      </div>
      <div className="px-4 pb-3">
        <p className="text-[13px] text-ink-soft leading-[1.45]">
          Looking for a fresh cut? Book your chair in 60 seconds &mdash; walk-ins welcome.
        </p>
      </div>
      {/* Image area — placeholder for client photo */}
      <div className="relative h-[180px] overflow-hidden bg-cream-alt border-y border-dashed border-line">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-muted">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="1.6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
          </svg>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em]">Your photo here</div>
        </div>
        {/* Rating overlay badge — top right (demonstrates ad-overlay capability) */}
        <div className="absolute top-3 right-3 bg-white border border-line px-2.5 py-1 rounded font-mono text-[10px] uppercase tracking-[0.14em] font-bold flex items-center gap-1 shadow-[0_2px_8px_rgba(10,10,10,0.04)]">
          <span className="text-amber-500 text-[11px] leading-none">★</span>
          <span className="text-ink">4.9 &middot; 280 reviews</span>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 gap-3 bg-cream-alt">
        <div className="min-w-0">
          <div className="text-[10px] text-muted font-mono uppercase tracking-[0.12em]">forgebarber.com.au</div>
          <div className="text-[13px] font-medium text-ink mt-1 truncate">Walk-ins welcome &middot; CBD</div>
        </div>
        <button className="bg-ink text-cream px-3 py-1.5 rounded-md text-[12px] font-medium shrink-0">
          Book chair
        </button>
      </div>
    </div>
  )
}

/* ─── Mock: Automated SMS funnel (post-job review request) ────── */
function MockSMSConversation() {
  return (
    <div className={`${CARD} p-6 max-w-sm`}>
      <div className="text-[10px] text-muted font-mono uppercase tracking-[0.16em] mb-5 text-center">
        Today &middot; 1 hour after the chair
      </div>
      <div className="space-y-2.5">
        {/* Automated review request from business */}
        <div className="flex">
          <div className="bg-cream-alt rounded-2xl rounded-tl-md px-4 py-3 max-w-[88%]">
            <p className="text-[14px] text-ink leading-[1.45] mb-3">
              Sam, hope you&rsquo;re happy with the cut. If you&rsquo;ve got 30 seconds,
              would you mind dropping us a review? Massive help.
            </p>
            <div className="bg-white border border-line rounded-lg px-3 py-2 flex items-center gap-2 text-[12px] text-ink font-medium">
              <span className="text-amber-500 leading-none">★</span>
              <span className="flex-1">Leave a review</span>
              <span aria-hidden className="text-muted">↗</span>
            </div>
          </div>
        </div>
        {/* Customer reply */}
        <div className="flex justify-end">
          <div className="bg-green text-ink rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[85%]">
            <p className="text-[14px] leading-[1.4]">
              Just did &mdash; easy 5 stars. Best fade I&rsquo;ve had.
            </p>
          </div>
        </div>
        {/* Business reply */}
        <div className="flex">
          <div className="bg-cream-alt rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[85%]">
            <p className="text-[14px] text-ink leading-[1.4]">
              Legend Sam, see you in 4 weeks.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Mock #4: Live analytics dashboard ─────────────────────────── */
function MockAnalyticsDashboard() {
  const stats = [
    { value: '2,180', label: 'Visitors', change: '+22%' },
    { value: '186', label: 'Bookings', change: '+31%' },
    { value: '4.9', label: 'Avg rating', change: '+0.2' },
  ]
  return (
    <div className={`${CARD} max-w-md overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green hi-pulse" />
          <div className="text-[12px] font-semibold text-ink">forge-barber · analytics</div>
        </div>
        <div className="text-[10px] text-muted font-mono uppercase tracking-[0.12em]">Last 30 days</div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 divide-x divide-line">
        {stats.map((s) => (
          <div key={s.label} className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted mb-1.5">
              {s.label}
            </div>
            <div className="font-display text-[24px] font-bold text-ink tracking-[-0.02em] leading-none">
              {s.value}
            </div>
            <div className="text-[11px] text-green-deep font-mono uppercase tracking-[0.12em] mt-1.5 flex items-center gap-1">
              <span aria-hidden>↑</span>
              <span>{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sparkline chart */}
      <div className="p-4 border-t border-line">
        <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted mb-3">
          Bookings, last 30 days
        </div>
        <svg viewBox="0 0 200 50" className="w-full h-[50px]" preserveAspectRatio="none" aria-hidden>
          <polyline
            points="0,42 20,38 40,40 60,30 80,32 100,24 120,20 140,17 160,14 180,9 200,6"
            fill="none"
            stroke="var(--color-green-deep)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <polygon
            points="0,42 20,38 40,40 60,30 80,32 100,24 120,20 140,17 160,14 180,9 200,6 200,50 0,50"
            fill="var(--color-green)"
            fillOpacity="0.12"
          />
        </svg>
      </div>

      {/* Live activity */}
      <div className="px-4 pb-4 border-t border-line pt-4">
        <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted mb-2.5">
          Live activity
        </div>
        <div className="space-y-1.5">
          <ActivityLine pulse text="New booking" time="2m" />
          <ActivityLine text="Form submission" time="8m" />
          <ActivityLine text="New booking" time="14m" />
        </div>
      </div>
    </div>
  )
}

function ActivityLine({ pulse, text, time }) {
  return (
    <div className="flex items-center gap-2 text-[12px]">
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${pulse ? 'bg-green hi-pulse' : 'bg-muted/40'}`}
      />
      <span className="text-ink-soft flex-1">{text}</span>
      <span className="font-mono text-[10px] text-muted">{time} ago</span>
    </div>
  )
}

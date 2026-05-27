'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import RevealOnScroll from '../motion/RevealOnScroll'

const CARD = 'bg-white rounded-3xl border border-line shadow-[0_8px_32px_rgba(10,10,10,0.04)]'

export default function GrowChapter() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const y4 = useTransform(scrollYProgress, [0, 1], [80, -80])

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
                Custom ad campaigns. SEO that ranks. Landing pages that convert. Email and SMS funnels
                that bring customers back. The systems that get more business through your door.
              </p>
            </RevealOnScroll>
          </div>

          {/* ─── Right: stacked mockups with parallax + rotation ─── */}
          <div className="lg:col-span-7 space-y-14 lg:space-y-16">
            <motion.div style={{ y: y1 }} className="md:w-[88%] md:ml-auto">
              <RevealOnScroll>
                <div className="rotate-[-1deg]">
                  <MockupLabel>Customer review</MockupLabel>
                  <MockGoogleReview />
                </div>
              </RevealOnScroll>
            </motion.div>

            <motion.div style={{ y: y2 }} className="md:w-[80%]">
              <RevealOnScroll delay={0.1}>
                <div className="rotate-[1.5deg]">
                  <MockupLabel>Paid ad campaign</MockupLabel>
                  <MockAdCreative />
                </div>
              </RevealOnScroll>
            </motion.div>

            <motion.div style={{ y: y3 }} className="md:w-[70%] md:ml-auto md:mr-12">
              <RevealOnScroll delay={0.2}>
                <div className="rotate-[-0.5deg]">
                  <MockupLabel>Lead capture & SMS</MockupLabel>
                  <MockSMSConversation />
                </div>
              </RevealOnScroll>
            </motion.div>

            <motion.div style={{ y: y4 }} className="md:w-[88%]">
              <RevealOnScroll delay={0.3}>
                <div className="rotate-[-1.5deg]">
                  <MockupLabel>Conversion analytics</MockupLabel>
                  <MockAnalyticsDashboard />
                </div>
              </RevealOnScroll>
            </motion.div>
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

/* ─── Mock #1: Customer review ─────────────────────────────────── */
function MockGoogleReview() {
  return (
    <div className={`${CARD} p-6 max-w-md`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-cream-alt flex items-center justify-center font-semibold text-ink text-[15px] shrink-0">
          S
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-ink">Sarah K.</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-amber-500 text-[14px] leading-none">★★★★★</div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">2 weeks ago</span>
          </div>
        </div>
      </div>
      <p className="text-[14px] text-ink-soft leading-[1.55]">
        &ldquo;Loved the work they did. Calls answered around the clock, bookings up dramatically.
        Honestly the best decision we made this year.&rdquo;
      </p>
    </div>
  )
}

/* ─── Mock #2: Paid ad campaign (richer, trade-specific) ───────── */
function MockAdCreative() {
  return (
    <div className={`${CARD} max-w-md overflow-hidden`}>
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center shrink-0">
          <span className="text-green text-[14px] font-bold">A</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <div className="text-[14px] font-semibold text-ink truncate">Adelaide Electric</div>
            <svg className="w-3.5 h-3.5 text-green-deep shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-[10px] text-muted font-mono uppercase tracking-[0.16em] mt-0.5">Sponsored</div>
        </div>
      </div>
      <div className="px-4 pb-3">
        <p className="text-[13px] text-ink-soft leading-[1.45]">
          Looking for a sparky? Get a free quote in 60 seconds &mdash; same-day service, no callout fee.
        </p>
      </div>
      {/* Split image area: 5★ rating + jobs-this-month */}
      <div className="relative h-[160px] grid grid-cols-2 gap-px bg-line">
        <div className="bg-green flex flex-col items-center justify-center text-ink p-4">
          <div className="font-display text-[44px] font-bold leading-none tracking-[-0.03em]">★ 5.0</div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] mt-2 text-ink-soft">Avg rating</div>
        </div>
        <div className="bg-ink flex flex-col items-center justify-center text-cream p-4">
          <div className="font-display text-[40px] font-bold leading-none tracking-[-0.03em]">200+</div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] mt-2 text-cream/60">Jobs this month</div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 gap-3 bg-cream-alt">
        <div className="min-w-0">
          <div className="text-[10px] text-muted font-mono uppercase tracking-[0.12em]">adelaideelectric.com.au</div>
          <div className="text-[13px] font-medium text-ink mt-1 truncate">Free quotes, same-day service</div>
        </div>
        <button className="bg-ink text-cream px-3 py-1.5 rounded-md text-[12px] font-medium shrink-0">
          Book now
        </button>
      </div>
    </div>
  )
}

/* ─── Mock #3: SMS conversation ────────────────────────────────── */
function MockSMSConversation() {
  return (
    <div className={`${CARD} p-6 max-w-sm`}>
      <div className="text-[10px] text-muted font-mono uppercase tracking-[0.16em] mb-5 text-center">
        Today · 9:47am
      </div>
      <div className="space-y-2.5">
        <div className="flex">
          <div className="bg-cream-alt rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[85%]">
            <p className="text-[14px] text-ink leading-[1.4]">
              Hi, need a sparky for tomorrow morning if possible?
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-green text-ink rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[85%]">
            <p className="text-[14px] leading-[1.4]">
              Booked you in for 9am Tue. Confirmation just sent through.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="bg-cream-alt rounded-2xl rounded-tl-md px-4 py-3 inline-flex items-center gap-1">
            <Dot delay="0s" />
            <Dot delay="0.2s" />
            <Dot delay="0.4s" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Dot({ delay }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full bg-muted opacity-60"
      style={{ animation: 'hi-pulse 1.4s infinite', animationDelay: delay }}
    />
  )
}

/* ─── Mock #4: Live analytics dashboard ─────────────────────────── */
function MockAnalyticsDashboard() {
  const stats = [
    { value: '3,247', label: 'Visitors', change: '+18%' },
    { value: '127', label: 'Leads', change: '+34%' },
    { value: '42', label: 'Bookings', change: '+28%' },
  ]
  return (
    <div className={`${CARD} max-w-md overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green hi-pulse" />
          <div className="text-[12px] font-semibold text-ink">your-business · analytics</div>
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

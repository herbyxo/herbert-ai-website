'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import RevealOnScroll from '../motion/RevealOnScroll'

const CARD = 'bg-white rounded-3xl border border-line shadow-[0_8px_32px_rgba(10,10,10,0.04)]'

export default function GrowChapter() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // each mockup gets a slightly different parallax speed for depth
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
          <div className="lg:col-span-7 space-y-10 lg:space-y-14">
            <motion.div style={{ y: y1 }} className="md:w-[88%] md:ml-auto">
              <RevealOnScroll>
                <div className="rotate-[-1deg]">
                  <MockGoogleReview />
                </div>
              </RevealOnScroll>
            </motion.div>

            <motion.div style={{ y: y2 }} className="md:w-[78%]">
              <RevealOnScroll delay={0.1}>
                <div className="rotate-[1.5deg]">
                  <MockAdCreative />
                </div>
              </RevealOnScroll>
            </motion.div>

            <motion.div style={{ y: y3 }} className="md:w-[70%] md:ml-auto md:mr-12">
              <RevealOnScroll delay={0.2}>
                <div className="rotate-[-0.5deg]">
                  <MockSMSConversation />
                </div>
              </RevealOnScroll>
            </motion.div>

            <motion.div style={{ y: y4 }} className="md:w-[88%]">
              <RevealOnScroll delay={0.3}>
                <div className="rotate-[-1.5deg]">
                  <MockLandingPageHero />
                </div>
              </RevealOnScroll>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Mock #1: Google-style customer review ───────────────────── */
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

/* ─── Mock #2: Social ad creative preview ─────────────────────── */
function MockAdCreative() {
  return (
    <div className={`${CARD} max-w-md overflow-hidden`}>
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center shrink-0">
          <span className="text-green text-[14px] font-bold">A</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-ink truncate">Your Business</div>
          <div className="text-[10px] text-muted font-mono uppercase tracking-[0.16em] mt-0.5">Sponsored</div>
        </div>
      </div>
      <div className="bg-ink relative h-[180px] flex items-center justify-center overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.35), transparent 60%)' }}
        />
        <div className="relative font-display text-[28px] md:text-[34px] font-bold text-cream tracking-[-0.03em] text-center px-4">
          Save 5 hours
          <br />
          a week.
        </div>
      </div>
      <div className="flex items-center justify-between p-4 gap-3">
        <div className="min-w-0">
          <div className="text-[12px] text-muted font-mono uppercase tracking-[0.12em]">yourbusiness.com</div>
          <div className="text-[13px] font-medium text-ink mt-1 truncate">Stop missing calls.</div>
        </div>
        <button className="bg-cream-alt text-ink px-3 py-1.5 rounded-md text-[12px] font-medium shrink-0">
          Learn more
        </button>
      </div>
    </div>
  )
}

/* ─── Mock #3: SMS conversation (customer + agent) ────────────── */
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

/* ─── Mock #4: Landing-page hero snippet ──────────────────────── */
function MockLandingPageHero() {
  return (
    <div className={`${CARD} max-w-md overflow-hidden`}>
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green" />
          <div className="text-[12px] font-semibold text-ink">your-business</div>
        </div>
        <div className="flex gap-4 text-[10px] text-muted font-mono uppercase tracking-[0.12em]">
          <span>Services</span>
          <span>Contact</span>
        </div>
      </div>
      <div className="p-6">
        <div
          className="font-display text-[26px] md:text-[28px] leading-[1.05] tracking-[-0.03em] text-ink font-bold mb-3"
        >
          Get a quote in
          <br />
          <span className="bg-green inline-block px-1.5 -mx-1.5 mt-0.5">30 seconds.</span>
        </div>
        <p className="text-[12px] text-muted leading-[1.5] mb-5">
          Custom-built ads driving real business to your door.
        </p>
        <div className="flex gap-2">
          <div className="flex-1 px-3 py-2 text-[12px] border border-line rounded-md text-muted">
            Your email
          </div>
          <div className="bg-ink text-cream px-3 py-2 rounded-md text-[12px] font-medium">Start</div>
        </div>
      </div>
    </div>
  )
}

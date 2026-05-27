'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto min-h-screen flex flex-col px-6 lg:px-12 pt-16 md:pt-20 pb-12">
        {/* ─── Headline + sub + CTAs (natural flow at top) ─── */}
        <h1
          className="font-display text-ink"
          style={{
            fontSize: 'var(--text-display-xl)',
            lineHeight: 0.88,
            letterSpacing: '-0.05em',
            fontWeight: 800,
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
            className="block"
          >
            Less admin.
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
            className="block relative w-fit"
          >
            {/* Green flood — wipes left→right after text settles */}
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.65, delay: 0.55, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-0 bg-green origin-left -mx-2 md:-mx-3 -my-1 rounded-[2px]"
            />
            <span className="relative">More money.</span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: EASE }}
            className="block"
          >
            Built to run itself.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.85, ease: EASE }}
          className="mt-10 md:mt-12 text-[18px] md:text-[20px] text-muted leading-[1.5] max-w-[54ch]"
        >
          Adelaide&rsquo;s automation &amp; growth studio. Custom-built, shipped in weeks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.95, ease: EASE }}
          className="mt-8 md:mt-10 flex flex-wrap gap-3"
        >
          <Link
            href="/contact"
            data-magnetic
            className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
          >
            Get started <span aria-hidden>→</span>
          </Link>
          <Link
            href="/services"
            data-magnetic
            className="text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 border border-ink hover:bg-ink hover:text-cream transition-colors duration-300"
          >
            See what we build
          </Link>
        </motion.div>

        {/* ─── Stat row pinned to bottom of viewport ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.1, ease: EASE }}
          className="mt-auto pt-10 md:pt-14 border-t border-line"
        >
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            <Stat value="Solo" suffix="." label="Built by Will, in Adelaide" />
            <Stat value="2" suffix=" wks" label="Brief to working version" />
            <Stat value="0" suffix=" lock-in" label="Cancel anytime · No retainer" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ value, suffix, label }) {
  return (
    <div>
      <div className="text-[36px] md:text-[52px] tracking-[-0.03em] leading-none mb-2 text-ink font-bold">
        {value}
        <span className="text-green-deep">{suffix}</span>
      </div>
      <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-muted">
        {label}
      </div>
    </div>
  )
}

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
          Adelaide-based automation &amp; growth studio. Custom-built, shipped in weeks.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.0, ease: EASE }}
          className="mt-10 md:mt-12 text-[15px] md:text-[16px] text-ink-soft leading-[1.55] max-w-[52ch]"
        >
          Hi &mdash; I&rsquo;m Will. Tell me where the friction is, I&rsquo;ll show you what I&rsquo;d build.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.15, ease: EASE }}
          className="mt-6 md:mt-7 flex flex-wrap gap-3"
        >
          <Link
            href="/contact"
            data-magnetic
            className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
          >
            Get started <span aria-hidden>→</span>
          </Link>
          <Link
            href="/contact"
            data-magnetic
            className="text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 border border-ink hover:bg-ink hover:text-cream transition-colors duration-300"
          >
            What slows your business down? <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

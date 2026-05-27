import Link from 'next/link'
import Hero from './components/Hero'
import GrowChapter from './components/chapters/GrowChapter'
import AutomateChapter from './components/chapters/AutomateChapter'
import BuildChapter from './components/chapters/BuildChapter'

export default function Home() {
  return (
    <>
      <Hero />
      <GrowChapter />
      <AutomateChapter />
      <BuildChapter />
      <Pricing />
      <FinalCTA />
    </>
  )
}

/* ─── How it works ──────────────────────────────────────────────────── */

/* ─── Pricing — confident process statement, no numbers, no menu ───── */

function Pricing() {
  const promises = [
    { tag: 'No hourly creep', body: "Fixed quote up front. If it comes in under, the price still stays the same — I just say so." },
    { tag: 'No lock-in',      body: "Month-to-month on retainers. Cancel anytime. Builds pay on delivery, not on signing." },
    { tag: 'No agency overhead', body: "Direct line to me — the person building it. No sales rep, no account manager, no junior team." },
  ]

  return (
    <section className="bg-cream-alt">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-32 md:py-44">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span className="w-8 h-px bg-ink" />
              <span>Pricing</span>
            </div>
            <h2
              className="font-display text-ink"
              style={{
                fontSize: 'var(--text-display-md)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                fontWeight: 800,
              }}
            >
              Every project starts with a free 30-minute call.
            </h2>
          </div>
          <p className="lg:col-span-5 text-[17px] md:text-[19px] text-ink-soft leading-[1.55] max-w-[44ch] pt-2 self-end">
            You walk me through the bottleneck. I walk you through what I&rsquo;d build,
            what it would cost, and how long it would take. You leave with a fixed quote
            &mdash; or a clear no.
          </p>
        </div>

        {/* Three promises — editorial directory rows, no $ amounts */}
        <div className="border-t border-line">
          {promises.map((p, i) => (
            <div
              key={p.tag}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-baseline gap-4 md:gap-10 py-7 md:py-9 border-b border-line"
            >
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <span>0{i + 1}</span>
                <span className="w-1 h-1 rounded-full bg-green-deep" />
                <span>{p.tag}</span>
              </div>
              <p className="text-[16px] md:text-[18px] text-ink leading-[1.55] max-w-[64ch]">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/contact"
            data-magnetic
            className="bg-ink text-cream px-6 py-3.5 rounded-full text-[15px] font-semibold inline-flex items-center gap-1.5 hover:bg-ink-soft transition-colors"
          >
            Book a free 30-min call <span aria-hidden>&rarr;</span>
          </Link>
          <Link href="/pricing" data-magnetic className="text-[14px] font-medium text-ink hover:text-green-deep transition">
            How we price &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA — editorial closing statement ───────────────────────── */

function FinalCTA() {
  return (
    <section className="bg-ink text-cream relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-40 md:py-52">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          {/* Left: closing statement */}
          <div className="lg:col-span-7">
            <h2
              className="font-display text-cream"
              style={{
                fontSize: 'var(--text-display-md)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                fontWeight: 800,
              }}
            >
              Tell me what&rsquo;s slow.
              <br />
              I&rsquo;ll show you what I&rsquo;d build.
            </h2>

            <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[54ch]">
              30-minute call. No deck, no pitch. You walk me through the bottleneck;
              I tell you whether it&rsquo;s worth building, what it would cost, and how long it would take.
            </p>
          </div>

          {/* Right: single CTA + founder note */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:items-end">
            <Link
              href="/contact"
              data-magnetic
              className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
            >
              Book a 30-min call <span aria-hidden>→</span>
            </Link>

            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40 lg:text-right">
              Will Herbert &middot; Adelaide
              <br />
              hello@herbert-aisolutions.com
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Reusable bits ─────────────────────────────────────────────────── */

function Eyebrow({ children, color = 'ink', pulse, center }) {
  const isWhite = color === 'white'
  return (
    <div className={`flex items-center gap-3 mb-9 font-mono text-[11px] uppercase tracking-[0.18em] ${isWhite ? 'text-white/55' : 'text-muted'} ${center ? 'justify-center' : ''}`}>
      <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />
      {pulse && <span className="w-1.5 h-1.5 rounded-full bg-green hi-pulse" />}
      {children}
      {center && <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />}
    </div>
  )
}

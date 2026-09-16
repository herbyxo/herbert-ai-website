import Link from 'next/link'
import Hero from './components/Hero'
import RevealOnScroll from './components/motion/RevealOnScroll'
import { INDUSTRIES, RUNGS, Eyebrow, AuditButton } from './components/site/shared'

// Home, restructured 16 Sep 2026 around the ladder (free audit, first AI
// employee, the system it runs in). The three bucket chapters are retired from
// home; their capability content lives on /services. Plan and decisions:
// docs/restructure-2026-09/PROJECT.md.

// Founder photo: drop the file at public/will.jpg and set this to '/will.jpg'.
const FOUNDER_PHOTO = null

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Proof />
      <IndustriesStrip />
      <FounderNote />
      <FinalCTA />
    </>
  )
}

function HowItWorks() {
  return (
    <section className="bg-cream-alt">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
        <RevealOnScroll className="max-w-[44ch] mb-14">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2
              className="font-display text-ink"
              style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}
            >
              Start with the job that costs you most.
            </h2>
          </div>
        </RevealOnScroll>
        <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
          {RUNGS.map((r) => (
            <RevealOnScroll key={r.n}>
              <div>
                <div className="font-mono text-[12px] tracking-[0.18em] text-green-deep mb-4">{r.n}</div>
                <h3 className="text-[22px] md:text-[24px] font-semibold tracking-[-0.01em] text-ink mb-3">{r.title}</h3>
                <p className="text-[15px] md:text-[16px] text-muted leading-[1.55]">{r.body}</p>
                <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">{r.price}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll className="mt-14 flex flex-wrap items-center gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <AuditButton />
            <Link href="/pricing" className="text-[15px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
              See how it&apos;s priced
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

const PROOF = [
  {
    tag: 'Live, click in',
    title: 'A property manager’s dashboard',
    href: 'https://dashboard.herbert-aisolutions.com',
    external: true,
  },
  {
    tag: 'Demo, plays itself',
    title: 'An accountant’s document chaser',
    href: '/demo/accountants',
    external: false,
  },
  {
    tag: 'Currently building',
    title: 'An operations hub for a finance brokerage',
    href: '/work',
    external: false,
  },
  {
    tag: 'Built',
    title: 'A marketing engine',
    href: '/work',
    external: false,
  },
]

function Proof() {
  return (
    <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
        <RevealOnScroll className="max-w-[44ch] mb-14">
          <div>
            <Eyebrow>The work</Eyebrow>
            <h2
              className="font-display text-ink"
              style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}
            >
              The systems, not the slides.
            </h2>
          </div>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-5">
          {PROOF.map((p, i) => {
            const inner = (
              <>
                <div className="flex items-center gap-2 mb-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{p.tag}</span>
                </div>
                <h3 className="text-[22px] font-medium tracking-[-0.02em] mb-7 text-ink">{p.title}</h3>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
                  {p.external ? 'Open it' : 'See it'} <span aria-hidden>&rarr;</span>
                </span>
              </>
            )
            const cls = 'bg-white border border-line rounded-3xl p-7 hover:border-ink/40 transition-colors flex flex-col h-full lift'
            return (
              <RevealOnScroll key={p.title} delay={(i % 2) * 0.08} className="h-full">
                {p.external ? (
                  <a href={p.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
                ) : (
                  <Link href={p.href} className={cls}>{inner}</Link>
                )}
              </RevealOnScroll>
            )
          })}
        </div>
        <RevealOnScroll className="mt-10">
          <Link href="/work" className="text-[15px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
            All the systems
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  )
}

function IndustriesStrip() {
  return (
    <section className="bg-cream-alt">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
        <RevealOnScroll className="max-w-[44ch] mb-14">
          <div>
            <Eyebrow>Industries</Eyebrow>
            <h2
              className="font-display text-ink"
              style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}
            >
              Built for the office you actually run.
            </h2>
          </div>
        </RevealOnScroll>
        <div className="border-b border-line">
          {INDUSTRIES.map((ind, i) => (
            <RevealOnScroll key={ind.slug} delay={i * 0.05}>
              <Link
                href={`/industries/${ind.slug}`}
                className="grid md:grid-cols-[1fr_auto] md:items-baseline gap-x-8 py-7 md:py-8 border-t border-line transition-[padding] duration-300 md:hover:pl-3 group"
              >
                <h3
                  className="font-display text-ink leading-[1] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(26px, 3.4vw, 34px)', fontWeight: 800 }}
                >
                  {ind.name}
                </h3>
                <span className="mt-3 md:mt-0 text-[13px] font-medium text-ink inline-flex items-center gap-1.5">
                  {ind.employee} <span aria-hidden className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

function FounderNote() {
  return (
    <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36 grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start">
        <div className="w-40 h-40 md:w-52 md:h-52 rounded-3xl overflow-hidden bg-cream-alt border border-line shrink-0">
          {FOUNDER_PHOTO ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={FOUNDER_PHOTO} alt="Will Herbert" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center font-display text-ink text-[56px] font-bold tracking-[-0.04em]">W</div>
          )}
        </div>
        <RevealOnScroll className="max-w-[60ch]">
          <div>
            <Eyebrow>Who builds it</Eyebrow>
            <p className="text-[19px] md:text-[22px] text-ink leading-[1.45] tracking-[-0.01em]">
              I&apos;m Will Herbert. I build every system myself, in Adelaide, and you deal
              with me from the audit to the day it goes live.
            </p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
              More about Will
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="bg-ink text-cream relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-40 md:py-52">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <h2
              className="font-display text-cream"
              style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 800 }}
            >
              Got a job everyone
              <br />
              hates doing?
            </h2>
            <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[54ch]">
              Forty five minutes, free, a written page back.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6 lg:items-end">
            <AuditButton dark />
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

import Link from 'next/link'
import { notFound } from 'next/navigation'
import RevealOnScroll from '../../components/motion/RevealOnScroll'
import { INDUSTRIES, RUNGS, Eyebrow, AuditButton } from '../../components/site/shared'

// One page per target industry: the job, the AI employee, the demo, the audit.
// The content lives in components/site/shared.js so the home strip and the
// index say the same thing. These are the seed of the per-industry product
// pages the long-run plan needs (docs/restructure-2026-09/PROJECT.md, M3).

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const ind = INDUSTRIES.find((i) => i.slug === slug)
  if (!ind) return {}
  return {
    title: `${ind.employee} for ${ind.name.toLowerCase()}`,
    description: `${ind.bottleneck} ${ind.employee} takes that job: ${ind.employeeDoes} Built in 14 days after a free AI audit.`,
    alternates: { canonical: `/industries/${ind.slug}` },
    openGraph: { title: `${ind.employee} for ${ind.name.toLowerCase()} · Herbert AI`, url: `/industries/${ind.slug}`, images: ['/opengraph-image'] },
  }
}

export default async function IndustryPage({ params }) {
  const { slug } = await params
  const ind = INDUSTRIES.find((i) => i.slug === slug)
  if (!ind) notFound()
  const fallback = INDUSTRIES.find((i) => i.demoLive)

  return (
    <>
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>{ind.name}</Eyebrow>
          <h1
            className="font-display text-ink max-w-[18ch] break-words"
            style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}
          >
            {ind.employee} for {ind.short.toLowerCase()}.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch]">
            {ind.ask}
          </p>
          <div className="mt-10">
            <AuditButton />
          </div>
        </div>
      </section>

      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <RevealOnScroll>
              <Eyebrow>The job</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <h2
                className="font-display text-ink max-w-[14ch]"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                What eats the week.
              </h2>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.12} className="max-w-[60ch] space-y-5 text-[16px] md:text-[17px] text-muted leading-[1.7] pt-1">
            <div className="space-y-5">
              <p>{ind.bottleneck}</p>
              <p>
                It is not one big task. It is the same small one, done again every day by someone
                who was hired to do something else. The audit puts a number on it: hours a week,
                who does them, what they cost a year, in your own figures.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <RevealOnScroll>
              <Eyebrow>The AI employee</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <h2
                className="font-display text-ink max-w-[14ch]"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                {ind.employee}.
              </h2>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.12} className="max-w-[60ch] space-y-5 text-[16px] md:text-[17px] text-muted leading-[1.7] pt-1">
            <div className="space-y-5">
              <p>{ind.employeeDoes}</p>
              <p>
                It does that one job, every day, on your real data, and it connects to the
                software you already use rather than replacing it. Your team approves anything
                that goes out. It is live in 14 days, and if it is not, it is free.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                {ind.demoLive ? (
                  <Link href={ind.demo} className="inline-flex items-center gap-2 text-[15px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
                    Watch it run <span aria-hidden>&rarr;</span>
                  </Link>
                ) : (
                  <Link href={fallback.demo} className="inline-flex items-center gap-2 text-[15px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
                    See the pattern on the accountants demo <span aria-hidden>&rarr;</span>
                  </Link>
                )}
                {ind.liveProof && (
                  <a href={ind.liveProof.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[15px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
                    {ind.liveProof.label} <span aria-hidden>&rarr;</span>
                  </a>
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll className="max-w-[44ch] mb-14">
            <div>
              <Eyebrow>How it starts</Eyebrow>
              <h2
                className="font-display text-ink"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                Audit first. Then fourteen days.
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            {RUNGS.map((r) => (
              <RevealOnScroll key={r.n}>
                <div>
                  <div className="font-mono text-[12px] tracking-[0.18em] text-green-deep mb-4">{r.n}</div>
                  <h3 className="text-[20px] md:text-[22px] font-semibold tracking-[-0.01em] text-ink mb-3">{r.title}</h3>
                  <p className="text-[15px] md:text-[16px] text-muted leading-[1.55]">{r.body}</p>
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">{r.price}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-32 md:py-44">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Eyebrow color="white">Start here</Eyebrow>
              <h2
                className="font-display text-cream max-w-[16ch]"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 800 }}
              >
                Find out what it costs you.
              </h2>
              <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[52ch]">
                Forty five minutes with Will, a written page back within two business days, no
                obligation.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-5 lg:items-end">
              <AuditButton dark />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

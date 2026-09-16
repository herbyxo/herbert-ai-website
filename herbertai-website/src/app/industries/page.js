import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'
import { INDUSTRIES, Eyebrow, AuditButton } from '../components/site/shared'

export const metadata = {
  title: 'Industries | AI employees for accountants, allied health, trades and real estate',
  description:
    'The four offices Herbert AI builds for first: accountants and bookkeepers, allied health, trades with an office, and real estate and property management. Each with the job that costs most and the AI employee that takes it.',
  alternates: { canonical: '/industries' },
  openGraph: {
    title: 'Industries · Herbert AI',
    description: 'Accountants, allied health, trades, real estate: the job that costs most and the AI employee that takes it.',
    url: '/industries',
    images: ['/opengraph-image'],
  },
}

export default function Industries() {
  return (
    <>
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>Industries</Eyebrow>
          <h1
            className="font-display text-ink max-w-[16ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            Built for the office you actually run.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[62ch]">
            Four kinds of office, each with a job that eats more hours than it should and an
            AI employee built to take it. Not on the list? The audit works the same way for any
            business with 3 to 20 staff and a job everyone hates doing.
          </p>
        </div>
      </section>

      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <div className="border-b border-line">
            {INDUSTRIES.map((ind, i) => (
              <RevealOnScroll key={ind.slug} delay={i * 0.05}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="grid md:grid-cols-[1fr_1.4fr_auto] md:items-baseline gap-x-8 py-8 md:py-10 border-t border-line transition-[padding] duration-300 md:hover:pl-3 group"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[12px] text-muted tracking-[0.1em] shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <h2
                      className="font-display text-ink leading-[1] tracking-[-0.03em]"
                      style={{ fontSize: 'clamp(26px, 3.6vw, 36px)', fontWeight: 800 }}
                    >
                      {ind.name}
                    </h2>
                  </div>
                  <p className="mt-2 md:mt-0 text-[15px] md:text-[17px] text-muted leading-[1.5]">{ind.bottleneck}</p>
                  <span className="mt-3 md:mt-0 text-[13px] font-medium text-ink inline-flex items-center gap-1.5">
                    {ind.employee} <span aria-hidden className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </span>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="bg-ink text-cream rounded-3xl p-12 md:p-20">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-end">
              <div>
                <Eyebrow color="white">Not on the list</Eyebrow>
                <h2
                  className="font-display text-cream mb-6 max-w-[18ch]"
                  style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}
                >
                  The audit finds the job either way.
                </h2>
                <p className="text-cream/70 text-[17px] leading-[1.6] max-w-[52ch]">
                  Lawyer, gym, mechanic, salon, cleaning company: if someone in the office does
                  the same thing over and over, the audit will put a cost on it and say whether
                  software should take it.
                </p>
              </div>
              <AuditButton dark />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

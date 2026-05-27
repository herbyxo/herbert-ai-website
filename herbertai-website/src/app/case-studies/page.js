import Link from 'next/link'

export const metadata = {
  title: 'Case Studies',
  description:
    'Real Herbert AI builds — the bottleneck, what got built, and what changed for the business after.',
  alternates: { canonical: '/case-studies' },
  openGraph: {
    title: 'Case Studies · Herbert AI',
    description: 'Real builds, real outcomes — see how Herbert AI works in the wild.',
    url: '/case-studies',
  },
}

const studies = [
  {
    slug: 'blendz',
    tag: 'Hospitality · Adelaide',
    name: 'Blendz By Ben',
    summary:
      'Custom site, owner dashboard, and booking flow that replaced Squarespace + Insta-DM bookings.',
    metric: '$400/mo',
    metricLabel: 'in bookings retained',
    live: true,
  },
  {
    slug: null,
    tag: 'Trades · Sydney',
    name: 'Master Freeze',
    summary:
      'AI voice receptionist for a commercial refrigeration company. Qualifies callouts, books jobs, escalates emergencies.',
    metric: 'Coming',
    metricLabel: 'case study soon',
    live: false,
  },
  {
    slug: null,
    tag: 'Hospitality · UK',
    name: 'Claremont',
    summary:
      'Full-stack concept site for a UK hospitality group — multi-page design, menus, booking integration.',
    metric: 'Coming',
    metricLabel: 'case study soon',
    live: false,
  },
]

export default function CaseStudies() {
  return (
    <>
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <Eyebrow>Case Studies</Eyebrow>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-semibold tracking-[-0.03em] leading-[1] mb-7 max-w-[20ch] text-ink">
            Real builds, <span className="serif-em text-green-deep">real outcomes.</span>
          </h1>
          <p className="max-w-[60ch] text-[17px] md:text-[19px] text-muted leading-[1.6]">
            The bottleneck before, what got built, what changed for the business after.
            No vague stats, no anonymised brands.
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 lg:px-12 pb-24 md:pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {studies.map((s) => {
            const inner = (
              <>
                <div className="flex items-center gap-2 mb-7">
                  <span className={`w-1.5 h-1.5 rounded-full ${s.live ? 'bg-green-deep' : 'bg-muted/40'}`} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{s.tag}</span>
                </div>
                <h3 className="text-[24px] font-medium tracking-[-0.02em] mb-3 text-ink">{s.name}</h3>
                <p className="text-[14px] text-muted leading-[1.6] mb-8">{s.summary}</p>
                <div className="border-t border-line pt-5 flex items-baseline justify-between">
                  <div>
                    <div className={`text-[28px] font-medium tracking-[-0.02em] ${s.live ? 'text-ink' : 'text-muted'}`}>
                      {s.metric}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mt-1">
                      {s.metricLabel}
                    </div>
                  </div>
                  {s.live && (
                    <span className="text-[13px] font-medium text-ink inline-flex items-center gap-1.5">
                      Read <span aria-hidden>→</span>
                    </span>
                  )}
                </div>
              </>
            )
            return s.live ? (
              <Link
                key={s.name}
                href={`/case-studies/${s.slug}`}
                className="bg-cream-alt rounded-3xl p-8 border border-line hover:border-ink/40 transition-colors block lift"
              >
                {inner}
              </Link>
            ) : (
              <div
                key={s.name}
                className="bg-cream-alt/50 rounded-3xl p-8 border border-line/60 block"
              >
                {inner}
              </div>
            )
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 lg:px-12 pb-24 md:pb-32 max-w-[1280px] mx-auto">
        <div className="bg-ink text-white rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="hero-blob absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none" />
          <div className="relative">
            <Eyebrow color="white" center>Want one of these for your business?</Eyebrow>
            <h2 className="text-[40px] md:text-[64px] font-medium leading-[1.02] tracking-[-0.03em] mb-6 max-w-[18ch] mx-auto">
              Book a <span className="serif-em text-green">free demo.</span>
            </h2>
            <p className="text-white/70 text-[17px] leading-[1.6] mb-10 max-w-[52ch] mx-auto">
              30-minute call, no pitch. Tell me the bottleneck — I&apos;ll tell you whether it&apos;s worth building.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
              >
                Book a free demo <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Eyebrow({ children, color = 'ink', center }) {
  const isWhite = color === 'white'
  return (
    <div className={`flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] ${isWhite ? 'text-white/55' : 'text-muted'} ${center ? 'justify-center' : ''}`}>
      <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />
      {children}
      {center && <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />}
    </div>
  )
}

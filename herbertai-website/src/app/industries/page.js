import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'

export const metadata = {
  title: 'Industries we work with — Adelaide automation studio',
  description:
    'Web design & automation for trades, hospitality, property management, accounting, allied health and creative businesses across Adelaide and Australia-wide. Custom systems scoped to your industry.',
  alternates: { canonical: '/industries' },
  openGraph: {
    title: 'Industries — Adelaide automation studio · Herbert AI',
    description:
      'Industry automation in Adelaide — for trades, hospitality, property, accounting, allied health and creative SMBs. Custom builds, quoted on scope.',
    url: '/industries',
  },
}

const industries = [
  {
    tag: 'Trades',
    description: 'sparkies, plumbers, builders, HVAC',
  },
  {
    tag: 'Hospitality',
    description: 'cafés, restaurants, salons, gyms',
  },
  {
    tag: 'Property',
    description: 'residential property management',
  },
  {
    tag: 'Accounting',
    description: 'accountants, bookkeepers, tax agents',
  },
  {
    tag: 'Health',
    description: 'physio, chiro, OT, dental, allied health',
  },
  {
    tag: 'Creative',
    description: 'photographers, videographers, designers',
  },
]

export default function Industries() {
  return (
    <>
      {/* ─── Hero — static (above the fold, must paint on first load) ─ */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>Industries</Eyebrow>
          <h1
            className="font-display text-ink max-w-[16ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            Industries we work with.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[62ch]">
            Adelaide automation studio building custom web and AI systems for small businesses
            across multiple industries. Each one gets a tailored build, scoped to what your business
            actually needs and quoted on the work. Adelaide-based, Australia-wide.
          </p>
          <p className="text-[15px] text-muted leading-[1.6] mt-4 max-w-[60ch]">
            Not in your industry?{' '}
            <Link href="#open" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
              We&apos;ll still build for you
            </Link>.
          </p>
        </div>
      </section>

      {/* ─── Industry grid — discrete cards on the page surface ─── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll>
            <Eyebrow>Who we build for</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h2
              className="font-display text-ink max-w-[16ch] mb-16"
              style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
            >
              Built for your trade. Quoted on scope.
            </h2>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => {
              const Wrapper = ind.href ? Link : 'div'
              const wrapperProps = ind.href
                ? { href: ind.href, className: 'block group h-full' }
                : { className: 'h-full' }
              return (
                <RevealOnScroll key={ind.tag} delay={(i % 3) * 0.08} className="h-full">
                  <Wrapper {...wrapperProps}>
                    <div className="bg-cream border border-line rounded-3xl p-7 flex flex-col lift h-full">
                      <div className="flex items-center gap-2 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-deep shrink-0" />
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{ind.tag}</span>
                      </div>
                      <h3 className="text-[22px] md:text-[24px] font-medium tracking-[-0.01em] text-ink leading-[1.25]">
                        {ind.description}
                      </h3>
                      {ind.proof && (
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mt-auto pt-6">
                          · {ind.proof}
                        </p>
                      )}
                    </div>
                  </Wrapper>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Open to any industry — ink CTA panel ─── */}
      <section id="open" className="bg-cream scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="bg-ink text-cream rounded-3xl p-12 md:p-20">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-end">
              <div>
                <Eyebrow color="white">Open to any industry</Eyebrow>
                <h2
                  className="font-display text-cream mb-6 max-w-[18ch]"
                  style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}
                >
                  Don&apos;t see yours? We&apos;ll build it.
                </h2>
                <p className="text-cream/70 text-[17px] leading-[1.6] max-w-[52ch]">
                  Lawyer, gym owner, real estate agent, mechanic, cleaner, salon &mdash; if you&apos;ve got
                  repetitive admin work, there&apos;s a custom system that fixes it. Tell us the bottleneck,
                  we&apos;ll scope it and quote it.
                </p>
              </div>
              <Link
                href="/contact"
                data-magnetic
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center justify-between gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300 self-start md:self-end"
              >
                Scope your system <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── Eyebrow ──────────────────────────────────────────────────── */
function Eyebrow({ children, color = 'ink' }) {
  const isWhite = color === 'white'
  return (
    <div className={`flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] ${isWhite ? 'text-cream/55' : 'text-muted'}`}>
      <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />
      {children}
    </div>
  )
}

import Link from 'next/link'

export const metadata = {
  title: 'Industries we work with',
  description:
    'Industry-specific systems Herbert AI builds for trades, hospitality, property management, accounting, allied health, and creative businesses across Australia.',
  alternates: { canonical: '/industries' },
  openGraph: {
    title: 'Industries · Herbert AI',
    description:
      'Industry-specific systems for trades, hospitality, property, accounting, health, and creative SMBs.',
    url: '/industries',
  },
}

const industries = [
  {
    tag: 'Trades',
    description: 'Sparkies, plumbers, builders, HVAC',
    proof: 'Master Freeze · Guy’s Electrical',
  },
  {
    tag: 'Hospitality',
    description: 'Cafés, restaurants, salons, gyms',
    proof: 'Blendz By Ben',
  },
  {
    tag: 'Property',
    description: 'Residential property management',
    proof: 'See Property Manager AI →',
    href: '/property-managers',
  },
  {
    tag: 'Accounting',
    description: 'Accountants, bookkeepers, tax agents',
  },
  {
    tag: 'Health',
    description: 'Physio, chiro, OT, dental, allied health',
  },
  {
    tag: 'Creative',
    description: 'Photographers, videographers, designers',
  },
]

const statusStyles = {
  Live: 'bg-green/20 text-green-deep border-green/30',
  Productised: 'bg-green-deep/10 text-green-deep border-green-deep/30',
  Available: 'bg-cream-alt text-muted border-line',
}

export default function Industries() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <Eyebrow>Industries</Eyebrow>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-semibold tracking-[-0.03em] leading-[1] mb-7 max-w-[18ch] text-ink">
            Industries <span className="serif-em text-green-deep">we work with.</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[60ch]">
            We build custom systems for small businesses across these industries. Each one gets a tailored build —
            scoped to what your business actually needs, quoted on the work.
          </p>
          <p className="text-[15px] text-muted leading-[1.6] mt-4 max-w-[60ch]">
            Not in your industry?{' '}
            <Link href="#open" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
              We&apos;ll still build for you
            </Link>.
          </p>
        </div>
      </section>

      {/* Industry grid */}
      <section className="bg-cream-alt border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind) => {
              const Wrapper = ind.href ? Link : 'div'
              const wrapperProps = ind.href
                ? { href: ind.href, className: 'block group' }
                : {}
              return (
                <Wrapper key={ind.tag} {...wrapperProps}>
                  <div className={`rounded-3xl p-8 text-white relative overflow-hidden border border-white/5 min-h-[200px] flex flex-col bg-gradient-to-br from-[#0A0A0A] to-[#171717] ${ind.href ? 'group-hover:border-green/30 transition-colors' : ''}`}>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-green" style={{ boxShadow: '0 0 10px rgba(0, 255, 136, 0.4)' }} />
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">{ind.tag}</span>
                    </div>
                    <h3 className="text-[24px] md:text-[26px] font-medium tracking-[-0.01em] text-white leading-[1.25]">
                      {ind.description}
                    </h3>
                    {ind.proof && (
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40 mt-auto pt-6">
                        · {ind.proof}
                      </p>
                    )}
                  </div>
                </Wrapper>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open to any industry */}
      <section id="open" className="bg-cream scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="bg-ink text-white rounded-[32px] p-12 md:p-20 relative overflow-hidden">
            <div className="hero-blob absolute top-[-200px] right-[-100px] w-[500px] h-[500px] pointer-events-none" />
            <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-end">
              <div>
                <Eyebrow color="white">Open to any industry</Eyebrow>
                <h2 className="text-[36px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] mb-6 max-w-[20ch]">
                  Don&apos;t see yours? <span className="serif-em text-green">We&apos;ll build it.</span>
                </h2>
                <p className="text-white/70 text-[17px] leading-[1.6] max-w-[52ch]">
                  Lawyer, gym owner, real estate agent, mechanic, cleaner, salon — if you&apos;ve got
                  repetitive admin work, there&apos;s a custom system that fixes it. Tell us the bottleneck,
                  we&apos;ll scope it and quote it.
                </p>
              </div>
              <Link
                href="/contact"
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center justify-between gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300 self-start md:self-end"
              >
                Scope your system <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Eyebrow({ children, color = 'ink' }) {
  const isWhite = color === 'white'
  return (
    <div className={`flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] ${isWhite ? 'text-white/55' : 'text-muted'}`}>
      <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />
      {children}
    </div>
  )
}

import Link from 'next/link'

const industries = [
  {
    tag: 'Trades',
    name: 'Electricians · plumbers · HVAC',
    status: 'Live',
    body: 'AI voice receptionist that qualifies callouts and books them in. Booking pipeline through AroFlo. Quote follow-up automation, no-show recovery.',
    proof: 'Master Freeze · Guy’s Electrical',
    accent: '#00FF88',
  },
  {
    tag: 'Hospitality',
    name: 'Cafés · restaurants · barbershops',
    status: 'Live',
    body: 'Custom booking system with deposit handling. Customer DB, SMS reminders, no-show recovery, owner dashboard for daily ops.',
    proof: 'Blendz By Ben',
    accent: '#C44569',
  },
  {
    tag: 'Property',
    name: 'Property managers',
    status: 'Productised',
    body: 'AI tenant intake on your number. Maintenance requests captured, logged, and approved in one click. Tradie booking automated.',
    proof: 'See /property-managers',
    accent: '#7A8BFF',
  },
  {
    tag: 'Accounting',
    name: 'Accountants · bookkeepers',
    status: 'Available',
    body: 'Client onboarding portal — intake forms, document collection, e-sign engagement letters. Quarterly reminder + checklist systems.',
    proof: '',
    accent: '#E8B96A',
  },
  {
    tag: 'Health',
    name: 'Physio · chiro · OT · dental',
    status: 'Available',
    body: 'Exercise prescription system: pick from library, auto-generate branded PDF with instructions, email to patient. Recall reminder sequences for dormant patients.',
    proof: '',
    accent: '#5EEAD4',
  },
  {
    tag: 'Creative',
    name: 'Photographers · videographers',
    status: 'Available',
    body: 'Booking + deposit flow. Client gallery delivery with download tracking. Contract automation with e-sign. Replaces 3 separate tools.',
    proof: '',
    accent: '#F5B638',
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
            Industry-specific <span className="serif-em text-green-deep">ops systems.</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[60ch]">
            Every industry has 2 or 3 admin chores that eat hours a week — booking, intake, follow-up, recall, document generation.
            Custom systems solve them once and run themselves.
          </p>
          <p className="text-[15px] text-muted leading-[1.6] mt-4 max-w-[60ch]">
            Below are example systems we&apos;ve built or are set up to build. Not in your industry?{' '}
            <Link href="#open" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
              We&apos;ll build for any industry
            </Link>.
          </p>
        </div>
      </section>

      {/* Industry grid */}
      <section className="bg-cream-alt border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind) => (
              <div
                key={ind.tag}
                className="rounded-3xl p-7 md:p-8 text-white relative overflow-hidden border border-white/5 min-h-[280px] flex flex-col bg-gradient-to-br from-[#0A0A0A] to-[#171717]"
              >
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: ind.accent, boxShadow: `0 0 10px ${ind.accent}40` }} />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">{ind.tag}</span>
                  </div>
                  <span className={`font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-1 rounded-full border ${
                    ind.status === 'Live' ? 'bg-green/20 text-green border-green/30' :
                    ind.status === 'Productised' ? 'bg-green-deep/15 text-green border-green/20' :
                    'bg-white/5 text-white/55 border-white/15'
                  }`}>
                    {ind.status}
                  </span>
                </div>
                <h3 className="text-[20px] md:text-[22px] font-medium tracking-[-0.01em] text-white mb-3 leading-[1.25]">
                  {ind.name}
                </h3>
                <p className="text-[14px] text-white/65 leading-[1.6] mb-5">{ind.body}</p>
                {ind.proof && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40 mt-auto">
                    · {ind.proof}
                  </p>
                )}
              </div>
            ))}
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

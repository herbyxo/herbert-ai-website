import Link from 'next/link'

export const metadata = {
  title: 'Pricing',
  description:
    'Productised plans — AI Voice Agent $297/mo, Website + Hosting $300 setup + $197/mo, AI Chatbot $197/mo, Bundle $697/mo (saves $294/mo). Custom builds quoted on scope. No lock-in.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing · Herbert AI',
    description:
      'Productised monthly plans plus custom-quoted builds. No lock-in, no agency retainer.',
    url: '/pricing',
  },
}

const plans = [
  {
    tag: 'Voice',
    name: 'AI Voice Agent',
    price: '$297',
    suffix: '/ month',
    note: '2-week free trial',
    bullets: ['24/7 answering', 'Custom prompt', 'Booking + SMS', 'Emergency escalation'],
  },
  {
    tag: 'Web',
    name: 'Website + Hosting',
    price: '$300',
    suffix: 'setup',
    secondary: '$197 / month',
    secondaryNote: 'hosting + maintenance',
    bullets: ['Custom design', 'Mobile-first build', 'Vercel hosting', 'Ongoing updates'],
  },
  {
    tag: 'Chat',
    name: 'AI Chatbot Widget',
    price: '$197',
    suffix: '/ month',
    bullets: ['Trained on your business', 'Lead capture', 'Booking through chat', 'Mobile + desktop'],
  },
  {
    tag: 'Bundle',
    name: 'All three, together',
    price: '$697',
    suffix: '/ month',
    strike: '$991',
    note: 'Save $294 / month · No setup fees',
    bullets: ['Voice agent included', 'Website + hosting included', 'Chatbot widget included', 'Priority support'],
    highlight: true,
  },
]

const faqs = [
  {
    q: 'Are there any contracts?',
    a: 'No. Everything is month-to-month — cancel anytime, no notice period for productised plans.',
  },
  {
    q: 'What if I need something custom?',
    a: 'Custom builds are quoted on scope. Tell us the bottleneck and we’ll come back with a fixed quote and timeline.',
  },
  {
    q: 'How long does setup take?',
    a: 'Website: 1–2 weeks. Voice agent or chatbot: 3–5 days after we’ve scoped your prompts and FAQs. Bundle: 2–3 weeks total.',
  },
  {
    q: 'Can I start with one and add more later?',
    a: 'Yes. Most clients start with one productised plan and add the others when they see the value. You can also upgrade to the bundle anytime.',
  },
]

export default function Pricing() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-semibold tracking-[-0.03em] leading-[1] mb-7 max-w-[18ch] text-ink">
            Honest pricing. <span className="serif-em text-green-deep">No lock-in.</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch]">
            Productised plans for the common patterns (voice, web + hosting, chat).
            Anything outside those gets quoted on scope — no retainers, no agency overhead.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-cream-alt border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="max-w-[48ch] mb-12">
            <Eyebrow>Productised plans</Eyebrow>
            <h2 className="text-[32px] md:text-[44px] font-medium leading-[1.05] tracking-[-0.03em] text-ink mb-3">
              Fixed prices on <span className="serif-em text-green-deep">the common patterns.</span>
            </h2>
            <p className="text-[15px] text-muted leading-[1.6]">
              Three repeatable builds priced up-front. Everything else on the{' '}
              <Link href="/services" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">services page</Link>
              {' '}— ads, SEO, dashboards, custom workflows — is quoted on scope.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((p) => (
              <div
                key={p.tag}
                className={`rounded-3xl p-7 border flex flex-col ${
                  p.highlight ? 'bg-ink text-white border-ink' : 'bg-cream border-line'
                }`}
              >
                <div className="flex items-center gap-2 mb-7">
                  <span className={`w-1.5 h-1.5 rounded-full ${p.highlight ? 'bg-green' : 'bg-green-deep'}`} />
                  <span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${p.highlight ? 'text-white/55' : 'text-muted'}`}>
                    {p.tag}
                  </span>
                  {p.highlight && (
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-green">Most popular</span>
                  )}
                </div>
                <h3 className={`text-[20px] font-medium tracking-[-0.01em] mb-3 ${p.highlight ? 'text-white' : 'text-ink'}`}>
                  {p.name}
                </h3>
                <div className="mb-1">
                  {p.strike && (
                    <p className={`text-[13px] line-through ${p.highlight ? 'text-white/40' : 'text-muted'}`}>
                      {p.strike} / month
                    </p>
                  )}
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-[40px] font-medium tracking-[-0.03em] ${p.highlight ? 'text-white' : 'text-ink'}`}>
                      {p.price}
                    </span>
                    <span className={`text-[14px] ${p.highlight ? 'text-white/60' : 'text-muted'}`}>{p.suffix}</span>
                  </div>
                  {p.secondary && (
                    <p className={`text-[13px] mt-1 ${p.highlight ? 'text-white/60' : 'text-muted'}`}>
                      + <span className="font-medium">{p.secondary}</span> {p.secondaryNote}
                    </p>
                  )}
                  {p.note && (
                    <p className={`font-mono text-[10px] uppercase tracking-[0.12em] mt-3 ${p.highlight ? 'text-green' : 'text-green-deep'}`}>
                      {p.note}
                    </p>
                  )}
                </div>

                <ul className="space-y-2.5 my-7">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className={`w-1 h-1 rounded-full mt-2 shrink-0 ${p.highlight ? 'bg-green' : 'bg-green-deep'}`} />
                      <span className={`text-[14px] leading-[1.5] ${p.highlight ? 'text-white/80' : 'text-ink-soft'}`}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[14px] font-semibold transition-colors ${
                    p.highlight
                      ? 'bg-green text-ink hover:shadow-[0_0_28px_var(--green-glow)]'
                      : 'bg-ink text-cream hover:bg-ink-soft'
                  }`}
                >
                  Get started <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom builds */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="bg-ink text-white rounded-[32px] p-12 md:p-20 relative overflow-hidden">
            <div className="hero-blob absolute top-[-160px] right-[-160px] w-[460px] h-[460px] pointer-events-none" />

            <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-end">
              <div>
                <Eyebrow color="white">Custom builds</Eyebrow>
                <h2 className="text-[36px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] mb-6 max-w-[18ch]">
                  Need something <span className="serif-em text-green">not on the menu?</span>
                </h2>
                <p className="text-white/70 text-[17px] leading-[1.6] max-w-[52ch]">
                  Custom AI agents, dashboards, workflow automation, bespoke booking systems — all quoted on scope.
                  Fixed quote, fixed timeline. No retainer, no agency overhead.
                </p>
              </div>

              <Link
                href="/contact"
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center justify-between gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300 self-start md:self-end"
              >
                Scope a custom build <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-cream-alt border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="max-w-[44ch] mb-12">
            <Eyebrow>Pricing FAQs</Eyebrow>
            <h2 className="text-[40px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
              Common questions. <span className="serif-em text-green-deep">Straight answers.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {faqs.map((f) => (
              <div key={f.q} className="bg-cream border border-line rounded-3xl p-7">
                <h3 className="text-[17px] font-medium text-ink mb-2.5 tracking-[-0.01em]">{f.q}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28 text-center">
          <Eyebrow center>Ready when you are</Eyebrow>
          <h2 className="text-[36px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-ink mb-6 max-w-[20ch] mx-auto">
            30-minute call, <span className="serif-em text-green-deep">no pitch.</span>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-ink text-cream px-7 py-4 rounded-full font-semibold text-[16px] hover:bg-ink-soft transition-colors"
          >
            Talk to Will <span aria-hidden>→</span>
          </Link>
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

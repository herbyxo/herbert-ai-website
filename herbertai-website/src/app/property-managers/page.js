import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'

export const metadata = {
  title: 'Property Manager AI — automated maintenance requests',
  description:
    'Property management automation for Australia. An AI maintenance request system handles tenant call handling on your number — requests captured, logged, and approved in one click, tradies booked end-to-end. Portfolio-based pricing from $99/month.',
  alternates: { canonical: '/property-managers' },
  openGraph: {
    title: 'Property Manager AI · Herbert AI',
    description:
      'AI maintenance request system for Australian property managers: tenant call handling, one-click approval, automated tradie booking. From $99/month.',
    url: '/property-managers',
  },
}

const problems = [
  {
    tag: 'Interruptions',
    title: 'Tenant calls eat your day',
    body: 'Every maintenance call pulls you off higher-value work. And they don’t respect business hours.',
  },
  {
    tag: 'Tracking',
    title: 'Requests fall through cracks',
    body: 'Scattered calls, texts, and emails — impossible to track what’s been actioned and what hasn’t.',
  },
  {
    tag: 'Coordination',
    title: 'Chasing tradies is exhausting',
    body: 'Finding an available plumber or electrician, coordinating access, and following up takes hours every week.',
  },
]

const steps = [
  {
    n: '01',
    title: 'Tenant calls in',
    body: 'Tenant rings your number. The AI agent answers 24/7, identifies them by phone or property, and gathers the details — what broke, how urgent, when they’re home.',
  },
  {
    n: '02',
    title: 'You review and approve',
    body: 'Every request lands in your dashboard instantly. You get a notification, review the details, and approve or deny in one click — from anywhere.',
  },
  {
    n: '03',
    title: 'Tradesperson gets booked',
    body: 'On approval, a second agent contacts your preferred tradies, confirms a booking time, and notifies the tenant. Zero phone tag.',
  },
]

const features = [
  {
    tag: 'Intake',
    title: 'AI tenant intake agent',
    bullets: [
      'Answers calls 24/7 on your number',
      'Identifies tenant by phone or address',
      'Classifies issue type — plumbing, electrical, structural',
      'Assesses urgency and flags emergencies instantly',
      'Captures preferred access windows',
    ],
  },
  {
    tag: 'Dashboard',
    title: 'Manager dashboard',
    bullets: [
      'All requests logged and tracked in one place',
      'Approve or deny with one click',
      'Filter by property, urgency, or status',
      'Email or SMS notifications on new requests',
      'Full history and resolution notes per property',
    ],
  },
  {
    tag: 'Booking',
    title: 'Automated tradie booking',
    bullets: [
      'Contacts your preferred tradesperson network',
      'Confirms booking against tenant availability',
      'Sends confirmation to tenant automatically',
      'Logs booking details back to the dashboard',
      'Follows up if tradesperson doesn’t confirm',
    ],
  },
  {
    tag: 'Safety',
    title: 'Smart escalation',
    bullets: [
      'Gas leaks, flooding, safety issues bypass the queue',
      'Urgent requests call you directly if needed',
      'Auto-approves pre-authorised emergency categories',
      'Tenant kept informed at every step',
      'Audit trail for every decision and action',
    ],
  },
]

const integrations = [
  { name: 'AroFlo', sub: 'Job management' },
  { name: 'Google Calendar', sub: 'Scheduling' },
  { name: 'SMS · Twilio', sub: 'Tenant notifications' },
  { name: 'n8n', sub: 'Custom workflows' },
]

const plans = [
  {
    tag: 'Starter',
    sub: 'Up to 20 properties',
    price: '$99',
    suffix: '/ month',
    bullets: ['AI intake agent', 'Manager dashboard', 'Email notifications', 'Basic reporting'],
  },
  {
    tag: 'Growth',
    sub: 'Up to 60 properties',
    price: '$199',
    suffix: '/ month',
    bullets: ['Everything in Starter', 'Automated booking', 'SMS notifications', 'Priority filtering'],
  },
  {
    tag: 'Pro',
    sub: 'Up to 150 properties',
    price: '$399',
    suffix: '/ month',
    bullets: ['Everything in Growth', 'Emergency escalation', 'Full audit trail', 'Priority support'],
    highlight: true,
  },
  {
    tag: 'Enterprise',
    sub: '150+ properties',
    price: 'Custom',
    bullets: ['Everything in Pro', 'Dedicated onboarding', 'Custom integrations', 'SLA guarantee'],
  },
]

export default function PropertyManagers() {
  return (
    <>
      {/* ─── Hero — static (above the fold, must paint on first load) ─ */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>Property Manager AI · Productised</Eyebrow>
          <h1
            className="font-display text-ink max-w-[16ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            Maintenance requests, handled automatically.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[60ch]">
            Property management automation, built for Australian portfolios. Tenants call in. An AI
            maintenance request system captures the issue and logs it. You review and approve in one click.
            A tradesperson gets booked. All without lifting a finger.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link
              href="/contact"
              data-magnetic
              className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
            >
              Get started <span aria-hidden>→</span>
            </Link>
            <Link
              href="#how-it-works"
              className="text-ink px-7 py-4 rounded-full font-medium text-[16px] inline-flex items-center gap-2 border border-ink/20 hover:border-ink/50 transition-colors"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Problems ─────────────────────────────────────────────── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll className="max-w-[44ch] mb-14">
            <div>
              <Eyebrow>The problem</Eyebrow>
              <h2
                className="font-display text-ink"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                Sound familiar?
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-3 gap-5">
            {problems.map((p, i) => (
              <RevealOnScroll key={p.tag} delay={i * 0.08} className="h-full">
                <div className="bg-cream border border-line rounded-3xl p-7 lift h-full">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{p.tag}</span>
                  </div>
                  <h3 className="text-[19px] font-medium tracking-[-0.01em] text-ink mb-3 leading-[1.3]">{p.title}</h3>
                  <p className="text-[15px] text-muted leading-[1.6]">{p.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-cream scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <RevealOnScroll>
              <Eyebrow>How it works</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <h2
                className="font-display text-ink max-w-[14ch]"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                Three steps. Fully automated.
              </h2>
            </RevealOnScroll>
          </div>
          <div className="grid gap-8 pt-1">
            {steps.map((s, i) => (
              <RevealOnScroll key={s.n} delay={i * 0.08}>
                <div className="flex gap-5">
                  <span className="font-mono text-[12px] text-muted pt-1 shrink-0">{s.n}</span>
                  <div>
                    <h3 className="text-[18px] font-medium tracking-[-0.01em] mb-1.5 text-ink">{s.title}</h3>
                    <p className="text-[15px] text-muted leading-[1.6] max-w-[58ch]">{s.body}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────────── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll className="max-w-[44ch] mb-14">
            <div>
              <Eyebrow>What you get</Eyebrow>
              <h2
                className="font-display text-ink"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                Everything you actually need.
              </h2>
              <p className="text-[16px] text-muted leading-[1.6] mt-5 max-w-[52ch]">
                Built specifically for managers juggling multiple properties and tenants.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <RevealOnScroll key={f.tag} delay={(i % 2) * 0.08} className="h-full">
                <div className="bg-cream border border-line rounded-3xl p-7 md:p-8 lift h-full">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{f.tag}</span>
                  </div>
                  <h3 className="text-[20px] font-medium tracking-[-0.01em] text-ink mb-5">{f.title}</h3>
                  <ul className="space-y-2.5">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-green-deep mt-2 shrink-0" />
                        <span className="text-[14px] text-ink-soft leading-[1.55]">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Integrations ─────────────────────────────────────────── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll className="max-w-[44ch] mb-10">
            <div>
              <Eyebrow>Integrations</Eyebrow>
              <h2
                className="font-display text-ink"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                Connects with the tools you already use.
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08} className="flex flex-wrap gap-3">
            <>
              {integrations.map((i) => (
                <div key={i.name} className="bg-cream-alt border border-line rounded-2xl px-5 py-3.5 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
                  <div>
                    <div className="text-[14px] font-medium text-ink leading-tight">{i.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mt-0.5">{i.sub}</div>
                  </div>
                </div>
              ))}
            </>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── Pricing — portfolio tiers (discrete cards) ───────────── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll className="max-w-[44ch] mb-12">
            <div>
              <Eyebrow>Pricing</Eyebrow>
              <h2
                className="font-display text-ink"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                Portfolio-based pricing. No per-request fees.
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((p, i) => (
              <RevealOnScroll key={p.tag} delay={i * 0.06} className="h-full">
                <div
                  className={`rounded-3xl p-7 border flex flex-col h-full ${p.highlight ? 'bg-ink text-cream border-ink' : 'bg-cream border-line'}`}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <span className={`w-1.5 h-1.5 rounded-full ${p.highlight ? 'bg-green' : 'bg-green-deep'}`} />
                    <span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${p.highlight ? 'text-cream/55' : 'text-muted'}`}>{p.tag}</span>
                    {p.highlight && (
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-green">Most popular</span>
                    )}
                  </div>
                  <p className={`text-[13px] mb-4 ${p.highlight ? 'text-cream/55' : 'text-muted'}`}>{p.sub}</p>
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className={`text-[36px] font-medium tracking-[-0.03em] ${p.highlight ? 'text-cream' : 'text-ink'}`}>{p.price}</span>
                    {p.suffix && <span className={`text-[13px] ${p.highlight ? 'text-cream/60' : 'text-muted'}`}>{p.suffix}</span>}
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className={`w-1 h-1 rounded-full mt-2 shrink-0 ${p.highlight ? 'bg-green' : 'bg-green-deep'}`} />
                        <span className={`text-[13px] leading-[1.5] ${p.highlight ? 'text-cream/80' : 'text-ink-soft'}`}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    data-magnetic
                    className={`mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[14px] font-semibold transition-all duration-300 ${
                      p.highlight
                        ? 'bg-green text-ink hover:shadow-[0_0_28px_var(--green-glow)] hover:-translate-y-px'
                        : 'bg-ink text-cream hover:bg-ink-soft'
                    }`}
                  >
                    Get started <span aria-hidden>→</span>
                  </Link>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA — full-bleed ink ───────────────────────────── */}
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-32 md:py-44">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Eyebrow color="white">Ready when you are</Eyebrow>
              <h2
                className="font-display text-cream max-w-[20ch]"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 800 }}
              >
                Ready to automate your maintenance workflow?
              </h2>
              <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[52ch]">
                Book a 15-minute call. We&apos;ll show you exactly how it works for your portfolio.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-5 lg:items-end">
              <Link
                href="/contact"
                data-magnetic
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
              >
                Book a call <span aria-hidden>→</span>
              </Link>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40 lg:text-right">
                15-minute portfolio walkthrough
              </span>
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

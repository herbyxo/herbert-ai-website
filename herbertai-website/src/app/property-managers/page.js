import Link from 'next/link'

export const metadata = {
  title: 'Property Manager AI — automated maintenance intake',
  description:
    'AI tenant intake on your number. Maintenance requests captured, logged, and approved in one click. Tradie booking automated end-to-end. Portfolio-based pricing from $99/month.',
  alternates: { canonical: '/property-managers' },
  openGraph: {
    title: 'Property Manager AI · Herbert AI',
    description:
      'Tenants call, AI logs the request, you approve in one click, tradie gets booked. From $99/month.',
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
      {/* Hero */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <Eyebrow>Property Manager AI · Productised</Eyebrow>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-semibold tracking-[-0.03em] leading-[1] mb-7 max-w-[18ch] text-ink">
            Maintenance requests, <span className="serif-em text-green-deep">handled automatically.</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[60ch] mb-9">
            Tenants call in. An AI agent captures the issue and logs it. You review and approve in one click.
            A tradesperson gets booked. All without lifting a finger.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="bg-green text-ink px-6 py-3.5 rounded-full font-semibold text-[15px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
            >
              Get started <span aria-hidden>→</span>
            </Link>
            <Link
              href="#how-it-works"
              className="text-ink px-6 py-3.5 rounded-full font-medium text-[15px] inline-flex items-center gap-2 border border-ink/20 hover:border-ink/50 transition-colors"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="bg-cream-alt border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="max-w-[44ch] mb-14">
            <Eyebrow>The problem</Eyebrow>
            <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
              Sound <span className="serif-em text-green-deep">familiar?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {problems.map((p) => (
              <div key={p.tag} className="bg-cream border border-line rounded-3xl p-7">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{p.tag}</span>
                </div>
                <h3 className="text-[19px] font-medium tracking-[-0.01em] text-ink mb-3 leading-[1.3]">{p.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-cream scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-[40px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-ink max-w-[18ch]">
              Three steps. <span className="serif-em text-green-deep">Fully automated.</span>
            </h2>
          </div>
          <div className="grid gap-8 pt-1">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-5">
                <span className="font-mono text-[12px] text-muted pt-1 shrink-0">{s.n}</span>
                <div>
                  <h3 className="text-[18px] font-medium tracking-[-0.01em] mb-1.5 text-ink">{s.title}</h3>
                  <p className="text-[15px] text-muted leading-[1.6] max-w-[58ch]">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-cream-alt border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="max-w-[44ch] mb-14">
            <Eyebrow>What you get</Eyebrow>
            <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
              Everything you <span className="serif-em text-green-deep">actually need.</span>
            </h2>
            <p className="text-[16px] text-muted leading-[1.6] mt-4 max-w-[52ch]">
              Built specifically for managers juggling multiple properties and tenants.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f) => (
              <div key={f.tag} className="bg-cream border border-line rounded-3xl p-7 md:p-8">
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
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-24">
          <div className="max-w-[44ch] mb-10">
            <Eyebrow>Integrations</Eyebrow>
            <h2 className="text-[28px] md:text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
              Connects with the tools <span className="serif-em text-green-deep">you already use.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {integrations.map((i) => (
              <div key={i.name} className="bg-cream-alt border border-line rounded-2xl px-5 py-3.5 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
                <div>
                  <div className="text-[14px] font-medium text-ink leading-tight">{i.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mt-0.5">{i.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-cream-alt border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="max-w-[44ch] mb-12">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
              Portfolio-based pricing. <span className="serif-em text-green-deep">No per-request fees.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((p) => (
              <div
                key={p.tag}
                className={`rounded-3xl p-7 border flex flex-col ${p.highlight ? 'bg-ink text-white border-ink' : 'bg-cream border-line'}`}
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className={`w-1.5 h-1.5 rounded-full ${p.highlight ? 'bg-green' : 'bg-green-deep'}`} />
                  <span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${p.highlight ? 'text-white/55' : 'text-muted'}`}>{p.tag}</span>
                  {p.highlight && (
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-green">Most popular</span>
                  )}
                </div>
                <p className={`text-[13px] mb-4 ${p.highlight ? 'text-white/55' : 'text-muted'}`}>{p.sub}</p>
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className={`text-[36px] font-medium tracking-[-0.03em] ${p.highlight ? 'text-white' : 'text-ink'}`}>{p.price}</span>
                  {p.suffix && <span className={`text-[13px] ${p.highlight ? 'text-white/60' : 'text-muted'}`}>{p.suffix}</span>}
                </div>
                <ul className="space-y-2.5 mb-6">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className={`w-1 h-1 rounded-full mt-2 shrink-0 ${p.highlight ? 'bg-green' : 'bg-green-deep'}`} />
                      <span className={`text-[13px] leading-[1.5] ${p.highlight ? 'text-white/80' : 'text-ink-soft'}`}>{b}</span>
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

      {/* Final CTA */}
      <section className="px-6 lg:px-12 py-24 md:py-32 max-w-[1280px] mx-auto">
        <div className="bg-ink text-white rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="hero-blob absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none" />
          <div className="relative">
            <Eyebrow color="white" center>Ready when you are</Eyebrow>
            <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] mb-6 max-w-[24ch] mx-auto">
              Ready to automate <span className="serif-em text-green">your maintenance workflow?</span>
            </h2>
            <p className="text-white/70 text-[17px] leading-[1.6] mb-10 max-w-[52ch] mx-auto">
              Book a 15-minute call. We&apos;ll show you exactly how it works for your portfolio.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
            >
              Book a call <span aria-hidden>→</span>
            </Link>
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

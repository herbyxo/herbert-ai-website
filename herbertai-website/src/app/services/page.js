import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'

/* ─── Service catalogue ─────────────────────────────────────────────── */

const buckets = [
  {
    id: 'grow',
    label: 'Grow',
    headline: 'Get more customers through the door.',
    body: 'Paid traffic, organic, lifecycle marketing — the systems that bring new business in. Set up once, run on their own, measured monthly.',
    services: [
      { tag: 'Ads', title: 'Paid ads · Google + Meta', body: 'Campaign setup, creative, daily monitoring. Scoped to your budget and target market.' },
      { tag: 'SEO', title: 'Organic search', body: 'Technical SEO, local SEO, content. Get found by the people already searching for what you do.' },
      { tag: 'Email · SMS', title: 'Email + SMS marketing', body: 'List management, broadcast campaigns, automated sequences. Resend + Twilio under the hood.' },
      { tag: 'Funnels', title: 'Lead magnets + funnels', body: 'Free-PDF → email capture → nurture sequence → call booked. Whole funnel built and wired.' },
    ],
  },
  {
    id: 'automate',
    label: 'Automate',
    headline: 'Handle the admin without you in the loop.',
    body: 'Voice, chat, workflows — anything where a computer can do the boring repetitive work. You see the outcomes, not the process.',
    demo: 'voice',
    services: [
      { tag: 'Voice', title: 'AI voice agents', body: 'A 24/7 receptionist. Custom prompt per business. Qualifies, books, SMSs confirmations.', hasDemo: true },
      { tag: 'Chat', title: 'AI chatbot widget', body: 'Site widget trained on your business. Captures leads, answers questions, books through chat.' },
      { tag: 'Workflows', title: 'Workflow automation', body: 'Tool-to-tool stitching. AroFlo, CRM, Calendar, Gmail, SMS — all talking to each other. Built in n8n.' },
      { tag: 'Booking', title: 'Booking + calendar', body: 'Custom booking flows, deposit handling, calendar sync, SMS reminders, no-show recovery.' },
    ],
  },
  {
    id: 'build',
    label: 'Build',
    headline: 'Custom software for your business.',
    body: 'Websites, dashboards, internal tools — bespoke custom builds. Yours to keep, no platform lock-in.',
    services: [
      { tag: 'Web', title: 'Marketing websites', body: 'Custom-coded sites, no template. Mobile-first, fast, modern hosting.', hasDemo: true },
      { tag: 'Dashboard', title: 'Custom dashboards', body: 'Admin panels, customer database, owner consoles. Secure email-link login — no passwords to remember.' },
      { tag: 'Portals', title: 'Customer portals', body: 'Customers log in to see their bookings, files, and history. Email-link or phone-number sign-in — no passwords.' },
      { tag: 'Booking', title: 'Custom booking systems', body: 'Fully bespoke — not Calendly with a logo. Service selection, deposits, calendar sync.' },
    ],
  },
]

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function Services() {
  return (
    <>
      {/* ─── Hero — static (above the fold) ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>Services</Eyebrow>
          <h1
            className="font-display text-ink max-w-[16ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            What we build for small business.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[62ch]">
            Adelaide-based studio for web design, development, AI automation and growth.
            Three buckets &mdash; grow, automate, build. Every project scoped to your
            business and quoted on the work.
          </p>
          <p className="text-[15px] text-muted leading-[1.6] mt-4 max-w-[60ch]">
            Got a specific industry?{' '}
            <Link href="/industries" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
              See if it&rsquo;s one we work with
            </Link>.
          </p>
        </div>
      </section>

      {/* ─── Buckets ─── */}
      {buckets.map((bucket, i) => (
        <section
          key={bucket.id}
          id={bucket.id}
          className={`${i % 2 === 0 ? 'bg-cream-alt' : 'bg-cream'} scroll-mt-24`}
        >
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
            <RevealOnScroll className="max-w-[44ch] mb-14">
              <div>
                <Eyebrow>{bucket.label}</Eyebrow>
                <h2
                  className="font-display text-ink mb-5"
                  style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
                >
                  {bucket.headline}
                </h2>
                <p className="text-[16px] md:text-[17px] text-muted leading-[1.6]">{bucket.body}</p>
              </div>
            </RevealOnScroll>

            {/* Service cards */}
            <RevealOnScroll className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              <>
                {bucket.services.map((s) => (
                  <ServiceCard key={s.title} service={s} />
                ))}
              </>
            </RevealOnScroll>

            {/* Inline demo */}
            {bucket.demo === 'voice' && <VoiceDemo />}

            {/* Build → start a conversation */}
            {bucket.id === 'build' && (
              <RevealOnScroll className="mt-12">
                <Link
                  href="/contact"
                  data-magnetic
                  className="inline-flex items-center gap-2 text-[15px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors"
                >
                  Got a build in mind? Let&rsquo;s talk <span aria-hidden>→</span>
                </Link>
              </RevealOnScroll>
            )}
          </div>
        </section>
      ))}

      {/* ─── Pricing teaser — ink panel ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="bg-ink text-cream rounded-3xl p-12 md:p-20">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-end">
              <div>
                <Eyebrow color="white">Pricing</Eyebrow>
                <h2
                  className="font-display text-cream mb-6 max-w-[16ch]"
                  style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}
                >
                  Priced on scope. Not on a menu.
                </h2>
                <p className="text-cream/70 text-[17px] leading-[1.6] max-w-[52ch]">
                  Every project is different, so every quote is based on your specifications.
                  I&rsquo;ll always work within your budget and deliver exactly what you&rsquo;re
                  after &mdash; while staying competitive with anyone out there.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/pricing"
                  data-magnetic
                  className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center justify-between gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
                >
                  How we price <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Custom builds CTA ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pb-24 md:pb-32">
          <div className="bg-cream-alt border border-line rounded-3xl p-12 md:p-20">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-end">
              <div>
                <Eyebrow>Doesn&apos;t fit the menu?</Eyebrow>
                <h2
                  className="font-display text-ink mb-6 max-w-[14ch]"
                  style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}
                >
                  Got something more specific?
                </h2>
                <p className="text-muted text-[17px] leading-[1.6] max-w-[52ch]">
                  Custom systems are scoped to your bottleneck and quoted on the build. Tell me a bit
                  about how your business runs, and together we&rsquo;ll land on the best solution for
                  your needs.
                </p>
              </div>
              <Link
                href="/start"
                data-magnetic
                className="bg-ink text-cream px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center justify-between gap-2 hover:bg-ink-soft transition-colors self-start md:self-end"
              >
                Scope a custom build <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

/* ─── Components ────────────────────────────────────────────────────── */

function ServiceCard({ service }) {
  return (
    <div className="bg-white border border-line rounded-3xl p-7 min-h-[200px] flex flex-col lift">
      <div className="flex items-center gap-2 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-deep shrink-0" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{service.tag}</span>
      </div>
      <h3 className="text-[20px] font-medium tracking-[-0.01em] text-ink mb-3 leading-[1.25]">{service.title}</h3>
      <p className="text-[14px] text-muted leading-[1.6]">{service.body}</p>
    </div>
  )
}

function VoiceDemo() {
  return (
    <div className="mt-14 grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-12 items-center bg-white border border-line rounded-3xl p-8 md:p-10">
      <div>
        <Eyebrow>Demo · unedited</Eyebrow>
        <h3 className="text-[24px] md:text-[28px] font-medium tracking-[-0.01em] text-ink mb-3">
          A real call handled by the voice agent.
        </h3>
        <p className="text-[14px] text-muted leading-[1.6]">
          Demo build for a commercial refrigeration company. Customer reported a
          refrigerant leak — the agent qualified the job, collected access details,
          closed the call. Zero human involvement.
        </p>
      </div>
      <div className="bg-ink rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-green hi-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55">Inbound call · unedited</span>
        </div>
        <audio controls preload="metadata" className="w-full" style={{ filter: 'invert(0.85)' }}>
          <source src="/steve-demo.wav" type="audio/wav" />
        </audio>
      </div>
    </div>
  )
}

function Eyebrow({ children, color = 'ink' }) {
  const isWhite = color === 'white'
  return (
    <div className={`flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] ${isWhite ? 'text-cream/55' : 'text-muted'}`}>
      <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />
      {children}
    </div>
  )
}

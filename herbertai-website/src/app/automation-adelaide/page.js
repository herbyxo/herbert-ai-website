import RevealOnScroll from '../components/motion/RevealOnScroll'

export const metadata = {
  title: { absolute: 'Business Automation Adelaide — Custom Workflows & AI' },
  description:
    'Adelaide business automation for small business. Invoices chased, bookings confirmed, leads followed up — built to run itself. Free automation map in 48 hours.',
  alternates: { canonical: '/automation-adelaide' },
  openGraph: {
    title: 'Business Automation Adelaide · Herbert AI',
    description:
      'The admin that eats your week, built to run itself. Free automation map in 48 hours — see what is automatable before you spend a cent.',
    url: '/automation-adelaide',
    images: ['/opengraph-image'],
  },
}

const faqs = [
  {
    q: 'What does automation cost?',
    a: 'Quoted on scope — one workflow that chases invoices costs a lot less than a system that runs your whole front office. Your automation map comes with one fixed price. No hourly billing, no retainers, no surprises.',
  },
  {
    q: 'Do I need to change my existing software?',
    a: "No — automation connects what you already use. Your calendar, your invoicing, your job system, your inbox stay exactly where they are; the automation sits between them and does the re-typing, chasing and forwarding for you.",
  },
  {
    q: "What's actually worth automating?",
    a: "Anything repetitive you do five or more times a week — sending the same reply, chasing the same invoice, copying details between tools. If it follows the same steps every time, it's a candidate. The free map tells you which ones pay for themselves fastest.",
  },
  {
    q: 'What if it breaks?',
    a: "Hosting and care are included — I watch it and fix it. You're not left holding a workflow you didn't build. If something changes in one of your tools, I update the automation before it costs you anything.",
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
}

export default function AutomationAdelaide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ─── Hero — static (above the fold, must paint on first load) ─ */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-20 md:pt-40 md:pb-28">
          <Eyebrow>Automation — Adelaide</Eyebrow>
          <h1
            className="font-display text-ink max-w-[14ch]"
            style={{
              fontSize: 'var(--text-display-lg)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              fontWeight: 800,
            }}
          >
            Adelaide business automation for <em className="serif-em">small business.</em>
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch]">
            The admin that eats your week — invoices chased, bookings confirmed, leads
            followed up, data re-typed between tools — built to run itself. Tell me
            what&apos;s slow and I&apos;ll map what&apos;s automatable, free.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#audit"
              data-magnetic
              className="inline-flex items-center gap-2 bg-green text-ink px-7 py-3.5 rounded-full font-semibold text-[15px] hover:shadow-[0_0_28px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
            >
              Get my free automation map <span aria-hidden>&rarr;</span>
            </a>
          </div>

          {/* Proof strip */}
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[760px]">
            <Stat n="$0" label="To see what's automatable" />
            <Stat n="2–4 wks" label="Typical build" />
            <Stat n="1" label="Person, start to finish" />
            <Stat n="100%" label="Yours — you own it" />
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display text-ink mb-14" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            Map first.
            <br />
            Money later.
          </h2>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            <Step
              n="01"
              title="Tell me what eats your week"
              body="Two minutes in the form below — what you do, which tools you use, and the repetitive job you'd pay to never do again."
            />
            <Step
              n="02"
              title="Free automation map in 48 hours"
              body="Which tasks are automatable, what the system would look like, and what it'd save you each week. A real plan for your business — not a sales call. No payment, no obligation."
            />
            <Step
              n="03"
              title="Like it? Fixed quote, shipped in weeks"
              body="One fixed price, a real timeline, and a system that runs itself. If not, the map is yours to keep — it cost you nothing."
            />
          </div>
        </div>
      </section>

      {/* ─── What gets automated ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>What gets automated</Eyebrow>
          <h2 className="font-display text-ink mb-14" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            The admin runs itself.
            <br />
            You run the business.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 max-w-[1000px]">
            <Inclusion title="Lead follow-up" body="Every enquiry answered in seconds, not whenever you next check your phone. Speed wins the job." />
            <Inclusion title="Bookings + reminders" body="Confirmations, reschedules, no-show chasing — handled without you touching a thing." />
            <Inclusion title="Invoices + payments" body="Raised, sent, chased. The awkward follow-up email goes out on time, every time, without you writing it." />
            <Inclusion title="Tools that talk" body="CRM, calendar, email, job system — synced, so you never re-type the same details twice." />
            <Inclusion title="AI on the phones" body="Voice agents and chat handling the repetitive calls and questions, around the clock." />
            <Inclusion title="Reporting" body="The numbers you check every week, compiled and sent to you — no spreadsheet wrangling." />
          </div>
        </div>
      </section>

      {/* ─── Form ─── */}
      <section id="audit" className="bg-cream-alt scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 grid md:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
          <div>
            <Eyebrow>Free automation map</Eyebrow>
            <h2 className="font-display text-ink" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
              Get your free automation map.
            </h2>
            <p className="mt-6 text-[16px] md:text-[17px] text-muted leading-[1.55] max-w-[46ch]">
              Fill this in and I&apos;ll personally map what&apos;s automatable in your
              business within 48 hours — which tasks, what it&apos;d look like, what
              it&apos;d save. Free, no obligation.
            </p>
            <p className="mt-6 text-[14px] text-muted">
              Prefer to talk?{' '}
              <a href="tel:+61448111840" className="text-ink font-medium hover:text-green-deep transition-colors">
                0448 111 840
              </a>{' '}
              — Will, Adelaide.
            </p>
          </div>

          <RevealOnScroll>
            <div className="bg-cream border border-line rounded-3xl p-8 md:p-10">
              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-5">
                <input type="hidden" name="access_key" value="f3618e04-e007-4ee9-a80d-f96e3cc8d481" />
                <input type="hidden" name="from_name" value="Herbert AI — Automation Adelaide" />
                <input type="hidden" name="subject" value="New audit request — Automation Adelaide" />
                <input type="hidden" name="redirect" value="https://herbert-aisolutions.com/start/thanks" />
                <input
                  type="hidden"
                  name="autoresponse_subject"
                  value="Got it — your automation map is in the works"
                />
                <input
                  type="hidden"
                  name="autoresponse_message"
                  value={`Hi — Will here from Herbert AI.\n\nThanks for the details. I'm mapping what's automatable in your business now — you'll have it in your inbox within 48 hours, with a fixed quote if you'd like it built.\n\nIf you think of another job that eats your week, just reply to this email.\n\n— Will Herbert\nHerbert AI · Adelaide`}
                />
                {/* Honeypot for spam */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <Field id="name" label="Your name" type="text" placeholder="Your name" required />
                <Field id="business" label="Business name" type="text" placeholder="Your business" required />
                <Field id="email" label="Email" type="email" placeholder="you@business.com" required />
                <Field id="phone" label="Phone (optional)" type="tel" placeholder="0400 000 000" />

                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
                    Walk me through a normal week — what&apos;s the most annoying repetitive job?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-cream border border-line rounded-2xl text-[15px] text-ink placeholder:text-muted focus:border-ink transition-colors"
                    placeholder="e.g. Every Monday I chase last week's invoices, re-type job details from email into the calendar, and text customers their booking times by hand."
                  />
                </div>

                <button
                  type="submit"
                  data-magnetic
                  className="w-full inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full font-semibold text-[15px] hover:bg-ink-soft transition-colors"
                >
                  Send — get my automation map <span aria-hidden>&rarr;</span>
                </button>
                <p className="text-[12px] text-muted text-center">
                  Free map, no obligation. Reply within a business day.
                </p>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>Common questions</Eyebrow>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-[1000px]">
            {faqs.map((f) => (
              <Faq key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA — the one green-flood moment ─── */}
      <section className="bg-green">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 text-center">
          <h2 className="font-display text-ink mx-auto max-w-[18ch]" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            Get your week back.
          </h2>
          <a
            href="#audit"
            data-magnetic
            className="mt-10 inline-flex items-center gap-2 bg-ink text-cream px-8 py-4 rounded-full font-semibold text-[16px] hover:bg-ink-soft transition-colors"
          >
            Get my free automation map <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </section>
    </>
  )
}

/* ─── helpers ──────────────────────────────────────────────────── */

function Stat({ n, label }) {
  return (
    <div>
      <div className="font-display text-ink text-[28px] md:text-[34px] font-bold tracking-[-0.02em]">{n}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{label}</div>
    </div>
  )
}

function Step({ n, title, body }) {
  return (
    <RevealOnScroll>
      <div>
        <div className="font-mono text-[12px] tracking-[0.18em] text-green-deep mb-4">{n}</div>
        <h3 className="text-[20px] md:text-[22px] font-semibold tracking-[-0.01em] text-ink mb-3">{title}</h3>
        <p className="text-[15px] md:text-[16px] text-muted leading-[1.55]">{body}</p>
      </div>
    </RevealOnScroll>
  )
}

function Inclusion({ title, body }) {
  return (
    <div>
      <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink mb-2">{title}</h3>
      <p className="text-[15px] text-muted leading-[1.55]">{body}</p>
    </div>
  )
}

function Faq({ q, a }) {
  return (
    <div>
      <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-ink mb-3">{q}</h3>
      <p className="text-[15px] md:text-[16px] text-muted leading-[1.55]">{a}</p>
    </div>
  )
}

function Field({ id, label, type, placeholder, required }) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-cream border border-line rounded-2xl text-[15px] text-ink placeholder:text-muted focus:border-ink transition-colors"
      />
    </div>
  )
}

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
      <span className="w-8 h-px bg-ink" />
      {children}
    </div>
  )
}

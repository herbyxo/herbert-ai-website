import RevealOnScroll from '../components/motion/RevealOnScroll'

export const metadata = {
  title: { absolute: 'The Bottleneck Pilot | Working Software in 14 Days | Herbert AI' },
  description:
    'One fixed price. We find the admin job that wastes the most time in your business and put working software on it in 14 days. Live in 14 days or it is free.',
  alternates: { canonical: '/pilot' },
  openGraph: {
    title: 'The Bottleneck Pilot · Herbert AI',
    description:
      'Working software on your worst admin bottleneck in 14 days. Fixed price, credited in full if you go ahead with a bigger build.',
    url: '/pilot',
    images: ['/opengraph-image'],
  },
}

const faqs = [
  {
    q: 'What counts as a bottleneck?',
    a: 'Any office job someone does over and over that follows the same steps every time. Chasing documents or invoices, re-typing details between systems, writing the same emails, confirming bookings by hand. If your team groans about it, it qualifies.',
  },
  {
    q: 'What do I actually get for $3,500?',
    a: 'One live, working workflow built for your business and running on your real data by day 14, a walkthrough with your team, and a one-page map of the next three time sinks in your business. Software, not a report.',
  },
  {
    q: 'What does "credited in full" mean?',
    a: 'If you go ahead with a bigger build within 60 days, the whole $3,500 comes off that price. The pilot ends up costing you nothing. If you stop at the pilot, you keep the working system either way.',
  },
  {
    q: 'Are there ongoing costs after the pilot?',
    a: "The first 30 days of hosting, support and AI running costs are included. After that you choose: keep it running for $200 a month, which covers hosting, fixes and normal AI usage, or have it moved onto your own accounts with a written guide to how it works, or roll it into a bigger build. You get a reminder a week before. If no choice is made by day 30, it's paused and your data is sent to you, and it can still be moved onto your own accounts whenever you're ready.",
  },
  {
    q: 'What if it is not live in 14 days?',
    a: "Then it's free. The clock starts when you've given access to the tools involved and we've had the kickoff chat. Fourteen days later it's running or you don't pay.",
  },
  {
    q: 'Do I have to change my existing software?',
    a: 'No. The pilot connects what you already use. Your calendar, inbox, job system and invoicing stay where they are; the new workflow sits between them and does the repetitive part.',
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

export default function Pilot() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ─── Hero: static (above the fold, must paint on first load) ─ */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-20 md:pt-40 md:pb-28">
          <Eyebrow>The Bottleneck Pilot</Eyebrow>
          <h1
            className="font-display text-ink max-w-[16ch]"
            style={{
              fontSize: 'var(--text-display-lg)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              fontWeight: 800,
            }}
          >
            Working software in <em className="serif-em">14 days.</em>
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch]">
            Every business has one admin job that eats more time than it should.
            We find the most expensive one in yours and put working software on
            it: live, on your real data, doing a real job. Not a report. Not a
            roadmap. A working system.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#book"
              data-magnetic
              className="inline-flex items-center gap-2 bg-green text-ink px-7 py-3.5 rounded-full font-semibold text-[15px] hover:shadow-[0_0_28px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
            >
              Find my bottleneck <span aria-hidden>&rarr;</span>
            </a>
          </div>

          {/* Terms strip */}
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[820px]">
            <Stat n="$3,500" label="Fixed. No hourly billing" />
            <Stat n="14 days" label="Live, or it's free" />
            <Stat n="100%" label="Credited to a bigger build" />
            <Stat n="1" label="Builder, start to finish" />
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display text-ink mb-14" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            Two weeks.
            <br />
            Three steps.
          </h2>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            <Step
              n="01"
              title="A 60 minute chat"
              body="You talk through how the business runs and where the time goes. Will listens and finds the job that costs you the most. No slides, no pitch."
            />
            <Step
              n="02"
              title="Will builds it"
              body="Two weeks, built around the tools you already use. You get a progress update, not a project plan, and nothing changes for your team until it's ready."
            />
            <Step
              n="03"
              title="Live on day 14"
              body="Your team starts using it the same day, with a walkthrough so everyone knows how. You also get a one-page map of the next three time sinks in your business."
            />
          </div>
        </div>
      </section>

      {/* ─── What it fixes ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>What it fixes</Eyebrow>
          <h2 className="font-display text-ink mb-14" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            The job everyone
            <br />
            hates doing.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 max-w-[1000px]">
            <Inclusion title="Chasing" body="Documents, invoices, approvals. The follow-up goes out on time, every time, without anyone writing it." />
            <Inclusion title="Re-typing" body="The same details keyed into three systems. Entered once, synced everywhere." />
            <Inclusion title="The same emails" body="Quotes, confirmations, updates: drafted for you, checked by you, sent in seconds." />
            <Inclusion title="Booking admin" body="Confirmations, reschedules and reminders handled without touching the calendar." />
            <Inclusion title="Handovers" body="Job details that live in one person's head or inbox, put on one screen the whole team can see." />
            <Inclusion title="The Monday report" body="The numbers you compile by hand every week, compiled for you." />
          </div>
        </div>
      </section>

      {/* ─── Form ─── */}
      <section id="book" className="bg-cream-alt scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 grid md:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
          <div>
            <Eyebrow>Start here</Eyebrow>
            <h2 className="font-display text-ink" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
              Book the 15 minute call.
            </h2>
            <p className="mt-6 text-[16px] md:text-[17px] text-muted leading-[1.55] max-w-[46ch]">
              Tell us what a normal week looks like and Will calls you to find the
              bottleneck. Fifteen minutes, no obligation. If the pilot is not the
              right fit, you&apos;ll be told so on the call.
            </p>
            <p className="mt-6 text-[14px] text-muted">
              Prefer to talk now?{' '}
              <a href="tel:+61448111840" className="text-ink font-medium hover:text-green-deep transition-colors">
                0448 111 840
              </a>{' '}
              (Will, Adelaide).
            </p>
          </div>

          <RevealOnScroll>
            <div className="bg-cream border border-line rounded-3xl p-8 md:p-10">
              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-5">
                <input type="hidden" name="access_key" value="f3618e04-e007-4ee9-a80d-f96e3cc8d481" />
                <input type="hidden" name="from_name" value="Herbert AI · Bottleneck Pilot" />
                <input type="hidden" name="subject" value="New pilot request · /pilot" />
                <input type="hidden" name="redirect" value="https://herbert-aisolutions.com/start/thanks" />
                <input
                  type="hidden"
                  name="autoresponse_subject"
                  value="Got it, let's find your bottleneck"
                />
                <input
                  type="hidden"
                  name="autoresponse_message"
                  value={`Hi, Will here from Herbert AI.\n\nThanks for the details. I'll give you a call to find the bottleneck. Fifteen minutes, no pitch.\n\nIf another annoying job comes to mind before then, just reply to this email.\n\nWill Herbert\nHerbert AI · Adelaide`}
                />
                {/* Honeypot for spam */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <Field id="name" label="Your name" type="text" placeholder="Your name" required />
                <Field id="business" label="Business name" type="text" placeholder="Your business" required />
                <Field id="email" label="Email" type="email" placeholder="you@business.com" required />
                <Field id="phone" label="Phone" type="tel" placeholder="0400 000 000" required />

                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
                    What&apos;s the job in your office everyone hates doing?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-cream border border-line rounded-2xl text-[15px] text-ink placeholder:text-muted focus:border-ink transition-colors"
                    placeholder="e.g. Chasing clients for documents, then copying the details into our system, then emailing everyone an update."
                  />
                </div>

                <button
                  type="submit"
                  data-magnetic
                  className="w-full inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full font-semibold text-[15px] hover:bg-ink-soft transition-colors"
                >
                  Book my 15 minute call <span aria-hidden>&rarr;</span>
                </button>
                <p className="text-[12px] text-muted text-center">
                  No obligation. Reply within a business day.
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

      {/* ─── Final CTA: the one green-flood moment ─── */}
      <section className="bg-green">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 text-center">
          <h2 className="font-display text-ink mx-auto max-w-[18ch]" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            Fourteen days from now, it&apos;s done.
          </h2>
          <a
            href="#book"
            data-magnetic
            className="mt-10 inline-flex items-center gap-2 bg-ink text-cream px-8 py-4 rounded-full font-semibold text-[16px] hover:bg-ink-soft transition-colors"
          >
            Find my bottleneck <span aria-hidden>&rarr;</span>
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

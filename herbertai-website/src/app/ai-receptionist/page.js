import RevealOnScroll from '../components/motion/RevealOnScroll'

export const metadata = {
  title: { absolute: 'AI Receptionist for Australian Small Business | Herbert AI' },
  description:
    'An AI receptionist that answers every call 24/7, qualifies the job and books it in — built custom for Australian small businesses. Hear a demo for free.',
  alternates: { canonical: '/ai-receptionist' },
  openGraph: {
    title: 'AI Receptionist · Herbert AI',
    description:
      'An AI receptionist that answers every call 24/7, qualifies the job and books it in — built custom for your business.',
    url: '/ai-receptionist',
    images: ['/opengraph-image'],
  },
}

const faqs = [
  {
    q: 'How much does it cost?',
    a: 'Quoted on your call volume and how much you want the agent to handle — a simple message-taker costs less than one that qualifies, books and texts. You get one fixed monthly price before anything goes live. No lock-in, cancel anytime.',
  },
  {
    q: "What if it can't answer something?",
    a: "It takes a message and texts you immediately with the caller's details and what they wanted. Real emergencies ring straight through to you. Nothing gets lost — the worst case is a perfect message instead of a missed call.",
  },
  {
    q: 'Does it book into my calendar?',
    a: 'Yes — your calendar or your job-management system, whichever you run. Every agent is built per business, so it books the way you already work and texts you a summary of every call.',
  },
  {
    q: "Will customers know it's AI?",
    a: "It doesn't pretend to be human — if a caller asks, it says so. In practice most callers just notice the phone got answered, their questions got handled, and the job got booked.",
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

export default function AiReceptionist() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ─── Hero — static (above the fold, must paint on first load) ─ */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-20 md:pt-40 md:pb-28">
          <Eyebrow>AI receptionist — Australia</Eyebrow>
          <h1
            className="font-display text-ink max-w-[14ch]"
            style={{
              fontSize: 'var(--text-display-lg)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              fontWeight: 800,
            }}
          >
            An AI receptionist that <em className="serif-em">never misses a call.</em>
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch]">
            Every missed call while you&apos;re on the tools is a job that went to whoever
            picked up. The agent answers 24/7, sounds human, qualifies the job, books it
            in, and texts you the details — so the phone stops costing you work.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#demo"
              data-magnetic
              className="inline-flex items-center gap-2 bg-green text-ink px-7 py-3.5 rounded-full font-semibold text-[15px] hover:shadow-[0_0_28px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
            >
              Get a custom demo <span aria-hidden>&rarr;</span>
            </a>
          </div>

          {/* Proof strip */}
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[760px]">
            <Stat n="24/7" label="Answers every call" />
            <Stat n="60 sec" label="Speed to lead" />
            <Stat n="$0" label="To hear a demo" />
            <Stat n="1 wk" label="Typical setup" />
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display text-ink mb-14" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            Demo first.
            <br />
            Money later.
          </h2>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            <Step
              n="01"
              title="Tell me about your business"
              body="Two minutes in the form below — what you do, what the calls are usually about, what you'd want the agent to handle."
            />
            <Step
              n="02"
              title="I build a demo agent for your business"
              body="A working agent that answers like it already works for you — your services, your questions, your area. You call it, you grill it, you try to break it. Free, no obligation."
            />
            <Step
              n="03"
              title="Like it? Fixed quote, live in about a week"
              body="One fixed monthly price, live on your number in about a week. If it's not right, you've lost nothing but a phone call."
            />
          </div>
        </div>
      </section>

      {/* ─── Hear it yourself ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>Hear it yourself</Eyebrow>
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="font-display text-ink max-w-[14ch]" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
                A real call, start to finish.
              </h2>
              <p className="mt-6 text-[16px] md:text-[17px] text-muted leading-[1.55] max-w-[52ch]">
                A demo build for a commercial refrigeration company. The customer reported
                a refrigerant leak — the agent qualified the job, collected access
                details, and closed the call. Zero human involvement.
              </p>
            </div>
            <RevealOnScroll>
              <div className="bg-ink rounded-2xl p-6 md:p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/60 mb-4">
                  Demo &middot; unedited inbound call
                </div>
                <audio controls preload="metadata" className="w-full" style={{ filter: 'invert(0.85)' }}>
                  <source src="/steve-demo.wav" type="audio/wav" />
                </audio>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ─── What you get ─── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>What you get</Eyebrow>
          <h2 className="font-display text-ink mb-14" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            Built for your business.
            <br />
            Not a script.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 max-w-[1000px]">
            <Inclusion title="Answers 24/7" body="Nights, weekends, while you're on the tools. The phone gets picked up every single time." />
            <Inclusion title="Sounds human" body="Australian voice, natural conversation. Callers talk to it like they'd talk to a good receptionist." />
            <Inclusion title="Qualifies the job" body="Asks the questions you would — what's the problem, where, how urgent — so you only chase real work." />
            <Inclusion title="Books + texts" body="Books straight into your calendar or job system, then texts you a summary of every call." />
            <Inclusion title="Escalates emergencies" body="Real emergencies don't get a voicemail — they ring through to you immediately." />
            <Inclusion title="Yours, no lock-in" body="Month-to-month, cancel anytime. If it's not earning its keep, you walk." />
          </div>
        </div>
      </section>

      {/* ─── Form ─── */}
      <section id="demo" className="bg-cream scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 grid md:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
          <div>
            <Eyebrow>Custom demo</Eyebrow>
            <h2 className="font-display text-ink" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
              Hear it answer for your business.
            </h2>
            <p className="mt-6 text-[16px] md:text-[17px] text-muted leading-[1.55] max-w-[46ch]">
              Fill this in and I&apos;ll build a demo agent for your business within two
              business days — free, no obligation. You call it, you grill it, you decide.
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
                <input type="hidden" name="from_name" value="Herbert AI — AI Receptionist" />
                <input type="hidden" name="subject" value="New demo request — AI Receptionist" />
                <input type="hidden" name="redirect" value="https://herbert-aisolutions.com/start/thanks" />
                <input
                  type="hidden"
                  name="autoresponse_subject"
                  value="Got it — your demo agent is in the works"
                />
                <input
                  type="hidden"
                  name="autoresponse_message"
                  value={`Hi — Will here from Herbert AI.\n\nThanks for the details. I'm building a demo agent for your business now — you'll have a number to call within 2 business days. Ring it, grill it, try to break it.\n\nIf you think of anything else the agent should handle, just reply to this email.\n\n— Will Herbert\nHerbert AI · Adelaide`}
                />
                {/* Honeypot for spam */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <Field id="name" label="Your name" type="text" placeholder="Your name" required />
                <Field id="business" label="Business name" type="text" placeholder="Your business" required />
                <Field id="email" label="Email" type="email" placeholder="you@business.com" required />
                <Field id="phone" label="Phone (optional)" type="tel" placeholder="0400 000 000" />

                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
                    What does your business do + what should the agent handle?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-cream border border-line rounded-2xl text-[15px] text-ink placeholder:text-muted focus:border-ink transition-colors"
                    placeholder="e.g. Plumbing, mostly emergency callouts — want it to qualify the job, book it in, and text me the address."
                  />
                </div>

                <button
                  type="submit"
                  data-magnetic
                  className="w-full inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full font-semibold text-[15px] hover:bg-ink-soft transition-colors"
                >
                  Send — get my custom demo <span aria-hidden>&rarr;</span>
                </button>
                <p className="text-[12px] text-muted text-center">
                  Free demo, no obligation. Reply within a business day.
                </p>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-cream-alt">
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
            Stop losing jobs to your voicemail.
          </h2>
          <a
            href="#demo"
            data-magnetic
            className="mt-10 inline-flex items-center gap-2 bg-ink text-cream px-8 py-4 rounded-full font-semibold text-[16px] hover:bg-ink-soft transition-colors"
          >
            Get a custom demo <span aria-hidden>&rarr;</span>
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

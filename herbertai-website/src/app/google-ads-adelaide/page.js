import RevealOnScroll from '../components/motion/RevealOnScroll'

export const metadata = {
  title: { absolute: 'Google Ads Management Adelaide | AI-Optimised, Run by the Builder' },
  description:
    'AI-optimised Google Ads management for Adelaide small business. Free game plan in 48 hours, flat monthly, you own the account. Run by the person who builds them — not an agency.',
  alternates: { canonical: '/google-ads-adelaide' },
  openGraph: {
    title: 'Google Ads Management Adelaide | AI-Optimised, Run by the Builder',
    description:
      'AI-optimised Google Ads management for Adelaide small business. Free game plan in 48 hours, flat monthly, you own the account. Run by the person who builds them — not an agency.',
    url: '/google-ads-adelaide',
    images: ['/opengraph-image'],
  },
}

const faqs = [
  {
    q: 'What does management cost?',
    a: 'A flat monthly fee on top of your ad spend — quoted on scope, no lock-in, cancel anytime. The game plan comes with the number, so you see exactly what it costs before you commit.',
  },
  {
    q: 'Do I need to be running ads already?',
    a: 'No — the free plan works whether you’re starting from scratch or fixing a campaign that’s bleeding money. Either way you’ll get a clear picture of what to target and what it should cost.',
  },
  {
    q: 'What makes it “AI-optimised”?',
    a: 'I use AI to audit and tune the account continuously — finding wasted spend and opportunities daily, instead of the once-a-month glance most agencies do. The work happens while it still matters, not at the end of the month.',
  },
  {
    q: 'Do I own the account?',
    a: 'Always — it’s your Google Ads account and your data. Leave any time and keep everything: campaigns, history, the lot. No hostage fees, no lock-in.',
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

export default function GoogleAdsAdelaide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ─── Hero — static (above the fold, must paint on first load) ─ */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-20 md:pt-40 md:pb-28">
          <Eyebrow>Google Ads — Adelaide</Eyebrow>
          <h1
            className="font-display text-ink max-w-[15ch]"
            style={{
              fontSize: 'var(--text-display-lg)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              fontWeight: 800,
            }}
          >
            Google Ads, run by the person who <em className="serif-em">builds them.</em>
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch]">
            You found this through one of my ads. That&apos;s the service. I build and run
            AI-optimised Google Ads for Adelaide small business — tight, measured, and
            managed daily, not dressed up in an agency retainer. Tell me about your business
            and I&apos;ll send a free game plan in 48 hours.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#audit"
              data-magnetic
              className="inline-flex items-center gap-2 bg-green text-ink px-7 py-3.5 rounded-full font-semibold text-[15px] hover:shadow-[0_0_28px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
            >
              Get my free game plan <span aria-hidden>&rarr;</span>
            </a>
          </div>

          {/* Proof strip */}
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[760px]">
            <Stat n="48h" label="Free game plan" />
            <Stat n="$0" label="To see the plan" />
            <Stat n="AI" label="Optimised daily" />
            <Stat n="100%" label="Your account, you own it" />
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display text-ink mb-14" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            Plan first.
            <br />
            Money later.
          </h2>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            <Step
              n="01"
              title="Tell me about your business"
              body="Two minutes in the form below — what you sell, who your customers are, and whether you're running ads now."
            />
            <Step
              n="02"
              title="Free game plan in 48 hours"
              body="What to target, roughly what it'd cost per click, and what a realistic month looks like. A real plan, not a sales call. No obligation."
            />
            <Step
              n="03"
              title="Like it? Flat monthly, cancel anytime"
              body="I build it, run it, and report what it's actually making you. No fat retainer, no lock-in — leave whenever you want."
            />
          </div>
        </div>
      </section>

      {/* ─── Why AI-optimised / proof ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>Why AI-optimised</Eyebrow>
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
            <RevealOnScroll>
              <div>
                <h2 className="font-display text-ink max-w-[16ch]" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
                  Most agencies &lsquo;optimise&rsquo; once a month.
                </h2>
                <p className="mt-6 text-[16px] md:text-[17px] text-muted leading-[1.55] max-w-[52ch]">
                  An agency charges a fat retainer to log in every few weeks, glance at a
                  dashboard, and call it management. I point AI at your account continuously
                  — it hunts wasted spend, kills junk searches, tightens the structure, and
                  surfaces what to change while it still matters.
                </p>
                <p className="mt-5 text-[16px] md:text-[17px] text-muted leading-[1.55] max-w-[52ch]">
                  Same work the expensive agencies bill for, done daily instead of monthly —
                  and you talk to the person actually doing it, not an account manager.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <div className="space-y-5 md:pt-4">
                <ProofPoint
                  title="Built on a real playbook"
                  body="Single-keyword ad groups, ruthless negative keywords, presence-only local targeting, search-only — the structure that wins, not the defaults Google nudges you toward."
                />
                <ProofPoint
                  title="Measured to the dollar"
                  body="Conversion tracking wired properly so you see cost-per-lead, not vanity clicks. If it's not making money, we change it."
                />
                <ProofPoint
                  title="You own everything"
                  body="Your Google Ads account, your data, your campaigns. No lock-in, no hostage fees — leave any time and keep the lot."
                />
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
            Managed daily.
            <br />
            Not once a month.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 max-w-[1000px]">
            <Inclusion title="Tight campaign structure" body="Single-keyword ad groups — your ad matches the exact search." />
            <Inclusion title="Wasted-spend hunting" body="Negative keywords and junk-search removal, continuously." />
            <Inclusion title="Conversion tracking that works" body="Real leads tracked, not clicks." />
            <Inclusion title="Weekly AI audit" body="What to pause, scale, fix — every week." />
            <Inclusion title="Flat monthly, no lock-in" body="No fat retainer, cancel anytime." />
            <Inclusion title="Your account, always" body="You own it and keep it." />
          </div>
        </div>
      </section>

      {/* ─── Form ─── */}
      <section id="audit" className="bg-cream scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 grid md:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
          <div>
            <Eyebrow>Free game plan</Eyebrow>
            <h2 className="font-display text-ink" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
              Get your free Google Ads game plan.
            </h2>
            <p className="mt-6 text-[16px] md:text-[17px] text-muted leading-[1.55] max-w-[46ch]">
              Fill this in and I&apos;ll send a free plan within 48 hours — what to target,
              what it&apos;d cost, what a realistic month looks like. No obligation, no sales
              call.
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
                <input type="hidden" name="from_name" value="Herbert AI — Google Ads Adelaide" />
                <input type="hidden" name="subject" value="New game plan request — Google Ads Adelaide" />
                <input type="hidden" name="redirect" value="https://herbert-aisolutions.com/start/thanks" />
                <input
                  type="hidden"
                  name="autoresponse_subject"
                  value="Got it — your free Google Ads game plan is in the works"
                />
                <input
                  type="hidden"
                  name="autoresponse_message"
                  value={`Hi — Will here from Herbert AI.\n\nThanks for the details. I'm putting together your free Google Ads game plan now — what to target, roughly what it'd cost per click, and what a realistic month looks like. You'll have it in your inbox within 48 hours.\n\nIf you think of anything else worth including, just reply to this email.\n\n— Will Herbert\nHerbert AI · Adelaide`}
                />
                {/* Honeypot for spam */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <Field id="name" label="Your name" type="text" placeholder="Your name" required />
                <Field id="business" label="Business name" type="text" placeholder="Your business" required />
                <Field id="email" label="Email" type="email" placeholder="you@business.com" required />
                <Field id="phone" label="Phone (optional)" type="tel" placeholder="0400 000 000" />

                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
                    What do you sell, and are you running ads now?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-cream border border-line rounded-2xl text-[15px] text-ink placeholder:text-muted focus:border-ink transition-colors"
                    placeholder="e.g. Mobile mechanic across the northern suburbs — not running ads yet, want more booked jobs."
                  />
                </div>

                <button
                  type="submit"
                  data-magnetic
                  className="w-full inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full font-semibold text-[15px] hover:bg-ink-soft transition-colors"
                >
                  Send — get my free game plan <span aria-hidden>&rarr;</span>
                </button>
                <p className="text-[12px] text-muted text-center">
                  Free game plan, no obligation. Reply within a business day.
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
            Stop guessing. Start measuring.
          </h2>
          <a
            href="#audit"
            data-magnetic
            className="mt-10 inline-flex items-center gap-2 bg-ink text-cream px-8 py-4 rounded-full font-semibold text-[16px] hover:bg-ink-soft transition-colors"
          >
            Get my free game plan <span aria-hidden>&rarr;</span>
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

function ProofPoint({ title, body }) {
  return (
    <div className="bg-cream-alt border border-line rounded-3xl p-6">
      <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-ink mb-2">{title}</h3>
      <p className="text-[14px] text-muted leading-[1.55]">{body}</p>
    </div>
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

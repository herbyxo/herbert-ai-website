import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'

export const metadata = {
  title: 'Pricing',
  description:
    'Herbert AI prices every project on scope — three models depending on the work: fixed quote for builds, hourly for small fixes, retainer for ongoing systems. No public price list, no lock-in.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing · Herbert AI',
    description:
      'Three pricing models: fixed quote, hourly, or retainer. Priced on scope, not on a menu.',
    url: '/pricing',
  },
}

const tiers = [
  {
    range: '$1k — $3k',
    title: 'Small fix · tune-up',
    body: 'A few hours of work. Site edits, a single page added, prompt tuning on a live voice agent, a one-off workflow.',
  },
  {
    range: '$3k — $10k',
    title: 'Productised pattern',
    body: 'A new website. A voice agent build with custom prompt. A chatbot widget. A defined automation workflow.',
    common: true,
  },
  {
    range: '$10k — $25k+',
    title: 'Full custom build',
    body: 'Operator console with bookings, customers, reports. Bespoke booking system. Multi-system integration.',
  },
]

const models = [
  {
    n: '01',
    tag: 'Fixed quote',
    name: 'For defined builds.',
    body:
      "Most engagements run on a fixed quote. You tell me what's broken or what needs to exist; I scope it; you get one number and a timeline. No hourly creep, no surprise invoice.",
    fits: ['New website', 'Voice agent build', 'Dashboard / portal', 'Workflow automation', 'Custom system'],
  },
  {
    n: '02',
    tag: 'Hourly',
    name: 'For small fixes.',
    body:
      "For tweaks, tune-ups, or work that's too small to scope formally — content edits, a new page on an existing site, prompt tuning on a live voice agent. Tracked honestly, invoiced monthly.",
    fits: ['Site tweaks', 'Prompt tuning', 'Small additions', 'Bug fixes', 'Ad-hoc questions'],
  },
  {
    n: '03',
    tag: 'Monthly retainer',
    name: 'For ongoing systems.',
    body:
      "For systems that need to keep running — voice agents, chatbots, hosted websites. Monthly retainer covers hosting, monitoring, prompt updates, content changes. Cancel anytime.",
    fits: ['Voice agent hosting', 'Website hosting + updates', 'Chatbot operations', 'Ongoing improvements'],
    highlight: true,
  },
]

const faqs = [
  {
    q: 'Why don\'t you list prices?',
    a: 'Because every business is different. A "barbershop website" costs different things depending on whether you need bookings, payments, gift vouchers, or just a brochure. A flat price list either prices the simple jobs too high or the complex ones too low. Quoting on scope gets you the right number for your actual situation.',
  },
  {
    q: 'How does a scoping call actually go?',
    a: '30 minutes. You walk me through what\'s slow, broken, or doesn\'t exist yet. I ask enough questions to scope honestly. If it\'s worth building, I send a fixed quote and timeline within a day. If it isn\'t, I\'ll tell you.',
  },
  {
    q: 'What\'s the minimum engagement?',
    a: 'No minimum. Smallest job I\'ve done was a one-page site fix for a few hours. Largest was a 6-week full-stack rebuild. I\'ll quote either honestly.',
  },
  {
    q: 'Any lock-in or contracts?',
    a: 'No. Fixed-quote builds pay on delivery. Retainers are month-to-month, cancel anytime. Hourly is invoiced for actual time spent — if it took less than expected, you pay less.',
  },
  {
    q: 'Do you take a deposit?',
    a: 'For fixed-quote builds over a couple of weeks, yes — usually 30% on scope sign-off, balance on delivery. Smaller jobs invoiced on completion.',
  },
  {
    q: 'Can I pay monthly instead of upfront?',
    a: 'Yes — for larger builds I\'ll often split the fixed quote across the build window (e.g. 3 monthly payments across a 6-week build). Or keep it on retainer once the system is live.',
  },
]

export default function Pricing() {
  return (
    <>
      {/* ─── Hero — static (above the fold, must paint on first load) ─ */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>Pricing</Eyebrow>
          <h1
            className="font-display text-ink max-w-[14ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            Priced on scope.
            <br />
            Not on a menu.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[56ch]">
            Every business needs something different &mdash; so every quote starts with a free
            30-minute scoping call. You walk away with a fixed quote and timeline, or a clear no.
            No hourly creep, no lock-in, no agency overhead.
          </p>
          <Link
            href="/contact"
            data-magnetic
            className="mt-10 bg-ink text-cream px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:bg-ink-soft transition-colors"
          >
            Book a free 30-min call <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* ─── Typical range — horizontal scale on the page surface ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll>
            <Eyebrow>What it usually costs</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h2
              className="font-display text-ink max-w-[16ch] mb-16"
              style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
            >
              Most projects land between $1k and $15k.
            </h2>
          </RevealOnScroll>

          <div className="relative">
            {/* connecting line (desktop) */}
            <div className="hidden md:block absolute top-[7px] left-0 right-0 h-px bg-ink/15" aria-hidden />

            <div className="grid md:grid-cols-3 gap-12 md:gap-0 relative">
              {tiers.map((t, i) => (
                <RevealOnScroll
                  key={t.title}
                  delay={i * 0.08}
                  className={i === 0 ? 'md:pr-10' : i === 1 ? 'md:px-10' : 'md:pl-10'}
                >
                  <div className="relative">
                    {/* marker dot — green only on the common path (signature guidance accent) */}
                    <div
                      aria-hidden
                      className={`hidden md:block absolute top-[2px] left-0 w-[11px] h-[11px] rounded-full z-10 ${
                        t.common ? 'bg-green-deep ring-4 ring-green/15' : 'bg-ink'
                      }`}
                    />
                    <div className="md:pl-6">
                      <div
                        className="font-display text-ink mb-5"
                        style={{ fontSize: '30px', letterSpacing: '-0.03em', fontWeight: 800 }}
                      >
                        {t.range}
                      </div>
                      <h3 className="text-[19px] font-medium tracking-[-0.01em] text-ink mb-2.5 flex items-center gap-2.5 flex-wrap">
                        {t.title}
                        {t.common && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-green-deep">
                            most common
                          </span>
                        )}
                      </h3>
                      <p className="text-[14px] text-muted leading-[1.6] max-w-[34ch]">{t.body}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* retainer note */}
          <div className="mt-16 pt-6 border-t border-line flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Retainers</div>
            <div className="text-[15px] text-ink-soft">
              From <span className="font-semibold text-ink">$150/mo</span> for ongoing systems &mdash; hosting,
              monitoring, prompt updates, content changes. Cancel anytime.
            </div>
          </div>
        </div>
      </section>

      {/* ─── Three models — discrete cards (CHARTER-blessed object) ─ */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll>
            <Eyebrow>How we price</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h2
              className="font-display text-ink max-w-[12ch] mb-16"
              style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
            >
              Three models. One fits.
            </h2>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-5">
            {models.map((m, i) => (
              <RevealOnScroll key={m.n} delay={i * 0.08} className="h-full">
                <div
                  className={`rounded-3xl p-8 border flex flex-col h-full ${
                    m.highlight ? 'bg-ink text-cream border-ink' : 'bg-cream border-line'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-8">
                    <span className={`font-mono text-[11px] ${m.highlight ? 'text-cream/40' : 'text-muted'}`}>{m.n}</span>
                    <span className={`w-1 h-1 rounded-full ${m.highlight ? 'bg-green' : 'bg-green-deep'}`} />
                    <span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${m.highlight ? 'text-cream/55' : 'text-muted'}`}>
                      {m.tag}
                    </span>
                  </div>
                  <h3 className={`text-[26px] md:text-[28px] font-medium tracking-[-0.02em] mb-4 ${m.highlight ? 'text-cream' : 'text-ink'}`}>
                    {m.name}
                  </h3>
                  <p className={`text-[15px] leading-[1.65] mb-7 ${m.highlight ? 'text-cream/70' : 'text-muted'}`}>
                    {m.body}
                  </p>
                  <div className={`mt-auto pt-6 border-t ${m.highlight ? 'border-cream/15' : 'border-line'}`}>
                    <div className={`font-mono text-[10px] uppercase tracking-[0.18em] mb-3 ${m.highlight ? 'text-cream/50' : 'text-muted'}`}>
                      Typical fit
                    </div>
                    <ul className="space-y-2">
                      {m.fits.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <span className={`w-1 h-1 rounded-full mt-2 shrink-0 ${m.highlight ? 'bg-green' : 'bg-green-deep'}`} />
                          <span className={`text-[14px] leading-[1.45] ${m.highlight ? 'text-cream/80' : 'text-ink-soft'}`}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What's in a quote — editorial split ──────────────────── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <RevealOnScroll>
              <Eyebrow>What you get in a quote</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <h2
                className="font-display text-ink max-w-[12ch]"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                One number. A real timeline.
              </h2>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.12} className="max-w-[60ch] space-y-5 text-[16px] text-muted leading-[1.7] pt-1">
            <div className="space-y-5">
              <p>
                Every quote includes: a written scope of what gets built, a fixed price (not a range),
                a delivery date, what&apos;s in scope and what isn&apos;t, and what happens if you want to
                change something mid-build.
              </p>
              <p>
                If the project comes in faster than expected, the price stays the same — but I&apos;ll
                mention it before billing. If something genuinely outside the scope comes up, I quote
                it separately rather than letting it creep into the original number.
              </p>
              <p>
                For ongoing retainers, the monthly number covers everything in scope — no hidden
                per-call, per-message, or per-request fees buried in the terms.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── FAQs ─────────────────────────────────────────────────── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll>
            <Eyebrow>Pricing FAQs</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h2
              className="font-display text-ink max-w-[14ch] mb-14"
              style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
            >
              Common questions. Straight answers.
            </h2>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-5">
            {faqs.map((f, i) => (
              <RevealOnScroll key={f.q} delay={(i % 2) * 0.08}>
                <div className="bg-cream border border-line rounded-3xl p-7 lift h-full">
                  <h3 className="text-[17px] font-medium text-ink mb-2.5 tracking-[-0.01em]">{f.q}</h3>
                  <p className="text-[15px] text-muted leading-[1.6]">{f.a}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Closing CTA — full-bleed ink (matches homepage FinalCTA) ─ */}
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-32 md:py-44">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Eyebrow color="white">Free scoping call</Eyebrow>
              <h2
                className="font-display text-cream"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 800 }}
              >
                Thirty minutes.
                <br />
                No deck, no pitch.
              </h2>
              <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[52ch]">
                You walk me through the bottleneck. I walk you through what I&apos;d build, what it would
                cost, and how long it would take. You leave with a fixed quote &mdash; or a clear no.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-5 lg:items-end">
              <Link
                href="/contact"
                data-magnetic
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
              >
                Book a free 30-min call <span aria-hidden>&rarr;</span>
              </Link>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40 lg:text-right">
                Fixed quote within 24 hours
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

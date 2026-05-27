import Link from 'next/link'

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
      {/* Hero */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-semibold tracking-[-0.03em] leading-[1] mb-7 max-w-[18ch] text-ink">
            Priced on scope. <span className="serif-em text-green-deep">Not on a menu.</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch] mb-9">
            Every business needs something different &mdash; so every quote starts with a free 30-minute scoping
            call. You walk away with a fixed quote and timeline, or a clear no. No hourly creep, no lock-in, no agency overhead.
          </p>
          <Link
            href="/contact"
            data-magnetic
            className="bg-ink text-cream px-6 py-3.5 rounded-full font-semibold text-[15px] inline-flex items-center gap-2 hover:bg-ink-soft transition-colors"
          >
            Book a free 30-min call <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Typical range — horizontal scale */}
      <section className="bg-cream border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="max-w-[44ch] mb-14">
            <Eyebrow>What it usually costs</Eyebrow>
            <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
              Most projects fall between <span className="serif-em">$1k and $15k.</span>
            </h2>
          </div>

          {/* Scale */}
          <div className="relative">
            {/* The connecting line (desktop only) */}
            <div className="hidden md:block absolute top-[10px] left-0 right-0 h-px bg-ink/15" aria-hidden />

            <div className="grid md:grid-cols-3 gap-10 md:gap-0 relative">
              {[
                {
                  range: '$1k  →  $3k',
                  title: 'Small fix · tune-up',
                  body: 'A few hours of work. Site edits, a single page added, prompt tuning on a live voice agent, a one-off workflow.',
                },
                {
                  range: '$3k  →  $10k',
                  title: 'Productised pattern',
                  body: 'A new website. A voice agent build with custom prompt. A chatbot widget. A defined automation workflow.',
                  highlight: true,
                },
                {
                  range: '$10k  →  $25k+',
                  title: 'Full custom build',
                  body: 'Operator console with bookings, customers, reports. Bespoke booking system. Multi-system integration.',
                },
              ].map((t, i) => (
                <div
                  key={t.title}
                  className={`relative ${i === 0 ? 'md:pr-8' : i === 1 ? 'md:px-8 md:border-x md:border-line/0' : 'md:pl-8'}`}
                >
                  {/* Marker dot — sits on the line */}
                  <div
                    aria-hidden
                    className={`hidden md:block absolute top-[6px] left-0 w-[10px] h-[10px] rounded-full ${
                      t.highlight ? 'bg-green-deep ring-4 ring-green/15' : 'bg-ink'
                    } z-10`}
                  />

                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-8 md:pl-5">
                    {t.range}
                  </div>
                  <div className="md:pl-5">
                    <h3 className="text-[20px] font-medium tracking-[-0.01em] text-ink mb-2">
                      {t.title}
                      {t.highlight && (
                        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-green-deep align-middle">
                          most common
                        </span>
                      )}
                    </h3>
                    <p className="text-[14px] text-muted leading-[1.6] max-w-[34ch]">
                      {t.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Retainer note */}
          <div className="mt-14 pt-6 border-t border-line flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Retainers</div>
            <div className="text-[15px] text-ink-soft">
              From <span className="font-semibold text-ink">$150/mo</span> for ongoing systems &mdash; hosting, monitoring, prompt updates, content changes. Cancel anytime.
            </div>
          </div>
        </div>
      </section>

      {/* Three models — editorial directory rows */}
      <section className="bg-cream-alt border-y border-line reveal">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="max-w-[44ch] mb-16">
            <Eyebrow>How we price</Eyebrow>
            <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
              Three models. <span className="serif-em text-green-deep">One fits.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {models.map((m) => (
              <div
                key={m.n}
                className={`rounded-3xl p-8 border flex flex-col ${m.highlight ? 'bg-ink text-white border-ink' : 'bg-cream border-line'}`}
              >
                <div className="flex items-center gap-2 mb-8">
                  <span className={`font-mono text-[11px] ${m.highlight ? 'text-white/40' : 'text-muted'}`}>{m.n}</span>
                  <span className={`w-1 h-1 rounded-full ${m.highlight ? 'bg-green' : 'bg-green-deep'}`} />
                  <span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${m.highlight ? 'text-white/55' : 'text-muted'}`}>{m.tag}</span>
                  {m.highlight && (
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-green">Common</span>
                  )}
                </div>
                <h3 className={`text-[26px] md:text-[28px] font-medium tracking-[-0.02em] mb-4 ${m.highlight ? 'text-white' : 'text-ink'}`}>
                  {m.name}
                </h3>
                <p className={`text-[15px] leading-[1.65] mb-7 ${m.highlight ? 'text-white/70' : 'text-muted'}`}>
                  {m.body}
                </p>

                <div className={`mt-auto pt-6 border-t ${m.highlight ? 'border-white/15' : 'border-line'}`}>
                  <div className={`font-mono text-[10px] uppercase tracking-[0.18em] mb-3 ${m.highlight ? 'text-white/50' : 'text-muted'}`}>
                    Typical fit
                  </div>
                  <ul className="space-y-2">
                    {m.fits.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className={`w-1 h-1 rounded-full mt-2 shrink-0 ${m.highlight ? 'bg-green' : 'bg-green-deep'}`} />
                        <span className={`text-[14px] leading-[1.45] ${m.highlight ? 'text-white/80' : 'text-ink-soft'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you can expect from a quote */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 reveal">
        <div>
          <Eyebrow>What you get in a quote</Eyebrow>
          <h2 className="text-[40px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] max-w-[16ch] text-ink">
            One number. <span className="serif-em text-green-deep">Real timeline.</span>
          </h2>
        </div>
        <div className="max-w-[60ch] space-y-5 text-[16px] text-muted leading-[1.7] pt-1">
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
      </section>

      {/* FAQs */}
      <section className="bg-cream-alt border-y border-line reveal">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="max-w-[44ch] mb-12">
            <Eyebrow>Pricing FAQs</Eyebrow>
            <h2 className="text-[40px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
              Common questions. <span className="serif-em text-green-deep">Straight answers.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {faqs.map((f) => (
              <div key={f.q} className="bg-cream border border-line rounded-3xl p-7 lift">
                <h3 className="text-[17px] font-medium text-ink mb-2.5 tracking-[-0.01em]">{f.q}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 lg:px-12 pb-24 md:pb-32 max-w-[1280px] mx-auto reveal">
        <div className="bg-ink text-white rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="hero-blob absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none" />
          <div className="relative">
            <Eyebrow color="white" center>Free scoping call</Eyebrow>
            <h2 className="text-[40px] md:text-[64px] font-medium leading-[1.02] tracking-[-0.03em] mb-6 max-w-[22ch] mx-auto">
              30 minutes. <span className="serif-em text-green">No deck, no pitch.</span>
            </h2>
            <p className="text-white/70 text-[17px] leading-[1.6] mb-10 max-w-[54ch] mx-auto">
              You walk me through the bottleneck. I walk you through what I&apos;d build, what it would cost,
              and how long it would take. You leave with a fixed quote &mdash; or a clear no.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 justify-center">
              <Link
                href="/contact"
                data-magnetic
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
              >
                Book a free 30-min call <span aria-hidden>&rarr;</span>
              </Link>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                Fixed quote within 24 hours
              </span>
            </div>
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

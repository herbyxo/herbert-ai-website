// Paid-search landing page: one component, one config per ad group.
//
// WHY A SEPARATE PAGE FROM /web-design-adelaide: that page is the organic one.
// It carries the site nav, six sections, an FAQ and five calls to action, and
// Google's landing-page-experience reading for it is BELOW AVERAGE on four of
// the five scored keywords while the page is fast (Lighthouse 97) and passes
// the engine's own structural audit. What is left is what Google says it rates:
// relevance and usefulness to the person who clicked THIS keyword, judged
// against the other advertisers' dedicated landing pages, plus ease of
// navigation. So: no nav, one goal, the ad's own words in the headline, one
// page per theme. The organic page is untouched and stays as the control.
//
// Rules applied (lab/landing-page-principles.md in marketing-engine):
//   1 message match: h1 and sub restate the ad's promise, including "no deposit"
//   2 one goal: every button is the same form; the only other link is Privacy
//   3 offer and capture above the fold: compact form in the hero
//   4 the compact form asks two things; the full one requires three
//   5 plain words, short sentences
//   6 risk reversal next to the button, not in the FAQ
//   7 proof that names nobody: the worked example (MockupProof)
//   8 mobile speed: no images, markup only, same as the organic page
//
// Inside CHARTER.md: display type, cream banding, pills, ONE green flood.

import MockupLeadForm from '../MockupLeadForm'
import MockupProof from '../MockupProof'
import RevealOnScroll from '../motion/RevealOnScroll'

export default function LandingPage({ eyebrow, h1, em, sub, steps, points, faqs, flood, source, compactField = 'business' }) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Top bar: the mark and a phone number. Not a nav. The mark is not a
          link: a visitor who arrived from an ad has one thing to do here. */}
      <div className="bg-cream">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 lg:px-12 py-5">
          <div className="flex items-center gap-2.5">
            <svg aria-hidden viewBox="0 0 32 32" className="w-6 h-6 shrink-0">
              <rect width="32" height="32" rx="7" fill="#0A0A0A" />
              <text x="50%" y="24" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" fontWeight="700" fontSize="22" letterSpacing="-1" fill="#F5F0E5" textAnchor="middle">h</text>
              <circle cx="24.5" cy="8.5" r="2.4" fill="#00FF88" />
            </svg>
            <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink">herbert ai</span>
          </div>
          <a href="tel:+61448111840" data-magnetic className="text-[15px] font-medium text-ink hover:text-green-deep transition-colors">
            0448 111 840
          </a>
        </div>
      </div>

      {/* Hero: the promise in the ad's words, and the capture. */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 pb-20 md:pt-28 md:pb-28">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            className="font-display text-ink max-w-[14ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            {h1} {em ? <em className="serif-em">{em}</em> : null}
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch]">{sub}</p>
          <div className="mt-10 max-w-[720px]">
            <MockupLeadForm variant="compact" source={source} compactField={compactField} />
          </div>
          <div className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[760px]">
            <Stat n="48h" label="Mockup turnaround" />
            <Stat n="$0" label="Deposit" />
            <Stat n="1" label="Fixed quote, no retainer" />
            <Stat n="100%" label="Yours. You own it" />
          </div>
        </div>
      </section>

      {/* How it works: three steps, nothing else. */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <Eyebrow>How it works</Eyebrow>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            {steps.map((s, i) => (
              <Step key={s.title} n={`0${i + 1}`} title={s.title} body={s.body} />
            ))}
          </div>
        </div>
      </section>

      <MockupProof />

      {/* Three plain reassurances. Space-separated, on the page surface. */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14 max-w-[1000px]">
            {points.map((p) => (
              <RevealOnScroll key={p.title}>
                <div>
                  <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-ink mb-2">{p.title}</h3>
                  <p className="text-[15px] md:text-[16px] text-muted leading-[1.55]">{p.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* The full form, for anyone who wants to say more, with the three
          questions people actually ask beside it. */}
      <section id="mockup" className="bg-cream scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28 grid md:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
          <div>
            <Eyebrow>Common questions</Eyebrow>
            <div className="space-y-8">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink mb-2">{f.q}</h3>
                  <p className="text-[15px] text-muted leading-[1.55]">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[14px] text-muted">
              Prefer to talk?{' '}
              <a href="tel:+61448111840" className="text-ink font-medium hover:text-green-deep transition-colors">0448 111 840</a>
              {' '}Will, Adelaide.
            </p>
          </div>
          <RevealOnScroll>
            <div className="bg-cream border border-line rounded-3xl p-8 md:p-10">
              <MockupLeadForm source={source} />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* The one green-flood moment, and the form again rather than a link up. */}
      <section className="bg-green">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28 text-center">
          <h2
            className="font-display text-ink mx-auto max-w-[18ch]"
            style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}
          >
            {flood}
          </h2>
          <div className="mt-10 max-w-[620px] mx-auto text-left">
            <MockupLeadForm variant="compact" onGreen source={source} compactField={compactField} />
          </div>
        </div>
      </section>

      {/* Slim footer: who this is, where, and the one link the policy needs. */}
      <footer className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span>Herbert AI. ABN 83 880 085 162. Adelaide, SA.</span>
          <span className="flex gap-6">
            <a href="tel:+61448111840" className="hover:text-ink transition-colors">0448 111 840</a>
            <a href="/privacy" className="hover:text-ink transition-colors">Privacy</a>
          </span>
        </div>
      </footer>
    </>
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

// Paid-search landing page: one component, one config per ad group.
//
// Structure A (direct response), theme A2 (Archivo, sharp corners, the house
// green on the interactive only), shade S3 (deep green, white button text).
// Will's picks, 2026-09-11, on rendered boards; the ledger is
// docs/design/design-pass-paid-landing-pages.md and the rule that governs this
// file is locked in design-taste/registers/marketing-landing-page.md: on a
// paid landing page the direct-response structure wins over the brand register.
//
// WHY A SEPARATE PAGE FROM /web-design-adelaide: that page is the organic one
// and Google's landing-page-experience reading for it is BELOW AVERAGE on four
// of five scored keywords while it is fast (Lighthouse 97) and passes the
// engine's structural audit. What is left is what Google says it rates:
// relevance to the person who clicked THIS keyword, and ease of navigation. So:
// no nav, one goal, the ad's own words in the headline, one page per theme.
//
// Palette, kept here rather than in the charter's tokens because the charter
// governs the site and this page deliberately does not follow it:
//   ground  #FFFFFF   ink #1F2125   muted #62666C   band #F3F4F2   line #E5E7E5
//   green   #0B7A3E   green hover #09612F   field border #C9CCC9
//   dark    #1B1D21   dark muted #A9ADB3
// Archivo is loaded here, not in the root layout, so it costs nothing on the
// rest of the site.

import { Archivo } from 'next/font/google'
import MockupLeadForm from '../MockupLeadForm'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
  variable: '--font-archivo',
  display: 'swap',
})

const PHONE_HREF = 'tel:+61448111840'
const PHONE = '0448 111 840'

export default function LandingPage({ eyebrow, h1, sub, checks, steps, faqs, flood, source, compactField = 'business' }) {
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
    <div className={`${archivo.variable} font-[family-name:var(--font-archivo)] bg-white text-[#1F2125]`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Top bar: the mark and a phone button. Not a nav. */}
      <div className="border-b border-[#E5E7E5]">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between px-5 md:px-8 py-3.5">
          <div className="flex items-center gap-2.5">
            <svg aria-hidden viewBox="0 0 32 32" className="w-6 h-6 shrink-0">
              <rect width="32" height="32" rx="7" fill="#1F2125" />
              <text x="50%" y="24" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" fontWeight="700" fontSize="22" letterSpacing="-1" fill="#FFFFFF" textAnchor="middle">h</text>
              <circle cx="24.5" cy="8.5" r="2.4" fill="#0B7A3E" />
            </svg>
            <span className="text-[17px] font-semibold tracking-[-0.01em]">herbert ai</span>
          </div>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-[#0B7A3E] hover:bg-[#09612F] text-white font-bold text-[14px] px-3.5 py-2.5 rounded-[4px] transition-colors">
            <PhoneIcon />
            {PHONE}
          </a>
        </div>
      </div>

      {/* Hero: the promise in the ad's words, the three checks, and the card.
          On a phone it stacks; on a desktop the card sits beside the copy. */}
      <section>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-8 pb-10 md:pt-16 md:pb-16 grid md:grid-cols-[1.15fr_1fr] gap-8 md:gap-12 items-start">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B7A3E] mb-4">{eyebrow}</div>
            <h1 className="text-[32px] md:text-[44px] leading-[1.08] font-extrabold tracking-[-0.03em] max-w-[18ch]" style={{ textWrap: 'balance' }}>
              {h1}
            </h1>
            <p className="mt-4 text-[16px] md:text-[17px] leading-[1.5] text-[#62666C] max-w-[52ch]">{sub}</p>
            <ul className="mt-5 flex flex-col gap-2 text-[15px]">
              {checks.map((c) => (
                <li key={c} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-2 border-[#0B7A3E] rounded-[6px] p-5 md:p-6 bg-white md:sticky md:top-6">
            <p className="text-[17px] font-extrabold tracking-[-0.01em] mb-3">Get your free homepage mockup</p>
            <MockupLeadForm variant="compact" look="direct" source={source} compactField={compactField} />
            <p className="mt-3 text-[12.5px] text-center leading-[1.4] text-[#62666C]">
              <b className="text-[#1F2125] font-semibold">Will Herbert</b> designs and builds it. One person, start to finish. Adelaide.
            </p>
          </div>
        </div>
      </section>

      {/* How it works. A real sequence, so the numbering carries information. */}
      <section className="bg-[#F3F4F2]">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10 md:py-14">
          <h2 className="text-[24px] md:text-[28px] font-extrabold tracking-[-0.025em] mb-6">How it works</h2>
          <ol className="grid md:grid-cols-3 gap-6 md:gap-10 list-none p-0 m-0">
            {steps.map((s, i) => (
              <li key={s.title}>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B7A3E] mb-1.5">Step {i + 1}</div>
                <h3 className="text-[17px] font-semibold mb-1">{s.title}</h3>
                <p className="text-[14.5px] leading-[1.5] text-[#62666C] m-0">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Proof that names nobody: the worked example. */}
      <section>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10 md:py-14">
          <div className="border-l-4 border-[#0B7A3E] pl-4 md:pl-6 max-w-[62ch]">
            <div className="text-[11px] uppercase tracking-[0.14em] text-[#62666C]">What arrives in 48 hours</div>
            <p className="mt-2 text-[13.5px] text-[#62666C] leading-[1.5]">
              A worked example. It is an invented business, so nothing here is a client: the point is the deliverable, not the name on it. Someone writes this:
            </p>
            <blockquote className="mt-3 mb-3 text-[17px] md:text-[19px] leading-[1.4] m-0">
              &ldquo;Mobile dog grooming across the eastern suburbs. Want online booking and a site that doesn&rsquo;t look like 2012.&rdquo;
            </blockquote>
            <p className="text-[13.5px] text-[#62666C] leading-[1.5] mb-2">Two days later, this lands in their inbox:</p>
            <ul className="text-[14.5px] leading-[1.5] pl-5 m-0">
              <li>A homepage with the business name, the services and the suburbs</li>
              <li>Online booking on the page, not a link away</li>
              <li>A fixed quote for the full build, no deposit</li>
            </ul>
          </div>
        </div>
      </section>

      {/* The questions people actually ask. */}
      <section className="bg-[#F3F4F2]">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10 md:py-14">
          <h2 className="text-[24px] md:text-[28px] font-extrabold tracking-[-0.025em] mb-4">Common questions</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-[15.5px] font-semibold mb-1">{f.q}</h3>
                <p className="text-[14.5px] leading-[1.5] text-[#62666C] m-0">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[14px] text-[#62666C]">
            Prefer to talk?{' '}
            <a href={PHONE_HREF} className="text-[#1F2125] font-semibold hover:text-[#0B7A3E] transition-colors">{PHONE}</a>
            {' '}Will, Adelaide.
          </p>
        </div>
      </section>

      {/* The close: dark, and the form again rather than a link back up. */}
      <section className="bg-[#1B1D21] text-white">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-12 md:py-16 grid md:grid-cols-[1.15fr_1fr] gap-8 md:gap-12 items-center">
          <h2 className="text-[28px] md:text-[36px] font-extrabold tracking-[-0.03em] leading-[1.05] m-0" style={{ textWrap: 'balance' }}>{flood}</h2>
          <div>
            <MockupLeadForm variant="compact" look="direct" onGreen source={source} compactField={compactField} />
          </div>
        </div>
      </section>

      {/* Slim footer: who this is, where, and the one link the policy needs. */}
      <footer className="border-t border-[#E5E7E5]">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-5 pb-20 md:pb-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-[11px] uppercase tracking-[0.12em] text-[#62666C]">
          <span>Herbert AI. ABN 83 880 085 162. Adelaide, SA.</span>
          <span className="flex gap-6">
            <a href={PHONE_HREF} className="hover:text-[#1F2125] transition-colors">{PHONE}</a>
            <a href="/privacy" className="hover:text-[#1F2125] transition-colors">Privacy</a>
          </span>
        </div>
      </footer>

      {/* Sticky call bar, phones only. The footer carries extra bottom padding
          on phones so the bar never covers it. */}
      <a href={PHONE_HREF} className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-center justify-center gap-2 bg-[#0B7A3E] text-white font-bold text-[15px] py-3.5">
        <PhoneIcon />
        Call Will: {PHONE}
      </a>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0 mt-[2px]" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#0B7A3E" />
      <path d="M7 12.5l3.2 3L17 9" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

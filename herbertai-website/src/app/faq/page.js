import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'
import { OG_IMAGE } from '@/app/components/site/og'

export const metadata = {
  title: 'FAQ | pricing, timelines & process',
  description:
    'Common questions about Herbert AI, custom software and AI for small businesses in Adelaide: what gets built, the free audit, the pilot, timelines, pricing, contracts, ownership, and getting started.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Custom software and AI for small business · Herbert AI',
    description:
      'Common questions about the free AI audit, the pilot, pricing, ownership, and how working with Herbert AI in Adelaide goes.',
    url: '/faq',
    images: [OG_IMAGE],
  },
}

const faqs = [
  {
    q: 'What does Herbert AI do?',
    a: 'Herbert AI builds custom software and AI for small businesses, from Adelaide. Most work starts as an AI employee, software that does one office job every day, like chasing documents, answering enquiries or confirming bookings, with someone on your team approving anything that goes out. Bigger builds put the whole operation in one system, with the AI employees working inside it. Will Herbert builds all of it, and you own what gets built.',
  },
  {
    q: 'Who is it for?',
    a: 'Owner-operated businesses with roughly 3 to 20 staff. Accountants and bookkeepers, allied health, trades with an office, and real estate and property management come first, but the audit works for any office with admin that repeats every week.',
  },
  {
    q: 'How do I get started?',
    a: 'With the free AI audit. It is 45 minutes with Will on how your business runs, then a written page within two business days that puts a yearly cost on the three jobs taking the most hours and says which one to hand over first. Book it from the how it works page.',
  },
  {
    q: 'What does it cost?',
    a: 'The audit is free. The Bottleneck Pilot, one AI employee for one job, is $3,500 fixed and live in 14 days or free. Full builds start from $25,000 and are scoped after the audit, and retainers start from $1,000 a month. If the audit shows the saving would not comfortably cover the price, you are told that instead.',
  },
  {
    q: 'How long does it take?',
    a: 'The pilot is live 14 days after the kickoff chat, or you do not pay. A full build gets one fixed price and a timeline in its written scope, agreed after the audit.',
  },
  {
    q: 'What is an AI employee?',
    a: 'Software with one job in your business, say an AI document chaser or an AI front desk assistant. It runs on your real data every day and takes over the repetitive part of a job, not the person doing it. Anything it sends to a customer is approved by someone on your team first.',
  },
  {
    q: 'Will the AI talk to my customers on its own?',
    a: 'Only as far as you decide. By default anything going out to a customer is approved by a person first. Where it does answer directly, say an AI receptionist taking calls after hours, it takes a message or passes the call to you when it cannot help, and you set what it is allowed to handle.',
  },
  {
    q: 'Do I have to change my existing software?',
    a: 'No. The work connects what you already use. Your calendar, inbox, job system and invoicing stay where they are, and the new workflow sits between them and does the repetitive part.',
  },
  {
    q: 'Are there contracts or lock-in?',
    a: 'No. The pilot includes its first 30 days of hosting and support, then you choose $200 a month care, a move onto your own accounts, or a bigger build. Full builds run on your own accounts, and retainers are month to month.',
  },
  {
    q: 'Who owns the code and data?',
    a: 'You do. Builds run on your own accounts with a perpetual licence to the software, and your data and customer list stay yours, so nothing is held back if you leave. Will keeps his internal tools and component library, which is part of how each build ships faster.',
  },
  {
    q: 'Do I need any technical knowledge?',
    a: 'None. Will handles the build, the hosting and the AI setup, and walks your team through it when it goes live. You explain how the business runs and what is slowing it down.',
  },
  {
    q: 'What if what I need is not on the site?',
    a: 'Bring it to the audit. Most of the work is specific to one business anyway, say a custom intake form, an internal admin tool, or two systems that do not talk to each other. If it is worth building it gets a price, and if it is not you are told so.',
  },
  {
    q: 'Where are you based?',
    a: 'Adelaide, South Australia, working with businesses Australia-wide. You deal with Will directly from the audit to the day it goes live, with no account manager in between.',
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

export default function FAQ() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ─── Hero — static (above the fold, must paint on first load) ─ */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>FAQ</Eyebrow>
          <h1
            className="font-display text-ink max-w-[16ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            Common questions. Straight answers.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[60ch]">
            Everything you might want to know before working with Herbert AI,
            custom software and AI for small businesses, built in Adelaide. If you don&apos;t see
            your question answered below, just{' '}
            <Link href="/contact" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
              get in touch
            </Link>.
          </p>
        </div>
      </section>

      {/* ─── FAQs ─────────────────────────────────────────────────── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-5">
            {faqs.map((f, i) => (
              <RevealOnScroll key={f.q} delay={(i % 2) * 0.08}>
                <div className="bg-cream border border-line rounded-3xl p-7 lift h-full">
                  <h3 className="text-[17px] font-medium text-ink mb-3 tracking-[-0.01em] leading-[1.35]">{f.q}</h3>
                  <p className="text-[15px] text-muted leading-[1.6]">{f.a}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Closing CTA — full-bleed ink ─────────────────────────── */}
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-32 md:py-44">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Eyebrow color="white">Still have questions?</Eyebrow>
              <h2
                className="font-display text-cream"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 800 }}
              >
                Start with the
                <br />
                free AI audit.
              </h2>
              <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[52ch]">
                Forty five minutes on how your business runs, then a written page on what your
                admin costs. If there&apos;s a job worth building on, you get a price. If there
                isn&apos;t, you&apos;re told.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-5 lg:items-end">
              <Link
                href="/pilot"
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
              >
                Book a free AI audit <span aria-hidden>&rarr;</span>
              </Link>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40 lg:text-right">
                Adelaide · solo · no account manager
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

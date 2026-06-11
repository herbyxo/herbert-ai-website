import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'

export const metadata = {
  title: 'FAQ | pricing, timelines & process',
  description:
    'Common questions about Herbert AI, an Adelaide automation & growth studio — what we build, project timelines, AI voice agent realism, pricing, contracts, ownership, and getting started.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Adelaide automation & growth studio · Herbert AI',
    description:
      'Common questions about timelines, pricing, customisation, contracts, and how working with Herbert AI in Adelaide actually goes.',
    url: '/faq',
    images: ['/opengraph-image'],
  },
}

const faqs = [
  {
    q: 'What does Herbert AI do?',
    a: 'Custom systems for small business across three areas — Grow (ads, SEO, landing pages, email + SMS), Automate (voice agents, chatbots, workflow automation, CRM), and Build (websites, dashboards, portals, booking systems). All bespoke, built solo by Will Herbert in Adelaide.',
  },
  {
    q: 'How long does a project take?',
    a: 'A typical website runs 1–2 weeks; a voice agent or chatbot 3–5 days. Every quote comes with a fixed timeline up-front, and most full-stack builds (site + dashboard + automation) ship in 2–4 weeks.',
  },
  {
    q: 'How do I get started?',
    a: '30-minute call, no pitch. You explain the bottleneck, I scope what would actually fix it, then quote it. If it’s worth doing, we ship.',
  },
  {
    q: 'Does the AI voice sound robotic?',
    a: 'No. The voice agents use natural, current-generation AI voices — conversational, and they adapt mid-call. Most callers don’t realise it’s an AI until you tell them.',
  },
  {
    q: 'What if the AI can’t answer something?',
    a: 'It takes a message politely with the caller’s details and lets them know you’ll get back to them. You can also configure it to transfer the call to your mobile for specific scenarios — emergencies, VIP customers, anything you want.',
  },
  {
    q: 'How does appointment booking work?',
    a: 'The agent connects to your Google Calendar (or whatever you use). It checks availability in real time, offers suitable slots, books the appointment, and SMSs both sides a confirmation. Two-way sync — if you block out time in your calendar, the agent respects it.',
  },
  {
    q: 'How is everything customised to my business?',
    a: 'I start with a scoping call — services, pricing, common questions, how you actually run things. The voice prompt, chatbot training, dashboard layout, and workflow logic are all tuned to your specifics. No templates.',
  },
  {
    q: 'Are there contracts or lock-in?',
    a: 'No. Builds are fixed-quote projects — you own the system when it’s live, no ongoing fees unless you want hosting or maintenance. Anything ongoing is month-to-month, cancel anytime.',
  },
  {
    q: 'Can I start with one thing and add more later?',
    a: 'Yes. Most clients start with the bottleneck that’s actually hurting — a voice agent for missed calls, a dashboard to stop the spreadsheet chaos — and add the rest as they see value.',
  },
  {
    q: 'What if I need something that isn’t on the services page?',
    a: 'That’s the whole point of the studio. Most real work is bespoke — n8n workflows wired through AroFlo, a custom intake system, an internal admin tool, an integration nobody’s built yet. Tell me the bottleneck, I’ll quote it.',
  },
  {
    q: 'Do I need any technical knowledge?',
    a: 'None. I handle everything technical — design, build, hosting, training the AI, ongoing tweaks. You tell me about your business and what’s slowing you down; I deal with the rest.',
  },
  {
    q: 'Who owns the code and data?',
    a: 'You own the live system and all your data. I keep my own internal tooling and component library (so I can ship faster on the next build), but everything that runs your business is yours — you can take it elsewhere any time.',
  },
  {
    q: 'Where are you based?',
    a: 'Adelaide, South Australia. Solo. You always talk to me directly — no account manager, no junior dev relay.',
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
            Everything you might want to know before working with Herbert AI &mdash; an
            Adelaide automation &amp; growth studio for small business. If you don&apos;t see
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
                Book a 30-minute call.
                <br />
                No pitch.
              </h2>
              <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[52ch]">
                You explain the bottleneck. I scope what would actually fix it, then quote it.
                If it&apos;s worth doing, we ship.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-5 lg:items-end">
              <Link
                href="/contact"
                data-magnetic
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
              >
                Talk to Will <span aria-hidden>&rarr;</span>
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

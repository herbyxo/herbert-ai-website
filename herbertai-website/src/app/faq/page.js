import Link from 'next/link'

const faqs = [
  {
    q: 'What does Herbert AI do?',
    a: 'Custom systems for small business across three areas — Grow (ads, SEO, landing pages, email + SMS), Automate (voice agents, chatbots, workflow automation, CRM), and Build (websites, dashboards, portals, booking systems). All bespoke, built solo by Will Herbert in Adelaide.',
  },
  {
    q: 'How long does a project take?',
    a: 'Productised plans: 1–2 weeks for a website, 3–5 days for a voice agent or chatbot. Custom builds: quoted with a fixed timeline up-front. Most full-stack builds (site + dashboard + automation) ship in 2–4 weeks.',
  },
  {
    q: 'How do I get started?',
    a: '30-minute call, no pitch. You explain the bottleneck, I scope what would actually fix it, then quote it. If it’s worth doing, we ship.',
  },
  {
    q: 'Does the AI voice sound robotic?',
    a: 'No. The voice agents use ElevenLabs voices on top of GPT-4o — natural, conversational, adapts mid-call. Most callers don’t realise it’s an AI until you tell them.',
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
    a: 'No. Productised plans are month-to-month, cancel anytime. Custom builds are a fixed-quote project — you own the system when it’s live, no ongoing fees unless you want hosting / maintenance.',
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

export default function FAQ() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-semibold tracking-[-0.03em] leading-[1] mb-7 max-w-[18ch] text-ink">
            Common questions. <span className="serif-em text-green-deep">Straight answers.</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch]">
            If you don&apos;t see your question answered below, just <Link href="/contact" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">get in touch</Link>.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-cream-alt border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-5">
            {faqs.map((f) => (
              <div key={f.q} className="bg-cream border border-line rounded-3xl p-7">
                <h2 className="text-[17px] font-medium text-ink mb-3 tracking-[-0.01em] leading-[1.35]">{f.q}</h2>
                <p className="text-[15px] text-muted leading-[1.6]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="bg-ink text-white rounded-[32px] p-12 md:p-16 text-center relative overflow-hidden">
            <div className="hero-blob absolute top-[-200px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none" />
            <div className="relative">
              <Eyebrow color="white" center>Still have questions?</Eyebrow>
              <h2 className="text-[36px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] mb-6 max-w-[24ch] mx-auto">
                Book a 30-minute call. <span className="serif-em text-green">No pitch.</span>
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
              >
                Talk to Will <span aria-hidden>→</span>
              </Link>
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
    </div>
  )
}

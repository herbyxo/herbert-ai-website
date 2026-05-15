import Link from 'next/link'

const services = [
  {
    id: 'voice',
    tag: 'Voice · 24/7',
    name: 'AI Voice Agents',
    headline: 'Phones that',
    em: 'never miss a call.',
    body:
      'A 24/7 receptionist with a custom system prompt for your business. Qualifies the job, books it in, sends SMS confirmations, and escalates the urgent ones. Demo’d in real trade callouts — Master Freeze in Sydney, Guy’s Electrical in Adelaide.',
    bullets: [
      'Custom system prompt per business',
      'Google Calendar booking flow',
      'SMS confirmations + reminders',
      'Escalation to a human number when needed',
      'Trained on your services, pricing, FAQs',
    ],
    price: '$297/month',
    priceNote: 'Productised',
  },
  {
    id: 'website',
    tag: 'Web · Custom build',
    name: 'Websites + Dashboards',
    headline: 'Modern sites with',
    em: 'real systems behind them.',
    body:
      'Fast Next.js websites with a private dashboard wired in — bookings, customer DB, SMS automation, revenue tracking. Built end-to-end at blendzbyben.com — Adelaide barbershop running the full stack we shipped.',
    bullets: [
      'Custom Next.js site, no template',
      'Owner dashboard on Supabase',
      'Booking flow + payments where needed',
      'Email + SMS comms via Resend / Twilio',
      'You own the live system',
    ],
    price: '$300 setup + $197/month',
    priceNote: 'Productised baseline · full custom quoted',
  },
  {
    id: 'workflows',
    tag: 'Workflows · Quoted',
    name: 'Workflow Automation',
    headline: 'Your existing tools,',
    em: 'finally talking to each other.',
    body:
      'n8n stitched through your stack — AroFlo, Google Calendar, Gmail, Resend, Twilio, your CRM. Quote follow-ups, no-show recovery, lead routing, internal alerts. Scoped to your bottleneck, quoted on the build.',
    bullets: [
      'n8n + your existing accounts',
      'AroFlo / Calendar / Gmail / CRM',
      'Quote chase + booking confirmations',
      'Internal Slack / SMS alerts',
      'Hosted and maintained',
    ],
    price: 'Quote-based',
    priceNote: 'Scoped per build',
  },
  {
    id: 'chatbot',
    tag: 'Chat · 24/7',
    name: 'AI Chatbot Widget',
    headline: 'A chat widget that',
    em: 'actually knows your business.',
    body:
      'Lives on your site, trained on your services, pricing, hours, FAQs. Captures leads, answers questions, books appointments — all without you watching it. Same backbone as the voice agent, in a chat window.',
    bullets: [
      'Trained on your business content',
      'Lead capture · name, email, phone',
      'Booking through chat',
      'Mobile + desktop',
      'Editable knowledge base',
    ],
    price: '$197/month',
    priceNote: 'Productised',
  },
]

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <Eyebrow>Services</Eyebrow>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-semibold tracking-[-0.03em] leading-[1] mb-7 max-w-[18ch] text-ink">
            What we <span className="serif-em text-green-deep">build for</span> small business.
          </h1>
          <p className="text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch]">
            Bespoke systems for businesses that need automation — voice agents, dashboards, booking flows, workflow glue.
            Quoted on scope when it&apos;s a custom build. Productised plans below for the patterns we ship most often.
          </p>
          <div className="flex flex-wrap gap-3 mt-9">
            <Link
              href="/contact"
              className="bg-green text-ink px-6 py-3.5 rounded-full font-semibold text-[15px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
            >
              Scope your build <span aria-hidden>→</span>
            </Link>
            <Link
              href="/pricing"
              className="text-ink px-6 py-3.5 rounded-full font-medium text-[15px] inline-flex items-center gap-2 border border-ink/20 hover:border-ink/50 transition-colors"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-cream-alt border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 space-y-24 md:space-y-32">
          {services.map((s, i) => (
            <ServiceBlock key={s.id} service={s} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="bg-ink text-white rounded-[32px] p-12 md:p-20 relative overflow-hidden">
          <div className="hero-blob absolute top-[-200px] right-[-100px] w-[500px] h-[500px] pointer-events-none" />
          <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-end">
            <div>
              <Eyebrow color="white">Run all three together</Eyebrow>
              <h2 className="text-[36px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] mb-6 max-w-[20ch]">
                Voice + web + chat — <span className="serif-em text-green">save $294/month.</span>
              </h2>
              <p className="text-white/70 text-[17px] leading-[1.6] max-w-[52ch] mb-3">
                Bundle the three productised systems and they run as one stack. $697/month, everything in,
                no setup fees. The fastest way to get the full receptionist + site + widget pattern live.
              </p>
              <p className="text-white/50 text-[14px] font-mono uppercase tracking-[0.12em]">
                · vs $991/mo bought separately
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/pricing"
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center justify-between gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
              >
                See bundle pricing <span aria-hidden>→</span>
              </Link>
              <Link
                href="/contact"
                className="text-white px-6 py-3.5 rounded-full font-medium text-[15px] inline-flex items-center justify-between gap-2 border border-white/20 hover:border-white/50 transition-colors"
              >
                Talk to Will <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom builds CTA */}
      <section className="px-6 lg:px-12 pb-24 md:pb-32 max-w-[1280px] mx-auto">
        <div className="bg-cream-alt border border-line rounded-[32px] p-12 md:p-20">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-end">
            <div>
              <Eyebrow>Doesn&apos;t fit the menu?</Eyebrow>
              <h2 className="text-[36px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] mb-6 max-w-[18ch] text-ink">
                Got something <span className="serif-em text-green-deep">more specific?</span>
              </h2>
              <p className="text-muted text-[17px] leading-[1.6] max-w-[52ch]">
                Bespoke systems are quoted on scope. Tell us the bottleneck — we&apos;ll sketch an approach,
                ballpark cost and timeline, and you decide if it&apos;s worth doing. No retainers, no agency overhead.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="bg-ink text-white px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center justify-between gap-2 hover:bg-ink-soft transition-colors"
              >
                Scope a custom build <span aria-hidden>→</span>
              </Link>
              <Link
                href="/portfolio/websites"
                className="text-ink px-6 py-3.5 rounded-full font-medium text-[15px] inline-flex items-center justify-between gap-2 border border-ink/20 hover:border-ink/50 transition-colors"
              >
                See recent work <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ServiceBlock({ service, reverse }) {
  const { id, tag, name, headline, em, body, bullets, price, priceNote } = service
  return (
    <div id={id} className="scroll-mt-20 grid md:grid-cols-2 gap-10 md:gap-16 items-start">
      <div className={reverse ? 'md:order-2' : ''}>
        <Eyebrow>{tag}</Eyebrow>
        <h2 className="text-[36px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] mb-5 text-ink">
          {headline} <span className="serif-em text-green-deep">{em}</span>
        </h2>
        <p className="text-muted text-[16px] md:text-[17px] leading-[1.6] max-w-[52ch] mb-7">{body}</p>
        <ul className="space-y-3 mb-8">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-deep shrink-0" />
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink">{b}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="bg-ink text-white px-6 py-3 rounded-full font-semibold text-[14px] inline-flex items-center gap-2 hover:bg-ink-soft transition-colors"
        >
          Start scoping <span aria-hidden>→</span>
        </Link>
      </div>

      <div className={`bg-cream rounded-3xl p-8 md:p-10 border border-line ${reverse ? 'md:order-1' : ''}`}>
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{name}</span>
        </div>
        <div className="text-[44px] md:text-[56px] font-medium tracking-[-0.03em] leading-none mb-3 text-ink">
          {price}
        </div>
        <p className="text-[13px] font-mono uppercase tracking-[0.12em] text-muted mb-8">{priceNote}</p>
        <div className="pt-6 border-t border-line">
          <p className="text-[13px] text-muted leading-[1.6]">
            Productised plans run month-to-month. Custom builds are quoted once and shipped — no retainer.
          </p>
        </div>
      </div>
    </div>
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

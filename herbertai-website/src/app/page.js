import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Services />
      <Audio />
      <Pricing />
      <FinalCTA />
    </>
  )
}

/* ─── Hero ──────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="px-6 lg:px-12 py-6 max-w-[1280px] mx-auto">
      <div className="bg-ink text-white rounded-[32px] p-8 md:p-16 lg:p-22 relative overflow-hidden">
        <div className="hero-blob absolute top-[-120px] right-[-120px] w-[480px] h-[480px] pointer-events-none" />

        <Eyebrow color="white" pulse>AI receptionist · live in Adelaide</Eyebrow>

        <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-semibold tracking-[-0.04em] leading-[0.95] mb-7 max-w-[14ch]">
          Never miss<br />
          <span className="serif-em text-green text-[1.05em]">a single</span> job<br />
          while you&apos;re<br />
          on the tools.
        </h1>

        <p className="text-white/70 text-[17px] md:text-[19px] leading-[1.55] max-w-[56ch] mb-11 font-light">
          Solo tradies miss 3 to 5 calls a week on the job. Herbert answers every one,
          24/7, qualifies it, books it in, and SMSs you the details.
          You finish what you started — the AI handles the phone.
        </p>

        <div className="flex flex-wrap gap-3 items-center mb-16">
          <Link
            href="/portfolio/voice"
            className="bg-green text-ink px-6 py-3.5 rounded-full font-semibold text-[15px] inline-flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px"
          >
            Hear a real call <span aria-hidden>→</span>
          </Link>
          <Link
            href="/services"
            className="text-white px-5 py-3 rounded-full font-medium text-[15px] inline-flex items-center gap-2 border border-white/20 hover:border-white/50 transition-colors"
          >
            How it works
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 md:gap-12 pt-12 border-t border-white/10">
          <Stat value={<>24<span className="text-green">/</span>7</>} label="Always answering" />
          <Stat value={<>$<span className="text-green">5k</span>+</>} label="Avg monthly recovery" />
          <Stat value={<>14 <span className="text-green">days</span></>} label="Free trial · No lock-in" />
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-medium text-[28px] md:text-[40px] tracking-[-0.03em] leading-none mb-2">{value}</div>
      <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.12em] text-white/50">{label}</div>
    </div>
  )
}

/* ─── How it works ──────────────────────────────────────────────────── */

function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Calls forward to Herbert',
      body: "When you're busy or after hours, your number routes straight to your AI receptionist — answered in under 2 rings, every time.",
    },
    {
      n: '02',
      title: 'Job qualified, booked, confirmed',
      body: 'Herbert collects job type, address, urgency, and contact details. Books it into your calendar and SMSs the customer a confirmation.',
    },
    {
      n: '03',
      title: 'You see it in your dashboard',
      body: 'Every call, every booking, with revenue captured. Genuine emergencies escalate to your mobile straight away.',
    },
  ]

  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
      <div>
        <Eyebrow>How it works</Eyebrow>
        <h2 className="text-[40px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] max-w-[18ch] text-ink">
          Built for sparkies who&apos;d rather be <span className="serif-em text-green-deep">on the tools</span> than glued to their phone.
        </h2>
      </div>
      <div className="grid gap-8 pt-1">
        {steps.map((s) => (
          <div key={s.n} className="flex gap-5">
            <span className="font-mono text-[12px] text-muted pt-1 shrink-0">{s.n}</span>
            <div>
              <h3 className="text-[18px] font-medium tracking-[-0.01em] mb-1.5 text-ink">{s.title}</h3>
              <p className="text-[15px] text-muted leading-[1.6] max-w-[52ch]">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Services ─────────────────────────────────────────────────────── */

function Services() {
  const items = [
    {
      tag: 'Voice',
      title: 'AI Voice Receptionist',
      body: '24/7 call answering. Qualifies the job, books it in, SMS confirmations. Never miss a lead again.',
      href: '/services#voice',
    },
    {
      tag: 'Web',
      title: 'Professional Website',
      body: 'Fast, modern site that turns visitors into bookings. SEO-ready, mobile-first, hosted on Vercel.',
      href: '/services#website',
    },
    {
      tag: 'Chat',
      title: 'AI Chatbot Widget',
      body: 'Website chat that captures leads, answers questions, and books jobs while you sleep.',
      href: '/services#chatbot',
    },
  ]

  return (
    <section className="bg-cream-alt border-y border-line">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-[36ch]">
            <Eyebrow>What we build</Eyebrow>
            <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
              Three products. <span className="serif-em text-green-deep">One outcome.</span>
            </h2>
          </div>
          <p className="text-[16px] text-muted max-w-[42ch] leading-[1.6]">
            Pick one to start, or run all three together. Every product feeds into the same goal — capture every lead, automatically.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item) => (
            <Link
              key={item.tag}
              href={item.href}
              className="group bg-cream rounded-3xl p-8 border border-line hover:border-ink/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{item.tag}</span>
              </div>
              <h3 className="text-[24px] font-medium tracking-[-0.02em] mb-3 text-ink">{item.title}</h3>
              <p className="text-[15px] text-muted leading-[1.6] mb-8">{item.body}</p>
              <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink group-hover:gap-2.5 transition-all">
                Learn more <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Audio demo ───────────────────────────────────────────────────── */

function Audio() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
      <div className="bg-ink text-white rounded-[32px] p-8 md:p-16 grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-center relative overflow-hidden">
        <div className="hero-blob absolute bottom-[-160px] left-[-160px] w-[420px] h-[420px] pointer-events-none" />

        <div className="relative">
          <Eyebrow color="white" pulse>Real call · Master Freeze</Eyebrow>
          <h2 className="text-[36px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] mb-5">
            Hear what your AI receptionist <span className="serif-em text-green">actually</span> sounds like.
          </h2>
          <p className="text-white/70 text-[16px] leading-[1.6] mb-8 max-w-[48ch]">
            Unedited recording of a real refrigerant-leak callout. Herbert qualified the job,
            collected the details, and closed the call — zero human involvement.
          </p>
          <Link
            href="/portfolio/voice"
            className="bg-green text-ink px-5 py-3 rounded-full font-semibold text-[14px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
          >
            See more demos <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="bg-white/5 border border-white/15 rounded-2xl p-6 relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green hi-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">Live recording</span>
          </div>
          <p className="text-[14px] font-medium mb-1">Master Freeze · Sydney, NSW</p>
          <p className="text-[12px] text-white/50 mb-5">Refrigerant leak enquiry · Inbound call</p>
          <audio controls preload="metadata" className="w-full" style={{ filter: 'invert(0.85)' }}>
            <source src="/steve-demo.wav" type="audio/wav" />
          </audio>
        </div>
      </div>
    </section>
  )
}

/* ─── Pricing teaser ───────────────────────────────────────────────── */

function Pricing() {
  return (
    <section className="bg-cream-alt border-y border-line">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="max-w-[42ch] mb-16">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
            Honest pricing. <span className="serif-em text-green-deep">No lock-in.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <PriceCard tag="Voice" name="AI Voice Receptionist" price="$297" suffix="/month" highlight />
          <PriceCard tag="Web" name="Professional Website" price="$300" suffix=" setup" body="$197 / month hosting + maintenance" />
          <PriceCard tag="Chat" name="AI Chatbot Widget" price="$197" suffix="/month" />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <span>· 14-day free trial</span>
          <span>· Cancel anytime</span>
          <span>· No setup pressure</span>
          <Link href="/pricing" className="text-ink hover:text-green-deep transition ml-auto">
            Full pricing →
          </Link>
        </div>
      </div>
    </section>
  )
}

function PriceCard({ tag, name, price, suffix, body, highlight }) {
  return (
    <div className={`rounded-3xl p-8 border ${highlight ? 'bg-cream border-ink/40' : 'bg-cream border-line'}`}>
      <div className="flex items-center gap-2 mb-7">
        <span className={`w-1.5 h-1.5 rounded-full ${highlight ? 'bg-green-deep' : 'bg-muted'}`} />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{tag}</span>
        {highlight && (
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-green-deep">Most popular</span>
        )}
      </div>
      <h3 className="text-[20px] font-medium tracking-[-0.01em] mb-2 text-ink">{name}</h3>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-[44px] font-medium tracking-[-0.03em] text-ink">{price}</span>
        <span className="text-[14px] text-muted">{suffix}</span>
      </div>
      {body && <p className="text-[13px] text-muted">{body}</p>}
    </div>
  )
}

/* ─── Final CTA ─────────────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section className="px-6 lg:px-12 pb-24 md:pb-32 max-w-[1280px] mx-auto">
      <div className="bg-ink text-white rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="hero-blob absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none" />

        <div className="relative">
          <Eyebrow color="white" center>Ready when you are</Eyebrow>
          <h2 className="text-[40px] md:text-[64px] font-medium leading-[1.02] tracking-[-0.03em] mb-6 max-w-[20ch] mx-auto">
            Stop losing jobs <span className="serif-em text-green">while you&apos;re on the tools.</span>
          </h2>
          <p className="text-white/70 text-[17px] leading-[1.6] mb-10 max-w-[52ch] mx-auto">
            Two-week free trial. If Herbert doesn&apos;t catch a job that would&apos;ve been missed, you walk.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
            >
              Get started <span aria-hidden>→</span>
            </Link>
            <Link
              href="/portfolio/voice"
              className="text-white px-6 py-3.5 rounded-full font-medium text-[16px] inline-flex items-center gap-2 border border-white/20 hover:border-white/50 transition-colors"
            >
              Hear a demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Reusable bits ─────────────────────────────────────────────────── */

function Eyebrow({ children, color = 'ink', pulse, center }) {
  const isWhite = color === 'white'
  return (
    <div className={`flex items-center gap-3 mb-9 font-mono text-[11px] uppercase tracking-[0.18em] ${isWhite ? 'text-white/55' : 'text-muted'} ${center ? 'justify-center' : ''}`}>
      <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />
      {pulse && <span className="w-1.5 h-1.5 rounded-full bg-green hi-pulse" />}
      {children}
    </div>
  )
}

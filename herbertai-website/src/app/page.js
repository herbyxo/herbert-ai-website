import Link from 'next/link'
import Hero from './components/Hero'
import GrowChapter from './components/chapters/GrowChapter'
import AutomateChapter from './components/chapters/AutomateChapter'
import BuildChapter from './components/chapters/BuildChapter'

export default function Home() {
  return (
    <>
      <Hero />
      <GrowChapter />
      <AutomateChapter />
      <BuildChapter />
      <HowItWorks />
      <Services />
      <Pricing />
      <FinalCTA />
    </>
  )
}

/* ─── How it works ──────────────────────────────────────────────────── */

function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'We talk',
      body: '30-minute call. You explain the bottleneck — missed calls, manual bookings, follow-ups that fall through. We scope a fix that fits your scale.',
    },
    {
      n: '02',
      title: 'We build',
      body: 'One to three weeks. Voice agent, custom dashboard, booking flow, or workflow glue — whatever the bottleneck calls for. You see progress as we ship.',
    },
    {
      n: '03',
      title: 'We hand it over',
      body: 'Live system, plus a direct line for tweaks. No lock-in, no agency retainer, no 90-day onboarding.',
    },
  ]

  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 reveal">
      <div>
        <Eyebrow>How we work</Eyebrow>
        <h2 className="text-[40px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] max-w-[18ch] text-ink">
          Built for businesses that&apos;d rather <span className="serif-em text-green-deep">run</span> than tinker with their tools.
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
      tag: 'Grow',
      title: 'Bring new business in.',
      body: 'Paid ads, SEO, landing pages, email + SMS, lead funnels. The systems that get more customers through the door.',
      href: '/services#grow',
    },
    {
      tag: 'Automate',
      title: 'Run without you in the loop.',
      body: 'AI voice agents, chatbots, n8n workflows, CRM automation. Anything where a computer can do the boring repetitive work.',
      href: '/services#automate',
    },
    {
      tag: 'Build',
      title: 'Custom software, yours to keep.',
      body: 'Websites, dashboards, customer portals, booking systems. Bespoke custom builds — no platform lock-in.',
      href: '/services#build',
    },
  ]

  return (
    <section className="bg-cream-alt border-y border-line">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 reveal">
          <div className="max-w-[36ch]">
            <Eyebrow>What we build</Eyebrow>
            <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
              Three buckets. <span className="serif-em text-green-deep">One studio.</span>
            </h2>
          </div>
          <p className="text-[16px] text-muted max-w-[42ch] leading-[1.6]">
            Pick the one that matches your bottleneck — or run a mix. Productised plans for common patterns; custom builds quoted on scope.
          </p>
        </div>

        {/* Editorial directory rows instead of card grid */}
        <div className="border-t border-line">
          {items.map((item, i) => (
            <Link
              key={item.tag}
              href={item.href}
              className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[120px_1fr_auto] items-baseline gap-6 md:gap-10 py-8 md:py-12 border-b border-line hover:bg-cream/60 transition-colors reveal"
            >
              <div className="flex items-center gap-2 md:pt-2">
                <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                <span className="w-1 h-1 rounded-full bg-green-deep" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{item.tag}</span>
              </div>
              <div className="max-w-[60ch]">
                <h3 className="text-[28px] md:text-[40px] font-medium tracking-[-0.025em] leading-[1.1] mb-3 text-ink">
                  {item.title.split(/(\.)$/)[0]}
                  <span className="serif-em text-green-deep">.</span>
                </h3>
                <p className="text-[15px] md:text-[16px] text-muted leading-[1.6]">{item.body}</p>
              </div>
              <span className="self-center inline-flex items-center gap-1.5 text-[14px] font-medium text-ink group-hover:gap-3 transition-all whitespace-nowrap">
                <span className="hidden md:inline">See {item.tag.toLowerCase()}</span>
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Pricing teaser ───────────────────────────────────────────────── */

function Pricing() {
  const models = [
    { tag: 'Fixed quote', desc: 'For defined builds — websites, voice agents, dashboards, custom systems.' },
    { tag: 'Hourly', desc: 'For small fixes, content edits, tune-ups on a live system.' },
    { tag: 'Monthly retainer', desc: 'For ongoing systems — hosting, monitoring, prompt updates.' },
  ]

  return (
    <section className="bg-cream-alt border-y border-line">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 mb-12 reveal">
          <div>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
              Priced on scope. <span className="serif-em text-green-deep">Not on a menu.</span>
            </h2>
          </div>
          <p className="text-[16px] md:text-[17px] text-muted leading-[1.65] max-w-[58ch] pt-2">
            Every business needs something different — so every quote starts with a 30-minute scoping call.
            You get one fixed number and a real timeline. Three pricing models, depending on the work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 reveal">
          {models.map((m, i) => (
            <div key={m.tag} className="bg-cream rounded-3xl p-8 border border-line lift">
              <div className="flex items-center gap-2 mb-7">
                <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                <span className="w-1 h-1 rounded-full bg-green-deep" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{m.tag}</span>
              </div>
              <p className="text-[15px] text-ink-soft leading-[1.6]">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <span>· Fixed quotes</span>
          <span>· No lock-in</span>
          <span>· No agency overhead</span>
          <Link href="/pricing" className="text-ink hover:text-green-deep transition ml-auto">
            How we price →
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA — editorial closing statement ───────────────────────── */

function FinalCTA() {
  return (
    <section className="bg-ink text-cream relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-32 md:py-48">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          {/* Left: closing statement */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-9 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/45">
              <span className="w-8 h-px bg-green" />
              <span>The closing pitch</span>
            </div>

            <h2
              className="font-display text-cream"
              style={{
                fontSize: 'var(--text-display-md)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                fontWeight: 800,
              }}
            >
              Tell me what&rsquo;s slow.
              <br />
              <span className="text-green">I&rsquo;ll show you</span> what I&rsquo;d build.
            </h2>

            <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[54ch]">
              30-minute call. No deck, no pitch. You walk me through the bottleneck;
              I tell you whether it&rsquo;s worth building, what it would cost, and how long it would take.
            </p>
          </div>

          {/* Right: single CTA + founder note */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:items-end">
            <Link
              href="/contact"
              data-magnetic
              className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
            >
              Book a 30-min call <span aria-hidden>→</span>
            </Link>

            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40 lg:text-right">
              Will Herbert &middot; Adelaide
              <br />
              hello@herbert-aisolutions.com
            </div>
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
      {center && <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />}
    </div>
  )
}

import Link from 'next/link'

export const metadata = {
  title: 'About Will Herbert',
  description:
    'Will Herbert runs Herbert AI — a solo automation & growth studio in Adelaide, building bespoke systems for small business. Direct line to the builder, no agency overhead.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Will Herbert · Herbert AI',
    description:
      'Solo automation & growth studio in Adelaide. Direct line to the builder.',
    url: '/about',
  },
}

const capabilities = [
  {
    tag: 'Not enough customers',
    title: 'Grow',
    body: 'Paid ads, SEO, landing pages, email + SMS, lead funnels — the systems that bring new business through the door.',
  },
  {
    tag: 'Drowning in admin',
    title: 'Automate',
    body: 'Voice agents, chatbots, workflow automation, CRM setup — anything repetitive that a computer can handle without you in the loop.',
  },
  {
    tag: 'No real system',
    title: 'Build',
    body: 'Websites, dashboards, customer portals, booking systems — custom software, built bespoke and yours to keep.',
  },
]

const steps = [
  {
    n: '01',
    title: 'We talk',
    body: '30-minute call. You walk me through the bottleneck. I scope what would actually fix it — and what isn’t worth building.',
  },
  {
    n: '02',
    title: 'We scope',
    body: 'I write up the plan and the price. Fixed quote on custom builds, productised plan on the off-the-shelf patterns. No surprises later.',
  },
  {
    n: '03',
    title: 'I build, you keep',
    body: 'One to three weeks, usually. You see progress as I ship. When it’s live, it’s your system — direct line to me for tweaks, no retainer lock.',
  },
]

const recent = [
  {
    tag: 'Hospitality · Adelaide',
    name: 'Blendz By Ben',
    body: 'Full-stack rebuild — custom site, owner dashboard, booking flow, SMS + email automation. Replaced a generic Setmore booking page on someone else’s domain.',
    href: 'https://blendzbyben.com',
    external: true,
  },
  {
    tag: 'Trades · Sydney',
    name: 'Master Freeze',
    body: 'AI voice receptionist for a commercial refrigeration company. Qualifies callouts, books jobs, escalates emergencies.',
    href: '/services#automate',
    external: false,
  },
  {
    tag: 'Property · productised',
    name: 'Property manager AI',
    body: 'Productised voice + portal system for residential property managers. Handles tenant maintenance reports end-to-end.',
    href: '/property-managers',
    external: false,
  },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <Eyebrow>About</Eyebrow>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-semibold tracking-[-0.03em] leading-[1] mb-7 max-w-[18ch] text-ink">
            Hi, I&apos;m <span className="serif-em text-green-deep">Will Herbert.</span> I build automation for small business.
          </h1>
          <div className="max-w-[60ch] space-y-5 text-[17px] md:text-[19px] text-muted leading-[1.6]">
            <p>
              Herbert AI is a solo automation &amp; growth studio in Adelaide. I help small businesses grow and run themselves —
              ad campaigns, websites, dashboards, voice agents, workflow automation, whatever the business
              actually needs — for owners who want a thing built and don&apos;t want to hire an agency to do it.
            </p>
            <p>
              Started with AI receptionists for tradies, which is where the voice-agent proof comes from.
              The same patterns transferred quickly into hospitality, property management, and anywhere else
              there&apos;s a repetitive process eating someone&apos;s week.
            </p>
          </div>
        </div>
      </section>

      {/* What I build */}
      <section className="bg-cream-alt border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="max-w-[40ch] mb-16">
            <Eyebrow>What I actually build</Eyebrow>
            <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
              Three kinds of work, <span className="serif-em text-green-deep">one builder.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-cream rounded-3xl p-8 md:p-10 border border-line">
                <div className="flex items-center gap-2 mb-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{c.tag}</span>
                </div>
                <h3 className="text-[24px] font-medium tracking-[-0.02em] mb-3 text-ink">{c.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it goes */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
        <div>
          <Eyebrow>How working with me actually goes</Eyebrow>
          <h2 className="text-[40px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] max-w-[18ch] text-ink">
            Three steps. <span className="serif-em text-green-deep">No agency overhead.</span>
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

      {/* Why solo */}
      <section className="bg-cream-alt border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <Eyebrow>Why solo, why bespoke</Eyebrow>
            <h2 className="text-[40px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] max-w-[16ch] text-ink">
              No agency. <span className="serif-em text-green-deep">No template.</span>
            </h2>
          </div>
          <div className="max-w-[60ch] space-y-5 text-[16px] text-muted leading-[1.7]">
            <p>
              You talk to the person building it. Not a sales rep, not an account manager,
              not a junior who escalates to a senior. Me. That&apos;s the whole pitch.
            </p>
            <p>
              No template either — your business doesn&apos;t look like the last one, and the system
              shouldn&apos;t pretend it does. Custom prompts, custom dashboards, custom workflows. Quoted once, shipped, done.
            </p>
            <p>
              No retainer, no lock-in, no quarterly business review. If it&apos;s working, leave it running.
              If you need a tweak, message me.
            </p>
          </div>
        </div>
      </section>

      {/* Recent work */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="max-w-[40ch] mb-12">
          <Eyebrow>Recent work</Eyebrow>
          <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
            A few things <span className="serif-em text-green-deep">running live.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {recent.map((r) => {
            const inner = (
              <>
                <div className="flex items-center gap-2 mb-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{r.tag}</span>
                </div>
                <h3 className="text-[22px] font-medium tracking-[-0.02em] mb-3 text-ink">{r.name}</h3>
                <p className="text-[14px] text-muted leading-[1.6] mb-7">{r.body}</p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
                  {r.external ? 'Visit site' : 'See more'} <span aria-hidden>→</span>
                </span>
              </>
            )
            return r.external ? (
              <a
                key={r.name}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="bg-cream-alt rounded-3xl p-8 border border-line hover:border-ink/40 transition-colors block lift"
              >
                {inner}
              </a>
            ) : (
              <Link
                key={r.name}
                href={r.href}
                className="bg-cream-alt rounded-3xl p-8 border border-line hover:border-ink/40 transition-colors block lift"
              >
                {inner}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 lg:px-12 pb-24 md:pb-32 max-w-[1280px] mx-auto">
        <div className="bg-ink text-white rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="hero-blob absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none" />
          <div className="relative">
            <Eyebrow color="white" center>Ready when you are</Eyebrow>
            <h2 className="text-[40px] md:text-[64px] font-medium leading-[1.02] tracking-[-0.03em] mb-6 max-w-[18ch] mx-auto">
              Got an idea? <span className="serif-em text-green">Get in touch.</span>
            </h2>
            <p className="text-white/70 text-[17px] leading-[1.6] mb-10 max-w-[52ch] mx-auto">
              30-minute call, no pitch. Tell me the bottleneck — I&apos;ll tell you whether it&apos;s worth building.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
              >
                Talk to Will <span aria-hidden>→</span>
              </Link>
              <Link
                href="/services"
                className="text-white px-6 py-3.5 rounded-full font-medium text-[16px] inline-flex items-center gap-2 border border-white/20 hover:border-white/50 transition-colors"
              >
                See services
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
      {center && <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />}
    </div>
  )
}

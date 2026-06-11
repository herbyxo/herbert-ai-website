import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'

export const metadata = {
  title: 'About | Adelaide web & automation studio',
  description:
    'Will Herbert runs Herbert AI, an Adelaide web design & automation studio for small business. Solo builder, direct line, no agency overhead — websites, dashboards, voice agents, and workflow automation.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Adelaide web & automation studio · Herbert AI',
    description:
      'Adelaide web design & automation studio for small business. Solo builder, direct line, no agency overhead.',
    url: '/about',
    images: ['/opengraph-image'],
  },
}

const capabilities = [
  {
    tag: 'Not enough customers',
    title: 'Grow',
    body: 'Paid ads, SEO, landing pages, email + SMS, lead funnels — the systems that bring new business through the door.',
    href: '/services#grow',
  },
  {
    tag: 'Drowning in admin',
    title: 'Automate',
    body: 'Voice agents, chatbots, workflow automation, CRM setup — anything repetitive that a computer can handle without you in the loop.',
    href: '/services#automate',
  },
  {
    tag: 'No real system',
    title: 'Build',
    body: 'Websites, dashboards, customer portals, booking systems — custom software, built bespoke and yours to keep.',
    href: '/services#build',
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
    body: 'I write up the plan and the price. One fixed quote, a real timeline. No surprises later.',
  },
  {
    n: '03',
    title: 'I build, you keep',
    body: 'One to three weeks, usually. You see progress as I ship. When it’s live, it’s your system — direct line to me for tweaks.',
  },
]

const recent = [
  {
    tag: 'Hospitality · Booking platform',
    name: 'Custom booking system',
    body: 'Full-stack build running live — custom site, online payments and tipping, owner dashboard, SMS reminders, automated Google review collection. Shipped solo in weeks.',
    href: '/services#build',
    external: false,
  },
  {
    tag: 'Trades · Voice agent',
    name: 'AI voice receptionist',
    body: 'Answers the phone, qualifies the job, collects the details, escalates emergencies. There’s an unedited call recording on the services page — judge it yourself.',
    href: '/services#automate',
    external: false,
  },
]

export default function About() {
  return (
    <>
      {/* ─── Hero — static (above the fold, must paint on first load) ─ */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>About</Eyebrow>
          <h1
            className="font-display text-ink max-w-[20ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            Hi, I&apos;m Will Herbert. I build automation for small business.
          </h1>
          <div className="mt-9 max-w-[60ch] space-y-5 text-[17px] md:text-[19px] text-muted leading-[1.55]">
            <p>
              Herbert AI is an Adelaide web design &amp; automation studio for small business. I help owners grow and
              run themselves — ad campaigns, websites, dashboards, voice agents, workflow automation, whatever the
              business actually needs — for people who want a thing built and don&apos;t want to hire an agency to do it.
            </p>
            <p>
              Started with AI receptionists for tradies, which is where the voice-agent proof comes from.
              The same patterns transferred quickly into hospitality, property management, and anywhere else
              there&apos;s a repetitive process eating someone&apos;s week.
            </p>
          </div>
        </div>
      </section>

      {/* ─── What I build ─── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll className="max-w-[40ch] mb-16">
            <div>
              <Eyebrow>What I actually build</Eyebrow>
              <h2
                className="font-display text-ink"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                Three kinds of work, one builder.
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-5">
            {capabilities.map((c, i) => (
              <RevealOnScroll key={c.title} delay={i * 0.08} className="h-full">
                <Link href={c.href} className="bg-cream border border-line rounded-3xl p-7 h-full lift hover:border-ink/40 transition-colors flex flex-col">
                  <div className="flex items-center gap-2 mb-7">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{c.tag}</span>
                  </div>
                  <h3 className="text-[24px] font-medium tracking-[-0.02em] mb-3 text-ink">{c.title}</h3>
                  <p className="text-[15px] text-muted leading-[1.6] mb-7">{c.body}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
                    See the services <span aria-hidden>→</span>
                  </span>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it goes — editorial split ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <RevealOnScroll>
              <Eyebrow>How working with me actually goes</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <h2
                className="font-display text-ink max-w-[14ch]"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                Three steps, start to ship.
              </h2>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.12} className="grid gap-8 pt-1">
            <div className="grid gap-8">
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
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── Why solo — editorial split ─── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <RevealOnScroll>
              <Eyebrow>Why solo, why bespoke</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <h2
                className="font-display text-ink max-w-[12ch]"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                No agency. No template.
              </h2>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.12} className="max-w-[60ch] space-y-5 text-[16px] text-muted leading-[1.7] pt-1">
            <div className="space-y-5">
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
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── Recent work ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll className="max-w-[40ch] mb-14">
            <div>
              <Eyebrow>Recent work</Eyebrow>
              <h2
                className="font-display text-ink"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                A few things running live.
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-5">
            {recent.map((r, i) => {
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
              return (
                <RevealOnScroll key={r.name} delay={i * 0.08} className="h-full">
                  {r.external ? (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white border border-line rounded-3xl p-7 hover:border-ink/40 transition-colors block lift h-full"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={r.href}
                      className="bg-white border border-line rounded-3xl p-7 hover:border-ink/40 transition-colors block lift h-full"
                    >
                      {inner}
                    </Link>
                  )}
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Closing CTA — full-bleed ink (matches homepage FinalCTA) ─ */}
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-32 md:py-44">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Eyebrow color="white">Ready when you are</Eyebrow>
              <h2
                className="font-display text-cream max-w-[16ch]"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 800 }}
              >
                Got an idea? Get in touch.
              </h2>
              <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[52ch]">
                30-minute call, no pitch. Tell me the bottleneck — I&apos;ll tell you whether it&apos;s worth building.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-5 lg:items-end">
              <Link
                href="/contact"
                data-magnetic
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
              >
                Talk to Will <span aria-hidden>→</span>
              </Link>
              <Link
                href="/services"
                className="text-cream px-6 py-3.5 rounded-full font-medium text-[16px] inline-flex items-center gap-2 border border-cream/20 hover:border-cream/50 transition-colors"
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

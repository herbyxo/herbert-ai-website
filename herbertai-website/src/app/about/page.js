import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'
import { RUNGS, Eyebrow, AuditButton } from '../components/site/shared'

export const metadata = {
  title: 'About | Will Herbert, custom software and AI for small business',
  description:
    'Will Herbert builds custom software and AI systems for small businesses in Adelaide. One builder, no account managers, and you own what gets built. Every engagement starts with a free AI audit.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Will Herbert · Herbert AI',
    description: 'Custom software and AI for small businesses, built in Adelaide by one person you deal with directly.',
    url: '/about',
    images: ['/opengraph-image'],
  },
}

// Founder photo: drop the file at public/will.jpg and set this to '/will.jpg'.
const FOUNDER_PHOTO = null

const work = [
  {
    tag: 'Hospitality · Full build',
    name: 'A booking platform for a barbershop',
    body: 'Custom site, online bookings with deposits and tipping, an owner dashboard, SMS reminders and automated review collection. Built and run live for months by one person.',
    href: '/work',
  },
  {
    tag: 'Finance · Currently building',
    name: 'An operations hub for a finance brokerage',
    body: 'Every client file on one board, documents chased automatically, every email drafted for a person to approve. The system a whole office works out of.',
    href: '/work',
  },
]

export default function About() {
  return (
    <>
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32 grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">
          <div>
            <Eyebrow>About</Eyebrow>
            <h1
              className="font-display text-ink max-w-[18ch]"
              style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
            >
              Hi, I&apos;m Will Herbert. I build the software small businesses run on.
            </h1>
            <div className="mt-9 max-w-[60ch] space-y-5 text-[17px] md:text-[19px] text-muted leading-[1.55]">
              <p>
                Herbert AI is custom software and AI for small businesses, built in Adelaide.
                I build the systems an office runs on: the AI employee that chases documents or
                follows up quotes, and the platform a whole team works out of once a few of
                those are running. You deal with me from the first audit to the day it goes
                live, and you own what gets built.
              </p>
              <p>
                It started with AI receptionists for tradies, which is where the phone demo on
                the services page comes from. The same patterns turned out to fit a barbershop,
                a finance brokerage and anywhere else a repetitive job is eating someone&apos;s
                week, so that is what I build now.
              </p>
            </div>
          </div>
          <div className="w-44 h-44 md:w-64 md:h-64 rounded-3xl overflow-hidden bg-cream-alt border border-line shrink-0">
            {FOUNDER_PHOTO ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={FOUNDER_PHOTO} alt="Will Herbert" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full grid place-items-center font-display text-ink text-[72px] font-bold tracking-[-0.04em]">W</div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <RevealOnScroll>
              <Eyebrow>How working with me goes</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <h2
                className="font-display text-ink max-w-[14ch]"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                One job first. Then the system.
              </h2>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.12} className="grid gap-8 pt-1">
            <div className="grid gap-8">
              {RUNGS.map((s) => (
                <div key={s.n} className="flex gap-5">
                  <span className="font-mono text-[12px] text-muted pt-1 shrink-0">{s.n}</span>
                  <div>
                    <h3 className="text-[18px] font-medium tracking-[-0.01em] mb-1.5 text-ink">{s.title}</h3>
                    <p className="text-[15px] text-muted leading-[1.6] max-w-[52ch]">{s.body}</p>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">{s.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <RevealOnScroll>
              <Eyebrow>Why one builder</Eyebrow>
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
                not a junior who escalates to a senior. The audit is with me, the build is by
                me, and the walkthrough with your team is me.
              </p>
              <p>
                No template either. Your business does not run like the last one, so the
                system does not pretend it does. It connects the software you already use and
                takes over the part that was being done by hand.
              </p>
              <p>
                No lock-in. You own the system, the data and the accounts. Retainers are month
                to month, and nothing ever switches off without being handed over to you first.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll className="max-w-[40ch] mb-14">
            <div>
              <Eyebrow>Recent work</Eyebrow>
              <h2
                className="font-display text-ink"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                The kind of thing that gets built.
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-5">
            {work.map((r, i) => (
              <RevealOnScroll key={r.name} delay={i * 0.08} className="h-full">
                <Link href={r.href} className="bg-white border border-line rounded-3xl p-7 hover:border-ink/40 transition-colors block lift h-full">
                  <div className="flex items-center gap-2 mb-7">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{r.tag}</span>
                  </div>
                  <h3 className="text-[22px] font-medium tracking-[-0.02em] mb-3 text-ink">{r.name}</h3>
                  <p className="text-[14px] text-muted leading-[1.6] mb-7">{r.body}</p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
                    See the systems <span aria-hidden>&rarr;</span>
                  </span>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-32 md:py-44">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Eyebrow color="white">Start here</Eyebrow>
              <h2
                className="font-display text-cream max-w-[16ch]"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 800 }}
              >
                Forty five minutes. No pitch.
              </h2>
              <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[52ch]">
                Tell me how your week runs and I&apos;ll tell you what the repetitive parts are
                costing you, in writing, whether or not you build anything.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-5 lg:items-end">
              <AuditButton dark />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

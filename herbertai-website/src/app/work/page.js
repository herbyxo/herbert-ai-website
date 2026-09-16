import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'
import { Eyebrow, AuditButton } from '../components/site/shared'

export const metadata = {
  title: 'The systems | What Herbert AI has built',
  description:
    'The systems, not the slides: a property manager’s dashboard you can click into, an accountant’s document chaser that plays itself, an operations hub for a finance brokerage, a marketing engine. No client names, made-up data, real software.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'The systems · Herbert AI',
    description: 'Click into the software rather than read about it.',
    url: '/work',
    images: ['/opengraph-image'],
  },
}

// Proof is the systems themselves, live where a mock mode exists. Screenshots
// live in public/work/; a block with no image renders text only until one
// lands. The brokerage hub gets a de-branded demo instance under M2.1 of
// docs/restructure-2026-09/PROJECT.md once the client has confirmed.
const systems = [
  {
    tag: 'Live · click in',
    title: 'A property manager’s dashboard',
    body: 'A tenant logs a maintenance request. The system logs it, the manager approves it, a tradie is dispatched and everyone is kept updated. Open it and click around; the data is made up and nothing you do touches anyone real.',
    href: 'https://dashboard.herbert-aisolutions.com',
    label: 'Open the dashboard',
    external: true,
    image: '/work/property-dashboard.png',
  },
  {
    tag: 'Demo · plays itself',
    title: 'An accountant’s document chaser',
    body: 'One tax season, played through: every client gets their own checklist, reminders go out for only what is still missing, files are matched as they land, and the team gets one notification when a return is ready. Tap any reminder to read the email the client received.',
    href: '/demo/accountants',
    label: 'Watch it run',
    external: false,
    image: '/work/accountants-demo.png',
  },
  {
    tag: 'Currently building',
    title: 'An operations hub for a finance brokerage',
    body: 'Every client file on one board, with who is waiting on what. Documents chased automatically, every email to a client drafted by the system and approved by a person before it goes. Checklists per file, a command palette, and the numbers on one screen. A demo with made-up data is coming once the build is live.',
    href: null,
    image: null,
  },
  {
    tag: 'Built',
    title: 'A marketing engine',
    body: 'Google and Meta ads written, tested and paused by the system against real results, a landing page per ad group, and a daily audit that flags what is wasting money. The growth module that bolts onto an operations system.',
    href: null,
    image: null,
  },
  {
    tag: 'Built · ran live for months',
    title: 'A booking platform for a barbershop',
    body: 'Custom site, online bookings with deposits and tipping, an owner dashboard, SMS reminders and automated review collection. A whole business platform, built and run by one person.',
    href: null,
    image: null,
  },
  {
    tag: 'Demo · unedited call',
    title: 'A voice receptionist for a trade business',
    body: 'Answers the phone, qualifies the job, collects the access details, closes the call. There is a real recording on the services page.',
    href: '/services#employees',
    label: 'Hear the call',
    external: false,
    image: null,
  },
]

export default function Work() {
  return (
    <>
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>The work</Eyebrow>
          <h1
            className="font-display text-ink max-w-[16ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            The systems, not the slides.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[60ch]">
            Clients are not named here and the numbers in the demos are made up. What is real
            is the software: click into it, watch it run, and judge it yourself.
          </p>
        </div>
      </section>

      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36 space-y-6">
          {systems.map((s, i) => (
            <RevealOnScroll key={s.title} delay={0.04 * (i % 2)}>
              <div className="bg-white border border-line rounded-3xl overflow-hidden grid lg:grid-cols-[1.1fr_1fr]">
                <div className="p-8 md:p-10 flex flex-col">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{s.tag}</span>
                  </div>
                  <h2 className="text-[24px] md:text-[28px] font-medium tracking-[-0.02em] text-ink mb-4 leading-[1.2]">{s.title}</h2>
                  <p className="text-[15px] md:text-[16px] text-muted leading-[1.6]">{s.body}</p>
                  {s.href && (
                    <div className="mt-7">
                      {s.external ? (
                        <a href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[15px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
                          {s.label} <span aria-hidden>&rarr;</span>
                        </a>
                      ) : (
                        <Link href={s.href} className="inline-flex items-center gap-2 text-[15px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
                          {s.label} <span aria-hidden>&rarr;</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
                {s.image ? (
                  <div className="bg-cream-alt border-t lg:border-t-0 lg:border-l border-line min-h-[260px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover object-top" loading="lazy" />
                  </div>
                ) : (
                  <div className="hidden lg:block bg-cream-alt border-l border-line" />
                )}
              </div>
            </RevealOnScroll>
          ))}
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
                Yours would look like your business.
              </h2>
              <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[52ch]">
                The audit finds the job. The pilot builds the first AI employee for it, in 14
                days, on your real data.
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

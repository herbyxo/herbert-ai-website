import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'
import { Eyebrow, AuditButton } from '../components/site/shared'

export const metadata = {
  title: 'What gets built | Custom software and AI for small business',
  description:
    'AI employees for one job each, the operations system they run in, and the growth modules that come after. Custom built in Adelaide, owned by you. Every engagement starts with a free AI audit.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'What gets built · Herbert AI',
    description: 'AI employees, the system they run in, and what comes after. Every engagement starts with a free AI audit.',
    url: '/services',
    images: ['/opengraph-image'],
  },
}

// Capability inventory under the ladder. Grow is framed as what comes after
// the operations build, not a front door. Decided 16 Sep 2026.
const groups = [
  {
    id: 'employees',
    label: 'AI employees',
    headline: 'One job each. A person approves what goes out.',
    body: 'Each AI employee takes over one repetitive job and runs it every day. It reads what comes in, drafts what goes out, and hands the exceptions to your team. The pilot builds the first one.',
    demo: 'voice',
    items: [
      { tag: 'Accounting', title: 'AI document chaser', body: 'Sends each client their checklist, chases only what is missing, matches files as they land, tells your team when a return is ready.' },
      { tag: 'Allied health', title: 'AI front desk assistant', body: 'Intake forms before the first visit, referral chasing, recalls when they fall due, same-day follow-up on a no-show.' },
      { tag: 'Trades', title: 'AI quote follow-up', body: 'Every quote followed up on a schedule, common questions answered, the ones worth a call flagged, job details handed to the tech when it is won.' },
      { tag: 'Real estate', title: 'AI maintenance coordinator', body: 'Logs the tenant’s request, gets the landlord’s approval, dispatches the tradie, keeps everyone updated.' },
      { tag: 'Phones', title: 'AI voice receptionist', body: 'Answers the phone, qualifies the job, books it, sends the confirmation. There is a real call below.' },
      { tag: 'Website', title: 'Chat on your site', body: 'Answers questions from your own material, captures the lead, books through the chat.' },
      { tag: 'Between systems', title: 'Workflow automation', body: 'Your job system, calendar, inbox and invoicing talking to each other, so nothing gets re-typed.' },
      { tag: 'Bookings', title: 'Booking automation', body: 'Confirmations, reschedules, deposits and reminders handled without anyone touching the calendar.' },
    ],
  },
  {
    id: 'system',
    label: 'The system they run in',
    headline: 'One place your whole office works out of.',
    body: 'When a few AI employees are running, they need somewhere to live. The full build puts your files, comms, follow-ups and numbers on one system your business owns, built around how you already work.',
    items: [
      { tag: 'Operations', title: 'Operations hub', body: 'Every client file or job on one board, with who is waiting on what, and the next action already drafted.' },
      { tag: 'Clients', title: 'Client and customer portals', body: 'Clients log in with an email link to upload documents, see their file and check where things are.' },
      { tag: 'Owner', title: 'Dashboards and reporting', body: 'The numbers you compile by hand every week, compiled for you and on one screen.' },
      { tag: 'Bookings', title: 'Custom booking systems', body: 'Service selection, deposits, calendar sync and reminders, built for your business rather than a template with your logo.' },
      { tag: 'Web', title: 'Websites', body: 'Custom coded, fast, built to feed the system behind it rather than sit on its own.' },
      { tag: 'Internal', title: 'Internal tools', body: 'The spreadsheet that became a system: approvals, checklists, handovers, whatever your team runs on.' },
    ],
  },
  {
    id: 'grow',
    label: 'What comes after',
    headline: 'Growth, once the office runs itself.',
    body: 'Growth modules bolt onto the operations system rather than replace it, so new customers land in a business that can handle them.',
    items: [
      { tag: 'Ads', title: 'Google and Meta ads', body: 'Written, tested and paused by a marketing engine, with a landing page per ad group and the numbers on one screen.' },
      { tag: 'Search', title: 'SEO', body: 'Technical and local search, so the people already looking for what you do can find you.' },
      { tag: 'Email and SMS', title: 'Lifecycle messaging', body: 'Automated sequences to the customers you already have: reviews, reminders, reactivation.' },
      { tag: 'Pages', title: 'Landing pages and funnels', body: 'Pages built for one ad group or one offer, measured on what they convert.' },
    ],
    links: [
      ['/google-ads-adelaide', 'Google Ads, run by the builder'],
      ['/web-design-adelaide', 'Web design in Adelaide'],
    ],
  },
]

export default function Services() {
  return (
    <>
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>What gets built</Eyebrow>
          <h1
            className="font-display text-ink max-w-[16ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            One AI employee first. Then the system.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[62ch]">
            Every engagement starts with a free AI audit and one AI employee on the job that
            costs you most. This is what the system your business runs on can include after
            that, built to order in Adelaide and owned by you.
          </p>
          <div className="mt-10">
            <AuditButton />
          </div>
        </div>
      </section>

      {groups.map((g, i) => (
        <section key={g.id} id={g.id} className={`${i % 2 === 0 ? 'bg-cream-alt' : 'bg-cream'} scroll-mt-24`}>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
            <RevealOnScroll className="max-w-[46ch] mb-14">
              <div>
                <Eyebrow>{g.label}</Eyebrow>
                <h2
                  className="font-display text-ink mb-5"
                  style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
                >
                  {g.headline}
                </h2>
                <p className="text-[16px] md:text-[17px] text-muted leading-[1.6]">{g.body}</p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              <>
                {g.items.map((s) => (
                  <div key={s.title} className="bg-white border border-line rounded-3xl p-7 min-h-[200px] flex flex-col lift">
                    <div className="flex items-center gap-2 mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-deep shrink-0" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{s.tag}</span>
                    </div>
                    <h3 className="text-[20px] font-medium tracking-[-0.01em] text-ink mb-3 leading-[1.25]">{s.title}</h3>
                    <p className="text-[14px] text-muted leading-[1.6]">{s.body}</p>
                  </div>
                ))}
              </>
            </RevealOnScroll>
            {g.demo === 'voice' && <VoiceDemo />}
            {g.links && (
              <RevealOnScroll className="mt-12 flex flex-col items-start gap-3">
                <>
                  {g.links.map(([href, label]) => (
                    <Link key={href} href={href} className="inline-flex items-center gap-2 text-[15px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
                      {label} <span aria-hidden>&rarr;</span>
                    </Link>
                  ))}
                </>
              </RevealOnScroll>
            )}
          </div>
        </section>
      ))}

      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="bg-ink text-cream rounded-3xl p-12 md:p-20">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-end">
              <div>
                <Eyebrow color="white">Pricing</Eyebrow>
                <h2
                  className="font-display text-cream mb-6 max-w-[16ch]"
                  style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}
                >
                  The audit is free. The rest is fixed.
                </h2>
                <p className="text-cream/70 text-[17px] leading-[1.6] max-w-[52ch]">
                  The pilot is $3,500, live in 14 days or it&apos;s free. Builds start from
                  $25,000 and are scoped after the audit. Retainers from $1,000 a month.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/pricing"
                  className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center justify-between gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
                >
                  See the pricing <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function VoiceDemo() {
  return (
    <div className="mt-14 grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-12 items-center bg-white border border-line rounded-3xl p-8 md:p-10">
      <div>
        <Eyebrow>Demo, unedited</Eyebrow>
        <h3 className="text-[24px] md:text-[28px] font-medium tracking-[-0.01em] text-ink mb-3">
          A real call handled by the voice receptionist.
        </h3>
        <p className="text-[14px] text-muted leading-[1.6]">
          Demo build for a commercial refrigeration business. The caller reported a
          refrigerant leak; the receptionist qualified the job, collected access details
          and closed the call. Nobody else was on the line.
        </p>
      </div>
      <div className="bg-ink rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-green hi-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55">Inbound call · unedited</span>
        </div>
        <audio controls preload="metadata" className="w-full" style={{ filter: 'invert(0.85)' }}>
          <source src="/steve-demo.wav" type="audio/wav" />
        </audio>
      </div>
    </div>
  )
}

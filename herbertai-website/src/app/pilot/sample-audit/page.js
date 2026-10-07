import { Eyebrow, AuditButton } from '../../components/site/shared'

export const metadata = {
  title: { absolute: 'A sample AI audit page | Herbert AI' },
  description:
    'What the written page from a free AI audit looks like, filled in for a made-up four person accounting practice. Three jobs costed, the first AI employee to build, a twelve month roadmap.',
  alternates: { canonical: '/pilot/sample-audit' },
  openGraph: {
    title: 'A sample AI audit page · Herbert AI',
    description: 'The written page every free AI audit ends with, shown on a made-up accounting practice.',
    url: '/pilot/sample-audit',
    images: ['/opengraph-image'],
  },
}

// The sample is built from the worked example in business/sales/ai-audit.md.
// Every figure is illustrative and the page says so twice, because this is
// the proof we can publish without naming a client.

const jobs = [
  {
    job: 'Chasing clients for documents: bank statements, receipts, signed declarations, the questionnaire that never comes back',
    who: 'Admin',
    hours: '8',
    cost: '$19,760',
  },
  {
    job: 'Writing the same emails by hand: lodgement reminders, "your return is ready to sign", "we need one more thing"',
    who: 'Senior accountant',
    hours: '4',
    cost: '$13,000',
  },
  {
    job: 'Retyping a new client’s details from the engagement form into the practice software, the tax agent portal and the engagement letter',
    who: 'Admin',
    hours: '3',
    cost: '$7,410',
  },
]

const phases = [
  {
    when: 'Now, 14 days',
    what: 'The document chaser',
    why: 'The most expensive job, and the one the admin person named first',
    cost: 'The pilot, above',
  },
  {
    when: 'Month 2 to 4',
    what: 'The correspondent: drafts the lodgement reminders, the "ready to sign" emails and the "one more thing" emails from the stage a job is at, in the accountant’s own words, for the accountant to approve',
    why: 'Once the chaser is trusted the team is used to approving a queue, and this is the same habit applied to the senior accountant’s 4 hours',
    cost: 'Scoped after the pilot',
  },
  {
    when: 'Month 5 to 12',
    what: 'Single entry for new clients, or the full system: one screen for every job, where it is, what is outstanding, and who it is waiting on',
    why: 'Retyping is the smallest job on its own, and it disappears for nothing extra once every job lives in one place',
    cost: 'Scoped',
  },
]

const assumptions = [
  'On costs of about 25 per cent on top of the hourly wage, for both rates.',
  'The 8 hours of chasing hold across the year. The weeks before a lodgement deadline run higher and the quiet weeks lower, and 52 weeks is used because the chasing does not stop when the admin person is on leave, someone else picks it up.',
  'About 70 per cent of the chasing hours go to the chaser. The rest is approving the queue, the clients who ring, and the handed-back ones.',
  'Clients mostly reply by email, which is what you told us. A practice whose clients mostly reply by text would need a text channel first.',
  'The practice software can tell the chaser what is outstanding on a job, or the admin person keeps that list in the chaser instead. Either works, and the pilot’s first week settles which.',
]

const th = 'text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted font-normal pb-3 pr-6 align-bottom'
const td = 'py-4 pr-6 align-top text-[15px] text-ink-soft leading-[1.5] border-t border-line'

export default function SampleAudit() {
  return (
    <>
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 md:pt-36 pb-16 md:pb-20">
          <Eyebrow>Sample audit page</Eyebrow>
          <h1 className="font-display text-ink max-w-[16ch]" style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}>
            AI audit: a four person accounting practice.
          </h1>
          <div className="mt-10 max-w-[70ch] bg-cream-alt border border-line rounded-3xl p-6 md:p-8">
            <p className="text-[15px] md:text-[16px] text-ink leading-[1.6]">
              <strong>This is a sample.</strong> It shows what the written page from a free AI audit looks
              like, filled in for a made-up business: an accounting and bookkeeping practice in Adelaide
              with an owner, two accountants and one admin person. Every figure is illustrative. The first
              job&rsquo;s numbers are the worked example from the audit run sheet (8 hours a week at $38 an
              hour, loaded to $47.50); the other two jobs are invented to sit beside it. No client, past or
              present, is described here, and nothing on this page is a real business&rsquo;s figures.
            </p>
          </div>
          <p className="mt-8 max-w-[70ch] text-[15px] text-muted leading-[1.6]">
            Prepared by Will Herbert, Herbert AI, Adelaide. 7 October 2026. Based on the conversation with
            the owner on Friday 2 October 2026. Figures marked as assumptions are ours, everything else
            came from that conversation.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pb-20 md:pb-24">
          <Eyebrow>Where the time goes</Eyebrow>
          <ul className="md:hidden divide-y divide-line border-y border-line">
            {jobs.map(j => (
              <li key={j.who + j.hours} className="py-5">
                <p className="text-[15px] text-ink-soft leading-[1.5]">{j.job}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {j.who} · {j.hours} hours a week · <span className="text-ink">{j.cost} a year</span>
                </p>
              </li>
            ))}
          </ul>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className={th}>Job</th>
                  <th className={th}>Who does it</th>
                  <th className={th}>Hours a week</th>
                  <th className={th}>Cost a year</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(j => (
                  <tr key={j.who + j.hours}>
                    <td className={`${td} max-w-[48ch]`}>{j.job}</td>
                    <td className={td}>{j.who}</td>
                    <td className={td}>{j.hours}</td>
                    <td className={`${td} font-semibold text-ink`}>{j.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 max-w-[70ch] text-[17px] md:text-[19px] text-ink leading-[1.5]">
            Together about $40,000 a year, and about half of it is one job.
          </p>
          <p className="mt-5 max-w-[70ch] text-[15px] text-muted leading-[1.6]">
            Hourly cost used: $47.50 loaded for the admin role, from the $38 an hour you told us plus about
            25 per cent for on costs; $62.50 loaded for the senior accountant, from the $50 an hour you told
            us plus the same 25 per cent. Annual cost is hours a week times 52 times that rate.
          </p>
        </div>
      </section>

      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-24">
          <Eyebrow>Start here</Eyebrow>
          <h2 className="font-display text-ink mb-8" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            The document chaser.
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16">
            <p className="text-[15px] md:text-[16px] text-ink-soft leading-[1.6] max-w-[70ch]">
              When a job is opened in the practice software, the admin person sets what is needed from the
              client, the same list they type today. From then on the chaser does the asking. It emails the
              client the list on day one, waits four business days, and sends a reminder that names only what
              is still missing. Each reminder is drafted the night before and sits in a queue; the admin
              person reads the morning&rsquo;s queue and approves it in one go, about ten minutes a day. When a
              document arrives the admin person ticks it off, or the client&rsquo;s upload ticks it off where
              the practice&rsquo;s portal allows it, and the chasing for that item stops the same moment. After
              the third reminder with no reply the chaser stops and hands the client to a person, with a note
              of what was sent and when. It never sends anything nobody approved, and it never chases on a
              weekend or a public holiday.
            </p>
            <div className="bg-ink text-cream rounded-3xl p-8">
              <p className="text-[17px] md:text-[19px] leading-[1.45]">
                The job costs about $19,760 a year. The pilot is $3,500 fixed, live in 14 days or it is free.
              </p>
              <ul className="mt-6 space-y-3 text-[15px] text-cream/80 leading-[1.5]">
                <li>Hours it takes over: about five and a half of the 8 hours a week, roughly 70 per cent</li>
                <li>Saving: about $13,800 a year, or $1,150 a month</li>
                <li>Payback: about three months</li>
                <li>What stays with your team: approving the morning&rsquo;s queue, the clients who ring instead of replying, and anyone the chaser has handed back after three reminders</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-24">
          <Eyebrow>The next twelve months</Eyebrow>
          <ul className="md:hidden divide-y divide-line border-y border-line">
            {phases.map(p => (
              <li key={p.when} className="py-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-green-deep">{p.when}</p>
                <p className="mt-2 text-[16px] font-semibold text-ink leading-[1.4]">{p.what}</p>
                <p className="mt-2 text-[15px] text-muted leading-[1.5]">{p.why}</p>
                <p className="mt-2 text-[13px] text-muted">Rough cost: {p.cost}</p>
              </li>
            ))}
          </ul>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr>
                  <th className={th}>Phase</th>
                  <th className={th}>What gets built</th>
                  <th className={th}>Why then</th>
                  <th className={th}>Rough cost</th>
                </tr>
              </thead>
              <tbody>
                {phases.map(p => (
                  <tr key={p.when}>
                    <td className={`${td} whitespace-nowrap font-semibold text-ink`}>{p.when}</td>
                    <td className={`${td} max-w-[40ch]`}>{p.what}</td>
                    <td className={`${td} max-w-[36ch]`}>{p.why}</td>
                    <td className={td}>{p.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-24 grid md:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <Eyebrow>What we assumed</Eyebrow>
            <ul className="space-y-4 text-[15px] md:text-[16px] text-ink-soft leading-[1.6] max-w-[60ch]">
              {assumptions.map(a => (
                <li key={a.slice(0, 24)} className="pl-5 relative">
                  <span className="absolute left-0 top-[0.7em] w-2 h-px bg-ink" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>What happens next</Eyebrow>
            <p className="text-[15px] md:text-[16px] text-ink-soft leading-[1.6] max-w-[60ch]">
              The owner can start the pilot any time before Friday 30 October 2026. It is live in 14 days or
              free, and the full pilot fee comes off a bigger build signed within 60 days. The 14 days start the
              day Herbert AI has access to your tools and past examples of the job: a few of the chasing emails
              the admin person has sent, and the document list for two or three recent jobs. If the answer is
              no, this report is still yours to use.
            </p>
            <p className="mt-6 text-[15px] text-muted">Will Herbert · will@herbert-aisolutions.com · 0448 111 840</p>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow color="white">Your page</Eyebrow>
          <h2 className="font-display text-cream max-w-[18ch]" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            Forty five minutes, then a page like this on your business.
          </h2>
          <p className="mt-6 max-w-[56ch] text-[16px] md:text-[17px] text-cream/70 leading-[1.55]">
            Free, no preparation, no obligation. If software is not the answer for you, the page says so.
          </p>
          <div className="mt-10">
            <AuditButton dark label="Book my free AI audit" />
          </div>
        </div>
      </section>
    </>
  )
}

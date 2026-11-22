import { OG_IMAGE } from '@/app/components/site/og'
import { SAMPLE_TITLE, SAMPLE_JOBS, SAMPLE_TOTAL } from '@/app/components/site/sample-audit'
import { Label, H1, Section } from '../../components/site/kit'
import AuditClose from '../../components/site/audit-close'

export const metadata = {
  title: { absolute: 'A sample AI audit report | Herbert AI' },
  description:
    'What the written report from a free AI audit looks like, filled in for a made-up four person accounting practice. Three tasks costed, the first AI employee recommended, and what could follow.',
  alternates: { canonical: '/pilot/sample-audit' },
  openGraph: {
    title: 'A sample AI audit report · Herbert AI',
    description: 'The written report every free AI audit ends with, shown on a made-up accounting practice.',
    url: '/pilot/sample-audit',
    images: [OG_IMAGE],
  },
}

// The sample report on the charter (hands-off pass, 22 Nov 2026), drawn as the
// document itself on a white sheet. Its sections and voice follow the report
// Herbert AI sends (business/sales/audit-report-template.md, the Business
// document register: third person, Title Case headings, no contractions):
// Purpose, Findings, Recommendation, Further Options, Assumptions, Next Step,
// Contact. The figures are the worked example's and have not changed; every one
// is illustrative and the page says so above the sheet and in its Purpose.
// It is the proof that can be published without naming a client.

const options = [
  {
    build: 'A correspondent: drafts the lodgement reminders, the "ready to sign" emails and the "one more thing" emails from the stage a job is at, in the accountant’s own words, for the accountant to approve',
    why: 'Once the document chaser is trusted the team is used to approving a queue, and this is the same habit applied to the senior accountant’s 4 hours',
    cost: 'Priced after the first build',
  },
  {
    build: 'Single entry for new clients, or the full system: one screen for every job, where it is, what is outstanding, and who it is waiting on',
    why: 'Retyping is the smallest task on its own, and it disappears for nothing extra once every job lives in one place',
    cost: 'Priced after the first build',
  },
]

const recommendation = [
  ['Time recovered', 'about five and a half of the 8 hours per week, roughly 70 per cent'],
  ['Estimated saving', 'about $13,800 per year, or about $1,150 per month'],
  ['Build', '$3,500 fixed, live within 14 days or at no charge'],
  ['Payback', 'about three months'],
  ['Retained by staff', 'approving the morning’s queue, the clients who ring instead of replying, and anyone handed back after three reminders'],
]

const assumptions = [
  'On costs of about 25 per cent on top of the hourly wage, for both rates.',
  'The 8 hours of chasing hold across the year. The weeks before a lodgement deadline run higher and the quiet weeks lower, and 52 weeks is used because the chasing does not stop when the admin person is on leave.',
  'About 70 per cent of the chasing hours go to the document chaser. The rest is approving the queue, the clients who ring, and those handed back.',
  'Clients mostly reply by email, as stated in the audit conversation. A practice whose clients mostly reply by text would need a text channel first.',
  'The practice software can tell the document chaser what is outstanding on a job, or the admin person keeps that list in the document chaser instead. Either works, and the first week of the build settles which.',
]

const HEAD = 'font-mono text-[10px] uppercase tracking-[0.18em] text-[#666]'
const TH = `${HEAD} text-left font-normal pb-2.5 pr-5 align-bottom`
const TD = 'py-3.5 pr-5 border-t border-[#111]/10 text-[15px] leading-[1.5] text-[#333] align-top'
const BODY = 'text-[16px] leading-[1.6] text-[#333] text-pretty'

function Part({ title, children }) {
  return (
    <div className="mt-10 pt-8 border-t border-[#111]/12">
      <h3 className="text-[20px] font-semibold tracking-[-0.015em] mb-4 text-balance">{title}</h3>
      {children}
    </div>
  )
}

export default function SampleAudit() {
  return (
    <>
      <Section first>
        <Label>AI Audit</Label>
        <H1 wide>A sample audit report.</H1>
        <p className="mt-7 max-w-[64ch] text-[17px] leading-[1.6] text-[#555] text-pretty">
          <b className="text-[#111]">This is a sample.</b> It shows the written report a free AI audit ends with, filled in for a made-up
          business: an accounting and bookkeeping practice in Adelaide with an owner, two accountants and one admin
          person. Every figure is illustrative, and no client, past or present, is described.
        </p>

        <article className="mt-12 max-w-[940px] rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] px-5 py-8 sm:px-12 sm:py-12">
          <h2 className="font-bold tracking-[-0.03em] leading-[1.05] text-[24px] sm:text-[34px] max-w-[22ch] text-balance">{SAMPLE_TITLE}</h2>

          <Part title="Purpose">
            <p className={BODY}>
              This report sets out where repetitive administrative work costs the practice the most time and money,
              which task Herbert AI recommends addressing first, and what that would cost and save. Herbert AI prepared
              it on 7 October 2026 from the audit conversation with the owner on 2 October 2026. Figures from that
              conversation are stated as such, and anything Herbert AI assumed is listed under&nbsp;Assumptions.
            </p>
          </Part>

          <Part title="Findings">
            <ul className="md:hidden border-b border-[#111]/10">
              {SAMPLE_JOBS.map((j) => (
                <li key={j.job} className="py-3.5 border-t border-[#111]/10">
                  <p className="text-[15px] leading-[1.5] text-[#333] text-pretty">{j.job}</p>
                  <p className={`mt-2 ${HEAD} tracking-[0.12em]`}>
                    {j.who} · <span className="whitespace-nowrap">{j.hours} hours per week</span> · <span className="whitespace-nowrap text-[#111]">{j.cost} per year</span>
                  </p>
                </li>
              ))}
            </ul>
            <table className="hidden md:table w-full border-collapse">
              <thead>
                <tr>
                  {['Task', 'Performed by', 'Hours per week', 'Cost per year'].map((h) => <th key={h} className={TH}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {SAMPLE_JOBS.map((j) => (
                  <tr key={j.job}>
                    <td className={`${TD} max-w-[46ch]`}>{j.job}</td>
                    <td className={TD}>{j.who}</td>
                    <td className={TD}>{j.hours}</td>
                    <td className={`${TD} font-semibold text-[#111]`}>{j.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 text-[17px] leading-[1.5] text-pretty">{SAMPLE_TOTAL}</p>
            <p className={`mt-4 ${BODY} text-[#555]`}>
              Hourly cost: $47.50 per hour for the admin role, from the $38 per hour stated in the audit plus about 25
              per cent for on costs, and $62.50 per hour for the senior accountant, from the $50 per hour stated plus
              the same 25 per cent. Annual cost is hours per week, multiplied by 52, multiplied by the hourly cost.
            </p>
          </Part>

          <Part title="Recommendation: Document Chaser">
            <p className={BODY}>
              When a job is opened in the practice software, the admin person sets what is needed from the client, the
              same list typed today. From then on the document chaser does the asking. It emails the client the list
              on day one, waits four business days, and sends a reminder that names only what is still missing. Each
              reminder is drafted the night before and sits in a queue; the admin person reads the morning&rsquo;s queue
              and approves it in one go, about ten minutes a day. When a document arrives the admin person ticks it
              off, or the client&rsquo;s upload ticks it off where the practice&rsquo;s portal allows it, and the
              chasing for that item stops the same moment. After the third reminder with no reply the document chaser
              stops and hands the client to a person, with a note of what was sent and when. It never sends anything
              nobody approved, and it never chases on a weekend or a public holiday.
            </p>
            <dl className="mt-6 border-b border-[#111]/10">
              {recommendation.map(([k, v]) => (
                <div key={k} className="grid sm:grid-cols-[180px_1fr] gap-x-6 gap-y-0.5 border-t border-[#111]/10 py-3">
                  <dt className="text-[15px] font-semibold">{k}</dt>
                  <dd className="text-[15px] leading-[1.5] text-[#333] text-pretty">{v}</dd>
                </div>
              ))}
            </dl>
          </Part>

          <Part title="Further Options">
            <p className={BODY}>
              Each build stands on its own, so the document chaser can run by itself. If the practice later wants to
              go further, the other two tasks could follow in this order, each building on the records the one before
              it creates.
            </p>
            <ul className="mt-6 md:hidden border-b border-[#111]/10">
              {options.map((o) => (
                <li key={o.build} className="py-3.5 border-t border-[#111]/10">
                  <p className="text-[15px] font-semibold leading-[1.45] text-pretty">{o.build}</p>
                  <p className="mt-1.5 text-[15px] leading-[1.5] text-[#333] text-pretty">{o.why}</p>
                  <p className={`mt-2 ${HEAD} tracking-[0.12em]`}>{o.cost}</p>
                </li>
              ))}
            </ul>
            <table className="mt-6 hidden md:table w-full border-collapse">
              <thead>
                <tr>
                  {['Build', 'Rationale', 'Indicative cost'].map((h) => <th key={h} className={TH}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {options.map((o) => (
                  <tr key={o.build}>
                    <td className={`${TD} w-[40%]`}>{o.build}</td>
                    <td className={`${TD} w-[38%]`}>{o.why}</td>
                    <td className={TD}>{o.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Part>

          <Part title="Assumptions">
            <ul>
              {assumptions.map((a) => (
                <li key={a.slice(0, 28)} className={`border-t first:border-t-0 border-[#111]/10 py-3 first:pt-0 ${BODY} text-[15px]`}>{a}</li>
              ))}
            </ul>
          </Part>

          <Part title="Next Step">
            <p className={BODY}>
              The practice can begin the first build at any time before 30 October 2026. The price is $3,500 fixed,
              live within 14 days or at no charge, and the full $3,500 is credited against a larger build signed
              within 60 days. The 14 days begin on the day Herbert AI has access to the practice&rsquo;s systems and
              past examples of the task: a few of the chasing emails the admin person has sent, and the document list
              for two or three recent jobs. The practice keeps this report whether or not it proceeds.
            </p>
          </Part>

          <Part title="Contact">
            <p className={BODY}>Will Herbert, Founder, Herbert AI.<br />will@herbert-aisolutions.com</p>
          </Part>
        </article>
      </Section>

      <AuditClose source="/pilot/sample-audit (end)" />
    </>
  )
}

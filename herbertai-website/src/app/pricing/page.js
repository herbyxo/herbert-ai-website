import { OG_IMAGE } from '@/app/components/site/og'
import { JsonLd, breadcrumbs } from '@/app/components/site/schema'
import { Label, H1, H2, Section, Lead } from '../components/site/kit'
import Questions from '../components/site/pilot-questions'
import AuditClose from '../components/site/audit-close'

export const metadata = {
  title: 'Pricing | Free AI audit, a $3,500 first AI employee, builds from $25,000',
  description:
    'Four steps, each priced before you take it. A free AI audit, your first AI employee at $3,500 and live in 14 days or free, an AI operating system from $25,000 priced after the audit, retainers from $1,000 a month.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing · Herbert AI',
    description: 'The audit is free. Your first AI employee is $3,500. Builds from $25,000. Retainers from $1,000 a month.',
    url: '/pricing',
    images: [OG_IMAGE],
  },
}

// /pricing on the charter (hands-off pass, 22 Nov 2026). The four prices as
// steps, in the home page's How It Works idiom (a step, its name, its price, its
// facts), so the page a reader lands on from "See how it's priced" looks like the
// section they left. The steps start on the first screen: the price is what the
// reader came for.
//
// Order matters: the accessible number first, the build floor after it, and
// the sentence that tells a visitor the big number is not the ask. Decided
// 16 Sep 2026 on the pricing research (identity-2026-09-16 in the files repo).
const steps = [
  {
    title: 'Free AI audit',
    price: 'Free',
    lines: [
      '45 minutes auditing how your business runs.',
      'A written report within two business days: the three jobs eating the most hours, what each costs you a year in your own figures, which one to hand over first, and the next jobs worth handing over, in order.',
      'Yours to keep whether or not you go further.',
    ],
  },
  {
    title: 'Your first AI employee',
    price: '$3,500, fixed',
    lines: [
      'One AI employee built for one job, working on your actual clients in 14 days, or it is free.',
      'The full $3,500 comes off a bigger build signed within 60 days.',
      'The first 30 days of hosting, support and AI running costs are included. After that: go ahead with the build, keep it running for $200 a month, or have it moved onto your own accounts with a written guide. If no choice is made by day 30 it is paused and your data is sent to you.',
    ],
  },
  {
    title: 'AI operating system',
    price: 'From $25,000',
    lines: [
      'The system your AI employees work in: files, messages, follow-ups and reports in one place your team works out of every day.',
      'Priced after the audit, as one fixed number with a written list of what is included and a delivery date.',
      'If the audit shows the saving would not comfortably cover the price, you are told so.',
    ],
  },
  {
    title: 'Retainer',
    price: 'From $1,000 a month',
    lines: [
      'Hosting, fixes when something breaks, a set number of small changes a month, and a limit on AI usage.',
      'Every month you get a short report: what the system handled, hours it saved, anything it got wrong, one improvement made and one proposed for next month.',
      'Month to month. Nothing switches off without being handed over to you first.',
    ],
  },
]

const questions = [
  ['Why is the audit free?', 'Because it shows whether there is a job worth building on. If there is, you get a quote for your first AI employee. If there is not, you are told so, and the report is yours either way.'],
  ['Do I have to buy an AI employee after the audit?', 'No. The audit ends with a written report and a price, with the payback figure on it, and the decision is yours from there. There is no follow-up sequence and no pressure call.'],
  ['What does $3,500 get me?', 'One AI employee, built for one job in your business, working on your actual clients by day 14, with your team okaying every message before it is sent. Plus a walkthrough with your team and a list of the next jobs worth handing over, in order.'],
  ['Why do builds start at $25,000?', 'An AI operating system is one system your whole team logs into: every client file on one board, messages drafted for a person to approve, connections into the software you already use, and reports. That is 150 to 300 hours of work, and the price is set before it starts. Your first AI employee comes first so you never have to take that on trust.'],
  ['What is in the retainer, and what is not?', 'In: hosting, fixing anything that breaks, a set number of small changes each month, and the monthly report. Not in: new features, which are quoted separately so the monthly number never creeps. There is no minimum term.'],
  ['When do I pay?', 'Your first AI employee is paid when it goes live. Builds take about a third on signing and the rest as working software is shown at each stage. Retainers are billed monthly.'],
  ['Is there any lock-in?', 'None. Your data is yours, and once a build is paid for you get a licence to its code that never ends. While Herbert AI looks after a system it runs on Herbert AI’s accounts. When that ends it is moved onto accounts in your name, with a written guide to how it works. Nothing is switched off or held back.'],
]

export default function Pricing() {
  return (
    <>
      <JsonLd data={breadcrumbs([['Pricing', '/pricing']])} />

      <Section first>
        <Label>Pricing</Label>
        <H1>The audit is free. The rest is fixed.</H1>
        <Lead>
          Four steps, taken in order, each priced before you take it. No hourly billing, and nothing to pay before you
          have seen what it would save you.
        </Lead>

        <ol className="mt-14 border-b border-[#111]/12">
          {steps.map((s, i) => (
            <li key={s.title} className="grid lg:grid-cols-[0.8fr_1.2fr] gap-x-14 gap-y-6 border-t border-[#111]/12 py-10">
              <div className="min-w-0">
                <p className="text-[15px] font-medium text-[#777]">Step {i + 1}</p>
                <h2 className="mt-1 text-[26px] md:text-[32px] font-semibold tracking-[-0.025em] leading-[1.1] text-balance">{s.title}</h2>
                <p className="mt-2 text-[20px] font-semibold tracking-[-0.01em]">{s.price}</p>
              </div>
              <ul className="min-w-0">
                {s.lines.map((l) => (
                  <li key={l} className="border-t first:border-t-0 border-[#111]/10 py-3 first:pt-0 last:pb-0 text-[16px] leading-[1.55] text-[#555] text-pretty">{l}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <Label>Questions</Label>
        <H2>What you pay, and when.</H2>
        <Questions items={questions} />
      </Section>

      <AuditClose source="/pricing (end)" />
    </>
  )
}

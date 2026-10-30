import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'
import { Eyebrow, AuditButton } from '../components/site/shared'
import { OG_IMAGE } from '@/app/components/site/og'
import { JsonLd, breadcrumbs } from '@/app/components/site/schema'

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

// Order matters: the accessible number first, the build floor after it, and
// the sentence that tells a visitor the big number is not the ask. Decided
// 16 Sep 2026 on the pricing research (identity-2026-09-16 in the files repo).
const rungs = [
  {
    n: '01',
    title: 'Free AI audit',
    price: 'Free',
    lines: [
      '45 minutes auditing how your business runs.',
      'A written report within two business days: the three jobs eating the most hours, what each costs you a year in your own figures, which one to hand over first, and the next jobs worth handing over, in order.',
      'Yours to keep whether or not you go further.',
    ],
  },
  {
    n: '02',
    title: 'Your first AI employee',
    price: '$3,500, fixed',
    lines: [
      'One AI employee built for one job, working on your actual clients in 14 days, or it is free.',
      'The full $3,500 comes off a bigger build signed within 60 days.',
      'The first 30 days of hosting, support and AI running costs are included. After that: go ahead with the build, keep it running for $200 a month, or have it moved onto your own systems with a written guide. If no choice is made by day 30 it is paused and your data is sent to you.',
      'Founding clients: the first three clients who agree to a case study and a testimonial get 90 days of included support instead of 30.',
    ],
  },
  {
    n: '03',
    title: 'AI operating system',
    price: 'From $25,000',
    lines: [
      'The system your AI employees work in: files, messages, follow-ups and reports in one place your team works out of every day, and your business owns.',
      'Priced after the audit, as one fixed number with a written list of what is included and a delivery date.',
      'If the audit shows the saving would not comfortably cover the price, you will be told so, and an AI employee is not the right next step.',
    ],
  },
  {
    n: '04',
    title: 'Retainer',
    price: 'From $1,000 a month',
    lines: [
      'Hosting, fixes when something breaks, a set number of small changes a month, and a limit on AI usage.',
      'Every month you get a short report: what the system handled, hours it saved, anything it got wrong, one improvement made and one proposed for next month.',
      'Month to month. Nothing switches off without being handed over to you first.',
    ],
  },
]

const faqs = [
  {
    q: 'Why is the audit free?',
    a: 'Because it shows whether there is a job worth building on. If there is, you get a quote for your first AI employee. If there is not, you are told so, and the report is yours either way.',
  },
  {
    q: 'Do I have to buy an AI employee after the audit?',
    a: 'No. The audit ends with a written report and a price, with the payback figure on it, and the decision is yours from there. There is no follow-up sequence and no pressure call.',
  },
  {
    q: 'What does $3,500 actually get me?',
    a: 'One AI employee, built for one job in your business, working on your actual clients by day 14, with your team okaying every message before it is sent. Plus a walkthrough with your team and a list of the next jobs worth handing over, in order.',
  },
  {
    q: 'Why do builds start at $25,000?',
    a: 'An AI operating system is one system your whole team logs into: every client file on one board, messages drafted for a person to approve, connections into the software you already use, and reports. That is 150 to 300 hours of work, and the price is set before it starts. Your first AI employee comes first so you never have to take that on trust.',
  },
  {
    q: 'What is in the retainer, and what is not?',
    a: 'In: hosting, fixing anything that breaks, a set number of small changes each month, and the monthly report. Not in: new features, which are quoted separately so the monthly number never creeps. There is no minimum term.',
  },
  {
    q: 'Deposits and payment?',
    a: 'Your first AI employee is paid when it goes live. Builds take about a third on signing and the rest as working software is shown at each stage. Retainers are billed monthly.',
  },
  {
    q: 'Any lock-in?',
    a: 'None. You own what gets built, your data and every login. An AI operating system runs on your own systems from day one. Your first AI employee is hosted by Herbert AI for speed and moves onto your own systems whenever you want, with a written guide to how it works.',
  },
]

export default function Pricing() {
  return (
    <>
      <JsonLd data={breadcrumbs([['Pricing', '/pricing']])} />
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>Pricing</Eyebrow>
          <h1
            className="font-display text-ink max-w-[14ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            The audit is free.
            <br />
            The rest is fixed.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[56ch]">
            Four steps, taken in order, each priced before you take it. No hourly billing,
            no ranges that turn into invoices, and nothing you pay for before you have seen
            what it would save you.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <AuditButton />
            <Link href="/start" className="text-[15px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
              Already know what you want? Start a project
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <div className="border-b border-line">
            {rungs.map((r, i) => (
              <RevealOnScroll key={r.n} delay={i * 0.05}>
                <div className="grid lg:grid-cols-[1fr_1.6fr] gap-x-12 gap-y-4 py-10 md:py-12 border-t border-line">
                  <div>
                    <div className="font-mono text-[12px] tracking-[0.18em] text-muted mb-3">{r.n}</div>
                    <h2
                      className="font-display text-ink leading-[1] tracking-[-0.03em] mb-3"
                      style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800 }}
                    >
                      {r.title}
                    </h2>
                    <div className="text-[18px] md:text-[20px] font-semibold text-ink tracking-[-0.01em]">{r.price}</div>
                  </div>
                  <ul className="space-y-3 pt-1">
                    {r.lines.map((l) => (
                      <li key={l} className="flex gap-3 text-[15px] md:text-[16px] text-muted leading-[1.6]">
                        <span className="mt-[11px] w-1.5 h-1.5 rounded-full bg-ink shrink-0" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll>
            <Eyebrow>Common questions</Eyebrow>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-5">
            {faqs.map((f, i) => (
              <RevealOnScroll key={f.q} delay={(i % 2) * 0.08}>
                <div className="bg-white border border-line rounded-3xl p-7 lift h-full">
                  <h3 className="text-[17px] font-medium text-ink mb-2.5 tracking-[-0.01em]">{f.q}</h3>
                  <p className="text-[15px] text-muted leading-[1.6]">{f.a}</p>
                </div>
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
                className="font-display text-cream"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 800 }}
              >
                Find out what the job
                <br />
                is costing you.
              </h2>
              <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[52ch]">
                45 minutes auditing your business, a written report back within two business days,
                and no obligation to build anything.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-5 lg:items-end">
              <AuditButton dark />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40 lg:text-right">
                Free. Yours to keep either way.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

import AuditForm from '../components/site/AuditForm'
import AfterPilot from '../components/site/AfterPilot'
import { SAMPLE_TITLE, SAMPLE_JOBS, SAMPLE_TOTAL } from '../components/site/sample-audit'
import { OG_IMAGE } from '@/app/components/site/og'
import { JsonLd, breadcrumbs, service, LADDER } from '@/app/components/site/schema'

export const metadata = {
  title: { absolute: 'Free AI audit for small business | Herbert AI, Adelaide' },
  description:
    'A free 45 minute AI audit puts a cost on every repetitive job in your business. Then your first AI employee takes the worst one: live in 14 days, $3,500 fixed, or it is free.',
  alternates: { canonical: '/pilot' },
  openGraph: {
    title: 'Free AI audit · Herbert AI',
    description:
      '45 minutes auditing your business, a written report on what your admin costs, then working software on the worst job in 14 days. Fixed price, the $3,500 taken off if you go ahead with a bigger build.',
    url: '/pilot',
    images: [OG_IMAGE],
  },
}

const faqs = [
  {
    q: 'What is the AI audit, and why is it free?',
    a: "45 minutes auditing how your business runs, then a written report within two business days: the three jobs eating the most hours, what each costs you a year in your own figures, which one to hand over first, and the next jobs worth handing over, in order. It's free because it shows whether there's a job worth building on. If there is, you get a quote for your first AI employee. If there isn't, you're told so, and the report is yours either way.",
  },
  {
    q: 'Do I have to buy an AI employee after the audit?',
    a: 'No. The audit ends with a written report and a price, with the payback figure on it, and the decision is yours from there. There is no follow-up sequence and no pressure call.',
  },
  {
    q: 'What counts as a job worth handing over?',
    a: 'Any office job someone does over and over that follows the same steps every time: chasing documents or invoices, re-typing details between systems, writing the same emails, confirming bookings by hand.',
  },
  {
    q: 'What do I actually get for $3,500?',
    a: 'One AI employee, built for one job in your business and working on your actual clients by day 14. It does one job every day, chasing documents or answering the front desk for example, and your team okays every message before it is sent. Plus a walkthrough with your team and a list of the next jobs worth handing over, in order.',
  },
  {
    q: 'What does "the $3,500 taken off" mean?',
    a: 'If you go ahead with a bigger build within 60 days, the whole $3,500 comes off that price. The first AI employee ends up costing you nothing. If you stop there, you keep the working system either way.',
  },
  {
    q: 'Are there ongoing costs after the first 30 days?',
    a: "The first 30 days of hosting, support and AI running costs are included. After that you choose: keep it running for $200 a month, which covers hosting, fixes and normal AI usage, or have it moved onto your own systems with a written guide to how it works, or roll it into a bigger build. You get a reminder a week before. If no choice is made by day 30, it's paused and your data is sent to you, and it can still be moved onto your own systems whenever you're ready.",
  },
  {
    q: 'What if it is not live in 14 days?',
    a: "Then it's free. The clock starts at the kickoff call, once access to the tools involved has been given. Fourteen days later it's running or you don't pay.",
  },
  {
    q: 'Do I have to change my existing software?',
    a: 'No. Your first AI employee connects to what you already use. Your calendar, inbox, job system and invoicing stay where they are; the new workflow sits between them and does the repetitive part.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
}

// /pilot, rebuilt 20 Oct 2026 for the "Runs itself" charter, skeleton B (Will:
// "B"): the offer and the booking form together on the first screen, since every
// "Book a free AI audit" button lands here at #book; then the written report the
// audit gives back, shown at size from the real sample; how it works; what it
// fixes; after the pilot; the questions; and a link back up to the form. The
// skeletons are in docs/design/design-pass-site-2026-10-20-pilot-skeleton.png.
// Words are the details pass, section by section. Detail 1 (Will, 20 Oct 2026,
// "1"): the heading answers the homepage's last question in the same words.
// Detail 2 (Will, 20 Oct 2026, "1, can u change the heading from Free AI Audit
// to AI Audit"): a one-sentence intro and the audit's own terms; the pilot's
// terms are explained in How it works and the questions.

// The hero's terms (Will, 27 Oct 2026: "1", "2 days then", then "Your written
// report" once the audit became a report, not a page). The
// 45 minutes is the audit call; the promise stays two business days, spelled
// out on the timeline below.
const TERMS = [
  ['Free', 'No obligation'],
  ['45 min', 'One call on how your business runs'],
  ['2 days', 'Your written report'],
]

// How it works as a timeline: one line from the audit to day 14, the build
// marked in fourteen ticks (Will, 22 Oct 2026, layout "1"). Each stop is its
// time and its title and nothing else: the rows under the stops went on 30 Oct
// 2026 (Will: "i think we remove the lines under the timeline headings
// altogether") and the two prices with them ("i think we remove the free and
// the 3500 fixed as well"); the prices stay in section 5 and the questions.
const STEPS = [
  { when: '45 minutes', title: 'The free AI audit' },
  { when: 'Two business days', title: 'Your written report' },
  { when: '14 days from your go', title: 'Your first AI employee, built', build: true },
  { when: 'Day 14', title: 'Live' },
]

// What it fixes: plain sentences, no slogan beats (Will, 24 Oct 2026,
// descriptions "1"); the heading names the six ("The jobs"), and every
// heading on the page balances its lines (wraps "1").
const FIXES = [
  ['Chasing', 'Follow-ups for documents, invoices and approvals go out on time without anyone writing them.'],
  ['Re-typing', 'Details entered once reach every system that needs them, instead of being keyed in three times.'],
  ['The same emails', 'Quotes, confirmations and updates are drafted for you to check and send.'],
  ['Booking admin', 'Confirmations, reschedules and reminders are handled without anyone touching the calendar.'],
  ['Handovers', 'Job details that live in one person’s head or inbox go on one screen the whole team can see.'],
  ['The Monday report', 'The numbers someone compiles by hand every week are compiled for you.'],
]

function Label({ children, dark = false }) {
  return <p className={`text-[16px] font-medium mb-4 ${dark ? 'text-white/60' : 'text-[#555]'}`}>{children}</p>
}

function H2({ children }) {
  return (
    <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch] text-balance" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
      {children}
    </h2>
  )
}

function Section({ children, first = false }) {
  return (
    <section className={`bg-[#FAFAF8] text-[#111] ${first ? '' : 'border-t border-[#111]/10'}`}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">{children}</div>
    </section>
  )
}

// No label over the sheet (Will, 27 Oct 2026: "we dont need the 'what your
// report looks like'"); a small note at its foot keeps it honest that the
// figures are an example ("it kills our proof if we say its made up").
// Section 2's sheet: the sample audit's time table as real text, from the
// same figures as /pilot/sample-audit, so it reads on a phone and never drifts
// from the sample (Will, 22 Oct 2026, "3"). White is the software's colour on
// the paper ground (CHARTER.md). Not a link itself: "Read the whole sample"
// beside it is, so a screen reader does not hear the table as link text.
const SHEET_LABEL = 'font-mono text-[10px] uppercase tracking-[0.18em] text-[#666]'
const SHEET_CELL = 'py-3 pr-4 border-t border-[#111]/10 text-[14px] leading-[1.45] text-[#333] align-top'

// Phones and tablets: the line down the left, each stop beside it. Laptops
// (from 1024px): each stop's time above the line, the line across, the stop
// under it (Will, 23 Oct 2026, edited on the design canvas: "have the times
// above the timeline"). The laptop rows are shared (subgrid), so the line stays
// straight however the times wrap and the prices sit on one level.
function Timeline() {
  return (
    <>
      <ol className="lg:hidden mt-12">
        {STEPS.map((st) => (
          <li key={st.title} className="group relative min-w-0 pl-9 pb-9 last:pb-0">
            <span aria-hidden className="absolute left-[5px] top-2 bottom-0 w-[2px] bg-[#111] group-last:hidden" />
            <span aria-hidden className="absolute left-0 top-[3px] w-3 h-3 rounded-full bg-[#111]" />
            <p className="text-[16px] font-medium text-[#777] leading-[1.2] mb-2">{st.when}</p>
            <h3 className="text-[22px] font-semibold tracking-[-0.02em] mb-2.5">{st.title}</h3>
          </li>
        ))}
      </ol>
      <ol className="hidden lg:grid mt-14 grid-cols-[0.8fr_1fr_1.6fr_1fr] grid-rows-[auto_auto_1fr]">
        {STEPS.map((st, i) => (
          <li key={st.title} className="grid grid-rows-subgrid row-span-3 min-w-0">
            <p className="self-end pr-7 pb-5 text-[16px] font-medium text-[#777] leading-[1.2]">{st.when}</p>
            <div aria-hidden className="relative h-3 flex items-center">
              <span className="shrink-0 w-3 h-3 rounded-full bg-[#111]" />
              {i < STEPS.length - 1 && <span className="flex-1 h-[2px] bg-[#111]" />}
              {st.build && (
                <span className="absolute left-0 right-0 bottom-[7px] h-3 flex items-end">
                  {Array.from({ length: 14 }, (_, d) => (
                    <span key={d} className={`flex-1 border-l ${d === 0 || d === 13 ? 'h-3 border-[#111]/50' : 'h-[7px] border-[#111]/20'}`} />
                  ))}
                </span>
              )}
            </div>
            <div className="min-w-0 flex flex-col pt-4 pr-7">
              <h3 className="text-[24px] font-semibold tracking-[-0.02em] mb-2.5">{st.title}</h3>
              </div>
          </li>
        ))}
      </ol>
    </>
  )
}

function ReadSample() {
  return (
    <a href="/pilot/sample-audit" className="text-[16px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
      Read the whole sample <span aria-hidden>&rarr;</span>
    </a>
  )
}

function WrittenSheet() {
  return (
    <div className="min-w-0 rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] px-5 py-6 sm:px-9 sm:py-8 text-[#111]">
      <p className="font-bold tracking-[-0.03em] leading-[1.02] max-w-[22ch]" style={{ fontSize: 'clamp(24px, 2.1vw, 30px)' }}>
        {SAMPLE_TITLE}
      </p>
      <p className={`${SHEET_LABEL} mt-6 mb-2`}>Where the time goes</p>
      <ul className="md:hidden border-b border-[#111]/10">
        {SAMPLE_JOBS.map((j) => (
          <li key={j.job} className="py-3.5 border-t border-[#111]/10">
            <p className="text-[14px] leading-[1.45] text-[#333]">{j.job}</p>
            <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#666]">
              {j.who} · <span className="whitespace-nowrap">{j.hours} hours a week</span> · <span className="whitespace-nowrap text-[#111]">{j.cost} a year</span>
            </p>
          </li>
        ))}
      </ul>
      <table className="hidden md:table w-full border-collapse">
        <thead>
          <tr>
            {['Job', 'Who does it', 'Hours a week', 'Cost a year'].map((h) => (
              <th key={h} className={`${SHEET_LABEL} text-left font-normal pb-2.5 pr-4 align-bottom`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SAMPLE_JOBS.map((j) => (
            <tr key={j.job}>
              <td className={SHEET_CELL}>{j.job}</td>
              <td className={SHEET_CELL}>{j.who}</td>
              <td className={SHEET_CELL}>{j.hours}</td>
              <td className={`${SHEET_CELL} font-semibold text-[#111]`}>{j.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-5 text-[16px] md:text-[17px] leading-[1.45]">{SAMPLE_TOTAL}</p>
      <p className="mt-4 text-[12.5px] text-[#777]">Figures are illustrative.</p>
    </div>
  )
}

export default function Pilot() {
  return (
    <>
      <JsonLd data={[service({ name: 'Free AI audit', description: metadata.description, path: '/pilot', serviceType: 'AI audit', audience: 'Owner-operated businesses with 3 to 20 staff', offers: LADDER[0] }), breadcrumbs([['How it works', '/pilot']])]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. The offer and the form. #book is here: every audit button lands on it.
          On a laptop the hero fills the first screen like the homepage's, and the
          card starts level with the heading, the label alone above both (Will,
          22 Oct 2026, spacing "2": "it looks more square and uniform"). */}
      <section id="book" className="bg-[#FAFAF8] text-[#111] scroll-mt-4 lg:flex lg:flex-col lg:justify-center lg:min-h-[calc(100svh-76px)]">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 pt-12 md:pt-16 lg:pt-8 pb-20 md:pb-24 lg:pb-8 grid lg:grid-cols-[0.95fr_1.05fr] gap-x-14 items-start">
          <div className="lg:col-start-1">
            <Label>AI Audit</Label>
          </div>
          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <h1 className="font-bold tracking-[-0.045em] leading-[0.95] max-w-[14ch] text-balance" style={{ fontSize: 'clamp(44px, 4.4vw, 64px)' }}>
              Find the job eating your time and money.
            </h1>
            {/* No intro under the heading: the terms below carry it (Will, 27 Oct
                2026, "i think we remove the sentences under the 'Find the job
                eating your...'"). */}
            {/* Wherever the form sits below the text (phones, tablets), its
                button comes up under the intro and jumps down to it (Will,
                22 Oct 2026, phone layout "3"). */}
            <a
              href="#form"
              className="lg:hidden mt-6 inline-flex items-center gap-2 bg-[#111] text-white rounded-[10px] px-6 py-3.5 text-[16px] font-medium hover:bg-[#2a2a2a] transition-colors"
            >
              Book a free AI audit <span aria-hidden>&darr;</span>
            </a>
            <div className="mt-10 grid grid-cols-3 gap-5 max-w-[620px]">
              {TERMS.map(([n, l]) => (
                <div key={n} className="border-t border-[#111]/12 pt-3">
                  <div className="text-[21px] min-[360px]:text-[26px] font-semibold tracking-[-0.02em] whitespace-nowrap">{n}</div>
                  <div className="mt-1 text-[14px] leading-[1.35] text-[#777]">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div id="form" className="min-w-0 mt-12 lg:mt-0 lg:col-start-2 lg:row-start-2 scroll-mt-6">
            <div className="rounded-2xl border border-[#111]/10 bg-[#FAFAF8] p-6 sm:p-7">
              <AuditForm source="/pilot" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. The written report the audit gives back: its time table as a live sheet. */}
      <Section>
        <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-x-12 gap-y-10 items-center">
          <div className="min-w-0">
            <Label>What you get back</Label>
            <H2>What your admin costs, written down.</H2>
            {/* No line under the heading: the sheet shows what it used to list,
                and the made-up note sits in the sheet's label (Will, 22 Oct 2026,
                line test option A). */}
            <p className="mt-6 hidden lg:block">
              <ReadSample />
            </p>
          </div>
          {/* On a phone the link comes after the sheet, the offer after the
              proof (Will, 22 Oct 2026, phone order "1"); laptops keep it beside. */}
          <div className="min-w-0">
            <WrittenSheet />
            <p className="mt-5 lg:hidden">
              <ReadSample />
            </p>
          </div>
        </div>
      </Section>

      {/* 3. How it works. */}
      <Section>
        <Label>The timeline</Label>
        <H2>Your first AI employee in four steps.</H2>
        <Timeline />
      </Section>

      {/* 4. What it fixes. */}
      <Section>
        <Label>What it fixes</Label>
        <H2>The jobs everyone hates doing.</H2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
          {FIXES.map(([t, b]) => (
            <div key={t} className="border-t border-[#111]/15 pt-4">
              <h3 className="text-[20px] font-semibold tracking-[-0.015em]">{t}</h3>
              <p className="mt-1.5 text-[16px] leading-[1.5] text-[#555]">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. What comes next. */}
      <Section>
        <Label>What comes next</Label>
        <H2>One job first. Then the system.</H2>
        {/* The stages beside the dashboard they grow (Will, 30 Oct 2026, "B, dashboard"). */}
        <AfterPilot />
      </Section>

      {/* 6. The questions. */}
      <Section>
        <Label>Questions</Label>
        <H2>Before you book.</H2>
        <div className="mt-10 grid md:grid-cols-2 gap-x-12">
          {faqs.map((f) => (
            <div key={f.q} className="border-t border-[#111]/12 py-5">
              <h3 className="text-[18px] font-semibold tracking-[-0.01em]">{f.q}</h3>
              <p className="mt-2 text-[16px] leading-[1.55] text-[#555]">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. Back up to the form. */}
      <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-14 pb-20">
          <p className="text-[20px] font-semibold tracking-[-0.01em]">
            Ready? <a href="#book" className="underline underline-offset-[5px] decoration-[#111]/30 hover:decoration-[#111]">Book your free AI audit <span aria-hidden>&uarr;</span></a>
          </p>
        </div>
      </section>
    </>
  )
}

import AuditForm from '../components/site/AuditForm'
import { SAMPLE_TITLE, SAMPLE_JOBS, SAMPLE_TOTAL } from '../components/site/sample-audit'
import { OG_IMAGE } from '@/app/components/site/og'
import { RUNGS } from '@/app/components/site/shared'
import { JsonLd, breadcrumbs, service, LADDER } from '@/app/components/site/schema'

export const metadata = {
  title: { absolute: 'Free AI audit for small business | Herbert AI, Adelaide' },
  description:
    'A free 45 minute AI audit puts a cost on every repetitive job in your business. Then your first AI employee takes the worst one: live in 14 days, $3,500 fixed, or it is free.',
  alternates: { canonical: '/pilot' },
  openGraph: {
    title: 'Free AI audit · Herbert AI',
    description:
      '45 minutes auditing your business, a written page on what your admin costs, then working software on the worst job in 14 days. Fixed price, credited in full if you go ahead with a bigger build.',
    url: '/pilot',
    images: [OG_IMAGE],
  },
}

const faqs = [
  {
    q: 'What is the AI audit, and why is it free?',
    a: "45 minutes auditing how your business runs, then a written page within two business days: the three jobs eating the most hours, what each costs you a year in your own figures, which one to hand over first, and a twelve month roadmap. It's free because it shows whether there's a job worth building on. If there is, you get a quote for the pilot. If there isn't, you're told so, and the page is yours either way.",
  },
  {
    q: 'Do I have to buy the pilot after the audit?',
    a: 'No. The audit ends with a written page and a price. Most people read it, look at the payback figure, and decide from there. There is no follow-up sequence and no pressure call.',
  },
  {
    q: 'What counts as a bottleneck?',
    a: 'Any office job someone does over and over that follows the same steps every time. Chasing documents or invoices, re-typing details between systems, writing the same emails, confirming bookings by hand. If your team groans about it, it qualifies.',
  },
  {
    q: 'What do I actually get for $3,500?',
    a: 'One AI employee, built for one job in your business and running on your real data by day 14. It has a role, say an AI document chaser or an AI front desk assistant, it does that job every day, and your team approves anything that goes out. Plus a walkthrough with your team and a twelve month AI roadmap of the next jobs worth handing over. Software, not a report.',
  },
  {
    q: 'What does "credited in full" mean?',
    a: 'If you go ahead with a bigger build within 60 days, the whole $3,500 comes off that price. The pilot ends up costing you nothing. If you stop at the pilot, you keep the working system either way.',
  },
  {
    q: 'Are there ongoing costs after the pilot?',
    a: "The first 30 days of hosting, support and AI running costs are included. After that you choose: keep it running for $200 a month, which covers hosting, fixes and normal AI usage, or have it moved onto your own accounts with a written guide to how it works, or roll it into a bigger build. You get a reminder a week before. If no choice is made by day 30, it's paused and your data is sent to you, and it can still be moved onto your own accounts whenever you're ready.",
  },
  {
    q: 'What if it is not live in 14 days?',
    a: "Then it's free. The clock starts when you've given access to the tools involved and we've had the kickoff chat. Fourteen days later it's running or you don't pay.",
  },
  {
    q: 'Do I have to change my existing software?',
    a: 'No. The pilot connects what you already use. Your calendar, inbox, job system and invoicing stay where they are; the new workflow sits between them and does the repetitive part.',
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
// "Book a free AI audit" button lands here at #book; then the written page the
// audit gives back, shown at size from the real sample; how it works; what it
// fixes; after the pilot; the questions; and a link back up to the form. The
// skeletons are in docs/design/design-pass-site-2026-10-20-pilot-skeleton.png.
// Words are the details pass, section by section. Detail 1 (Will, 20 Oct 2026,
// "1"): the heading answers the homepage's last question in the same words.
// Detail 2 (Will, 20 Oct 2026, "1, can u change the heading from Free AI Audit
// to AI Audit"): a one-sentence intro and the audit's own terms; the pilot's
// terms are explained in How it works and the questions.

// The hero's terms (Will, 27 Oct 2026: "1", "2 days then", label "A"). The
// 45 minutes is the audit call; the promise stays two business days, spelled
// out on the timeline below.
const TERMS = [
  ['Free', 'No obligation'],
  ['45 min', 'One call on how your business runs'],
  ['2 days', 'Your costs, on one page'],
]

// How it works as a timeline: one line from the audit to day 14, the build
// marked in fourteen ticks (Will, 22 Oct 2026, layout "1"). Facts are the old
// three steps' and the hero's terms; the audit's is the hero intro's. The
// prices are the homepage's own (RUNGS), and on laptops they sit on one level
// at the foot of their stops (Will, 22 Oct 2026, price "1", "all the prices
// being on different levels i dont like").
const STEPS = [
  { when: '45 minutes', title: 'The free AI audit', facts: ['How your business runs and where the hours go'], price: RUNGS[0].price },
  { when: 'Within two business days', title: 'Your written page', facts: ['The three jobs costing you most, in your figures'] },
  { when: '14 days from your go', title: 'Your first AI employee, built', facts: ['Built around the tools you already use', 'One job and a name, say an AI document chaser', 'A progress update, not a project plan'], build: true, price: RUNGS[1].price },
  { when: 'Day 14', title: 'Live', facts: ['Your team uses it the same day', 'A walkthrough so everyone knows how', 'A twelve month roadmap of the next jobs'] },
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

const AFTER = [
  ['Your AI operating system', 'When one job runs itself, the next ones follow. An AI operating system puts your files, comms, follow-ups and reporting on one system your team works out of every day, and your business owns. Scoped after the audit, from $25,000, with the pilot’s $3,500 taken off.'],
  ['Keep it running', 'A retainer from $1,000 a month covers hosting, fixes, a set number of small changes, and a monthly report on what the system handled and one improvement shipped. Month to month, and nothing switches off without being handed over to you first.'],
  ['The first three', 'The first three pilot clients who agree to a case study and a testimonial get 90 days of included care instead of 30. The price is the same; the proof is what we are short of.'],
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
function Facts({ facts }) {
  return (
    <ul>
      {facts.map((f) => (
        <li key={f} className="text-[17px] leading-[1.45] text-[#444] py-2 border-t border-[#111]/8">{f}</li>
      ))}
    </ul>
  )
}

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
            <Facts facts={st.facts} />
            {st.price && <p className="mt-4 text-[15px] font-medium text-[#111]">{st.price}</p>}
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
              <Facts facts={st.facts} />
              {st.price && <p className="mt-auto pt-6 text-[15px] font-medium text-[#111]">{st.price}</p>}
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
      <p className={SHEET_LABEL}>Sample audit page · a made-up practice</p>
      <p className="mt-2.5 font-bold tracking-[-0.03em] leading-[1.02] max-w-[22ch]" style={{ fontSize: 'clamp(24px, 2.1vw, 30px)' }}>
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

      {/* 2. The written page the audit gives back: its time table as a live sheet. */}
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
        <Label>How it works</Label>
        <H2>Audit first. Then fourteen days.</H2>
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

      {/* 5. After the pilot. */}
      <Section>
        <Label>After the pilot</Label>
        <H2>One job first. Then the system.</H2>
        <div className="mt-12 grid md:grid-cols-3 gap-x-12 gap-y-8">
          {AFTER.map(([t, b]) => (
            <div key={t} className="border-t border-[#111]/15 pt-4">
              <h3 className="text-[20px] font-semibold tracking-[-0.015em]">{t}</h3>
              <p className="mt-1.5 text-[16px] leading-[1.5] text-[#555]">{b}</p>
            </div>
          ))}
        </div>
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

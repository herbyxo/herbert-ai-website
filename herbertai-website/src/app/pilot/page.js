import Image from 'next/image'
import AuditForm from '../components/site/AuditForm'
import { OG_IMAGE } from '@/app/components/site/og'

export const metadata = {
  title: { absolute: 'How it works: a free AI audit, then working software in 14 days | Herbert AI' },
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

const TERMS = [
  ['Free', 'No obligation'],
  ['45 min', 'On how the business runs'],
  ['2 days', 'Business days to your written page'],
  ['Yours', 'To keep, either way'],
]

const STEPS = [
  { n: 'Step 1', title: 'The free AI audit', facts: ['45 minutes auditing your business', 'A written page in two business days', 'The three jobs costing you most, in your figures'] },
  { n: 'Step 2', title: 'Your first AI employee, built', facts: ['Built around the tools you already use', 'One job and a name, say an AI document chaser', 'A progress update, not a project plan'] },
  { n: 'Step 3', title: 'Live on day 14', facts: ['Your team uses it the same day', 'A walkthrough so everyone knows how', 'A twelve month roadmap of the next jobs'] },
]

const FIXES = [
  ['Chasing', 'Documents, invoices, approvals. The follow-up goes out on time, every time, without anyone writing it.'],
  ['Re-typing', 'The same details keyed into three systems. Entered once, synced everywhere.'],
  ['The same emails', 'Quotes, confirmations, updates: drafted for you, checked by you, sent in seconds.'],
  ['Booking admin', 'Confirmations, reschedules and reminders handled without touching the calendar.'],
  ['Handovers', 'Job details that live in one person’s head or inbox, put on one screen the whole team can see.'],
  ['The Monday report', 'The numbers you compile by hand every week, compiled for you.'],
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
    <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
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

export default function Pilot() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. The offer and the form. #book is here: every audit button lands on it. */}
      <section id="book" className="bg-[#FAFAF8] text-[#111] scroll-mt-4">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-12 md:pt-16 pb-20 md:pb-24 grid lg:grid-cols-[0.95fr_1.05fr] gap-x-14 gap-y-12 items-center">
          <div className="min-w-0">
            <Label>AI Audit</Label>
            <h1 className="font-bold tracking-[-0.045em] leading-[0.95] max-w-[14ch]" style={{ fontSize: 'clamp(44px, 4.4vw, 64px)' }}>
              Find the job eating your time and money.
            </h1>
            <p className="mt-6 text-[19px] leading-[1.45] text-[#333] max-w-[40ch]">
              45 minutes on how your business runs: where the hours go, what each repetitive job
              costs you a year, and which one to hand over first.
            </p>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-[760px]">
              {TERMS.map(([n, l]) => (
                <div key={n} className="border-t border-[#111]/12 pt-3">
                  <div className="text-[26px] font-semibold tracking-[-0.02em]">{n}</div>
                  <div className="mt-1 text-[14px] leading-[1.35] text-[#777]">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-7 text-[15px] text-[#555]">
              Prefer to talk now? <a href="tel:+61448111840" className="font-medium text-[#111] underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">0448 111 840</a>
            </p>
          </div>
          <div className="min-w-0">
            <div className="rounded-2xl border border-[#111]/10 bg-[#FAFAF8] p-6 sm:p-7">
              <AuditForm source="/pilot" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. The written page the audit gives back, shown at size. */}
      <Section>
        <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-x-12 gap-y-10 items-center">
          <div className="min-w-0">
            <Label>What you get back</Label>
            <H2>What your admin costs, written down.</H2>
            <p className="mt-5 text-[17px] leading-[1.5] text-[#555] max-w-[40ch]">
              This one is a sample, for a made-up four person accounting practice: the jobs, the
              hours, what each costs a year, and the first one to hand over.
            </p>
            <p className="mt-6">
              <a href="/pilot/sample-audit" className="text-[16px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
                Read the whole sample <span aria-hidden>&rarr;</span>
              </a>
            </p>
          </div>
          <a href="/pilot/sample-audit" className="block min-w-0 rounded-xl overflow-hidden border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)]">
            <Image
              src="/pilot/sample-audit-page.jpg"
              alt="The top of the sample audit page: the jobs eating the time at a four person accounting practice, with the hours and what each costs a year"
              width={2496}
              height={2040}
              sizes="(min-width: 1024px) 740px, 100vw"
              className="w-full h-auto block"
            />
          </a>
        </div>
      </Section>

      {/* 3. How it works. */}
      <Section>
        <Label>How it works</Label>
        <H2>Audit first. Then fourteen days.</H2>
        <div className="mt-12 grid md:grid-cols-3 gap-10 lg:gap-12">
          {STEPS.map((st) => (
            <div key={st.n} className="border-t border-[#111]/15 pt-6">
              <p className="text-[16px] font-medium text-[#777] mb-5">{st.n}</p>
              <h3 className="text-[24px] font-semibold tracking-[-0.02em] mb-3">{st.title}</h3>
              <ul>
                {st.facts.map((f) => (
                  <li key={f} className="text-[17px] leading-[1.45] text-[#444] py-2 border-t border-[#111]/8">{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. What it fixes. */}
      <Section>
        <Label>What it fixes</Label>
        <H2>The job everyone hates doing.</H2>
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

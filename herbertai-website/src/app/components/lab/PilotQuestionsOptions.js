'use client'

// /pilot section 6, Questions: today and three ways (16 Nov 2026). Facts first:
// the questions owners have actually asked before giving time (the 29 Oct clinic
// call and its prep, the 12 Nov reply rules, the objection files), and what the
// services agreement lets the site say about data, hosting and the code. A, B and
// C share one set of twelve questions; C keeps the five that stop a booking. The
// heading and label are today's for all three: words are the details pass.
// Static, as /pilot does not move.

const Q = '’'

const TODAY = [
  ['What is the AI audit, and why is it free?', `45 minutes auditing how your business runs, then a written report within two business days: the three jobs eating the most hours, what each costs you a year in your own figures, which one to hand over first, and the next jobs worth handing over, in order. It${Q}s free because it shows whether there${Q}s a job worth building on. If there is, you get a quote for your first AI employee. If there isn${Q}t, you${Q}re told so, and the report is yours either way.`],
  ['Do I have to buy an AI employee after the audit?', 'No. The audit ends with a written report and a price, with the payback figure on it, and the decision is yours from there. There is no follow-up sequence and no pressure call.'],
  ['What counts as a job worth handing over?', 'Any office job someone does over and over that follows the same steps every time: chasing documents or invoices, re-typing details between systems, writing the same emails, confirming bookings by hand.'],
  ['What do I actually get for $3,500?', 'One AI employee, built for one job in your business and working on your actual clients by day 14. It does one job every day, chasing documents or answering the front desk for example, and your team okays every message before it is sent. Plus a walkthrough with your team and a list of the next jobs worth handing over, in order.'],
  ['What does "the $3,500 taken off" mean?', 'If you go ahead with a bigger build within 60 days, the whole $3,500 comes off that price. The first AI employee ends up costing you nothing. If you stop there, you keep the working system either way.'],
  ['Are there ongoing costs after the first 30 days?', `The first 30 days of hosting, support and AI running costs are included. After that you choose: keep it running for $200 a month, which covers hosting, fixes and normal AI usage, or have it moved onto your own systems with a written guide to how it works, or roll it into a bigger build. You get a reminder a week before. If no choice is made by day 30, it${Q}s paused and your data is sent to you, and it can still be moved onto your own systems whenever you${Q}re ready.`],
  ['What if it is not live in 14 days?', `Then it${Q}s free. The clock starts at the kickoff call, once access to the tools involved has been given. Fourteen days later it${Q}s running or you don${Q}t pay.`],
  ['Do I have to change my existing software?', 'No. Your first AI employee connects to what you already use. Your calendar, inbox, job system and invoicing stay where they are; the new workflow sits between them and does the repetitive part.'],
]

// The twelve, in three groups. Answers cut to what the reader needs, each claim
// checked against its source (services agreement clauses in brackets).
const AUDIT = [
  ['Why is the audit free?', 'Because it shows whether there is a job worth building on. You get a written report within two business days, and it is yours either way.'],
  ['Do I have to buy anything after it?', 'No. The report ends with a price and the payback in your own figures, and the decision is yours. There is no follow-up sequence and no pressure call.'],
  ['What counts as a job worth handing over?', 'An office job someone does over and over, the same steps every time: chasing documents, re-typing details, writing the same emails, confirming bookings.'],
]
const COST = [
  ['What does $3,500 get me?', 'One AI employee, built for one job and working on your actual clients by day 14, with your team okaying every message before it is sent.'],
  ['What if it is not live in 14 days?', 'Then it is free. The 14 days start at the kickoff call, once access to the tools involved has been given.'],
  ['What does “the $3,500 taken off” mean?', 'If you go ahead with a bigger build within 60 days, the whole $3,500 comes off its price.'],
  ['What does it cost after day 30?', 'The first 30 days are included. Then it is $200 a month to keep it running, or it is moved onto your own accounts with a written guide.'],
]
const RISK = [
  ['Is my clients’ information safe?', 'It stays with providers hosting in Australia, is never used to train an AI model, and is covered by a confidentiality clause. Every record belongs to you.'],
  ['Will it talk to my clients on its own?', 'Only as far as you decide. By default someone on your team okays every message before it goes out.'],
  ['Do I have to change my software?', 'No. It works with the software you already use, and the audit checks each system before anything is promised.'],
  ['What happens if Herbert AI stops?', 'You keep a licence to the code that never ends and a written manual another developer can run it from. Nothing is switched off or held back.'],
  ['Couldn’t I just use ChatGPT?', 'ChatGPT does what it is asked, when someone asks it. An AI employee is set up once for one job and does it every day. If a tool you already pay for would do the job, the audit says so.'],
]
const ALL = [...AUDIT, ...COST, ...RISK]

const FIVE = [
  ['Why is the audit free?', 'Because it shows whether there is a job worth building on, and the report is yours either way.'],
  ['Do I have to buy anything after it?', 'No. You get a price and the payback in your own figures, and the decision is yours.'],
  ['What if it is not live in 14 days?', 'Then it is free.'],
  ['Is my clients’ information safe?', 'It stays with providers in Australia, is never used to train an AI model, and belongs to you.'],
  ['Will it talk to my clients on its own?', 'Only as far as you decide. By default your team okays every message first.'],
]

function Frame({ id, tag, note, children }) {
  return (
    <div data-opt={id}>
      <div className="bg-[#111] text-white px-6 lg:px-12 py-3 text-[13px] font-mono">
        <b>{tag}</b> <span className="text-white/60">{note}</span>
      </div>
      <section data-shot={id} className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
          <p className="text-[16px] font-medium mb-4 text-[#555]">Questions</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch] text-balance" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            Before you book.
          </h2>
          {children}
        </div>
      </section>
    </div>
  )
}

function Today() {
  return (
    <div className="mt-10 grid md:grid-cols-2 gap-x-12">
      {TODAY.map(([q, a]) => (
        <div key={q} className="border-t border-[#111]/12 py-5">
          <h3 className="text-[18px] font-semibold tracking-[-0.01em]">{q}</h3>
          <p className="mt-2 text-[16px] leading-[1.55] text-[#555]">{a}</p>
        </div>
      ))}
    </div>
  )
}

// A. The twelve folded: each question one line, its answer a tap away. The
// first is drawn open so the answer's look is on the sheet.
function Fold({ q, a, open }) {
  return (
    <details open={open} className="group border-t border-[#111]/12">
      <summary className="flex items-start justify-between gap-6 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-balance">{q}</h3>
        <span aria-hidden className="shrink-0 mt-[1px] text-[20px] leading-none text-[#777] group-open:hidden">+</span>
        <span aria-hidden className="shrink-0 mt-[1px] text-[20px] leading-none text-[#777] hidden group-open:inline">&minus;</span>
      </summary>
      <p className="-mt-1 pb-5 pr-10 text-[16px] leading-[1.55] text-[#555] text-pretty">{a}</p>
    </details>
  )
}

function Folded() {
  const half = Math.ceil(ALL.length / 2)
  return (
    <div className="mt-10 grid md:grid-cols-2 gap-x-12 items-start">
      {[ALL.slice(0, half), ALL.slice(half)].map((col, c) => (
        <div key={c} className={c === 0 ? "md:border-b border-[#111]/12" : "border-b border-[#111]/12"}>
          {col.map(([q, a], i) => <Fold key={q} q={q} a={a} open={c === 0 && i === 0} />)}
        </div>
      ))}
    </div>
  )
}

// B. The twelve open, in three labelled columns.
function Grouped() {
  return (
    <div className="mt-12 grid lg:grid-cols-3 gap-x-12 gap-y-12">
      {[['The audit', AUDIT], ['The cost', COST], ['Your clients and your data', RISK]].map(([label, items]) => (
        <div key={label} className="min-w-0">
          <p className="text-[15px] font-medium text-[#777] mb-1">{label}</p>
          {items.map(([q, a]) => (
            <div key={q} className="border-t border-[#111]/12 py-4">
              <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-balance">{q}</h3>
              <p className="mt-2 text-[16px] leading-[1.55] text-[#555] text-pretty">{a}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// C. The five that stop a booking, a line each, question left and answer right;
// the rest on /faq.
function Five() {
  return (
    <>
      <dl className="mt-12 border-b border-[#111]/12">
        {FIVE.map(([q, a]) => (
          <div key={q} className="grid md:grid-cols-[0.9fr_1.1fr] gap-x-12 gap-y-1.5 border-t border-[#111]/12 py-5">
            <dt className="text-[18px] font-semibold tracking-[-0.01em] text-balance">{q}</dt>
            <dd className="text-[16px] leading-[1.55] text-[#555] text-pretty">{a}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6">
        <a href="/faq" className="text-[16px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
          Every other question <span aria-hidden>&rarr;</span>
        </a>
      </p>
    </>
  )
}

export default function PilotQuestionsOptions() {
  return (
    <main className="pb-24">
      <Frame id="today" tag="Today" note="eight questions about the terms, all open"><Today /></Frame>
      <Frame id="a" tag="A. Twelve, folded" note="the questions owners ask, each answer a tap away"><Folded /></Frame>
      <Frame id="b" tag="B. Twelve, open, in three groups" note="the audit, the cost, your clients and your data"><Grouped /></Frame>
      <Frame id="c" tag="C. Five, a line each" note="the five that stop a booking; the rest on /faq"><Five /></Frame>
    </main>
  )
}

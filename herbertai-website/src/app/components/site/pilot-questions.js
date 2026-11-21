// /pilot section 6, Questions (Will, 21 Nov 2026: "A, folded"). The twelve
// questions owners have asked before giving time (the 29 Oct clinic call and its
// prep, the 12 Nov reply rules, the objection files), in three runs: the audit,
// the cost, then clients and data. Each answer is checked against the services
// agreement (business/sales/services-agreement-template.md): data with providers
// hosting in Australia and never used to train an AI model (9.2), every record
// the client's (7.1), a licence to the code that never ends (7.2), the operator's
// manual (8.1), nothing switched off or held back (8.2). The same list feeds the
// page's FAQPage structured data, so what AI search reads is what is shown.
// Native details elements: no script, nothing moves, /pilot stays static.

export const QUESTIONS = [
  ['Why is the audit free?', 'Because it shows whether there is a job worth building on. You get a written report within two business days, and it is yours either way.'],
  ['Do I have to buy anything after it?', 'No. The report ends with a price and the payback in your own figures, and the decision is yours. There is no follow-up sequence and no pressure call.'],
  ['What counts as a job worth handing over?', 'An office job someone does over and over, the same steps every time: chasing documents, re-typing details, writing the same emails, confirming bookings.'],
  ['What does $3,500 get me?', 'One AI employee, built for one job and working on your actual clients by day 14, with your team okaying every message before it is sent.'],
  ['What if it is not live in 14 days?', 'Then it is free. The 14 days start at the kickoff call, once access to the tools involved has been given.'],
  ['What does “the $3,500 taken off” mean?', 'If you go ahead with a bigger build within 60 days, the whole $3,500 comes off its price.'],
  ['What does it cost after day 30?', 'The first 30 days are included. Then it is $200 a month to keep it running, or it is moved onto your own accounts with a written guide.'],
  ['Is my clients’ information safe?', 'It stays with providers hosting in Australia, is never used to train an AI model, and is covered by a confidentiality clause. Every record belongs to you.'],
  ['Will it talk to my clients on its own?', 'Only as far as you decide. By default someone on your team okays every message before it goes out.'],
  ['Do I have to change my software?', 'No. It works with the software you already use, and the audit checks each system before anything is promised.'],
  ['What happens if Herbert AI stops?', 'You keep a licence to the code that never ends and a written manual another developer can run it from. Nothing is switched off or held back.'],
  ['Couldn’t I just use ChatGPT?', 'ChatGPT does what it is asked, when someone asks it. An AI employee is set up once for one job and does it every day. If a tool you already pay for would do the job, the audit says so.'],
]

// Where each run starts and ends in QUESTIONS, for the grouped layout.
export const GROUPS = [['The audit', 0, 3], ['The cost', 3, 7], ['Your clients and your data', 7, 12]]

const Q_TYPE = { all: 'text-[18px]', three: 'text-[18px]', small: 'text-[16px] sm:text-[18px]' }

function Sign({ sign }) {
  if (sign === 'chevron') {
    return (
      <svg aria-hidden viewBox="0 0 16 16" className="shrink-0 mt-[5px] w-4 h-4 text-[#777] group-open:rotate-180">
        <path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  const ring = sign === 'ring' ? 'w-6 h-6 rounded-full border border-[#111]/20 flex items-center justify-center text-[15px] -mt-[1px]' : 'mt-[1px] text-[20px]'
  return (
    <>
      <span aria-hidden className={`shrink-0 leading-none text-[#777] group-open:hidden ${ring}`}>+</span>
      <span aria-hidden className={`shrink-0 leading-none text-[#777] hidden group-open:flex ${sign === 'ring' ? ring : 'mt-[1px] text-[20px]'}`}>&minus;</span>
    </>
  )
}

function Fold({ q, a, open, sign, phone }) {
  return (
    <details open={open} className="group border-t border-[#111]/12">
      <summary className="flex items-start justify-between gap-6 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <h3 className={`${Q_TYPE[phone]} font-semibold tracking-[-0.01em] text-balance`}>{q}</h3>
        <Sign sign={sign} />
      </summary>
      <p className="-mt-1 pb-5 pr-10 text-[16px] leading-[1.55] text-[#555] text-pretty">{a}</p>
    </details>
  )
}

// An answer shown open, for open="laptop" from laptop width.
function Open({ q, a }) {
  return (
    <div className="border-t border-[#111]/12 py-4">
      <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-balance">{q}</h3>
      <p className="mt-2 text-[16px] leading-[1.55] text-[#555] text-pretty">{a}</p>
    </div>
  )
}

function List({ items, first, open, sign, phone }) {
  return items.map(([q, a], i) => <Fold key={q} q={q} a={a} open={open === 'first' && first && i === 0} sign={sign} phone={phone} />)
}

// The props exist so the design lab can draw this section's details from the
// same code; the page uses the defaults. open: 'first' (the first question
// open), 'none', 'laptop' (every answer open from laptop width, folded on
// phones). sign: 'plus', 'chevron', 'ring'. layout: 'two' (two runs of six),
// 'groups' (the three runs under their names), 'one' (one column). phone: 'all'
// (twelve rows), 'three' (three rows, then the other nine behind one fold),
// 'small' (questions a size down on phones). Will, 21 Nov 2026, the details
// ("Yep, recommended": 1, 2, 1, 1, 1): the heading kept, every question closed
// on load so the two runs end level, plus and minus, two runs of six, twelve
// rows on phones.
export default function PilotQuestions({ items = QUESTIONS, open = 'none', sign = 'plus', layout = 'two', phone = 'all' }) {
  const half = Math.ceil(items.length / 2)
  const cols = layout === 'groups'
    ? [[GROUPS[0], GROUPS[1]], [GROUPS[2]]].map((gs) => gs.map(([name, s, e]) => [name, items.slice(s, e)]))
    : layout === 'one' ? [[[null, items]]] : [[[null, items.slice(0, half)]], [[null, items.slice(half)]]]
  const folded = (
    <div className={`mt-10 grid ${layout === 'one' ? 'max-w-[880px]' : 'md:grid-cols-2'} gap-x-12 items-start`}>
      {cols.map((col, c) => (
        <div key={c} className={c < cols.length - 1 ? 'md:border-b border-[#111]/12' : 'border-b border-[#111]/12'}>
          {col.map(([name, run], g) => (
            <div key={g} className={name && g > 0 ? 'mt-8' : ''}>
              {name && <p className={`text-[15px] font-medium text-[#777] mb-2 ${c > 0 ? 'mt-8 md:mt-0' : ''}`}>{name}</p>}
              <List items={run} first={c === 0 && g === 0} open={open} sign={sign} phone={phone} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
  if (phone === 'three') {
    return (
      <>
        <div className="hidden md:block">{folded}</div>
        <div className="md:hidden mt-10 border-b border-[#111]/12">
          <List items={items.slice(0, 3)} first open={open} sign={sign} phone="all" />
          <details className="group/more border-t border-[#111]/12">
            <summary className="py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-[16px] font-medium underline underline-offset-4 decoration-[#111]/30">
              <span className="group-open/more:hidden">Nine more questions</span><span className="hidden group-open/more:inline">Fewer questions</span>
            </summary>
            <List items={items.slice(3)} open={open} sign={sign} phone="all" />
          </details>
        </div>
      </>
    )
  }
  if (open === 'laptop') {
    return (
      <>
        <div className="hidden lg:grid mt-10 grid-cols-2 gap-x-12 items-start">
          {[items.slice(0, half), items.slice(half)].map((run, c) => (
            <div key={c} className="border-b border-[#111]/12">{run.map(([q, a]) => <Open key={q} q={q} a={a} />)}</div>
          ))}
        </div>
        <div className="lg:hidden">{folded}</div>
      </>
    )
  }
  return folded
}

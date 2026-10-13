'use client'
import { useRef } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { STATE, useInView } from './board'
import { useSteps } from './steps'

// The brokerage hub drawn as the pipeline it is (Will, 13 Oct 2026: custom
// graphics "depending on the type of the thing"). The layout follows the
// pipeline boards brokers and sales teams work from (Pipedrive's pipeline view,
// broker CRMs such as Salestrekker): a column per stage with its count, a card
// per file carrying the client, the loan and its size, and the file's
// document checklist; underneath, the emails the hub has drafted and is
// holding for a person. The steps run once: a document lands, a reminder is
// drafted and approved, the file's checklist completes and it moves on, an
// update is drafted and approved, and a file comes back approved. De-branded:
// every name, figure and staff member is made up. Colour is state only.

const COLS = ['Documents requested', 'Documents in', 'With the adviser', 'Submitted', 'Approved']

const FILES = [
  { id: 'patel', name: 'Patel', loan: 'Refinance', amount: '$520k', col: 0, docs: [4, 6] },
  { id: 'okafor', name: 'Okafor', loan: 'Home loan', amount: '$710k', col: 0, docs: [2, 5] },
  { id: 'walsh', name: 'Walsh', loan: 'Equipment', amount: '$85k', col: 1, docs: [6, 6] },
  { id: 'lim', name: 'Lim', loan: 'Home loan', amount: '$460k', col: 1, docs: [5, 5] },
  { id: 'nguyen', name: 'Nguyen', loan: 'Home loan', amount: '$640k', col: 2, owner: 'Mia' },
  { id: 'rossi', name: 'Rossi', loan: 'Business', amount: '$1.2m', col: 2, owner: 'Ben' },
  { id: 'chen', name: 'Chen', loan: 'Home loan', amount: '$590k', col: 3 },
  { id: 'brooks', name: 'Brooks', loan: 'Home loan', amount: '$380k', col: 4 },
]

const DRAFTS = [
  { id: 'a', to: 'Patel', what: 'A reminder for the last document, the council rates notice', at: 2, done: 3, wait: 'Waiting on Mia', then: 'Approved by Mia, sent' },
  { id: 'b', to: 'Rossi', what: 'An update: the valuation is booked for Thursday', at: 5, done: 6, wait: 'Waiting on Ben', then: 'Approved by Ben, sent' },
]
const TOTAL = 7

const LABEL = { done: '#0E8F53', waiting: '#9A6300' }

function Lamp({ s }) {
  return (
    <span
      aria-hidden
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ background: STATE[s], boxShadow: s === 'done' ? `0 0 0 3px ${STATE.done}2e` : 'none' }}
    />
  )
}

// Where each file is at step n.
function filesAt(n) {
  return FILES.map((f) => {
    if (f.id === 'patel') {
      const have = n >= 4 ? 6 : n >= 1 ? 5 : 4
      return { ...f, docs: [have, 6], col: n >= 4 ? 1 : 0 }
    }
    if (f.id === 'chen' && n >= 7) return { ...f, col: 4 }
    return f
  })
}

function cardState(f) {
  if (f.col === 0) return ['waiting', 'Waiting on the client']
  if (f.col === 1) return ['done', 'All documents in']
  if (f.col === 2) return [null, `With ${f.owner}`]
  if (f.col === 3) return [null, 'With the lender']
  return ['done', 'Approved by the lender']
}

function Card({ f }) {
  const [s, label] = cardState(f)
  return (
    <motion.div
      layoutId={f.id}
      layout
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-md border border-[#111]/10 bg-white px-3 py-2.5"
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[13.5px] font-semibold">{f.name}</span>
        <span className="text-[12px] text-[#555] tabular-nums">{f.amount}</span>
      </div>
      <p className="text-[12px] text-[#777]">{f.loan}</p>
      {f.docs && (
        <div className="mt-2">
          <div className="h-[3px] rounded-full bg-[#111]/8 overflow-hidden">
            <div className="h-full bg-[#111] transition-[width] duration-500" style={{ width: `${(f.docs[0] / f.docs[1]) * 100}%` }} />
          </div>
          <p className="mt-1 text-[11.5px] text-[#666] tabular-nums">{f.docs[0]} of {f.docs[1]} documents</p>
        </div>
      )}
      <p className="mt-1.5 flex items-center gap-1.5 text-[11.5px] leading-[1.3]" style={{ color: s ? LABEL[s] : '#666' }}>
        {s && <Lamp s={s} />}
        {label}
      </p>
    </motion.div>
  )
}

// still: render the finished morning at once (see EngineDashboard).
export default function HubPipeline({ still = false }) {
  const ref = useRef(null)
  const run = useSteps(useInView(ref, 0.25), TOTAL)
  const n = still ? TOTAL : run
  const files = filesAt(n)
  const drafts = DRAFTS.filter((d) => n >= d.at).map((d) => ({ ...d, s: n < d.done ? 'waiting' : 'done' }))
  const waitingClients = files.filter((f) => f.col === 0).length
  const draftsWaiting = drafts.filter((d) => d.s === 'waiting').length

  return (
    <div
      ref={ref}
      role="group"
      aria-label="An operations hub's client files at an example brokerage"
      className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden"
    >
      <div className="flex flex-wrap gap-3 items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono">
        <span>Client files &middot; an example brokerage</span>
        <span className="flex items-center gap-5 tabular-nums text-[#555]">
          <span>{files.length} open</span>
          <span className="flex items-center gap-2"><Lamp s="waiting" /> waiting on a client <b className="text-[#111]">{waitingClients}</b></span>
          <span className="flex items-center gap-2"><Lamp s="waiting" /> drafts to approve <b className="text-[#111]">{draftsWaiting}</b></span>
        </span>
      </div>

      <div className="overflow-x-auto">
        <LayoutGroup>
          <div className="grid grid-cols-5 gap-2.5 p-4 min-w-[900px]">
            {COLS.map((c, i) => {
              const inCol = files.filter((f) => f.col === i)
              return (
                <div key={c} className="rounded-lg bg-[#F5F5F2] p-2 min-h-[300px]">
                  <div className="flex items-baseline justify-between px-1 pt-0.5 pb-2">
                    <span className="text-[12.5px] font-medium">{c}</span>
                    <span className="text-[12px] text-[#888] tabular-nums">{inCol.length}</span>
                  </div>
                  <div className="grid gap-2">
                    {inCol.map((f) => <Card key={f.id} f={f} />)}
                  </div>
                </div>
              )
            })}
          </div>
        </LayoutGroup>
      </div>

      <div className="border-t border-[#111]/10 px-5 py-3.5">
        <p className="text-[13px] font-medium">Emails drafted for approval</p>
        <div className="mt-1 min-h-[96px]">
          <AnimatePresence initial={false}>
            {drafts.map((d) => (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-[minmax(0,1fr)_200px] gap-x-4 gap-y-1 items-center py-2.5 border-b border-[#111]/8 last:border-0 text-[13.5px]"
              >
                <span><span className="font-medium">To {d.to}:</span> <span className="text-[#333]">{d.what}</span></span>
                <span className="flex items-center gap-2 text-[12px]" style={{ color: LABEL[d.s] }}>
                  <Lamp s={d.s} />
                  {d.s === 'waiting' ? d.wait : d.then}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

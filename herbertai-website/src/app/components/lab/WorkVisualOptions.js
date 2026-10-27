'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { STATE, useBoard, useInView } from '../runs/board'

// Design pass, The work, option C (Will, 13 Oct 2026: "C - i think we need to
// have a different visual"): one system large, the rest listed beside it.
// Three options for the large visual. 1 the accountant demo itself, playing in
// place (it is on this site, so it can be framed). 2 the property dashboard's
// requests table as a still, without the mock-mode warning it shows today.
// 3 the property office drawn as a board in the site's own style, clicking
// through to the real dashboard. Spacing is the tighter one Will picked for
// How it works. Goes with the lab when the pass ends.

const DASH = 'https://demo.herbert-aisolutions.com'

const ITEMS = {
  dash: { tag: 'Live, click in', title: 'A property manager’s dashboard', href: DASH, external: true, verb: 'Open it' },
  demo: { tag: 'Demo, plays itself', title: 'An accountant’s document chaser', href: '/demo/accountants', external: false, verb: 'See it run' },
  hub: { tag: 'Currently building', title: 'An operations hub for a finance brokerage', href: '/work', external: false, verb: 'Read about it' },
  engine: { tag: 'Built', title: 'A marketing engine', href: '/work', external: false, verb: 'Read about it' },
}

function Go({ s, children, className = '' }) {
  return s.external ? (
    <a href={s.href} target="_blank" rel="noreferrer" className={className}>{children}</a>
  ) : (
    <Link href={s.href} className={className}>{children}</Link>
  )
}

function Lamp({ s }) {
  return (
    <span
      aria-hidden
      className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
      style={{ background: STATE[s], boxShadow: s === 'done' ? `0 0 0 3px ${STATE.done}2e` : 'none' }}
    />
  )
}

function Frame({ bar, children }) {
  return (
    <div className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden group-hover:border-[#111]/30 transition-colors">
      <div className="px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono text-[#555] truncate">{bar}</div>
      {children}
    </div>
  )
}

/* ─── the three large visuals ───────────────────────────────── */

// 1: the demo page in a frame, scrolled to its software card. Same origin, so
// the frame can be scrolled from here; it plays on its own as it loads.
function DemoFrame() {
  const ref = useRef(null)
  // The frame can finish loading before this page hydrates, so the scroll is
  // tried on mount as well as on load, and again while the demo renders.
  useEffect(() => {
    const f = ref.current
    if (!f) return
    let tries = 0
    const go = () => {
      try {
        const card = f.contentDocument.querySelector('[aria-label="Demo of the software"]')
        if (card) { f.contentWindow.scrollTo(0, card.getBoundingClientRect().top + f.contentWindow.scrollY - 12); return true }
      } catch {}
      return false
    }
    const t = setInterval(() => { if (go() || ++tries > 40) clearInterval(t) }, 150)
    f.addEventListener('load', go)
    return () => { clearInterval(t); f.removeEventListener('load', go) }
  }, [])
  return (
    <Frame bar="Demo · an example accounting firm · plays itself">
      <iframe
        ref={ref}
        src="/demo/accountants"
        title="The accountant demo, playing"
        className="block w-full h-[520px] border-0 pointer-events-none bg-[#F7F7F8]"
        scrolling="no"
        tabIndex={-1}
      />
    </Frame>
  )
}

function DashStill() {
  return (
    <Frame bar="demo.herbert-aisolutions.com · live, example data">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/lab/dashboard-requests.png" alt="The property dashboard's maintenance requests" className="w-full aspect-[1200/760] object-cover object-top" />
    </Frame>
  )
}

const PROPERTY = [
  { t: '07:48', what: 'Plumbing request logged, 14 Osmond Terrace, Unit 5', s: 'done' },
  { t: '07:49', what: 'Tenant told a plumber is being arranged', s: 'done' },
  { t: '07:55', what: 'Landlord approval requested, $380 quote', s: 'waiting', wait: 'Waiting on the landlord', then: 'Approved, plumber booked for Tuesday' },
  { t: '08:20', what: 'Emergency logged, 8 Sturt Street: ceiling crack', s: 'waiting', wait: 'Waiting on Sarah', then: 'Approved, builder on site by 11' },
  { t: '08:31', what: 'Electrical request sorted by urgency: normal', s: 'done' },
]

function PropertyBoard() {
  const ref = useRef(null)
  const b = useBoard(useInView(ref), 1200, PROPERTY)
  return (
    <div ref={ref}>
      <div className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden group-hover:border-[#111]/30 transition-colors">
        <div className="flex flex-wrap gap-3 items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono">
          <span>Maintenance · an example property office</span>
          <span className="flex items-center gap-5 tabular-nums">
            <span className="flex items-center gap-2"><Lamp s="done" /> done <b>{b.done}</b></span>
            <span className="flex items-center gap-2"><Lamp s="waiting" /> waiting on a person <b>{b.waiting}</b></span>
          </span>
        </div>
        <div className="min-h-[300px] px-2 py-2">
          <AnimatePresence initial={false}>
            {b.shown.map((r) => (
              <motion.div
                key={r.t}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-[48px_1fr] md:grid-cols-[52px_minmax(0,1fr)_200px] items-center gap-x-3 gap-y-1 px-3 py-3 border-b border-[#111]/8 last:border-0 text-[15px]"
              >
                <span className="text-[12px] text-[#777] tabular-nums font-mono">{r.t}</span>
                <span className="leading-[1.35] text-[#333]">{r.what}</span>
                <span
                  className="col-start-2 md:col-start-auto flex items-center gap-2 text-[12px] leading-[1.3]"
                  style={{ color: r.state === 'done' ? '#0E8F53' : '#9A6300' }}
                >
                  <Lamp s={r.state} />
                  {r.state === 'waiting' ? r.wait : r.then || 'Done'}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ─── option C's layout, with the large visual swapped ─────── */

function SectionC({ big, Visual, rest }) {
  const s = ITEMS[big]
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
        <div className="mb-12">
          <p className="text-[15px] font-medium text-[#555] mb-4">The work</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            The systems, not the slides.
          </h2>
        </div>
        <div className="grid lg:grid-cols-[1.28fr_0.72fr] gap-x-12 gap-y-10 items-start">
          <Go s={s} className="group block">
            <Visual />
            <p className="mt-5 text-[15px] font-medium text-[#777]">{s.tag}</p>
            <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{s.title}</p>
            <p className="mt-2 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 group-hover:decoration-[#111] transition-colors inline-block">
              {s.verb} <span aria-hidden>&rarr;</span>
            </p>
          </Go>
          <div className="border-b border-[#111]/15">
            {rest.map((k) => {
              const r = ITEMS[k]
              return (
                <Go key={k} s={r} className="group block py-5 border-t border-[#111]/15">
                  <span className="block text-[15px] font-medium text-[#777]">{r.tag}</span>
                  <span className="block mt-1 text-[20px] font-semibold tracking-[-0.02em]">{r.title}</span>
                  <span className="inline-block mt-2 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 group-hover:decoration-[#111] transition-colors">
                    {r.verb} <span aria-hidden>&rarr;</span>
                  </span>
                </Go>
              )
            })}
          </div>
        </div>
        <div className="mt-12">
          <Link href="/work" className="text-[15px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111] transition-colors">
            All the systems
          </Link>
        </div>
      </div>
    </section>
  )
}

export function Visual1() {
  return <SectionC big="demo" Visual={DemoFrame} rest={['dash', 'hub', 'engine']} />
}
export function Visual2() {
  return <SectionC big="dash" Visual={DashStill} rest={['demo', 'hub', 'engine']} />
}
export function Visual3() {
  return <SectionC big="dash" Visual={PropertyBoard} rest={['demo', 'hub', 'engine']} />
}

const OPTIONS = [
  ['a', '1. The accountant demo, playing', 'The demo itself in a frame, running its tax season; clicking opens the full demo. The dashboard moves into the list.', Visual1],
  ['b', '2. The dashboard, cleaned up', 'The property dashboard’s requests table as a still, without the developer warning it shows today. Clicking opens the real dashboard.', Visual2],
  ['c', '3. The property office as a board', 'The property office’s morning drawn in the site’s own board style, jobs finishing; clicking opens the real dashboard.', Visual3],
]

export default function WorkVisualOptions() {
  const [runs, setRuns] = useState({ a: 0, b: 0, c: 0 })
  return (
    <main className="bg-[#FAFAF8] pb-16">
      {OPTIONS.map(([id, name, note, Opt]) => (
        <div key={id} data-opt={id}>
          <div className="sticky top-0 z-10 bg-[#111] text-white px-6 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
            <b className="text-[15px]">{name}</b>
            <span className="opacity-70">{note}</span>
            <button
              type="button"
              onClick={() => setRuns((r) => ({ ...r, [id]: r[id] + 1 }))}
              className="ml-auto rounded-[8px] border border-white/30 px-3 py-1 hover:bg-white/10"
            >
              Run again
            </button>
          </div>
          <div key={runs[id]}><Opt /></div>
        </div>
      ))}
    </main>
  )
}

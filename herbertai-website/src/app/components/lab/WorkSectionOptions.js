'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import EngineDashboard from '../runs/EngineDashboard'
import HubPipeline from '../runs/HubPipeline'

// Design pass, The Work done properly (13 Oct 2026, Will: "lets do the work
// section next properly"). Option C was picked before the foundations round;
// since then each system has its own visual (the engine's dashboard, the hub's
// pipeline, the accountant demo, the live property dashboard) and motion may
// show the system working. The section sits after the AI employees scene, so
// every option is calm until the visitor interacts: a system plays when it is
// picked or hovered, never on its own. Three layouts: A option C with the list
// as switches, B four screens at once, C tabs over a full-width stage. The
// brokerage hub's visual is held off the live site until the client clears it;
// on production its slot shows words only. Goes with the lab.

const DASH = 'https://dashboard.herbert-aisolutions.com'
const W = 1184 // the width every visual is drawn at, then scaled to its slot
const H = 720

const SYSTEMS = [
  { id: 'dash', tag: 'Live, click in', title: 'A property manager’s dashboard', href: DASH, external: true, verb: 'Open it', bar: 'dashboard.herbert-aisolutions.com · live, example data' },
  { id: 'demo', tag: 'Demo, plays itself', title: 'An accountant’s document chaser', href: '/demo/accountants', verb: 'See it run', bar: 'Demo · an example accounting firm' },
  { id: 'hub', tag: 'Currently building', title: 'An operations hub for a finance brokerage', href: '/work/operations-hub', verb: 'See an example' },
  { id: 'engine', tag: 'Built', title: 'A marketing engine', href: '/work/marketing-engine', verb: 'See an example' },
]

function Go({ s, className = '', children }) {
  return s.external ? (
    <a href={s.href} target="_blank" rel="noreferrer" className={className}>{children}</a>
  ) : (
    <Link href={s.href} className={className}>{children}</Link>
  )
}

// Draws a visual at W px wide and scales it to fill its slot's width.
function Scaled({ children }) {
  const ref = useRef(null)
  const [k, setK] = useState(0.6)
  useEffect(() => {
    const el = ref.current
    const ro = new ResizeObserver(() => setK(el.clientWidth / W))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }}>
      <div className="absolute top-0 left-0" style={{ width: W, transform: `scale(${k})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}

function Frame({ bar, children }) {
  return (
    <div className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono text-[#555] truncate">{bar}</div>
      {children}
    </div>
  )
}

function DemoFrame() {
  const ref = useRef(null)
  useEffect(() => {
    const f = ref.current
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
      <iframe ref={ref} src="/demo/accountants" title="The accountant demo" className="block w-full h-[660px] border-0 pointer-events-none bg-[#F7F7F8]" scrolling="no" tabIndex={-1} />
    </Frame>
  )
}

// The system's visual at full drawing size. `play` false shows the finished
// state; true plays it from the start.
function Visual({ id, play, showHub }) {
  if (id === 'dash') {
    return (
      <Frame bar="dashboard.herbert-aisolutions.com · live, example data">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work/property-dashboard-requests.png" alt="The property dashboard's maintenance requests" className="w-full aspect-[1200/640] object-cover object-top" />
      </Frame>
    )
  }
  if (id === 'demo') return <DemoFrame />
  if (id === 'engine') return <EngineDashboard still={!play} />
  if (!showHub) {
    return (
      <div className="rounded-xl border border-[#111]/12 bg-white p-10" style={{ height: H - 40 }}>
        <p className="text-[15px] text-[#777]">Currently building</p>
        <p className="mt-2 text-[34px] font-semibold tracking-[-0.02em] max-w-[22ch]">An operations hub for a finance brokerage</p>
        <p className="mt-4 text-[20px] text-[#444] max-w-[44ch]">Every client file on one board, documents chased on their own, and every client email approved by a person before it goes. An example with made-up data is on its way.</p>
      </div>
    )
  }
  return <HubPipeline still={!play} />
}

function Head() {
  return (
    <div className="mb-12">
      <p className="text-[15px] font-medium text-[#555] mb-4">The Work</p>
      <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
        The systems, not the slides.
      </h2>
    </div>
  )
}

function AllLink({ className = '' }) {
  return (
    <Link href="/work" className={`text-[15px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111] transition-colors ${className}`}>
      All the systems
    </Link>
  )
}

function Section({ children }) {
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">{children}</div>
    </section>
  )
}

/* ─── A: option C with the list as switches ─────────────────── */

export function OptionA({ showHub = true }) {
  const [active, setActive] = useState('dash')
  const [plays, setPlays] = useState(0)
  const s = SYSTEMS.find((x) => x.id === active)
  return (
    <Section>
      <Head />
      <div className="grid lg:grid-cols-[1.28fr_0.72fr] gap-x-12 gap-y-10 items-start">
        <div>
          <Scaled><div key={`${active}-${plays}`}><Visual id={active} play={plays > 0} showHub={showHub} /></div></Scaled>
          <div className="mt-5 flex items-baseline justify-between gap-6">
            <div>
              <p className="text-[15px] font-medium text-[#777]">{s.tag}</p>
              <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{s.title}</p>
            </div>
            <Go s={s} className="shrink-0 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
              {s.verb} <span aria-hidden>&rarr;</span>
            </Go>
          </div>
        </div>
        <div>
          <div role="tablist" aria-label="The systems" className="border-b border-[#111]/15">
            {SYSTEMS.map((x) => {
              const on = x.id === active
              return (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => { setActive(x.id); setPlays((p) => p + 1) }}
                  className={`w-full text-left py-5 pl-4 border-t border-[#111]/15 border-l-2 transition-colors ${on ? 'border-l-[#111] bg-white' : 'border-l-transparent hover:bg-white/60'}`}
                >
                  <span className="block text-[15px] font-medium text-[#777]">{x.tag}</span>
                  <span className={`block mt-1 text-[20px] font-semibold tracking-[-0.02em] ${on ? '' : 'text-[#111]/70'}`}>{x.title}</span>
                </button>
              )
            })}
          </div>
          <AllLink className="inline-block mt-6" />
        </div>
      </div>
    </Section>
  )
}

/* ─── B: four screens at once ───────────────────────────────── */

function Tile({ s, showHub }) {
  const [plays, setPlays] = useState(0)
  return (
    <div onMouseEnter={() => setPlays((p) => p + 1)}>
      <Go s={s} className="group block">
        <Scaled><div key={plays}><Visual id={s.id} play={plays > 0} showHub={showHub} /></div></Scaled>
        <p className="mt-4 text-[14px] font-medium text-[#777]">{s.tag}</p>
        <p className="mt-0.5 text-[19px] font-semibold tracking-[-0.02em]">{s.title}</p>
        <p className="mt-1.5 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 group-hover:decoration-[#111] inline-block">
          {s.verb} <span aria-hidden>&rarr;</span>
        </p>
      </Go>
    </div>
  )
}

export function OptionB({ showHub = true }) {
  return (
    <Section>
      <Head />
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
        {SYSTEMS.map((s) => <Tile key={s.id} s={s} showHub={showHub} />)}
      </div>
      <AllLink className="inline-block mt-12" />
    </Section>
  )
}

/* ─── C: tabs over a full-width stage ───────────────────────── */

export function OptionC({ showHub = true }) {
  const [active, setActive] = useState('dash')
  const [plays, setPlays] = useState(0)
  const s = SYSTEMS.find((x) => x.id === active)
  return (
    <Section>
      <Head />
      <div role="tablist" aria-label="The systems" className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {SYSTEMS.map((x) => {
          const on = x.id === active
          return (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => { setActive(x.id); setPlays((p) => p + 1) }}
              className={`text-left rounded-lg border px-4 py-3 transition-colors ${on ? 'border-[#111] bg-white' : 'border-[#111]/12 hover:border-[#111]/30'}`}
            >
              <span className="block text-[13px] font-medium text-[#777]">{x.tag}</span>
              <span className="block mt-0.5 text-[15px] font-semibold tracking-[-0.01em] leading-snug">{x.title}</span>
            </button>
          )
        })}
      </div>
      <Scaled><div key={`${active}-${plays}`}><Visual id={active} play={plays > 0} showHub={showHub} /></div></Scaled>
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4">
        <Go s={s} className="text-[15px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
          {s.verb} <span aria-hidden>&rarr;</span>
        </Go>
        <AllLink />
      </div>
    </Section>
  )
}

const OPTIONS = [
  ['a', 'A. Option C, with the list as switches', 'Your pick kept: one screen large, the four beside it. Clicking a system on the right swaps the screen and plays it once.', OptionA],
  ['b', 'B. Four screens at once', 'Every system’s screen in a 2 by 2 grid; hovering one plays it.', OptionB],
  ['c', 'C. Tabs over a full-width stage', 'Four tabs across the top and one wide screen under them; clicking a tab swaps and plays it.', OptionC],
]

export default function WorkSectionOptions() {
  return (
    <main className="bg-[#FAFAF8] pb-16">
      {OPTIONS.map(([id, name, note, Opt]) => (
        <div key={id} data-opt={id}>
          <div className="sticky top-0 z-10 bg-[#111] text-white px-6 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
            <b className="text-[15px]">{name}</b>
            <span className="opacity-70">{note}</span>
          </div>
          <Opt />
        </div>
      ))}
    </main>
  )
}

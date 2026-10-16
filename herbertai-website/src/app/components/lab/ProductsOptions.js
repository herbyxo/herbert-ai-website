'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import EngineDashboard from '../runs/EngineDashboard'

// Design pass, homepage section 5, Products (16 Oct 2026). Herbert AI is the
// company and its own software carries its own name, the way Wispr AI carries
// Wispr Flow (Will, 14 Oct 2026). First the marketing engine under the
// placeholder name "Herbert Reach" (not final), shown as early access, not a
// paywall, until it has numbers from running Herbert AI's own ads
// (code/marketing-engine/PROJECT.md, open decisions). Three ways: 1 its own
// band, the one dark section on the page, so the product reads as its own
// brand; 2 screen and words in the site's layout A; 3 the shelf, the engine
// beside the operating systems that become products later. The dashboard is
// the one built for The Work on 13 Oct. Copy reuses the engine page's approved
// lines; no results claimed. Goes with the lab.

const W = 1184
const H = 740
const NAME = 'Herbert Reach'
const LINE = 'Ads that run themselves against real results: written, tested and paused by the system, with anything new held for you to approve.'
const FACTS = ['Google ads written, tested and paused against results', 'A landing page for every ad group', 'A daily audit that flags what is wasting money']
const EARLY = 'Early access. It runs Herbert AI’s own ads first, and opens up once it has the numbers to show for it.'
const HREF = '/work/marketing-engine'

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
    <div ref={ref} className="relative w-full overflow-hidden rounded-xl text-[#111]" style={{ aspectRatio: `${W} / ${H}` }}>
      <div className="absolute top-0 left-0" style={{ width: W, transform: `scale(${k})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}

function Facts({ dark = false }) {
  return (
    <ul className={`mt-6 border-b ${dark ? 'border-white/15' : 'border-[#111]/12'}`}>
      {FACTS.map((f) => (
        <li key={f} className={`py-3 border-t text-[15px] ${dark ? 'border-white/15 text-white/80' : 'border-[#111]/12 text-[#333]'}`}>{f}</li>
      ))}
    </ul>
  )
}

function Go({ dark = false, children = `See ${NAME}` }) {
  return (
    <Link href={HREF} className={`text-[15px] font-medium underline underline-offset-4 ${dark ? 'decoration-white/40 hover:decoration-white' : 'decoration-[#111]/30 hover:decoration-[#111]'}`}>
      {children} <span aria-hidden>&rarr;</span>
    </Link>
  )
}

/* ─── 1: its own band ──────────────────────────────────────── */

function Band() {
  return (
    <section className="bg-[#111] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 pb-20 grid lg:grid-cols-[0.72fr_1.28fr] gap-x-12 gap-y-10 items-center">
        <div>
          <p className="text-[15px] font-medium text-white/60 mb-4">Products</p>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/50">by Herbert AI</p>
          <h2 className="mt-2 font-bold tracking-[-0.04em] leading-[0.95]" style={{ fontSize: 'clamp(40px, 4.4vw, 64px)' }}>{NAME}</h2>
          <p className="mt-5 text-[17px] leading-[1.5] text-white/75 max-w-[40ch]">{LINE}</p>
          <Facts dark />
          <p className="mt-5 flex items-start gap-2.5 text-[13.5px] leading-[1.45] text-white/60">
            <span className="mt-[2px] shrink-0 rounded-full border border-white/30 px-2 py-[1px] font-mono text-[10px] uppercase tracking-[0.12em] text-white/80">Early access</span>
            <span>It runs Herbert AI’s own ads first, and opens up once it has the numbers to show for it.</span>
          </p>
          <div className="mt-6"><Go dark /></div>
        </div>
        <Scaled><EngineDashboard /></Scaled>
      </div>
    </section>
  )
}

/* ─── 2: screen and words (the site's layout A) ────────────── */

function ScreenWords() {
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 pb-20">
        <div className="mb-10">
          <p className="text-[15px] font-medium text-[#555] mb-4">Products</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[20ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            Software we build once, and run ourselves first.
          </h2>
        </div>
        <div className="grid lg:grid-cols-[1.28fr_0.72fr] gap-x-12 gap-y-10 items-start">
          <Scaled><EngineDashboard /></Scaled>
          <div>
            <p className="text-[15px] font-medium text-[#777]">Marketing</p>
            <p className="mt-1 text-[28px] font-semibold tracking-[-0.02em]">{NAME}</p>
            <p className="mt-3 text-[16px] leading-[1.5] text-[#444]">{LINE}</p>
            <Facts />
            <p className="mt-5 text-[13.5px] leading-[1.45] text-[#777]">{EARLY}</p>
            <div className="mt-6"><Go /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── 3: the shelf ─────────────────────────────────────────── */

function Shelf() {
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 pb-20">
        <div className="mb-10">
          <p className="text-[15px] font-medium text-[#555] mb-4">Products</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[20ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            Built once, then used by many.
          </h2>
        </div>
        <div className="grid lg:grid-cols-[1.45fr_0.55fr] gap-5 items-stretch">
          <div className="rounded-2xl border border-[#111]/12 bg-white p-6 grid grid-cols-[1.25fr_0.75fr] gap-6 items-center">
            <Scaled><EngineDashboard /></Scaled>
            <div>
              <span className="rounded-full border border-[#111]/20 px-2 py-[1px] font-mono text-[10px] uppercase tracking-[0.12em] text-[#555]">Early access</span>
              <p className="mt-3 text-[26px] font-semibold tracking-[-0.02em] leading-tight">{NAME}</p>
              <p className="mt-2 text-[15px] leading-[1.5] text-[#444]">{LINE}</p>
              <p className="mt-3 text-[13px] leading-[1.45] text-[#777]">It runs Herbert AI’s own ads first.</p>
              <div className="mt-5"><Go /></div>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-[#111]/20 p-6 flex flex-col">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#777]">Next</p>
            <p className="mt-3 text-[20px] font-semibold tracking-[-0.02em] leading-tight">The operating systems, as products</p>
            <p className="mt-2 text-[14px] leading-[1.5] text-[#666]">Each one becomes a product once it has run in three to five businesses in its industry.</p>
            <ul className="mt-5 border-b border-[#111]/10">
              {['Property', 'Trades', 'Hospitality', 'Health', 'Finance'].map((x) => (
                <li key={x} className="py-2.5 border-t border-[#111]/10 text-[15px] text-[#111]/45">{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

const OPTIONS = [
  ['1', '1. Its own band', 'The one dark section on the page, the product name as the heading, so it reads as its own brand under Herbert AI.', Band],
  ['2', '2. Screen and words', 'The site’s layout A: the dashboard big on the left, the product on the right, a heading about software built once and run first.', ScreenWords],
  ['3', '3. The shelf', 'The engine as the one product on the shelf, beside a dashed card for the operating systems that become products later.', Shelf],
]

export default function ProductsOptions() {
  const [runs, setRuns] = useState({ 1: 0, 2: 0, 3: 0 })
  return (
    <main className="bg-[#FAFAF8] pb-16">
      {OPTIONS.map(([id, name, note, Section]) => (
        <div key={id} data-opt={id}>
          <div className="sticky top-0 z-10 bg-[#333] text-white px-6 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
            <b className="text-[15px]">{name}</b>
            <span className="opacity-70">{note}</span>
            <button type="button" onClick={() => setRuns((r) => ({ ...r, [id]: r[id] + 1 }))} className="ml-auto rounded-[8px] border border-white/30 px-3 py-1 hover:bg-white/10">
              Run again
            </button>
          </div>
          <div key={runs[id]}><Section /></div>
        </div>
      ))}
    </main>
  )
}

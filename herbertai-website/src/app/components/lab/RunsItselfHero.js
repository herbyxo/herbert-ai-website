'use client'
import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SANS, MONO } from './content'
import { STATE, useBoard, useInView, useFlap } from './board'

// Hero round for the "Runs itself" concept, 22 Sep 2026. Three options, each
// also settling one open whole-site decision: typeface, ground and the
// board's form. Each board takes its form from an object outside the category.

const DISPLAY = 'var(--font-bricolage), -apple-system, sans-serif'

function Label({ letter, name, note }) {
  return (
    <div className="bg-[#1b1b1b] text-white px-6 py-3 flex flex-wrap items-baseline gap-x-4 gap-y-1" style={{ fontFamily: SANS }}>
      <b className="text-[15px]">{letter}. {name}</b>
      <span className="text-[13px] text-white/60">{note}</span>
    </div>
  )
}

function Lamp({ s, size = 10, glow }) {
  return <span className="inline-block rounded-full shrink-0" style={{ width: size, height: size, background: STATE[s], boxShadow: glow ? `0 0 ${size}px ${size / 2}px ${STATE[s]}66` : s === 'done' ? `0 0 0 3px ${STATE.done}2e` : 'none' }} />
}

function Nav({ dark }) {
  return (
    <div className={`mx-auto max-w-[1240px] px-6 py-5 flex items-center justify-between ${dark ? 'text-[#EDEBE6]' : ''}`}>
      <div className="font-semibold text-[18px] tracking-[-0.02em]">Herbert AI</div>
      <div className="hidden md:flex gap-8 text-[14px] opacity-85"><span>How it works</span><span>Industries</span><span>The systems</span><span>Pricing</span><span>About</span></div>
      <span className={`rounded-full px-5 py-2.5 text-[14px] font-medium ${dark ? 'bg-[#EDEBE6] text-[#0E0F10]' : 'bg-[#111] text-white'}`}>Book a free AI audit</span>
    </div>
  )
}

const SUB = 'Custom software and AI for small businesses, built in Adelaide.'

// A. The product window
function OptionA() {
  const ref = useRef(null)
  const b = useBoard(useInView(ref))
  return (
    <section ref={ref} className="bg-[#FAFAF8] text-[#111] pb-24" style={{ fontFamily: SANS }}>
      <Nav />
      <div className="mx-auto max-w-[1240px] px-6 pt-12 md:pt-20 grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-end">
        <div>
          <h1 className="font-bold tracking-[-0.045em] leading-[0.95]" style={{ fontSize: 'clamp(52px, 6.6vw, 96px)' }}>Less admin.<br />More money.<br />Built to run itself.</h1>
          <p className="mt-7 text-[19px] leading-[1.45] max-w-[38ch] text-[#333]">{SUB}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <span className="bg-[#111] text-white rounded-full px-6 py-3.5 text-[16px] font-medium">Book a free AI audit</span>
            <span className="text-[15px] text-[#555]">45 minutes, a written page back</span>
          </div>
        </div>
        <div className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden">
          <div className="flex flex-wrap gap-3 items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px]" style={{ fontFamily: MONO }}>
            <span>Today &middot; an example office</span>
            <span className="flex items-center gap-5 tabular-nums">
              <span className="flex items-center gap-2"><Lamp s="done" /> done <b>{b.done}</b></span>
              <span className="flex items-center gap-2"><Lamp s="waiting" /> waiting <b>{b.waiting}</b></span>
            </span>
          </div>
          <div className="min-h-[392px] px-2 py-2">
            <AnimatePresence initial={false}>
              {b.shown.map((r) => (
                <motion.div key={r.t} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="grid grid-cols-[48px_1fr] md:grid-cols-[52px_168px_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 px-3 py-3 border-b border-[#111]/8 last:border-0 text-[14px]">
                  <span className="text-[12px] text-[#777] tabular-nums" style={{ fontFamily: MONO }}>{r.t}</span>
                  <span className="font-medium">{r.who}</span>
                  <span className="col-start-2 md:col-start-auto leading-[1.35] text-[#333]">{r.what}</span>
                  <span className="col-start-2 md:col-start-auto flex items-center gap-2 text-[12px] leading-[1.3] md:max-w-[150px]" style={{ color: r.state === 'done' ? '#0E8F53' : '#9A6300' }}>
                    <Lamp s={r.state} />{r.state === 'waiting' ? r.wait : r.then || 'Done'}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {b.queued > 0 && <div className="flex items-center gap-2 px-3 py-3 text-[13px] text-[#aaa]"><Lamp s="queued" /> {b.queued} jobs queued</div>}
          </div>
        </div>
      </div>
    </section>
  )
}

// B. The departures board
function Cells({ text, width, color }) {
  const padded = (text || '').padEnd(width, ' ').slice(0, width)
  return (
    <span className="inline-flex gap-[2px]" style={{ color }}>
      {padded.split('').map((c, i) => (
        <span key={i} className="relative inline-grid place-items-center w-[1.02em] h-[1.55em] rounded-[2px] bg-[#232323] text-center">
          <span className="relative z-10 leading-none">{c === ' ' ? ' ' : c}</span>
          <span className="absolute inset-x-0 top-1/2 h-px bg-black/70" />
        </span>
      ))}
    </span>
  )
}

const CELL = '(1.02em + 2px)'
const COLS = { gridTemplateColumns: `calc(5 * ${CELL}) calc(15 * ${CELL}) calc(25 * ${CELL}) calc(18 * ${CELL})`, columnGap: '1rem' }

function FlapCells({ text, width, color }) {
  const flapped = useFlap(text)
  return <Cells text={flapped} width={width} color={color} />
}

function OptionB() {
  const ref = useRef(null)
  const b = useBoard(useInView(ref), 1500)
  const EMPTY = Array.from({ length: 7 - b.shown.length })
  return (
    <section ref={ref} className="bg-[#F2F0EA] text-[#111] pb-24" style={{ fontFamily: SANS }}>
      <Nav />
      <div className="mx-auto max-w-[1240px] px-6 pt-12 md:pt-16">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-end">
          <h1 className="font-bold tracking-[-0.045em] leading-[0.95]" style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}>Less admin.<br />More money.<br />Built to run itself.</h1>
          <div className="pb-2">
            <p className="text-[19px] leading-[1.45] max-w-[34ch] text-[#333]">{SUB}</p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <span className="bg-[#111] text-white rounded-full px-6 py-3.5 text-[16px] font-medium">Book a free AI audit</span>
              <span className="text-[15px] text-[#555]">45 minutes</span>
            </div>
          </div>
        </div>
        <div className="mt-12 rounded-md bg-[#141414] p-4 md:p-6 shadow-[0_30px_70px_-35px_rgba(0,0,0,.6)] overflow-x-auto">
          <div className="min-w-[1080px] text-[#F3F1EA] text-[14px] uppercase" style={{ fontFamily: MONO }}>
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-[12px] tracking-[0.2em] text-white/60">
              <span>Today &middot; an example office</span>
              <span className="flex items-center gap-5 tabular-nums normal-case tracking-normal text-[13px]">
                <span className="flex items-center gap-2"><Lamp s="done" /> done {b.done}</span>
                <span className="flex items-center gap-2"><Lamp s="waiting" /> waiting {b.waiting}</span>
                <span className="flex items-center gap-2"><Lamp s="queued" /> queued {b.queued}</span>
              </span>
            </div>
            <div className="grid pb-2 text-white/45" style={COLS}>
              {['Time', 'Employee', 'Job', 'Status'].map((h) => <span key={h} className="text-[11px] tracking-[0.2em]">{h}</span>)}
            </div>
            {b.shown.map((r) => (
              <div key={r.t} className="grid items-center py-1.5" style={COLS}>
                <FlapCells text={r.t} width={5} />
                <span><FlapCells text={r.short} width={15} /></span>
                <span><FlapCells text={r.board} width={25} /></span>
                <FlapCells text={r.state === 'waiting' ? r.waitB : r.thenB || 'DONE'} width={18} color={r.state === 'done' ? '#3DDC97' : '#F5B83D'} />
              </div>
            ))}
            {EMPTY.map((_, i) => (
              <div key={`e${i}`} className="grid items-center py-1.5 opacity-60" style={COLS}>
                <Cells text="" width={5} /><span><Cells text="" width={15} /></span><span><Cells text="" width={25} /></span><Cells text="" width={18} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// C. The andon board
function OptionC() {
  const ref = useRef(null)
  const b = useBoard(useInView(ref), 1300)
  const tiles = [['done', 'Done today', b.done], ['waiting', 'Waiting on a person', b.waiting], ['queued', 'Queued', b.queued]]
  return (
    <section ref={ref} className="bg-[#0E0F10] text-[#EDEBE6] pb-24" style={{ fontFamily: SANS }}>
      <Nav dark />
      <div className="mx-auto max-w-[1240px] px-6 pt-12 md:pt-20 grid md:grid-cols-[1fr_1fr] gap-12 items-center">
        <div>
          <h1 className="tracking-[-0.045em] leading-[0.92]" style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 'clamp(54px, 7vw, 104px)' }}>Less admin.<br />More money.<br />Built to run itself.</h1>
          <p className="mt-7 text-[19px] leading-[1.45] max-w-[36ch] text-[#EDEBE6]/75">{SUB}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <span className="bg-[#EDEBE6] text-[#0E0F10] rounded-full px-6 py-3.5 text-[16px] font-medium">Book a free AI audit</span>
            <span className="text-[15px] text-[#EDEBE6]/55">45 minutes, a written page back</span>
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#EDEBE6]/50 mb-3" style={{ fontFamily: MONO }}>Today &middot; an example office</div>
          <div className="grid grid-cols-3 gap-3">
            {tiles.map(([s, label, count]) => (
              <div key={s} className="rounded-lg border border-white/10 bg-[#16181A] p-4 md:p-5">
                <Lamp s={s} size={18} glow={count > 0} />
                <motion.div key={count} initial={{ opacity: 0.35, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-5 tabular-nums leading-none font-semibold" style={{ fontSize: 'clamp(44px, 5.4vw, 76px)', fontFamily: MONO, color: count > 0 ? STATE[s] : '#4a4d50' }}>{count}</motion.div>
                <div className="mt-3 text-[12.5px] leading-[1.3] text-[#EDEBE6]/70">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-white/10 bg-[#16181A] px-4 py-3.5 min-h-[76px] text-[14px]">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#EDEBE6]/45" style={{ fontFamily: MONO }}>Latest</div>
            <AnimatePresence mode="wait">
              {b.latest && (
                <motion.div key={b.latest.t + b.latest.state} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 flex items-center gap-3">
                  <Lamp s={b.latest.state} />
                  <span className="tabular-nums text-[#EDEBE6]/55" style={{ fontFamily: MONO }}>{b.latest.t}</span>
                  <span><b className="font-medium">{b.latest.who}:</b> {b.latest.state === 'waiting' ? `${b.latest.what}. ${b.latest.wait}.` : b.latest.then || b.latest.what}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function RunsItselfHero() {
  return (
    <main className="pb-12 bg-[#1b1b1b]">
      <Label letter="A" name="The product window" note="Light paper, Geist throughout, the board as a software window. Reference: the software itself." />
      <OptionA />
      <Label letter="B" name="The departures board" note="Light paper, Geist headline, the board in split-flap cells, Geist Mono. Reference: an airport departures board." />
      <OptionB />
      <Label letter="C" name="The andon board" note="Dark ground, Bricolage display kept, three lamps with counts. Reference: a factory floor andon board." />
      <OptionC />
    </main>
  )
}

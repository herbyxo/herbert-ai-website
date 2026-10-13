'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion'

// Motion levels demo (13 Oct 2026). Will: "build the demo" for how far to loosen
// the charter's motion rule, and "job names plus dot avatars - something like
// Steve - Front Desk". The same AI employees roster drawn three ways:
// 1 as the charter is now (motion only when a job finishes), 2 motion shows the
// system working (each card plays its job), 3 one scroll scene (the section
// holds while you scroll and the screen plays each employee's job). The
// avatars are 7x7 dot grids, one glyph per job; their dots light green when a
// job finishes and amber while the employee waits on a person. Names are
// placeholders for Will to approve. Goes with the lab when the pass ends.

const DONE = '#12B76A'
const WAIT = '#F5A623'
const INK = '#111'

const G = (rows) => rows.map((r) => [...r].map((c) => c === 'X'))
const EMPLOYEES = [
  {
    name: 'Steve', job: 'Front Desk', what: 'Answers calls and enquiries, books appointments', where: 'Health · Trades · Hospitality',
    glyph: G(['.XXXXX.', 'X.....X', 'X.X.X.X', 'X.....X', '.XXXXX.', '..X....', '.X.....']),
    feed: [['Call answered, new patient enquiry', 'done'], ['Booked Tuesday 10:30 with the physio', 'done'], ['Reschedule request sent to the clinic', 'wait', 'Approved, client told']],
    count: 37,
  },
  {
    name: 'Penny', job: 'Document Chaser', what: 'Chases the documents a file is missing', where: 'Finance',
    glyph: G(['XXXXX..', 'X...XX.', 'X.....X', 'X.XXX.X', 'X.....X', 'X.XXX.X', 'XXXXXXX']),
    feed: [['Checklists sent to 150 clients', 'done'], ['38 reminders drafted, only what is missing', 'wait', 'Approved, sent'], ['Bank statement matched to the Nguyen file', 'done']],
    count: 212,
  },
  {
    name: 'Max', job: 'Quote Follow-up', what: 'Follows up every quote until it is a yes or a no', where: 'Trades',
    glyph: G(['..XXX..', '.X...X.', 'X.....X', 'X...XXX', 'X....X.', '.X.....', '..XXX..']),
    feed: [['Quote 1042 followed up, second time', 'done'], ['Quote 1038 flagged: worth a call', 'done'], ['Follow-up drafted for a $4,800 install', 'wait', 'Approved, sent']],
    count: 19,
  },
  {
    name: 'Ruby', job: 'Maintenance', what: 'Logs repair requests, gets approval, books the tradie', where: 'Property',
    glyph: G(['...X...', '..X.X..', '.X...X.', 'XXXXXXX', '.X...X.', '.X.X.X.', '.XXXXX.']),
    feed: [['Plumbing request logged, Unit 5', 'done'], ['Landlord approval requested, $380 quote', 'wait', 'Approved, plumber booked'], ['Tenant told the plumber comes Tuesday', 'done']],
    count: 26,
  },
  {
    name: 'Archie', job: 'Invoice Chaser', what: 'Reminds overdue invoices, politely, on schedule', where: 'Finance · Trades',
    glyph: G(['...X...', '.XXXXX.', 'X..X...', '.XXXXX.', '...X..X', '.XXXXX.', '...X...']),
    feed: [['Invoice 2214 reminded, second time', 'done'], ['Invoice 2198 paid, reminder stopped', 'done'], ['Final notice drafted for 2187', 'wait', 'Approved, sent']],
    count: 44,
  },
  {
    name: 'Tess', job: 'Bookings', what: 'Confirms bookings and fills cancellations', where: 'Health · Hospitality',
    glyph: G(['.X...X.', 'XXXXXXX', 'X.....X', 'X.X.X.X', 'X.....X', 'X.X.X.X', 'XXXXXXX']),
    feed: [['Tomorrow’s 46 bookings confirmed', 'done'], ['Cancellation at 2:15, waitlist offered it', 'done'], ['Table for 12 needs a deposit', 'wait', 'Approved, deposit link sent']],
    count: 61,
  },
]

function reduced() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// The avatar. mode: 'still' | 'scan' (dots light one by one, the employee at
// work) | 'done' (the glyph lit green) | 'wait' (lit amber).
function Avatar({ glyph, mode = 'still', size = 52, scanKey = 0 }) {
  const n = glyph.length
  const gap = size / n
  const r = gap * 0.32
  const on = []
  glyph.forEach((row, y) => row.forEach((v, x) => v && on.push([x, y])))
  const colour = mode === 'done' ? DONE : mode === 'wait' ? WAIT : INK
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden className="shrink-0">
      {glyph.map((row, y) =>
        row.map((v, x) => {
          const cx = x * gap + gap / 2
          const cy = y * gap + gap / 2
          if (!v) return <circle key={`${x}-${y}`} cx={cx} cy={cy} r={r * 0.55} fill={INK} opacity={0.1} />
          const i = on.findIndex(([a, b]) => a === x && b === y)
          return (
            <motion.circle
              key={`${x}-${y}-${scanKey}`}
              cx={cx}
              cy={cy}
              r={r}
              initial={mode === 'scan' ? { opacity: 0.15 } : false}
              animate={{ opacity: 1, fill: colour }}
              transition={{ delay: mode === 'scan' ? i * 0.035 : 0, duration: 0.25 }}
              fill={colour}
            />
          )
        }),
      )}
    </svg>
  )
}

function StateLine({ s, then }) {
  const c = s === 'wait' ? '#9A6300' : '#0E8F53'
  return (
    <span className="flex items-center gap-1.5 text-[11.5px]" style={{ color: c }}>
      <span className="inline-block w-2 h-2 rounded-full" style={{ background: s === 'wait' ? WAIT : DONE }} />
      {s === 'wait' ? 'Waiting on a person' : then || 'Done'}
    </span>
  )
}

/* ─── level 1: as the charter is now ───────────────────────── */

function Card1({ e }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, amount: 0.4 })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (reduced()) { const t = setTimeout(() => setN(4), 0); return () => clearTimeout(t) }
    const t = setInterval(() => setN((v) => Math.min(v + 1, 4)), 1100)
    return () => clearInterval(t)
  }, [seen])
  return (
    <div ref={ref} className="rounded-xl border border-[#111]/12 bg-white p-5">
      <div className="flex items-center gap-3.5">
        <Avatar glyph={e.glyph} />
        <div>
          <p className="text-[17px] font-semibold tracking-[-0.01em]">{e.name} <span className="text-[#777] font-medium">· {e.job}</span></p>
          <p className="text-[13px] text-[#666]">{e.where}</p>
        </div>
      </div>
      <p className="mt-3 text-[14px] text-[#444]">{e.what}</p>
      <div className="mt-3 min-h-[132px]">
        <AnimatePresence initial={false}>
          {e.feed.slice(0, Math.min(n, 3)).map(([t, s, then], i) => {
            const state = s === 'wait' && n < 4 ? 'wait' : 'done'
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="py-2 border-t border-[#111]/8">
                <p className="text-[13px] text-[#333]">{t}</p>
                <StateLine s={state} then={s === 'wait' ? then : null} />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── level 2: motion shows the system working ─────────────── */

function useCount(target, run) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    if (reduced()) { const t = setTimeout(() => setV(target), 0); return () => clearTimeout(t) }
    const start = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / 1400, 1)
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run])
  return v
}

function Card2({ e }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, amount: 0.4 })
  const [play, setPlay] = useState(0)
  const [n, setN] = useState(0)
  const count = useCount(e.count, seen)
  useEffect(() => {
    if (!seen) return
    if (reduced()) { const t = setTimeout(() => setN(5), 0); return () => clearTimeout(t) }
    const t0 = setTimeout(() => setN(0), 0)
    const t = setInterval(() => setN((v) => Math.min(v + 1, 5)), 900)
    return () => { clearTimeout(t0); clearInterval(t) }
  }, [seen, play])
  const mode = n === 0 ? 'still' : n < 3 ? 'scan' : n === 3 ? 'wait' : 'done'
  const pressing = n === 4
  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setPlay((p) => p + 1)}
      whileHover={{ y: -3, boxShadow: '0 24px 60px -30px rgba(0,0,0,.35)' }}
      transition={{ duration: 0.25 }}
      className="rounded-xl border border-[#111]/12 bg-white p-5 cursor-default"
    >
      <div className="flex items-center gap-3.5">
        <Avatar glyph={e.glyph} mode={mode} scanKey={play * 10 + (n < 3 ? n : 0)} />
        <div className="flex-1">
          <p className="text-[17px] font-semibold tracking-[-0.01em]">{e.name} <span className="text-[#777] font-medium">· {e.job}</span></p>
          <p className="text-[13px] text-[#666]">{e.where}</p>
        </div>
        <div className="text-right">
          <p className="text-[22px] font-semibold tabular-nums leading-none">{count}</p>
          <p className="text-[11px] text-[#888] mt-1">jobs this week</p>
        </div>
      </div>
      <p className="mt-3 text-[14px] text-[#444]">{e.what}</p>
      <div className="mt-3 min-h-[132px]">
        <AnimatePresence initial={false} mode="popLayout">
          {e.feed.slice(0, Math.min(n, 3)).map(([t, s, then], i) => {
            const state = s === 'wait' && n < 5 ? 'wait' : 'done'
            return (
              <motion.div key={`${play}-${i}`} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }} className="py-2 border-t border-[#111]/8 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[13px] text-[#333]">{t}</p>
                  <StateLine s={state} then={s === 'wait' ? then : null} />
                </div>
                {s === 'wait' && state === 'wait' && (
                  <motion.span
                    animate={pressing ? { scale: [1, 0.92, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 rounded-[6px] bg-[#111] text-white text-[11px] px-2.5 py-1"
                  >
                    Approve
                  </motion.span>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ─── level 3: one scroll scene ─────────────────────────────── */

function Scene() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pos, setPos] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setPos(v))
  const per = 1 / EMPLOYEES.length
  const idx = Math.min(EMPLOYEES.length - 1, Math.floor(pos / per))
  const sub = (pos - idx * per) / per // 0..1 within this employee
  const e = EMPLOYEES[idx]
  const shown = Math.min(3, Math.floor(sub * 4.2))
  const approved = sub > 0.82
  const mode = sub < 0.15 ? 'still' : shown < 2 ? 'scan' : approved ? 'done' : 'wait'
  return (
    <div ref={ref} style={{ height: `${EMPLOYEES.length * 70}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <div>
            <p className="text-[15px] font-medium text-[#555] mb-4">AI employees</p>
            <h2 className="font-bold tracking-[-0.04em] leading-[1]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
              One job each. A person approves what goes out.
            </h2>
            <ul className="mt-8">
              {EMPLOYEES.map((x, i) => (
                <li key={x.name} className="flex items-center gap-3 py-2.5 border-t border-[#111]/10 transition-opacity duration-300" style={{ opacity: i === idx ? 1 : 0.35 }}>
                  <Avatar glyph={x.glyph} size={26} mode={i < idx ? 'done' : 'still'} />
                  <span className="text-[16px] font-semibold">{x.name}</span>
                  <span className="text-[15px] text-[#777]">· {x.job}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ perspective: 1400 }}>
            <motion.div
              key={e.name}
              initial={{ opacity: 0, rotateY: -8, y: 20 }}
              animate={{ opacity: 1, rotateY: -6, rotateX: 4, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[#111]/12 bg-white shadow-[0_50px_100px_-40px_rgba(0,0,0,.45)] overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono">
                <span>{e.name} · {e.job} · an example business</span>
                <span className="text-[#777]">{e.where}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar glyph={e.glyph} size={72} mode={mode} scanKey={idx * 10 + shown} />
                  <div>
                    <p className="text-[24px] font-semibold tracking-[-0.02em]">{e.name}</p>
                    <p className="text-[15px] text-[#555]">{e.what}</p>
                  </div>
                </div>
                <div className="mt-6 min-h-[190px]">
                  {e.feed.slice(0, shown).map(([t, s, then], i) => {
                    const state = s === 'wait' && !approved ? 'wait' : 'done'
                    return (
                      <motion.div key={`${idx}-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="py-3 border-t border-[#111]/8 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-[15px] text-[#333]">{t}</p>
                          <StateLine s={state} then={s === 'wait' ? then : null} />
                        </div>
                        {s === 'wait' && (
                          <span className="relative shrink-0 rounded-[8px] bg-[#111] text-white text-[12px] px-3 py-1.5">
                            Approve
                            <motion.svg
                              width="18" height="18" viewBox="0 0 24 24" className="absolute"
                              initial={{ left: 70, top: 40, opacity: 0 }}
                              animate={sub > 0.6 ? { left: 22, top: 12, opacity: 1 } : { left: 70, top: 40, opacity: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              <path d="M4 2l15 9-7 1.5L9 20z" fill="#fff" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
                            </motion.svg>
                          </span>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── the lab page ──────────────────────────────────────────── */

function Roster({ Card }) {
  return (
    <section className="bg-[#FAFAF8] text-[#111]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20">
        <p className="text-[15px] font-medium text-[#555] mb-4">AI employees</p>
        <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[20ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
          One job each. A person approves what goes out.
        </h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMPLOYEES.map((e) => <Card key={e.name} e={e} />)}
        </div>
      </div>
    </section>
  )
}

const LEVELS = [
  ['1', 'As the charter is now', 'Motion only when a job finishes: rows arrive and amber turns green. The avatars sit still.'],
  ['2', 'Motion shows the system working', 'Each card plays its job when it comes into view and again on hover: the avatar’s dots light up as it works, amber while it waits, green when it is done; the count runs up; Approve gets pressed. Cards lift on hover.'],
  ['3', 'One scroll scene', 'The section holds while you scroll, and the big screen plays each employee’s job in turn, tilted in depth, with a cursor pressing Approve. One of these per page at most.'],
]

export default function MotionDemo() {
  const [runs, setRuns] = useState({ 1: 0, 2: 0 })
  return (
    <main className="bg-[#FAFAF8] pb-24">
      {LEVELS.map(([id, name, note]) => (
        <div key={id}>
          <div className="sticky top-0 z-20 bg-[#111] text-white px-6 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
            <b className="text-[15px]">{id}. {name}</b>
            <span className="opacity-70">{note}</span>
            {id !== '3' && (
              <button
                type="button"
                onClick={() => setRuns((r) => ({ ...r, [id]: r[id] + 1 }))}
                className="ml-auto rounded-[8px] border border-white/30 px-3 py-1 hover:bg-white/10"
              >
                Run again
              </button>
            )}
          </div>
          {id === '1' && <div key={runs[1]}><Roster Card={Card1} /></div>}
          {id === '2' && <div key={runs[2]}><Roster Card={Card2} /></div>}
          {id === '3' && <Scene />}
        </div>
      ))}
    </main>
  )
}

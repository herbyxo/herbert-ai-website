'use client'
import { useEffect, useState } from 'react'

// Shared engine for the "Runs itself" hero options: one example office's jobs
// finishing in order. Colour means state only (green done, amber waiting on a
// person, grey queued); motion is only ever a job finishing.

export const STATE = { done: '#12B76A', waiting: '#F5A623', queued: '#BDBDBD' }

// The rows are the homepage roster at work (CHARTER.md, "The AI employees"),
// so the hero introduces the six the scroll scene then deepens. Five example
// businesses, every figure made up. short and board are the departures-board
// forms the lab still draws.
export const ROWS = [
  { t: '08:32', who: 'Gus · Recoveries', short: 'GUS', what: 'Letting fee in the agreement, never charged: $1,100 found', board: 'LETTING FEE FOUND $1,100', s: 'done' },
  { t: '08:40', who: 'Fern · Scope', short: 'FERN', what: '“Quick letter for the bank” tagged outside scope, usual fee $220', board: 'OUTSIDE SCOPE $220', s: 'waiting', wait: 'Waiting on Sam', waitB: 'WAITING: SAM', then: 'Quoted by Sam', thenB: 'QUOTED' },
  { t: '08:47', who: 'Vic · Margins', short: 'VIC', what: 'Ducted jobs: quoted 28%, made 16%, template flagged', board: 'DUCTED QUOTED 28 MADE 16', s: 'done' },
  { t: '08:51', who: 'Rita · Rebookings', short: 'RITA', what: 'Last year’s Christmas party: back room held for 11 Dec', board: 'XMAS PARTY REBOOKED', s: 'done' },
  { t: '08:55', who: 'Ray · Promises', short: 'RAY', what: '“Price by Friday” due today, update to Mrs Patel drafted', board: 'PROMISE DUE TODAY', s: 'waiting', wait: 'Waiting on Dave', waitB: 'WAITING: DAVE', then: 'Approved by Dave, sent', thenB: 'APPROVED, SENT' },
  { t: '09:02', who: 'Joy · Milestones', short: 'JOY', what: 'Priya ran the City-Bay yesterday, “how did it go?” drafted', board: 'CITY-BAY FOLLOW-UP', s: 'done', then: 'Sent by Alex' },
  { t: '09:06', who: 'Gus · Recoveries', short: 'GUS', what: 'Duplicate plumber invoice found, $380 to refund', board: 'DUPLICATE INVOICE $380', s: 'done' },
]

export function useInView(ref, threshold = 0.3) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect() }
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return seen
}

export function useBoard(active, every = 1400, rows = ROWS) {
  const [n, setN] = useState(0)
  const [resolved, setResolved] = useState({})
  useEffect(() => {
    if (!active) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setInterval(() => {
      setN((v) => (v >= rows.length ? v : reduce ? rows.length : v + 1))
      if (reduce) setResolved(Object.fromEntries(rows.map((_, i) => [i, true])))
    }, reduce ? 50 : every)
    return () => clearInterval(t)
  }, [active, every, rows])
  useEffect(() => {
    const timers = rows.map((r, i) => (r.s === 'waiting' && i < n && !resolved[i] ? setTimeout(() => setResolved((o) => ({ ...o, [i]: true })), 3200) : null))
    return () => timers.forEach((x) => x && clearTimeout(x))
  }, [n, resolved, rows])
  const shown = rows.slice(0, n).map((r, i) => ({ ...r, state: r.s === 'waiting' && !resolved[i] ? 'waiting' : 'done' }))
  return {
    shown,
    done: shown.filter((r) => r.state === 'done').length,
    waiting: shown.filter((r) => r.state === 'waiting').length,
    queued: rows.length - n,
    latest: shown[shown.length - 1],
  }
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

// Split-flap text: characters settle left to right, the next few flicker
// through random glyphs first, the way a departures board lands a line. Runs
// again whenever the text changes (a status going from waiting to done).
export function useFlap(text, speed = 22) {
  const [out, setOut] = useState('')
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let i = 0
    const t = setInterval(() => {
      i += 1
      if (reduce || i >= text.length + 3) { setOut(text); clearInterval(t); return }
      const flicker = text.slice(i, i + 3).split('').map((c) => (c === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join('')
      setOut(text.slice(0, i) + flicker)
    }, speed)
    return () => clearInterval(t)
  }, [text, speed])
  return out
}

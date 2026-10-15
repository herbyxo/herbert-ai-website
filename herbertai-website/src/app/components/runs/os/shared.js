'use client'
import { useEffect, useRef, useState } from 'react'
import { STATE } from '../board'
import { EMPLOYEES } from '../employees'

// Shared pieces for the Operating Systems screens (homepage section 4, 15 Oct
// 2026): the frame every screen sits in, the scaler that fits the 1184-wide
// drawing to its slot, the state dots, and the roster glyphs the screens use.
// Colour is state only (CHARTER.md): done green, waiting amber, queued grey.

export const W = 1184
export const H = 520
export const INK = '#111'
export const Q = '’'

export function Dot({ c, size = 7 }) {
  return <span aria-hidden className="inline-block rounded-full shrink-0" style={{ width: size, height: size, background: c }} />
}

export function Status({ s, children, size = 12 }) {
  return (
    <span className="inline-flex items-center gap-2 leading-[1.3] whitespace-nowrap" style={{ color: s === 'done' ? '#0E8F53' : s === 'waiting' ? '#9A6300' : '#777', fontSize: size }}>
      <Dot c={STATE[s] || STATE.queued} />
      {children}
    </span>
  )
}

export function Scaled({ children }) {
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

export function Frame({ bar, right, children }) {
  return (
    <div className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden" style={{ width: W, height: H }}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono text-[#555]">
        <span>{bar}</span>
        {right && <span>{right}</span>}
      </div>
      {children}
    </div>
  )
}

const G = (rows) => rows.map((r) => [...r].map((c) => c === 'X'))
const roster = (name, i) => (EMPLOYEES.find((e) => e.name === name) || EMPLOYEES[i]).glyph

export const GLYPH = {
  emma: G(['...X...', '..X.X..', '.X...X.', 'XXXXXXX', '.X...X.', '.X.X.X.', '.XXXXX.']),
  kate: G(['XXXXXXX', 'X.....X', 'X.X.X.X', 'X.....X', 'X.XXX.X', 'X.....X', 'XXXXXXX']),
  rose: G(['..XXX..', '.X...X.', 'X..X..X', 'X..XX.X', 'X.....X', '.X...X.', '..XXX..']),
  leo: G(['XX...XX', 'X.X.X.X', 'X..X..X', 'X.....X', 'X.....X', 'X.....X', 'X.....X']),
  owen: G(['..XXX..', '.X...X.', 'X.....X', 'X..X..X', 'X.....X', '.X...X.', '..XXX..']),
  hazel: G(['XXXXXXX', 'X.....X', 'X.....X', 'X..XX.X', 'X..XX.X', 'X.....X', 'XXXXXXX']),
  lena: G(['X......', 'X......', 'X......', 'X......', 'X......', 'X......', 'XXXXXXX']),
  nora: G(['.XXX...', 'X...X..', 'X...X..', '.XXX...', '....X..', '.....X.', '......X']),
  penny: G(['XXXXX..', 'X....X.', 'X....X.', 'XXXXX..', 'X......', 'X......', 'X......']),
  max: G(['.XXXXX.', '.X...X.', '.X.X.X.', '.X...X.', '.X.X.X.', '.X...X.', '.XXXXX.']),
  kit: G(['X.....X', 'X....X.', 'X...X..', 'XXXX...', 'X...X..', 'X....X.', 'X.....X']),
  clara: G(['...X...', '...X...', '.XXXXX.', '..XXX..', '..X.X..', '.X...X.', 'X.....X']),
  olive: G(['..XXX..', '.X...X.', 'X.....X', 'X.....X', 'X.....X', '.X...X.', '..XXX..']),
  gus: roster('Gus', 0),
  vic: roster('Vic', 1),
  rita: roster('Rita', 3),
  joy: roster('Joy', 4),
}

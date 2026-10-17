'use client'
import { motion } from 'framer-motion'
import { STATE } from '../board'
import { useSteps } from '../steps'
import { Avatar } from '../employees'
import { Frame, Dot, GLYPH, H, INK, Q } from './shared'

// Hospitality: the sales view functions software opens to (dashboards-2026-10-15/
// hospitality.md) with the owner's till strip (operating-systems-2026-10-15/
// hospitality.md, section 7): stages with counts and dollars, a thin money
// strip that reads like a till, cards by stage with the 40th moving across and
// its timeline on the card, the one approval, deposits and rebookings, the
// week along the bottom. Every name and figure is made up.

const STAGES = [['New', 4, '$11,200'], ['Replied', 6, '$18,900'], ['Site visit', 3, '$9,400'], ['Proposal sent', 5, '$21,750'], ['Deposit paid', 9, '$38,600']]
const FUNCS = [
  [0, 'Engagement drinks', '45 guests · Fri 13 Mar', '$3,150', 'in 8:12am'], [0, 'Team lunch', '20 guests · Thu 5 Mar', '$1,400', 'in 9:30am'],
  [1, 'Retirement dinner', '32 guests · Sat 28 Feb', '$2,880', 'replied Sat'], [1, 'Book club dinner', '14 guests · Wed 4 Mar', '$980', 'replied Fri'],
  [2, 'Lee 50th', '50 guests · Sat 14 Mar', '$3,950', 'visit Tue 5pm'], [2, 'Baby shower', '30 guests · Sun 15 Mar', '$1,800', 'visit Thu 11am'],
  [3, 'Patel wedding', '90 guests · Sat 11 Apr', '$9,900', 'sent Mon'], [3, 'Corporate lunch', '40 guests · Fri 20 Mar', '$2,600', 'sent Tue'],
  [4, 'Nguyen christening', '60 guests · Sun 8 Mar', '$4,200', 'paid'], [4, 'Quiz night', '70 guests · Thu 12 Mar', '$2,100', 'paid'], [4, 'Wake, Okafor', '55 guests · Fri 6 Mar', '$3,300', 'paid'],
]
const HERO = { name: '40th birthday', line: '60 guests · Sat 21 Mar', value: '$4,740' }
const TIMELINE = [['Enquiry', 'Sat 9:47pm', 0], ['Draft ready', '9:48pm', 1], ['Approved, Jess', '11:02pm', 2], ['Visit booked', 'Sun 10:12am', 4]]
const WEEK = [['Mon', []], ['Tue', ['5pm Lee 50th · visit']], ['Wed', ['7pm Book club · Back room']], ['Thu', ['11am Baby shower · visit', '7pm Quiz night · Bar']], ['Fri', ['6pm Wake · Back room']], ['Sat', ['7pm Retirement · Back room']], ['Sun', ['10am 40th · visit']]]

function Card({ f, hero, n }) {
  const [, name, line, value, note] = f || [0, HERO.name, HERO.line, HERO.value, '']
  const paid = f && f[0] === 4
  return (
    <motion.div layout={hero ? true : undefined} layoutId={hero ? 'forty' : undefined} className="rounded-[6px] border bg-white px-2.5 py-2" style={{ borderColor: hero && n >= 1 && n < 2 ? STATE.waiting : hero ? STATE.done : 'rgba(17,17,17,.1)', boxShadow: hero ? '0 8px 20px -12px rgba(0,0,0,.35)' : 'none' }}>
      <p className="text-[11.5px] font-semibold truncate">{name}</p>
      <p className="text-[10.5px] text-[#777] truncate">{line}</p>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-[12px] font-semibold tabular-nums">{value}</span>
        {hero ? <Avatar glyph={GLYPH.clara} size={14} mode={n >= 2 ? 'done' : n >= 1 ? 'wait' : 'scan'} /> : <span className="flex items-center gap-1 text-[10px] text-[#777]"><Dot c={paid ? STATE.done : STATE.queued} size={5} />{note}</span>}
      </div>
      {hero && (
        <div className="mt-1.5 pt-1.5 border-t border-[#111]/8 grid gap-[2px]">
          {TIMELINE.filter((t) => n >= t[2]).map(([k, t]) => (
            <p key={k} className="flex items-center gap-1.5 text-[10px] text-[#555] whitespace-nowrap"><Dot c={k.startsWith('Approved') || k.startsWith('Visit') ? STATE.done : INK} size={4} />{k} <span className="text-[#999] font-mono text-[9px] ml-auto">{t}</span></p>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function HospitalityOffice({ play = false }) {
  const run = useSteps(play, 5, 900)
  const n = play ? run : 5
  const heroStage = n >= 4 ? 2 : n >= 2 ? 1 : 0
  const approved = n >= 2
  const till = [['won', n >= 4 ? '$13,200' : '$8,460'], ['deposits in', '$4,500'], ['extra numbers billed', '$632'], ['price rises caught', '$212'], ['rebooked', '4']]
  return (
    <Frame bar="Functions office · an example restaurant" right="Sunday · 10:15am">
      <div className="grid grid-cols-[44px_748px_1fr]" style={{ height: H - 42 }}>
        <aside className="bg-[#111] flex flex-col items-center gap-4 pt-4">
          {[0, 1, 2, 3, 4].map((i) => <span key={i} className={`block w-4 h-4 rounded-[4px] ${i === 2 ? 'bg-white' : 'bg-white/25'}`} />)}
        </aside>
        <div className="flex flex-col min-w-0 border-r border-[#111]/10">
          <div className="grid grid-cols-[repeat(5,1fr)_150px] h-[48px] border-b border-[#111]/10">
            {STAGES.map(([k, c, money], i) => (
              <div key={k} className={`flex flex-col justify-center px-3 ${i ? 'border-l border-[#111]/8' : ''}`}>
                <p className="text-[10px] uppercase tracking-[0.06em] text-[#777] truncate">{k}</p>
                <p className="text-[13px] font-semibold tabular-nums leading-tight">{i === heroStage ? c + 1 : c} <span className="text-[10.5px] font-normal text-[#777]">{money}</span></p>
              </div>
            ))}
            <div className="flex flex-col justify-center px-3 bg-[#111] text-white">
              <p className="text-[10px] uppercase tracking-[0.06em] text-white/60">Held this month</p>
              <p className="text-[13px] font-semibold tabular-nums leading-tight">$52,300</p>
            </div>
          </div>
          <div className="h-[30px] border-b border-[#111]/10 bg-[#F6F6F3] px-3 flex items-center gap-5 text-[11px]">
            <span className="text-[#777]">This month</span>
            {till.map(([k, v]) => <span key={k} className="flex items-baseline gap-1.5 whitespace-nowrap"><b className="tabular-nums">{v}</b><span className="text-[#777]">{k}</span></span>)}
          </div>
          <div className="flex-1 grid grid-cols-5 gap-2 p-3 bg-[#F6F6F3] content-start overflow-hidden">
            {STAGES.map((st, si) => (
              <div key={st[0]} className="grid grid-cols-1 gap-2 content-start min-w-0">
                {si === heroStage && <Card hero n={n} />}
                {FUNCS.filter((f) => f[0] === si).map((f) => <Card key={f[1]} f={f} />)}
              </div>
            ))}
          </div>
          <div className="h-[50px] border-t border-[#111]/10 grid grid-cols-7">
            {WEEK.map(([d, items], i) => (
              <div key={d} className={`px-1.5 py-1 min-w-0 ${i ? 'border-l border-[#111]/8' : ''} ${i === 6 ? 'bg-[#F6F6F3]' : ''}`}>
                <p className="text-[9.5px] text-[#999]">{d}{i === 6 ? ' · today' : ''}</p>
                {items.map((t) => <p key={t} className="text-[9.5px] text-[#333] leading-tight truncate">{t}</p>)}
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 py-3.5 flex flex-col gap-2.5 min-w-0">
          <motion.div animate={approved ? { borderColor: STATE.done } : n >= 1 ? { borderColor: STATE.waiting } : {}} className="rounded-xl border border-[#111]/10 p-3">
            <div className="flex items-center gap-2.5">
              <Avatar glyph={GLYPH.clara} size={28} mode={approved ? 'done' : n >= 1 ? 'wait' : 'scan'} />
              <p className="text-[12.5px]"><b>Clara</b> <span className="text-[#777]">· Functions</span></p>
              <span className="ml-auto text-[11px] text-[#777]">{n >= 1 ? 'Sat 9:48pm' : ''}</span>
            </div>
            <p className="mt-2 text-[11.5px] text-[#333]">Tom asked about a 40th for 60 on Sat 21 March.</p>
            <p className="mt-1.5 rounded-[6px] bg-[#F6F6F3] px-2.5 py-2 text-[11.5px] leading-[1.4] text-[#333]">“The back room seats 60 and is free on 21 March. Cocktail package $79 a head, proposal attached. Would Sunday 10am suit for a look around?”</p>
            <motion.div animate={approved && play ? { scale: [1, 0.96, 1] } : {}} className={`mt-2 rounded-[7px] text-center text-[12px] py-1.5 ${approved ? 'bg-[#E8F7EE] text-[#0E8F53]' : 'bg-[#111] text-white'}`}>
              {approved ? 'Approved by Jess · 11:02pm, between tables' : 'Approve'}
            </motion.div>
          </motion.div>
          <div className="rounded-xl border border-[#111]/10 p-3">
            <div className="flex items-center gap-2.5 mb-2">
              <Avatar glyph={GLYPH.olive} size={24} mode="scan" />
              <p className="text-[12px]"><b>Olive</b> <span className="text-[#777]">· Deposits</span></p>
            </div>
            <div className="grid gap-1">
              {[['Patel wedding', '$1,500 · due Fri · reminder 2 of 3', STATE.queued], ['Lee 50th', n >= 5 ? '$800 · paid this morning' : '$800 · due today · reminder 3 of 3', n >= 5 ? STATE.done : STATE.queued], ['Corporate lunch', '$600 · due Mon · reminder 1 of 3', STATE.queued]].map(([k, v, c]) => (
                <p key={k} className="flex items-center gap-2 text-[11px] min-w-0"><Dot c={c} size={5} /><span className="font-medium whitespace-nowrap">{k}</span><span className="text-[#777] truncate">{v}</span></p>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#111]/10 p-3 flex items-center gap-2.5">
            <Avatar glyph={GLYPH.rita} size={24} mode="scan" />
            <div className="min-w-0 leading-tight">
              <p className="text-[12px]"><b>Rita</b> <span className="text-[#777]">· Rebookings</span></p>
              <p className="text-[11px] text-[#777] truncate">Last year{Q}s Christmas parties offered their date in August: 4 rebooked</p>
            </div>
          </div>
          <p className="mt-auto flex items-center gap-2 text-[11px] text-[#777]"><Dot c={STATE.waiting} size={6} />Jess approves what goes out.</p>
        </div>
      </div>
    </Frame>
  )
}

'use client'
import { motion } from 'framer-motion'
import { STATE } from './board'
import { useSteps } from './steps'
import { Avatar } from './employees'

// One job start to finish through the system, on a split screen: the
// customer's message on the left, what happened in the middle with
// timestamps, the one approval on the right, the day's count underneath.
// Will's pick for the Industries section (15 Oct 2026, "B"). Data per
// industry is in industries.js. `play` true plays it from the start; false
// shows the finished story (calm until clicked, per the charter).

export const W = 1184
export const H = 520
const Q = '’'

function Bubble({ side, time, kind, children }) {
  const mine = side === 'r'
  if (kind === 'email') {
    return (
      <div className={`rounded-lg border px-3.5 py-2.5 text-[13px] leading-[1.4] ${mine ? 'border-[#111]/15 bg-white' : 'border-[#111]/10 bg-[#F1F1EE]'}`}>
        {children}
        <p className="mt-1 text-[10.5px] text-[#888]">{time}</p>
      </div>
    )
  }
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.4] ${mine ? 'bg-[#111] text-white' : 'bg-[#F1F1EE] text-[#111]'}`}>
        {children}
        <p className={`mt-1 text-[10.5px] ${mine ? 'text-white/60' : 'text-[#888]'}`}>{time}</p>
      </div>
    </div>
  )
}

export default function OneJob({ story, play = false }) {
  const run = useSteps(play, story.total, 850)
  const n = play ? run : story.total
  const a = story.approval
  const approved = n >= a.done
  return (
    <div className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden" style={{ width: W, height: H }}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono text-[#555]">
        <span>{story.bar}</span>
        <span>{story.right}</span>
      </div>
      <div className="grid grid-cols-[0.9fr_1.2fr_0.9fr] gap-5 p-5">
        <div className="rounded-xl border border-[#111]/10 p-3.5">
          <p className="text-[11px] text-[#888] mb-3 text-center">{story.left.label}</p>
          <div className="grid gap-2">
            {story.messages.filter((m) => n >= m.at).map((m, i) => (
              <motion.div key={i} initial={play ? { opacity: 0, y: 6 } : false} animate={{ opacity: 1, y: 0 }}>
                <Bubble side={m.side} time={m.time} kind={story.left.kind}>{m.text}</Bubble>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="pt-1">
          <p className="text-[13px] font-semibold mb-3">{story.middle}</p>
          <div className="min-h-[270px]">
            {story.rows.filter((r) => n >= r[2]).map(([time, what], i) => (
              <motion.div key={i} initial={play ? { opacity: 0, x: -8 } : false} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-[64px_1fr] gap-3 py-2.5 border-t border-[#111]/8 text-[13.5px]">
                <span className="font-mono text-[11.5px] text-[#777] tabular-nums pt-0.5">{time}</span>
                <span className="text-[#333]">{what}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-4 pt-3 border-t border-[#111]/15 text-[13px] text-[#333]">
            <span className="font-medium">{story.count[0]}</span> {story.count[1]}
          </p>
        </div>
        <div className="rounded-xl border border-[#111]/10 p-3.5">
          <p className="text-[11px] text-[#888] mb-3 text-center">{a.label}</p>
          {n >= a.at ? (
            <motion.div initial={play ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-[#111]/10 p-3.5">
              <div className="flex items-center gap-2.5">
                <Avatar glyph={a.glyph} size={34} mode={approved ? 'done' : 'wait'} />
                <p className="text-[12.5px]"><span className="font-semibold">{a.who}</span> <span className="text-[#777]">· {a.job} · {a.time}</span></p>
              </div>
              <p className="mt-2.5 text-[13px] leading-[1.4] text-[#333]">{a.text}</p>
              <motion.div
                animate={approved && play ? { scale: [1, 0.94, 1] } : {}}
                className={`mt-3 rounded-[7px] text-center text-[12px] py-2 ${approved ? 'bg-[#E8F7EE] text-[#0E8F53]' : 'bg-[#111] text-white'}`}
              >
                {approved ? `Approved by ${a.by} · ${a.doneTime}` : 'Approve'}
              </motion.div>
            </motion.div>
          ) : (
            <div className="rounded-lg border border-dashed border-[#111]/15 p-6 text-center text-[12px] text-[#999]">{a.empty}</div>
          )}
          <p className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[#777]">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: STATE.waiting }} />
            a person approves what goes out
          </p>
        </div>
      </div>
    </div>
  )
}

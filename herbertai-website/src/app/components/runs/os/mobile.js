'use client'
import { motion } from 'framer-motion'
import { STATE } from '../board'
import { useSteps } from '../steps'
import { Avatar } from '../employees'
import { Dot, GLYPH } from './shared'

// The phone version of Herbert OS, one per industry (Will, 17 Oct 2026: "we
// should almost have like a mobile version of the OS an owner can use it
// from"). It is what the owner runs the business from: the day's numbers,
// the one thing waiting on them, and what the AI employees did. Shown in
// place of the laptop screen on phones; on a laptop it can sit over the
// screen's corner. Plays once: the approval waits, is approved, and the
// outcome lands at the top of the list. Every name and figure is made up and
// the screen says so.

export const MW = 340
export const MH = 700
const Q = '’'

const DATA = {
  property: {
    owner: 'Jess', when: 'Monday', industry: 'Property',
    tiles: [['34', 'requests this week'], ['31', 'handled for you'], ['3', 'needed you']],
    card: { g: 'emma', name: 'Emma', job: 'Maintenance', at: '7:00am', text: `Hot water at 12 Elm St. Plumber $380, inside the landlord${Q}s $500 limit. Booked 8:30am unless you say no.`, button: 'Approve', done: 'Approved · 7:05am' },
    after: ['emma', 'Emma', 'Plumber booked for 8:30am, tenant told'],
    feed: [['kate', 'Kate', 'Rent review notice sent, 14 Elm St'], ['rose', 'Rose', 'Reminder sent, 8 Sturt St, promised Wed'], ['leo', 'Leo', '4 enquiries answered, 2 inspections booked'], ['owen', 'Owen', 'Report drafted, 5 Rose Tce']],
  },
  trades: {
    owner: 'Dave', when: 'Tuesday', industry: 'Trades',
    tiles: [['3', 'quotes answered overnight'], ['$184k', 'in open quotes'], ['$46k', 'overdue, being chased']],
    card: { g: 'max', name: 'Max', job: 'Sales Coordinator', at: '10:36am', text: `Priya asks if $4,860 includes removing the old unit. Reply: yes, removal is in the price, install still Thursday 10am.`, button: 'Approve', done: 'Approved · sent 10:41am' },
    after: ['max', 'Max', 'Reply sent to Priya, quote unchanged'],
    feed: [['vic', 'Vic', 'Invoice #2207 drafted from the job card'], ['max', 'Max', 'Measure and quote booked, Thu 10am'], ['kit', 'Kit', 'Placed it with Sam, 40 min from his 8am'], ['vic', 'Vic', 'Asked Tom for the gas fitting quantities']],
  },
  hospitality: {
    owner: 'Jess', when: 'Sunday', industry: 'Hospitality',
    tiles: [['$52k', 'functions held this month'], ['$4.5k', 'deposits in'], ['4', 'parties rebooked']],
    card: { g: 'clara', name: 'Clara', job: 'Functions', at: 'Sat 9:48pm', text: `Tom asked about a 40th for 60 on 21 March. Reply: the back room is free, $79 a head, proposal attached, visit Sunday 10am?`, button: 'Approve', done: 'Approved · 11:02pm' },
    after: ['clara', 'Clara', 'Site visit booked, Sunday 10am'],
    feed: [['olive', 'Olive', 'Lee 50th deposit paid, $800'], ['rita', 'Rita', `Last year${Q}s Christmas parties offered their date`], ['olive', 'Olive', 'Patel wedding, reminder 2 of 3 sent'], ['clara', 'Clara', '2 enquiries answered with a priced package']],
  },
  health: {
    owner: 'Alex', when: 'Tuesday', industry: 'Health',
    tiles: [['$1,140', 'kept this week'], ['8 of 11', 'cancellations filled'], ['10', 'letters ready to sign']],
    card: { g: 'hazel', name: 'Hazel', job: 'Waitlist', at: '8:03am', text: `2:15pm with Chris opened up. Three patients on the wait list want it. Offer it to them, first to reply gets it?`, button: 'Approve offers', done: 'Approved · 8:03am' },
    after: ['hazel', 'Hazel', 'Sam T. booked into 2:15pm with Chris'],
    feed: [['lena', 'Lena', '3 referral requests sent to GPs'], ['joy', 'Joy', '3 plan reviews drafted for session 6'], ['lena', 'Lena', '2 WorkCover approvals renewed'], ['hazel', 'Hazel', '1 lapsed patient rebooked']],
  },
  finance: {
    owner: 'Sam', when: 'Tuesday', industry: 'Finance',
    tiles: [['62', 'waiting on clients'], ['39', 'ready to prepare'], ['94%', 'lodged on time']],
    card: { g: 'penny', name: 'Penny', job: 'Requests', at: '7:55am', text: `Mrs Nguyen${Q}s reply, read against last year: rental statement short April to June, dividends missing. Request drafted.`, button: 'Approve and send', done: 'Approved · sent 8:04am' },
    after: ['nora', 'Nora', 'B. Carter complete, moved to ready to prepare'],
    feed: [['nora', 'Nora', '14 client replies read against last year'], ['penny', 'Penny', '9 reminders sent, 2nd round'], ['nora', 'Nora', '3 files complete this morning'], ['penny', 'Penny', 'Fee reminder sent, 2 clients']],
  },
}

export default function MobileOS({ id, play = false }) {
  const d = DATA[id]
  const run = useSteps(play, 3, 900)
  const n = play ? run : 3
  const waiting = n >= 1 && n < 2
  const approved = n >= 2
  const rows = n >= 3 ? [d.after, ...d.feed.slice(0, 3)] : d.feed
  return (
    <div className="rounded-[46px] bg-[#111] p-[10px] shadow-[0_40px_80px_-40px_rgba(0,0,0,.55)]" style={{ width: MW, height: MH }}>
      <div className="relative h-full rounded-[36px] bg-[#FAFAF8] overflow-hidden flex flex-col text-[#111]">
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[12px] font-semibold">
          <span className="tabular-nums">9:41</span>
          <span className="absolute left-1/2 -translate-x-1/2 top-2 h-[22px] w-[92px] rounded-full bg-[#111]" />
          <span className="flex items-center gap-1"><span className="inline-block w-4 h-2.5 rounded-[3px] border border-[#111]" /></span>
        </div>
        <div className="px-5 pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#777]">Herbert OS · {d.industry}</p>
          <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em] leading-tight">Morning, {d.owner}</p>
          <p className="text-[12.5px] text-[#777]">{d.when}. Here is what ran overnight.</p>
        </div>
        <div className="px-5 mt-4 grid grid-cols-3 gap-2">
          {d.tiles.map(([v, k]) => (
            <div key={k} className="rounded-xl border border-[#111]/10 bg-white px-2.5 py-2">
              <p className="text-[17px] font-semibold tracking-[-0.02em] tabular-nums leading-none">{v}</p>
              <p className="mt-1 text-[10px] text-[#777] leading-tight">{k}</p>
            </div>
          ))}
        </div>
        <div className="px-5 mt-5">
          <p className="text-[12px] text-[#777] mb-2">Waiting on you <span className="tabular-nums">{approved ? '· nothing' : '· 1'}</span></p>
          <motion.div animate={approved ? { borderColor: STATE.done } : waiting ? { borderColor: STATE.waiting } : {}} className="rounded-2xl border border-[#111]/10 bg-white p-3.5">
            <div className="flex items-center gap-2.5">
              <Avatar glyph={GLYPH[d.card.g]} size={28} mode={approved ? 'done' : waiting ? 'wait' : 'still'} />
              <p className="text-[12.5px]"><b>{d.card.name}</b> <span className="text-[#777]">· {d.card.job}</span></p>
              <span className="ml-auto text-[10.5px] text-[#999]">{d.card.at}</span>
            </div>
            <p className="mt-2 text-[13px] leading-[1.4] text-[#333]">{d.card.text}</p>
            <motion.div animate={approved && play ? { scale: [1, 0.96, 1] } : {}} className={`mt-3 rounded-xl text-center text-[13px] font-medium py-2.5 ${approved ? 'bg-[#E8F7EE] text-[#0E8F53]' : 'bg-[#111] text-white'}`}>
              {approved ? d.card.done : d.card.button}
            </motion.div>
          </motion.div>
        </div>
        <div className="px-5 mt-5 flex-1 min-h-0">
          <p className="text-[12px] text-[#777] mb-1">Done for you</p>
          {rows.map(([g, who, text], i) => (
            <motion.div key={`${who}-${text}`} initial={play && i === 0 && n >= 3 ? { opacity: 0, y: -6 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="flex items-center gap-2.5 py-2 border-t border-[#111]/8">
              <Avatar glyph={GLYPH[g]} size={18} mode={i === 0 && n >= 3 ? 'done' : 'still'} />
              <p className="text-[12px] leading-tight text-[#333] min-w-0"><b className="font-medium text-[#111]">{who}</b> · {text}</p>
            </motion.div>
          ))}
        </div>
        <div className="px-5 pb-5 pt-2 flex items-center justify-between text-[10.5px] text-[#999]">
          <span className="flex items-center gap-1.5"><Dot c={STATE.waiting} size={5} />A person approves what goes out</span>
          <span>Example figures</span>
        </div>
      </div>
    </div>
  )
}

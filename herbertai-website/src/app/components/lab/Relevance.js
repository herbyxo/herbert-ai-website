'use client'
import { useState } from 'react'
import { SANS } from './content'

// Composed like relevanceai.com: white, ruled nav, headline left with the pitch
// and two buttons right, then the product itself on the page: tabs by buyer,
// four stat cards, a table of which employee ran which task, and a chat card.
// Every figure is sample data and says so.

const TABS = {
  Accountants: {
    who: 'Document chaser',
    stats: [['Checklists out', '150'], ['Still missing', '38'], ['Reminders drafted', '38'], ['Approved by team', '100%']],
    rows: ['Send each client their tax checklist', 'Remind only for what is missing', 'Match a bank statement to the file', 'Tell the team a return is ready', 'Chase a payslip for the third time'],
    ask: 'Build an employee to chase missing tax documents.',
  },
  'Allied health': {
    who: 'Front desk assistant',
    stats: [['Intake forms sent', '42'], ['Referrals chased', '9'], ['Recalls due', '17'], ['Approved by team', '100%']],
    rows: ['Send intake forms before visit one', 'Chase the referral from the GP', 'Send a recall when it falls due', 'Follow up a missed appointment', 'Flag anything unusual to the manager'],
    ask: 'Build an employee to get new patient paperwork in.',
  },
  Trades: {
    who: 'Quote follow-up',
    stats: [['Quotes open', '31'], ['Followed up', '31'], ['Worth a call', '6'], ['Approved by office', '100%']],
    rows: ['Follow up every quote on a schedule', 'Answer the common questions', 'Flag the ones worth a call', 'Send job details to the tech', 'Send the invoice after the job'],
    ask: 'Build an employee to follow up every quote.',
  },
  'Real estate': {
    who: 'Maintenance coordinator',
    stats: [['Requests logged', '23'], ['Landlord approvals', '19'], ['Tradies booked', '18'], ['Over the limit, to PM', '4']],
    rows: ['Log the request from the tenant', 'Get the landlord approval', 'Dispatch the tradie', 'Tell the tenant the time', 'Update the landlord after the job'],
    ask: 'Build an employee to coordinate maintenance.',
  },
}

export default function Relevance() {
  const [tab, setTab] = useState('Accountants')
  const t = TABS[tab]
  return (
    <main className="bg-white text-[#0f1633] pb-16" style={{ fontFamily: SANS }}>
      <nav className="flex items-center justify-between border-b border-[#E5E7EB] px-6 md:px-10 h-16">
        <div className="flex items-center gap-2 font-bold text-[19px]"><span className="w-5 h-5 rounded-full bg-[#4F46E5]" />Herbert AI</div>
        <div className="hidden md:flex gap-10 text-[15px] font-medium"><span>How it works</span><span>Industries</span><span>The work</span><span>Pricing</span></div>
        <span className="bg-[#3B37F0] text-white rounded-md px-5 py-2.5 text-[15px] font-semibold">Free AI audit</span>
      </nav>

      <div className="mx-auto max-w-[1000px] md:border-x border-[#E5E7EB] px-6 md:px-20 pt-20 pb-24">
        <section className="grid md:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <h1 className="font-medium tracking-[-0.035em] leading-[1.08]" style={{ fontSize: 'clamp(38px, 4.2vw, 56px)' }}>An AI employee for every job the office hates</h1>
          <div>
            <p className="text-[18px] leading-[1.45] text-[#6B7280]">One job each, built on your real data in 14 days, with your team approving what goes out. Start with a free audit of where the hours go.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="bg-[#3B37F0] text-white rounded-full px-5 py-3 text-[15px] font-semibold shadow-[0_6px_18px_rgba(59,55,240,.35)]">Book a free AI audit</span>
              <span className="border border-[#E5E7EB] rounded-full px-5 py-3 text-[15px] font-medium">See a demo</span>
            </div>
          </div>
        </section>

        <div className="mt-14 inline-flex flex-wrap gap-1 rounded-lg border border-[#E5E7EB] p-1">
          {Object.keys(TABS).map((k) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-md px-4 py-2 text-[15px] ${k === tab ? 'bg-[#F3F4F6] font-medium border border-[#E5E7EB]' : 'text-[#374151]'}`}>{k}</button>
          ))}
        </div>

        <div className="relative mt-6 rounded-xl border border-[#E5E7EB]">
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#E5E7EB]">
            {t.stats.map(([l, v], n) => (
              <div key={l} className={`p-4 ${n ? 'md:border-l' : ''} border-[#E5E7EB]`}>
                <div className="text-[12px] text-[#6B7280]">{l}</div>
                <div className="mt-1 text-[26px] font-semibold tracking-[-0.02em]">{v}</div>
                <div className="text-[12px] text-[#4F46E5]">sample data</div>
              </div>
            ))}
          </div>
          <div className="p-4 md:pr-[330px]">
            <div className="grid grid-cols-[1.4fr_1fr] text-[12px] text-[#6B7280] pb-2"><span>Task</span><span>Run by</span></div>
            {t.rows.map((r) => (
              <div key={r} className="grid grid-cols-[1.4fr_1fr] items-center border-t border-[#F1F1F4] py-3 text-[14px]">
                <span>{r}</span>
                <span className="flex items-center gap-2"><i className="w-5 h-5 rounded-full bg-[#E0E7FF] inline-block" />{t.who}</span>
              </div>
            ))}
          </div>
          <div className="md:absolute md:right-4 md:top-[120px] md:w-[300px] m-4 md:m-0 rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_20px_60px_rgba(15,22,51,.12)] p-4 min-h-[250px] flex flex-col justify-end">
            <div className="self-end max-w-[90%] rounded-xl bg-[#F3F4F6] px-3.5 py-2.5 text-[14px]">{t.ask}</div>
            <div className="mt-3 rounded-xl border border-[#E5E7EB] px-3.5 py-2.5 text-[13px] text-[#6B7280]">That starts with a 45 minute audit.</div>
          </div>
        </div>
      </div>
    </main>
  )
}

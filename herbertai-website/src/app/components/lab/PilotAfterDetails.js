'use client'
import AfterPilot, { Dashboard, STAGE, FOOT } from '../site/AfterPilot'

// /pilot section 5, After the pilot: the details pass after Will's pick (30 Oct
// 2026, "B, dashboard"). Each detail drawn three ways from the section's own
// component, option 1 as built. Detail 5, the heading, is kept unless Will
// asks for a line test.

const FIRST_THREE = 'The first three clients who agree to a case study and a testimonial get 90 days of included care instead of 30.'
const OS_WITH_CARE = [...STAGE.os.slice(0, 3), 'From $25,000, with the $3,500 taken off. Support after it from $1,000 a month.']

function Frame({ id, tag, children }) {
  return (
    <div data-opt={id}>
      <div className="bg-[#111] text-white px-6 lg:px-12 py-3 text-[13px] font-mono">{tag}</div>
      <section data-shot={id} className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
          <p className="text-[16px] font-medium mb-4 text-[#555]">After the pilot</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch] text-balance" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            One job first. Then the system.
          </h2>
          {children}
        </div>
      </section>
    </div>
  )
}

function DashOnly({ id, tag, dash }) {
  return (
    <div data-opt={id}>
      <div className="bg-[#111] text-white px-6 py-3 text-[13px] font-mono">{tag}</div>
      <div data-shot={id} className="bg-[#FAFAF8] p-10 max-w-[760px]"><Dashboard {...dash} /></div>
    </div>
  )
}

export default function PilotAfterDetails() {
  return (
    <main className="pb-24">
      <Frame id="d1-1" tag="Detail 1 of 5, the stages. 1, as built: Day 14, Day 30, within 60 days"><AfterPilot /></Frame>
      <Frame id="d1-2" tag="Detail 1 of 5, the stages. 2, four: support after the build as a stage of its own"><AfterPilot stages={[STAGE.day14, STAGE.day30, STAGE.os, STAGE.care]} foot={FIRST_THREE} /></Frame>
      <Frame id="d1-3" tag="Detail 1 of 5, the stages. 3, two: day 30 moves into the line under"><AfterPilot stages={[STAGE.day14, STAGE.os]} foot={`At day 30 you keep it running for $200 a month, or take it with you onto your own accounts with a written guide. ${FOOT}`} /></Frame>
      <DashOnly id="d2-1" tag="Detail 2 of 5, the dashboard. 1, as built: Penny live, three queued" />
      <DashOnly id="d2-2" tag="Detail 2 of 5, the dashboard. 2, each queued card says its job" dash={{ jobs: true }} />
      <DashOnly id="d2-3" tag="Detail 2 of 5, the dashboard. 3, a second card live: Penny and Nora" dash={{ twoLive: true }} />
      <Frame id="d3-1" tag="Detail 3 of 5, the line under. 1, as built: support and the first three"><AfterPilot /></Frame>
      <Frame id="d3-2" tag="Detail 3 of 5, the line under. 2, support in the third stage, the first three alone under"><AfterPilot stages={[STAGE.day14, STAGE.day30, OS_WITH_CARE]} foot={FIRST_THREE} /></Frame>
      <Frame id="d3-3" tag="Detail 3 of 5, the line under. 3, no line: support in the third stage, the first three left to /pricing"><AfterPilot stages={[STAGE.day14, STAGE.day30, OS_WITH_CARE]} foot={null} /></Frame>
      <Frame id="d4-1" tag="Detail 4 of 5, phones. 1, as built: the stages, then the dashboard"><AfterPilot /></Frame>
      <Frame id="d4-2" tag="Detail 4 of 5, phones. 2, the dashboard first"><AfterPilot order="dash" /></Frame>
      <Frame id="d4-3" tag="Detail 4 of 5, phones. 3, the dashboard after Day 14"><AfterPilot order="split" /></Frame>
    </main>
  )
}

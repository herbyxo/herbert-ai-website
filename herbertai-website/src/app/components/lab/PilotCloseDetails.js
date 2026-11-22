'use client'
import PilotClose from '../site/pilot-close'
import Footer from '../Footer'

// /pilot section 7, the close: the details, three ways each (22 Nov 2026),
// drawn from the section's own component with the real footer under it. Will
// picked B, the form again, the same day. 1 the heading, 2 the label, 3 the
// fields, 4 the ground. The first way of each is what is built.

export const DETAILS = [
  ['d1-1', 'Detail 1 of 4, the heading. 1, as built: Ready?', {}],
  ['d1-2', 'Detail 1 of 4, the heading. 2: Got a job eating your time and money?', { heading: 'Got a job eating your time and money?' }],
  ['d1-3', 'Detail 1 of 4, the heading. 3: What’s eating your week?', { heading: 'What’s eating your week?' }],
  ['d2-1', 'Detail 2 of 4, the label. 1, as built: Book the Audit', {}],
  ['d2-2', 'Detail 2 of 4, the label. 2: no label', { label: null }],
  ['d2-3', 'Detail 2 of 4, the label. 3: Book the audit, in the case /pilot’s other labels use', { label: 'Book the audit' }],
  ['d3-1', 'Detail 3 of 4, the fields. 1, as built: four, the home page’s', {}],
  ['d3-2', 'Detail 3 of 4, the fields. 2: five, the job box as in the first form', { message: true }],
  ['d3-3', 'Detail 3 of 4, the fields. 3: four, with the job box under them marked optional', { message: 'optional' }],
  ['d4-1', 'Detail 4 of 4, the ground. 1, as built: the dark band', {}],
  ['d4-2', 'Detail 4 of 4, the ground. 2: the page’s own paper', { ground: 'paper' }],
  ['d4-3', 'Detail 4 of 4, the ground. 3: paper, laid out like the first section with its three terms', { ground: 'hero' }],
]

export default function PilotCloseDetails() {
  return (
    <main className="pb-24">
      {DETAILS.map(([id, tag, props]) => (
        <div key={id} data-opt={id}>
          <div className="bg-[#111] text-white px-6 lg:px-12 py-3 text-[13px] font-mono border-b border-white/20"><b>{tag}</b></div>
          <div data-shot={id}>
            <PilotClose {...props} />
            <Footer always paper />
          </div>
        </div>
      ))}
    </main>
  )
}

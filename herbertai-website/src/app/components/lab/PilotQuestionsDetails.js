'use client'
import PilotQuestions from '../site/pilot-questions'

// /pilot section 6, Questions: the details, three ways each (21 Nov 2026),
// drawn from the section's own component. Will picked "A, folded" the same day.
// 1 the heading, 2 what is open on load, 3 the sign on each row, 4 the order and
// runs, 5 the phone layout. The first way of each detail is what is built.

function Frame({ id, tag, heading = 'Before you book.', children }) {
  return (
    <div data-opt={id}>
      <div className="bg-[#111] text-white px-6 lg:px-12 py-3 text-[13px] font-mono"><b>{tag}</b></div>
      <section data-shot={id} className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
          <p className="text-[16px] font-medium mb-4 text-[#555]">Questions</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch] text-balance" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            {heading}
          </h2>
          {children}
        </div>
      </section>
    </div>
  )
}

export const DETAILS = [
  ['d1-1', 'Detail 1 of 5, the heading. 1, as built: Before you book.', { heading: 'Before you book.' }],
  ['d1-2', 'Detail 1 of 5, the heading. 2: What’s the catch?', { heading: 'What’s the catch?' }],
  ['d1-3', 'Detail 1 of 5, the heading. 3: Before you give it 45 minutes.', { heading: 'Before you give it 45 minutes.' }],
  ['d2-1', 'Detail 2 of 5, open on load. 1, as first built: the first question open', { open: 'first' }],
  ['d2-2', 'Detail 2 of 5, open on load. 2: all closed (picked)', { open: 'none' }],
  ['d2-3', 'Detail 2 of 5, open on load. 3: every answer open on laptops, folded on phones', { open: 'laptop' }],
  ['d3-1', 'Detail 3 of 5, the sign. 1, as built: plus and minus', {}],
  ['d3-2', 'Detail 3 of 5, the sign. 2: a chevron that points up when open', { sign: 'chevron' }],
  ['d3-3', 'Detail 3 of 5, the sign. 3: plus and minus in a ring', { sign: 'ring' }],
  ['d4-1', 'Detail 4 of 5, order and runs. 1, as built: two runs of six', {}],
  ['d4-2', 'Detail 4 of 5, order and runs. 2: the three runs under their names', { layout: 'groups' }],
  ['d4-3', 'Detail 4 of 5, order and runs. 3: one column', { layout: 'one' }],
  ['d5-1', 'Detail 5 of 5, phones. 1, as built: twelve rows', {}],
  ['d5-2', 'Detail 5 of 5, phones. 2: three rows, the other nine behind one fold', { phone: 'three' }],
  ['d5-3', 'Detail 5 of 5, phones. 3: questions a size down', { phone: 'small' }],
]

export default function PilotQuestionsDetails() {
  return (
    <main className="pb-24">
      {DETAILS.map(([id, tag, { heading, ...props }]) => (
        <Frame key={id} id={id} tag={tag} heading={heading}><PilotQuestions {...props} /></Frame>
      ))}
    </main>
  )
}

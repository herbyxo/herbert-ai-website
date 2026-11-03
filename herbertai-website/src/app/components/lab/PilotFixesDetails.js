'use client'
import FixesGrid from '../site/FixesGrid'

// /pilot section 4, What it fixes: the details pass after Will's pick (3 Nov
// 2026, "C"), drawn from the section's own component, option 1 of each as
// built. The heading and the six sentences were settled on 27 Oct.

function Frame({ id, tag, children }) {
  return (
    <div data-opt={id}>
      <div className="bg-[#111] text-white px-6 lg:px-12 py-3 text-[13px] font-mono">{tag}</div>
      <section data-shot={id} className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
          <p className="text-[16px] font-medium mb-4 text-[#555]">What it fixes</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch] text-balance" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            The jobs everyone hates doing.
          </h2>
          {children}
        </div>
      </section>
    </div>
  )
}

export default function PilotFixesDetails() {
  return (
    <main className="pb-24">
      <Frame id="d1-1" tag="Detail 1 of 3, the employee line. 1, as built: avatar, name and job"><FixesGrid /></Frame>
      <Frame id="d1-2" tag="Detail 1 of 3, the employee line. 2, avatar and name"><FixesGrid line="name" /></Frame>
      <Frame id="d1-3" tag="Detail 1 of 3, the employee line. 3, the avatar beside the job, no line"><FixesGrid line="inline" /></Frame>
      <Frame id="d2-1" tag="Detail 2 of 3, the note. 1, as built"><FixesGrid /></Frame>
      <Frame id="d2-2" tag="Detail 2 of 3, the note. 2, shorter"><FixesGrid note="Example AI employees. Yours are named at kickoff." /></Frame>
      <Frame id="d2-3" tag="Detail 2 of 3, the note. 3, none"><FixesGrid note={null} /></Frame>
      <Frame id="d3-1" tag="Detail 3 of 3, phones. 1, as built: six cards stacked"><FixesGrid /></Frame>
      <Frame id="d3-2" tag="Detail 3 of 3, phones. 2, two across, no sentence"><FixesGrid phone="two" /></Frame>
      <Frame id="d3-3" tag="Detail 3 of 3, phones. 3, one column, no sentence"><FixesGrid phone="short" /></Frame>
    </main>
  )
}

'use client'
import OperatingSystemsSection from '../runs/OperatingSystemsSection'
import { SCREENS } from '../runs/os'

// Lab view of the homepage Operating Systems section (15 Oct 2026): the real
// section five times, each with one industry active and playing as it comes
// into view, so every screen can be seen in place without clicking. The
// screens themselves live in components/runs/os. Goes with the lab.

export default function OperatingSystemOptions() {
  return (
    <main className="bg-[#FAFAF8] pb-16">
      {SCREENS.map((s) => (
        <div key={s.id} data-opt={s.id}>
          <div className="sticky top-0 z-10 bg-[#111] text-white px-6 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
            <b className="text-[15px]">{s.name} · {s.system}</b>
            <span className="opacity-70">The owner’s view, from the model’s section 7.</span>
          </div>
          <OperatingSystemsSection initial={s.id} autoplay />
        </div>
      ))}
    </main>
  )
}

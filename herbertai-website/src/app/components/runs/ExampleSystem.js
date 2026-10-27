'use client'
import Link from 'next/link'
import { AUDIT_HREF } from '../site/shared'

// One page per system that cannot be opened for real (13 Oct 2026, Will: "maybe
// u can just generate what the other things would look like, and then the link
// goes to that"). Each is drawn in the site's own board style with made-up
// data and says so. Each page carries its own visual drawn as the kind of
// software it is (EngineDashboard, HubPipeline), full width under the title
// and what it does, then the audit.

export default function ExampleSystem({ tag, title, sub, facts, visual, note }) {
  return (
    <main className="bg-[#FAFAF8] text-[#111]">
      <section>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-12 md:pt-16 pb-24">
          <Link
            href="/work"
            className="text-[14px] font-medium text-[#555] underline underline-offset-4 decoration-[#111]/20 hover:decoration-[#111] transition-colors"
          >
            <span aria-hidden>&larr;</span> All the systems
          </Link>
          <div className="mt-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-x-12 gap-y-8 items-end">
            <div>
              <p className="text-[15px] font-medium text-[#555] mb-4">{tag}</p>
              <h1 className="font-bold tracking-[-0.04em] leading-[1]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
                {title}
              </h1>
              <p className="mt-6 text-[18px] leading-[1.5] text-[#333] max-w-[46ch]">{sub}</p>
            </div>
            <ul>
              {facts.map((f) => (
                <li key={f} className="text-[16px] leading-[1.45] text-[#444] py-2.5 border-t border-[#111]/10">{f}</li>
              ))}
            </ul>
          </div>
          <div className="mt-12">
            {visual}
            <p className="mt-3.5 text-[13px] text-[#777]">{note}</p>
          </div>
        </div>
      </section>
      <section className="border-t border-[#111]/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[20ch]" style={{ fontSize: 'clamp(32px, 3vw, 44px)' }}>
            Find the job in your business it would take first.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.5] text-[#444] max-w-[48ch]">
            45 minutes auditing your business, and a written report back within two business days with the three jobs costing you most.
          </p>
          <a
            href={AUDIT_HREF}
            className="mt-8 inline-flex items-center gap-2 bg-[#111] text-white rounded-[10px] px-6 py-3.5 text-[16px] font-medium hover:bg-[#2a2a2a] transition-colors"
          >
            Book a free AI audit <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </section>
    </main>
  )
}

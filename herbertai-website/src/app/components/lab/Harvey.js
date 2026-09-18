/* eslint-disable @next/next/no-img-element */
import { SANS, SERIF } from './content'

// Composed like harvey.ai: a black strip, a serif wordmark, a serif display
// headline left with one sentence and a black button right, the product
// sitting on a painted panel, then a near-black section in three ruled columns.

export default function Harvey() {
  return (
    <main className="bg-[#FAFAF8] text-[#0F0E0D] pb-16" style={{ fontFamily: SANS }}>
      <div className="bg-[#0F0E0D] text-white text-center text-[14px] py-2.5 px-4">Free AI audits now booking for October <b className="ml-3 font-semibold">Learn more</b></div>
      <nav className="flex items-center justify-between px-5 md:px-8 py-5">
        <div className="flex items-center gap-9">
          <div className="text-[30px] leading-none tracking-[-0.02em]" style={{ fontFamily: SERIF }}>Herbert</div>
          <div className="hidden md:flex gap-8 text-[15px] font-medium"><span>How it works</span><span>Industries</span><span>The work</span><span>Pricing</span><span>About</span></div>
        </div>
        <div className="flex gap-4 text-[15px] font-medium"><span className="hidden md:inline border border-[#0F0E0D] rounded px-4 py-2">Contact</span><span className="bg-[#0F0E0D] text-white rounded px-4 py-2">Free AI audit</span></div>
      </nav>

      <section className="grid md:grid-cols-2 gap-8 md:gap-14 px-5 md:px-8 pt-16 pb-14 items-start">
        <h1 className="leading-[1.02] tracking-[-0.025em]" style={{ fontFamily: SERIF, fontSize: 'clamp(44px, 5.4vw, 80px)' }}>Less admin.<br />More money.</h1>
        <div className="md:pt-4">
          <p className="text-[20px] leading-[1.35] max-w-[44ch]">Accounting firms, clinics, trades offices and property managers hand Herbert AI the job everyone in the office hates.</p>
          <span className="inline-block mt-7 bg-[#0F0E0D] text-white rounded px-5 py-3.5 text-[16px] font-medium">Book a free AI audit</span>
        </div>
      </section>

      <section className="px-5 md:px-8">
        <div className="relative rounded-lg overflow-hidden px-4 md:px-[8%] pt-10 md:pt-16" style={{ background: 'radial-gradient(40% 60% at 22% 18%, #cfdcd8 0%, rgba(207,220,216,0) 70%), radial-gradient(45% 55% at 85% 30%, #55706a 0%, rgba(85,112,106,0) 70%), linear-gradient(135deg,#3c5650,#2a3f3b 55%,#4d6861)' }}>
          <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay" aria-hidden><filter id="hn"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .6 0" /></filter><rect width="100%" height="100%" filter="url(#hn)" /></svg>
          <img src="/work/property-dashboard.png" alt="" className="relative w-full rounded-t-lg shadow-[0_30px_80px_rgba(0,0,0,.35)]" />
        </div>
      </section>

      <section className="bg-[#0F0E0D] text-[#F2F0EB] mt-16 px-5 md:px-8 py-24">
        <h2 className="max-w-[18ch] leading-[1.05] tracking-[-0.02em]" style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 4.4vw, 64px)' }}>One AI employee. One job. Live in 14 days.</h2>
        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {[
            ['A free AI audit', 'Forty five minutes on how the office runs, then a written page: the three jobs eating the most hours, what each costs a year in your own figures, and which to hand over first.', 'Free'],
            ['Your first AI employee', 'Built for that job on your real data. It does one thing every day and your team approves anything that goes out.', '$3,500 fixed, or free if late'],
            ['The system it runs in', 'Files, comms and follow-ups on one system your team works out of every day, owned by your business.', 'From $25,000'],
          ].map(([h, p, price]) => (
            <div key={h} className="border-t border-white/25 pt-6">
              <h3 className="text-[26px]" style={{ fontFamily: SERIF }}>{h}</h3>
              <p className="mt-4 text-[15.5px] leading-[1.55] text-[#BDB9B0]">{p}</p>
              <div className="mt-6 text-[14px]">{price}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

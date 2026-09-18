import { SANS, SERIF } from './content'

// Composed like fin.ai: a black announcement strip, plain nav, one enormous
// serif headline, two square buttons, and a single sculpture as the only
// object on the page. The sculpture here is a drawn knot in the house green,
// turning slowly; theirs is a 3D render.

function knot(p, q, steps = 720) {
  const pts = []
  for (let n = 0; n <= steps; n++) {
    const t = (n / steps) * Math.PI * 2
    const r = 2 + Math.cos(q * t)
    pts.push(`${(r * Math.cos(p * t) * 100).toFixed(1)},${(r * Math.sin(p * t) * 100).toFixed(1)}`)
  }
  return `M${pts.join(' L')} Z`
}
const D = knot(2, 7)

const REASONS = [
  ['01', 'It does one job, every day', 'Chasing documents, following up quotes, intake forms, maintenance requests. One job, done the same way each time.'],
  ['02', 'Your team approves what goes out', 'Every email is drafted for a person to send. The employee does the work and the people keep the judgement.'],
  ['03', 'Live in 14 days or it is free', 'A fixed $3,500, on your real data, credited in full if you go on to a full build within 60 days.'],
  ['04', 'The numbers come first', 'A free audit works out what the job costs you a year, in your own figures, before anything is built.'],
]

export default function Fin() {
  return (
    <main className="bg-[#FAF9F6] text-[#0d0d0d] pb-16 overflow-x-hidden" style={{ fontFamily: SANS }}>
      <style>{`@keyframes lab-turn { from { transform: rotate(0deg) } to { transform: rotate(360deg) } } @media (prefers-reduced-motion: reduce) { .lab-knot { animation: none !important } }`}</style>
      <div className="bg-[#111] text-white text-center text-[14px] py-2.5 px-4">Free AI audits now booking for October. <u>Book one</u></div>
      <nav className="flex items-center justify-between px-5 md:px-6 py-5">
        <div className="flex items-center gap-8">
          <div className="font-bold text-[30px] tracking-[-0.04em] leading-none">Herbert<span className="block text-[10px] font-medium tracking-normal">AI, from Adelaide</span></div>
          <div className="hidden md:flex gap-7 text-[15px]"><span>How it works</span><span>Industries</span><span>The work</span><span>Pricing</span></div>
        </div>
        <div className="flex items-center gap-5 text-[15px]"><span className="hidden md:inline">About</span><span className="bg-[#111] text-white rounded px-4 py-2.5">Free AI audit</span></div>
      </nav>

      <section className="relative px-6 md:px-[9.5%] pt-10 min-h-[760px]">
        <h1 className="relative z-10 max-w-[12ch] leading-[0.98] tracking-[-0.035em]" style={{ fontFamily: SERIF, fontSize: 'clamp(54px, 8.2vw, 122px)' }}>Less admin. More money. Built to run itself.</h1>
        <div className="relative z-10 mt-9 flex flex-wrap gap-2">
          <span className="bg-[#111] text-white rounded px-4 py-3 text-[16px]">Book a free AI audit</span>
          <span className="border border-[#111] rounded px-4 py-3 text-[16px]">See a demo</span>
        </div>
        <div className="absolute right-[-12%] md:right-[-4%] bottom-[-60px] w-[min(760px,110vw)] aspect-square pointer-events-none">
          <svg viewBox="-340 -340 680 680" className="lab-knot w-full h-full" style={{ animation: 'lab-turn 90s linear infinite' }}>
            <defs>
              <linearGradient id="kg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7DFFB8" /><stop offset=".5" stopColor="#00D96B" /><stop offset="1" stopColor="#008A45" /></linearGradient>
            </defs>
            <path d={D} fill="none" stroke="#006B36" strokeWidth="64" strokeLinejoin="round" opacity=".55" transform="translate(6 10)" />
            <path d={D} fill="none" stroke="url(#kg)" strokeWidth="58" strokeLinejoin="round" />
            <path d={D} fill="none" stroke="#C9FFE2" strokeWidth="9" strokeLinejoin="round" opacity=".75" transform="translate(-9 -11)" />
          </svg>
        </div>
        <div className="relative z-10 mt-40 max-w-[9ch] leading-[1.02] tracking-[-0.03em]" style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 4.4vw, 60px)' }}>4 reasons to hire your first AI employee</div>
      </section>

      <section className="bg-white mx-4 mt-6 px-6 md:px-[8%] py-16">
        {REASONS.map(([n, h, p]) => (
          <div key={n} className="grid md:grid-cols-[120px_1fr_1.2fr] gap-4 md:gap-10 py-8 border-t border-[#E8E6E0]">
            <div className="text-[15px] text-[#777]">{n}</div>
            <h3 className="leading-[1.1] tracking-[-0.02em]" style={{ fontFamily: SERIF, fontSize: 'clamp(26px, 2.6vw, 36px)' }}>{h}</h3>
            <p className="text-[16px] leading-[1.55] text-[#333] max-w-[52ch]">{p}</p>
          </div>
        ))}
      </section>
    </main>
  )
}

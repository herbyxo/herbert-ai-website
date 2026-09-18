import { SANS, SERIF } from './content'

// Composed like wix.com/symphony: floating pill nav, a serif line then heavy
// sans, a big dark button with a lime chip, the AI employees as a named orbit
// that turns slowly, brace eyebrows, and a tile marquee running behind a phone.

const TEAM = [
  { a: 0, ring: 185, name: 'Document chaser', c: '#3B6CF6', c2: '#8FC1FF' },
  { a: 95, ring: 125, name: 'Front desk', c: '#F26B2E', c2: '#FFD08A' },
  { a: 190, ring: 185, name: 'Quote follow-up', c: '#C8F35C', c2: '#4C5A25' },
  { a: 275, ring: 125, name: 'Maintenance', c: '#F5A3E1', c2: '#8B2E6B' },
]

const TILES = [
  { bg: '#DDEBFF', small: 'Documents in', big: '8/10' },
  { bg: '#3B6CF6', fg: '#fff', small: 'Reminders sent', big: '14' },
  { bg: '#F5A3E1', big: 'H' },
  { bg: '#C8F35C', small: 'Quotes followed up', big: '12' },
  { bg: '#EDEDED', big: 'Tue', small2: 'recall due' },
  { bg: '#FF6A2B', fg: '#fff', big: 'NR' },
  { bg: '#DDEBFF', small: 'Landlord', big: 'approved', sm: true },
  { bg: '#2E6B4C', fg: '#fff', small: 'Plumber', big: 'booked', sm: true },
  { bg: '#BFE0FF', big: '31', small2: 'booked in' },
]

function Tile({ t }) {
  return (
    <div className="w-[118px] h-[118px] rounded-[26px] flex-none flex flex-col items-center justify-center text-center p-2 leading-[1.15]" style={{ background: t.bg, color: t.fg || '#1F1F1F' }}>
      {t.small && <small className="text-[11px] font-medium opacity-80">{t.small}</small>}
      <b className={t.sm ? 'text-[19px] font-bold tracking-[-0.02em]' : 'text-[30px] font-bold tracking-[-0.03em]'}>{t.big}</b>
      {t.small2 && <small className="text-[11px] font-medium opacity-80">{t.small2}</small>}
    </div>
  )
}

export default function WixSymphony() {
  return (
    <main className="bg-[#F3F3F3] text-[#1F1F1F] pb-16 overflow-x-hidden" style={{ fontFamily: SANS }}>
      <style>{`
        @keyframes lab-spin { from { transform: rotate(var(--a)) } to { transform: rotate(calc(var(--a) + 360deg)) } }
        @keyframes lab-unspin { from { transform: rotate(calc(var(--a) * -1)) } to { transform: rotate(calc(var(--a) * -1 - 360deg)) } }
        @keyframes lab-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @media (prefers-reduced-motion: reduce) { .lab-anim { animation: none !important } }
      `}</style>

      <div className="sticky top-0 z-50 py-3.5 px-3">
        <div className="mx-auto max-w-[930px] flex items-center justify-between rounded-2xl border border-[#DADADA] bg-[rgba(240,240,240,.88)] backdrop-blur px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,.06)]">
          <div className="font-extrabold text-[20px] tracking-[-0.03em]">Herbert AI <small className="font-medium text-[11px] text-[#777] ml-1">Adelaide</small></div>
          <div className="hidden md:flex gap-11 text-[14px]"><span>How it works</span><span>The work</span><span>Pricing</span></div>
          <span className="bg-[#333] text-[#F3F3F3] rounded-[10px] px-4 py-2.5 text-[14px] font-medium">Free AI audit</span>
        </div>
      </div>

      <section className="relative grid md:grid-cols-[1fr_490px] gap-14 items-center px-6 md:px-[70px] pt-16 pb-28">
        <div className="absolute -right-16 -top-36 w-[380px] h-[260px] rounded-bl-[220px]" style={{ background: 'linear-gradient(135deg,#C8F35C,#8fd14f)' }} />
        <div className="relative">
          <h1 className="font-extrabold tracking-[-0.045em] leading-[1.02]" style={{ fontSize: 'clamp(46px, 5.6vw, 80px)' }}>
            <span style={{ fontFamily: SERIF, fontWeight: 400, letterSpacing: '-0.02em' }}>Less admin.</span><br />More money.<br />Built to run itself.
          </h1>
          <p className="mt-7 text-[20px] leading-[1.4] max-w-[34ch]">One AI employee for the job everyone in the office hates, built in 14 days by the person you meet in the audit.</p>
          <div className="mt-10 inline-flex items-center gap-6 rounded-[14px] bg-[#2F3A2F] text-[#F3F3F3] pl-7 pr-3 py-3 font-medium" style={{ fontSize: 'clamp(22px, 2.4vw, 34px)' }}>
            Book a free AI audit
            <i className="not-italic grid place-items-center w-[60px] h-[60px] rounded-[10px] bg-[#C8F35C] text-[#1F1F1F]">&rarr;</i>
          </div>
        </div>
        <div className="relative h-[490px] rounded-[80px] bg-[#D6D3F2] text-center pt-8 overflow-hidden">
          <div className="font-bold text-[20px]">your AI employees..</div>
          <div className="absolute left-1/2 top-[64px] w-[400px] h-[400px] -translate-x-1/2">
            {[130, 250, 370].map((d) => (
              <div key={d} className="absolute left-1/2 top-1/2 rounded-full border-[1.5px] border-dotted border-[#4b4b6b] opacity-50" style={{ width: d, height: d, transform: 'translate(-50%,-50%)' }} />
            ))}
            <div className="absolute left-1/2 top-1/2 w-[54px] h-[54px] -translate-x-1/2 -translate-y-1/2 rounded-[14px] bg-[#1F1F1F] text-white grid place-items-center font-extrabold text-[20px]">H</div>
            {TEAM.map((m) => (
              <div key={m.name} className="lab-anim absolute inset-0" style={{ '--a': `${m.a}deg`, animation: 'lab-spin 48s linear infinite' }}>
                <div className="absolute left-1/2" style={{ top: 200 - m.ring, transform: 'translate(-50%,-50%)' }}>
                  <div className="lab-anim flex flex-col items-center gap-1" style={{ '--a': `${m.a}deg`, animation: 'lab-unspin 48s linear infinite' }}>
                    <i className="block w-[28px] h-[28px] rounded-full" style={{ border: `6px solid ${m.c}`, background: m.c2 }} />
                    <span className="text-[13px] whitespace-nowrap" style={{ fontFamily: SERIF }}>{m.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F7] text-center py-24 px-6">
        <div className="text-[32px]" style={{ fontFamily: SERIF }}>{'{The advantage}'}</div>
        <h2 className="mt-2 font-extrabold tracking-[-0.045em] leading-none" style={{ fontSize: 'clamp(36px, 4.6vw, 64px)' }}>Software that already knows your office</h2>
        <span className="inline-block mt-6 border border-[#333] rounded-lg px-5 py-3 text-[17px]">Book a free AI audit</span>

        <div className="relative mt-14 h-[320px]">
          <div className="absolute inset-x-0 top-[90px] overflow-hidden">
            <div className="lab-anim flex gap-4 w-max" style={{ animation: 'lab-marquee 38s linear infinite' }}>
              {[...TILES, ...TILES, ...TILES, ...TILES].map((t, n) => <Tile key={n} t={t} />)}
            </div>
          </div>
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[270px] h-[310px] bg-white rounded-t-[36px] border-[8px] border-b-0 border-[#1F1F1F] px-4 pt-5 text-left shadow-[0_20px_60px_rgba(0,0,0,.18)]">
            <div className="flex justify-between text-[11px]"><b>9:41</b><span className="bg-[#E8F7C8] rounded-full px-2 py-0.5 font-semibold">1 employee · 6 skills</span></div>
            <div className="mt-3 font-bold text-[22px] tracking-[-0.02em]">Your AI employees</div>
            <div className="text-[11px] text-[#666] mb-3">Each one does one job. You approve what goes out.</div>
            <div className="bg-[#F3F3F3] rounded-xl px-3 py-2.5 text-[12px] font-semibold flex justify-between mb-2">Document chaser <em className="not-italic bg-[#C8F35C] rounded-full px-2 text-[10px] leading-[18px]">On the job</em></div>
            <div className="bg-[#F3F3F3] rounded-xl px-3 py-2.5 text-[12px] font-semibold mb-2">Today: 14 reminders, 6 files matched</div>
            <div className="border border-dashed border-[#bbb] rounded-xl px-3 py-2.5 text-[12px] font-semibold text-center">+ Add the next one</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-14 text-left mt-14 max-w-[1300px] mx-auto">
          {[
            ['Built on your real data', 'The first AI employee is built on your actual files, inbox and job system, not a demo account, so it is doing the real job from day one.'],
            ['Your team approves', 'Anything that goes out to a client, a landlord or a patient is drafted for a person to approve. Nothing leaves the building on its own.'],
            ['Plugs into what you already use', 'Xero, your job system, your booking software, your inbox. The employee sits between them and does the copying, chasing and matching.'],
          ].map(([h, p]) => (
            <div key={h}>
              <h3 className="flex items-center gap-2.5 text-[22px] font-bold"><i className="w-2.5 h-2.5 rounded-sm bg-[#1F1F1F] inline-block" />{h}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.5] text-[#333]">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

'use client'
import PilotQuestions from '../site/pilot-questions'
import AuditForm from '../site/AuditForm'
import Footer from '../Footer'

// /pilot section 7, the close: today and three ways (22 Nov 2026). Each is
// drawn as the page's end: section 6's questions above, the option, and the
// real footer below, whose Talk column already links to the form. Facts: the
// marketing-site register's rule (the black audit button at the hero and at the
// end, a text link between; Will, 10 and 12 Oct 2026, on the home page);
// /pilot's hero carries the form, not a button; the home page ends on the form
// in a dark band. Static: /pilot does not move.

function Questions() {
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
        <p className="text-[16px] font-medium mb-4 text-[#555]">Questions</p>
        <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch] text-balance" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
          Before you book.
        </h2>
        <PilotQuestions />
      </div>
    </section>
  )
}

function Frame({ id, tag, note, children }) {
  return (
    <div data-opt={id}>
      <div className="bg-[#111] text-white px-6 lg:px-12 py-3 text-[13px] font-mono">
        <b>{tag}</b> <span className="text-white/60">{note}</span>
      </div>
      <div data-shot={id} className="text-[#111]">
        <Questions />
        {children}
        <Footer always paper />
      </div>
    </div>
  )
}

function Today() {
  return (
    <section data-close className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-14 pb-20">
        <p className="text-[20px] font-semibold tracking-[-0.01em]">
          Ready? <a href="#book" className="underline underline-offset-[5px] decoration-[#111]/30 hover:decoration-[#111]">Book your free AI audit <span aria-hidden>&uarr;</span></a>
        </p>
      </div>
    </section>
  )
}

// A. The page ends on the black button, in the hero's words, the way the home
// page does.
function Button() {
  return (
    <section data-close className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-x-10 gap-y-7">
        <h2 className="font-bold tracking-[-0.04em] leading-[1]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>Ready?</h2>
        <a href="#book" className="self-start md:self-auto inline-flex items-center gap-2 bg-[#111] text-white rounded-[10px] px-6 py-3.5 text-[16px] font-medium hover:bg-[#2a2a2a] transition-colors">
          Book a free AI audit <span aria-hidden>&uarr;</span>
        </a>
      </div>
    </section>
  )
}

// B. The form again at the end, in the home page's dark close band, so nobody
// scrolls back up.
function Form() {
  return (
    <section data-close className="bg-[#111] text-white border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-24 pb-28 grid lg:grid-cols-2 gap-x-16 gap-y-12 items-end">
        <div className="min-w-0">
          <p className="text-[16px] font-medium text-white/60 mb-4">Book the Audit</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[0.98] max-w-[14ch]" style={{ fontSize: 'clamp(40px, 4.6vw, 68px)' }}>
            Ready?
          </h2>
        </div>
        <div className="min-w-0">
          <div className="rounded-2xl bg-[#FAFAF8] text-[#111] p-6 sm:p-7">
            <AuditForm source="/pilot (end)" message={false} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function PilotCloseOptions() {
  return (
    <main className="pb-24">
      <Frame id="today" tag="Today" note="a one-line text link, then the footer"><Today /></Frame>
      <Frame id="a" tag="A. The button" note="the page ends on the black audit button, as the home page does"><Button /></Frame>
      <Frame id="b" tag="B. The form again" note="the home page's dark close band with the form in it"><Form /></Frame>
      <Frame id="c" tag="C. No close" note="the questions end the page; the footer's link is the way back"></Frame>
    </main>
  )
}

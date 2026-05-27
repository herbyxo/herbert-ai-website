'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import RevealOnScroll from '../motion/RevealOnScroll'

const CARD = 'bg-white rounded-3xl border border-ink/25'

export default function AutomateChapter() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={ref} className="bg-cream-alt border-y border-line relative overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-28 md:py-44">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ─── Left: opener (sticky on desktop) ─── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <span className="w-8 h-px bg-ink" />
                <span>Chapter 02 of 03</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2
                className="font-display text-ink"
                style={{
                  fontSize: 'var(--text-display-lg)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.04em',
                  fontWeight: 800,
                }}
              >
                Automate.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="mt-7 md:mt-10 text-[22px] md:text-[26px] text-ink leading-[1.25] font-medium max-w-[24ch]">
                Run without you in the loop.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <p className="mt-6 text-[15px] md:text-[16px] text-muted leading-[1.6] max-w-[42ch]">
                AI voice agents that answer every call. Chatbots that capture leads at 2am.
                Tool-to-tool workflows that stitch your stack together. The boring work
                happens on its own &mdash; you see the outcomes, not the process.
              </p>
            </RevealOnScroll>
          </div>

          {/* ─── Right: stacked mockups with parallax + rotation ─── */}
          <div className="lg:col-span-7 space-y-14 lg:space-y-20">
            <MockupSlot y={y1} index="01" widthClass="md:w-[92%] md:-ml-4" indexSide="right" rotate="rotate-[-2deg]" label="AI voice agent · live call">
              <MockVoiceTranscript />
            </MockupSlot>

            <MockupSlot y={y2} index="02" widthClass="md:w-[78%] md:ml-auto md:-mr-4" indexSide="left" rotate="rotate-[2.5deg]" delay={0.1} label="Workflow automation · n8n">
              <MockN8nFlow />
            </MockupSlot>

            <MockupSlot y={y3} index="03" widthClass="md:w-[72%] md:ml-auto md:mr-16" indexSide="left" rotate="rotate-[-1.5deg]" delay={0.2} label="AI chatbot · 2am lead capture">
              <MockChatbotConversation />
            </MockupSlot>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Description label above each mockup ─────────────────────── */
function MockupLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
      <span className="w-6 h-px bg-muted/60" />
      <span>{children}</span>
    </div>
  )
}

/* ─── Wrapper: pairs each mockup with a giant ghosted index ────── */
function MockupSlot({ y, index, widthClass, indexSide, rotate, delay = 0, label, children }) {
  const sidePos =
    indexSide === 'right'
      ? 'lg:-right-16 xl:-right-24'
      : 'lg:-left-16 xl:-left-24'
  return (
    <motion.div style={{ y }} className={`${widthClass} relative`}>
      <span
        aria-hidden
        className={`hidden lg:block absolute -top-6 ${sidePos} font-display font-bold leading-none tracking-tighter text-ink/[0.08] select-none pointer-events-none z-0`}
        style={{ fontSize: 'clamp(120px, 14vw, 200px)' }}
      >
        {index}
      </span>
      <div className="relative z-10">
        <RevealOnScroll delay={delay}>
          <div className={rotate}>
            <MockupLabel>{label}</MockupLabel>
            {children}
          </div>
        </RevealOnScroll>
      </div>
    </motion.div>
  )
}

/* ─── Mock #1: Voice agent transcript (with real audio proof) ──── */
function MockVoiceTranscript() {
  const lines = [
    { who: 'caller', t: '00:04', text: "Yeah, hi, I've got a walk-in freezer that's gone warm — we're a restaurant, it's stocked." },
    { who: 'agent', t: '00:11', text: 'No worries, I can get a tech to you. Where are you based?' },
    { who: 'caller', t: '00:16', text: 'North Sydney. Stock\'s going to start spoiling pretty soon.' },
    { who: 'agent', t: '00:20', text: "Right, I'll flag it as urgent. Best contact number for the tech to call ahead?" },
  ]
  return (
    <div className={`${CARD} max-w-md overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-line">
        <div className="w-9 h-9 rounded-full bg-ink flex items-center justify-center shrink-0">
          <span className="text-green text-[13px] font-bold">S</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-ink truncate">Steve &middot; Master Freeze receptionist</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green hi-pulse" />
            <span className="text-[10px] text-muted font-mono uppercase tracking-[0.14em]">Live call &middot; 00:23</span>
          </div>
        </div>
      </div>

      {/* Transcript */}
      <div className="px-4 py-4 space-y-3">
        {lines.map((l, i) => (
          <div key={i} className="flex gap-3">
            <span className="font-mono text-[10px] text-muted shrink-0 mt-1 w-9">{l.t}</span>
            <div className="flex-1 min-w-0">
              <div className={`font-mono text-[9px] uppercase tracking-[0.16em] mb-0.5 ${l.who === 'agent' ? 'text-green-deep' : 'text-muted'}`}>
                {l.who === 'agent' ? 'Steve' : 'Caller'}
              </div>
              <p className="text-[13px] text-ink leading-[1.5]">{l.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Audio proof — real Master Freeze recording */}
      <div className="border-t border-line bg-cream-alt p-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Listen to the real call
          </div>
          <div className="font-mono text-[10px] text-muted">unedited</div>
        </div>
        <audio
          controls
          preload="metadata"
          className="w-full h-9"
          style={{ filter: 'grayscale(1) contrast(1.05)' }}
        >
          <source src="/steve-demo.wav" type="audio/wav" />
        </audio>
      </div>
    </div>
  )
}

/* ─── Mock #2: n8n workflow graph (CSS-only, animated lines) ───── */
function MockN8nFlow() {
  const nodes = [
    { tag: 'Trigger', title: 'Form submission', icon: 'inbox' },
    { tag: 'AI', title: 'Qualify lead', icon: 'sparkle' },
    { tag: 'CRM', title: 'Create deal', icon: 'check' },
    { tag: 'Notify', title: 'SMS the owner', icon: 'send' },
  ]
  return (
    <div className={`${CARD} max-w-md overflow-hidden`}>
      {/* Workflow header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green hi-pulse" />
          <div className="text-[12px] font-semibold text-ink">workflow &middot; new-lead-router</div>
        </div>
        <div className="text-[10px] text-muted font-mono uppercase tracking-[0.12em]">
          Active
        </div>
      </div>

      {/* Nodes */}
      <div className="p-5 space-y-0">
        {nodes.map((n, i) => (
          <div key={n.title}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cream-alt border border-line flex items-center justify-center shrink-0">
                <NodeIcon name={n.icon} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted mb-0.5">{n.tag}</div>
                <div className="text-[13px] text-ink font-medium truncate">{n.title}</div>
              </div>
              <div className="text-[10px] text-green-deep font-mono uppercase tracking-[0.14em] flex items-center gap-1 shrink-0">
                <span aria-hidden>✓</span>
                <span>ok</span>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex items-center pl-5 my-1.5">
                <div className="w-px h-7 bg-gradient-to-b from-green-deep/60 to-line" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer stats */}
      <div className="bg-cream-alt border-t border-line px-4 py-2.5 flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          47 runs today
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-green-deep flex items-center gap-1">
          <span aria-hidden>↑</span>
          <span>100% success</span>
        </div>
      </div>
    </div>
  )
}

function NodeIcon({ name }) {
  const common = { className: 'w-4 h-4 text-ink', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', viewBox: '0 0 24 24', 'aria-hidden': true }
  if (name === 'inbox') return (
    <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l2-3h14l2 3" /></svg>
  )
  if (name === 'sparkle') return (
    <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" /></svg>
  )
  if (name === 'check') return (
    <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
  )
  if (name === 'send') return (
    <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M21 3L3 10l7 3 3 7 8-17z" /></svg>
  )
  return null
}

/* ─── Mock #3: Chatbot conversation (with typing indicator) ────── */
function MockChatbotConversation() {
  return (
    <div className={`${CARD} max-w-sm overflow-hidden`}>
      {/* Widget header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-ink flex items-center justify-center">
            <span className="text-green text-[12px] font-bold">h</span>
          </div>
          <div>
            <div className="text-[13px] font-semibold text-ink leading-none">Chat with us</div>
            <div className="text-[10px] text-muted font-mono uppercase tracking-[0.14em] mt-1">Online &middot; 2:14am</div>
          </div>
        </div>
        <button className="text-muted text-[16px] leading-none" aria-label="Close">×</button>
      </div>

      {/* Conversation */}
      <div className="p-4 space-y-2.5 bg-cream/40">
        {/* Visitor */}
        <div className="flex justify-end">
          <div className="bg-green text-ink rounded-2xl rounded-tr-md px-3.5 py-2 max-w-[85%]">
            <p className="text-[13px] leading-[1.45]">
              do you do same-day jobs?
            </p>
          </div>
        </div>

        {/* Bot */}
        <div className="flex">
          <div className="bg-white border border-line rounded-2xl rounded-tl-md px-3.5 py-2.5 max-w-[88%]">
            <p className="text-[13px] text-ink leading-[1.45] mb-2">
              Yep &mdash; if you book before 11am, we&rsquo;ll usually be on-site that afternoon. What suburb are you in?
            </p>
            <div className="flex gap-1.5 flex-wrap">
              <button className="text-[11px] text-ink border border-line rounded-full px-2.5 py-1 bg-cream-alt">
                Get a quote
              </button>
              <button className="text-[11px] text-ink border border-line rounded-full px-2.5 py-1 bg-cream-alt">
                Call now
              </button>
            </div>
          </div>
        </div>

        {/* Visitor */}
        <div className="flex justify-end">
          <div className="bg-green text-ink rounded-2xl rounded-tr-md px-3.5 py-2 max-w-[85%]">
            <p className="text-[13px] leading-[1.45]">
              kent town. need a sparky asap
            </p>
          </div>
        </div>

        {/* Typing indicator */}
        <div className="flex">
          <div className="bg-white border border-line rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-muted/70 typing-dot" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-muted/70 typing-dot" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-muted/70 typing-dot" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="flex items-center gap-2 p-3 border-t border-line bg-white">
        <div className="flex-1 text-[12px] text-muted px-3 py-2 bg-cream-alt rounded-full">
          Type a message&hellip;
        </div>
        <button className="w-8 h-8 rounded-full bg-ink flex items-center justify-center text-green text-[13px]" aria-label="Send">↑</button>
      </div>
    </div>
  )
}

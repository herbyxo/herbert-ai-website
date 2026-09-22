import Link from 'next/link'
import { REFS, SANS } from './content'

// Fixed strip along the bottom of every lab page: which reference this mockup
// follows, and links to the other six.
export default function LabBar({ current }) {
  const ref = REFS.find((r) => r.slug === current)
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[100] bg-[#111] text-white border-t border-white/10"
      style={{ fontFamily: SANS }}
    >
      <div className="flex items-center gap-4 px-4 py-2 overflow-x-auto text-[12px] whitespace-nowrap">
        <span className="opacity-60">{ref && ref.slug.startsWith('concept') ? `${ref.name}, ${ref.url}` : `Herbert AI, composed like ${ref ? ref.name : 'the references'}${ref ? ` (${ref.url})` : ''}`}</span>
        <span className="opacity-30">|</span>
        {REFS.map((r, i) => (
          <Link
            key={r.slug}
            href={`/lab/${r.slug}`}
            className={r.slug === current ? 'font-semibold text-[#00FF88]' : 'opacity-75 hover:opacity-100'}
          >
            {i + 1}. {r.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

import Link from 'next/link'
import { REFS, SANS } from '../components/lab/content'

export const metadata = {
  title: { absolute: 'Design lab | Herbert AI' },
  robots: { index: false, follow: false },
}

export default function LabIndex() {
  return (
    <main className="min-h-screen bg-[#111] text-white px-6 py-16" style={{ fontFamily: SANS }}>
      <div className="max-w-[760px] mx-auto">
        <h1 className="text-[28px] font-semibold tracking-[-0.02em]">Design lab</h1>
        <p className="mt-3 text-white/60 text-[15px] leading-[1.5]">
          Seven mockups of the Herbert AI homepage, each composed the way one reference composes its own first
          screens, with the motion running. Open each, scroll, and pick by gut.
        </p>
        <ol className="mt-10 border-t border-white/10">
          {REFS.map((r, i) => (
            <li key={r.slug} className="border-b border-white/10">
              <Link href={`/lab/${r.slug}`} className="flex items-baseline justify-between py-5 hover:pl-2 transition-[padding]">
                <span className="text-[20px] font-medium">{i + 1}. {r.name}</span>
                <span className="text-white/50 text-[13px]">{r.url}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}

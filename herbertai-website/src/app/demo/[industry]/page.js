// Bottleneck Pilot demo, one route per industry: /demo/accountants?for=Firm+Name
//
// The prospect's business name travels in the URL rather than in a lookup table,
// so no list of prospects is ever committed to this public repo and a new
// business costs nothing: the prospector writes the link, Harry opens or sends it.
// Not indexed, not in the sitemap, no site nav (Header and Footer hide on /demo/).

import { notFound } from 'next/navigation'
import { Inter } from 'next/font/google'
import DemoPage from '../../components/demo/DemoPage'
import { INDUSTRIES } from '../../components/demo/industries'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

function firmName(raw) {
  const v = (Array.isArray(raw) ? raw[0] : raw || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim()
  return v.slice(0, 70) || 'your business'
}

export async function generateMetadata({ params, searchParams }) {
  const { industry } = await params
  const firm = firmName((await searchParams).for)
  const ind = INDUSTRIES[industry]
  return {
    title: { absolute: ind ? `Demo for ${firm} | Herbert AI` : 'Demo | Herbert AI' },
    description: ind ? ind.hero.sub : undefined,
    robots: { index: false, follow: false },
  }
}

export function generateStaticParams() {
  return Object.keys(INDUSTRIES).map((industry) => ({ industry }))
}

export default async function Page({ params, searchParams }) {
  const { industry } = await params
  const ind = INDUSTRIES[industry]
  if (!ind) notFound()
  const firm = firmName((await searchParams).for)
  return (
    <div className={inter.variable}>
      <DemoPage industry={ind} firm={firm} />
    </div>
  )
}

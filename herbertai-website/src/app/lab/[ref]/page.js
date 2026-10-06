import { notFound } from 'next/navigation'
import { REFS } from '../../components/lab/content'
import LabBar from '../../components/lab/LabBar'
import NowHiring from '../../components/lab/NowHiring'
import RunsItself from '../../components/lab/RunsItself'
import RunsItselfHero from '../../components/lab/RunsItselfHero'

const MAP = {
  'concept-now-hiring': NowHiring,
  'concept-runs-itself': RunsItself,
  'runs-itself-hero': RunsItselfHero,
}

export function generateStaticParams() {
  return REFS.map((r) => ({ ref: r.slug }))
}

export const metadata = {
  title: { absolute: 'Design lab | Herbert AI' },
  robots: { index: false, follow: false },
}

export default async function LabPage({ params }) {
  const { ref } = await params
  const Mock = MAP[ref]
  if (!Mock) notFound()
  return (
    <>
      <Mock />
      <LabBar current={ref} />
    </>
  )
}

import { notFound } from 'next/navigation'
import { REFS } from '../../components/lab/content'
import LabBar from '../../components/lab/LabBar'
import SymphonyAI from '../../components/lab/SymphonyAI'
import WixSymphony from '../../components/lab/WixSymphony'
import Sierra from '../../components/lab/Sierra'
import Lindy from '../../components/lab/Lindy'
import Relevance from '../../components/lab/Relevance'
import Fin from '../../components/lab/Fin'
import Harvey from '../../components/lab/Harvey'

const MAP = {
  symphonyai: SymphonyAI,
  'wix-symphony': WixSymphony,
  sierra: Sierra,
  lindy: Lindy,
  relevance: Relevance,
  fin: Fin,
  harvey: Harvey,
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

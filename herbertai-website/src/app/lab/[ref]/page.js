import { notFound } from 'next/navigation'
import { REFS } from '../../components/lab/content'
import LabBar from '../../components/lab/LabBar'
import NowHiring from '../../components/lab/NowHiring'
import RunsItself from '../../components/lab/RunsItself'
import RunsItselfHero from '../../components/lab/RunsItselfHero'
import HowItWorksOptions from '../../components/lab/HowItWorksOptions'
import WorkOptions from '../../components/lab/WorkOptions'
import WorkVisualOptions from '../../components/lab/WorkVisualOptions'
import MotionDemo from '../../components/lab/MotionDemo'
import WorkSectionOptions from '../../components/lab/WorkSectionOptions'
import IndustryOptions from '../../components/lab/IndustryOptions'
import IndustryRecognitionOptions from '../../components/lab/IndustryRecognitionOptions'

const MAP = {
  'concept-now-hiring': NowHiring,
  'concept-runs-itself': RunsItself,
  'runs-itself-hero': RunsItselfHero,
  'how-it-works': HowItWorksOptions,
  'the-work': WorkOptions,
  'the-work-visual': WorkVisualOptions,
  motion: MotionDemo,
  'the-work-2': WorkSectionOptions,
  'industries-property': IndustryOptions,
  'industries-recognition': IndustryRecognitionOptions,
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

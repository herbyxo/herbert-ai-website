import ExampleSystem from '../../components/runs/ExampleSystem'
import EngineDashboard from '../../components/runs/EngineDashboard'
import { OG_IMAGE } from '@/app/components/site/og'

export const metadata = {
  title: 'A marketing engine | An example, made-up data',
  description:
    'A marketing engine’s morning for an example plumbing business: the daily audit flags spend with no enquiries, losing ads are paused, new ones written to test, Meta campaigns held for the owner’s approval. Made-up data.',
  alternates: { canonical: '/work/marketing-engine' },
  openGraph: {
    title: 'A marketing engine · Herbert AI',
    description: 'An example morning, drawn with made-up data.',
    url: '/work/marketing-engine',
    images: [OG_IMAGE],
  },
}

// The marketing engine as an example (13 Oct 2026): the real one runs Herbert
// AI's own ads and is internal, so this is its morning drawn in the site's
// site's style for an example plumbing business. Everything on it is something the
// engine does (code/marketing-engine): Google ads written, tested and paused
// against results, a landing page per ad group, Meta campaigns drafted and held
// for approval, a daily audit of wasted spend, leads logged with their source.
export default function MarketingEngine() {
  return (
    <ExampleSystem
      tag="The Work · Built"
      title="A marketing engine"
      sub="Ads that run themselves against real results: written, tested and paused by the system, with anything new held for the owner to approve."
      facts={[
        'Google ads written, tested and paused against results',
        'A landing page for every ad group',
        'Meta campaigns drafted and held for approval',
        'A daily audit that flags what is wasting money',
      ]}
      visual={<EngineDashboard />}
      note="An example business with made-up figures. The real engine runs on its owner’s own ad accounts."
    />
  )
}

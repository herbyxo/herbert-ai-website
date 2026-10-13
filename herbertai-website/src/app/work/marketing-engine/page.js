import ExampleSystem from '../../components/runs/ExampleSystem'
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
// board style for an example plumbing business. Every row is something the
// engine does (code/marketing-engine): Google ads written, tested and paused
// against results, a landing page per ad group, Meta campaigns drafted and held
// for approval, a daily audit of wasted spend, leads logged with their source.
const ROWS = [
  { t: '06:00', who: 'Daily audit', what: 'Two keywords spent $64 this fortnight with no enquiries', s: 'waiting', wait: 'Waiting on the owner', then: 'Approved, both paused' },
  { t: '06:01', who: 'Google ads', what: 'Hot water ad paused: lowest result in its group', s: 'done' },
  { t: '06:03', who: 'Google ads', what: 'New headline written to test against the winner', s: 'done' },
  { t: '06:10', who: 'Landing pages', what: 'Page built for the new blocked drains ad group', s: 'done' },
  { t: '06:20', who: 'Meta', what: 'Winter heating campaign drafted at $15 a day', s: 'waiting', wait: 'Waiting on the owner', then: 'Approved, now live' },
  { t: '08:42', who: 'Leads', what: 'Enquiry from the hot water ad, logged with its source', s: 'done' },
]

export default function MarketingEngine() {
  return (
    <ExampleSystem
      tag="The work · built"
      title="A marketing engine"
      sub="Ads that run themselves against real results: written, tested and paused by the system, with anything new held for the owner to approve."
      facts={[
        'Google ads written, tested and paused against results',
        'A landing page for every ad group',
        'Meta campaigns drafted and held for approval',
        'A daily audit that flags what is wasting money',
      ]}
      board={{
        title: 'This morning · an example plumbing business',
        label: 'A marketing engine’s morning for an example plumbing business',
        rows: ROWS,
        whoWidth: 128,
      }}
      note="An example business with made-up figures. The real engine runs on its owner’s own ad accounts."
    />
  )
}

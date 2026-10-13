import { notFound } from 'next/navigation'
import ExampleSystem from '../../components/runs/ExampleSystem'
import HubPipeline from '../../components/runs/HubPipeline'
import { hubExampleShown } from '../../components/site/shared'

// Kept out of search until the client has cleared it (see hubExampleShown).
export const metadata = {
  title: 'An operations hub for a finance brokerage | An example, made-up data',
  description:
    'An operations hub’s morning at an example brokerage: every client file on one board, documents chased, and every client email drafted by the system and approved by a person before it goes. Made-up data.',
  robots: { index: false, follow: false },
}

// The brokerage hub as an example (13 Oct 2026): de-branded, made-up files,
// made-up staff, nothing from the real build's data. Production returns a 404
// until HUB_EXAMPLE_CLEARED is set in components/site/shared.js, which waits on
// the client's yes (restructure PROJECT.md, M2.1). Rows are what the hub does:
// files on one board with who is waiting on what, documents chased, client
// emails drafted and approved by a person, checklists per file.
export default function OperationsHub() {
  if (!hubExampleShown()) notFound()
  return (
    <ExampleSystem
      tag="The work · currently building"
      title="An operations hub for a finance brokerage"
      sub="Every client file on one board, with who is waiting on what. The chasing happens on its own, and nothing reaches a client until a person has approved it."
      facts={[
        'Every client file on one board',
        'Documents chased automatically',
        'Every client email drafted, then approved by a person',
        'A checklist per file and the numbers on one screen',
      ]}
      visual={<HubPipeline />}
      note="An example brokerage: the files, names and staff are made up."
    />
  )
}

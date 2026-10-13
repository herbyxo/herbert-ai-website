import { notFound } from 'next/navigation'
import ExampleSystem from '../../components/runs/ExampleSystem'
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
const ROWS = [
  { t: '08:30', who: 'Home loan, Nguyen', what: 'Payslips and bank statements requested', s: 'done' },
  { t: '08:31', who: 'Refinance, Patel', what: 'Reminder drafted for the last two documents', s: 'waiting', wait: 'Waiting on Mia', then: 'Approved by Mia, sent' },
  { t: '09:05', who: 'Equipment, Walsh', what: 'All six documents in, checklist complete', s: 'done' },
  { t: '09:12', who: 'Home loan, Chen', what: 'Valuation booked and the client told', s: 'done' },
  { t: '09:40', who: 'Business, Rossi', what: 'Update email to the client drafted', s: 'waiting', wait: 'Waiting on Ben', then: 'Approved by Ben, sent' },
  { t: '10:15', who: 'Home loan, Okafor', what: 'File moved to submitted, lender notified', s: 'done' },
]

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
      board={{
        title: 'Client files · an example brokerage',
        label: 'An operations hub’s morning at an example brokerage',
        rows: ROWS,
        whoWidth: 168,
      }}
      note="An example brokerage: the files, names and staff are made up."
    />
  )
}

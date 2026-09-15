// Bottleneck Pilot demo content, one entry per industry. Every name here is made
// up. The workflow pattern is the automated document chase from real builds, but
// no client's branding, names or wording appears. The prospect's own business
// name is dropped in at render time from the ?for= query.
//
// Day 0 is the first day of the timeline. A client's row status comes from the
// last of its `status` events on or before the current day, and the focus
// client's `timeline` drives the event list, the email cards and the checklist.
// Plain data only (no functions): this object crosses from the server page to a
// client component. {firm} in a string is replaced with the business name.

export const INDUSTRIES = {
  accountants: {
    label: 'Accountants',
    startDate: '2026-07-01',
    hero: {
      h1: 'Tax time documents, chased without anyone chasing.',
      sub: 'Every client gets their own checklist, the reminders go out on their own, and your team only steps in once a file is complete.',
    },
    appTitle: 'Client documents',
    appPeriod: 'Tax season 2026',
    docs: ['Payslips', 'Bank interest', 'Rental property statement', 'Private health statement', 'Donation receipts'],
    clients: [
      { name: 'Sarah Chen', total: 5, status: [
        { day: 0, received: 0, label: 'Request sent', tone: 'idle' },
        { day: 2, received: 5, label: 'Ready to lodge', tone: 'done' },
      ] },
      { name: 'Tom and Priya Walsh', total: 5, focus: true, status: [
        { day: 0, received: 0, label: 'Request sent', tone: 'idle' },
        { day: 3, received: 0, label: 'Reminder sent', tone: 'wait' },
        { day: 4, received: 3, label: '2 still needed', tone: 'wait' },
        { day: 7, received: 3, label: 'Reminder sent', tone: 'wait' },
        { day: 8, received: 5, label: 'Ready to lodge', tone: 'done' },
      ] },
      { name: 'Marco Rossi', total: 4, status: [
        { day: 1, received: 0, label: 'Request sent', tone: 'idle' },
        { day: 4, received: 1, label: 'Reminder sent', tone: 'wait' },
        { day: 8, received: 1, label: 'Reminder sent', tone: 'wait' },
      ] },
      { name: 'Jess Nguyen', total: 3, status: [
        { day: 2, received: 0, label: 'Request sent', tone: 'idle' },
        { day: 6, received: 3, label: 'Ready to lodge', tone: 'done' },
      ] },
    ],
    // received: which docs (by index) are in at the time of the event
    timeline: [
      { day: 0, kind: 'sent', title: 'Document request sent', detail: 'Their own checklist of five documents and one upload link', received: [],
        email: { subject: 'Documents for your 2026 tax return', intro: 'Hi Tom and Priya, it is tax time again. Here is everything we need to get your return done. Upload them with the link below, whenever suits.' } },
      { day: 3, kind: 'sent', title: 'Reminder sent', detail: 'Nothing had come in yet', received: [],
        email: { subject: 'Reminder: documents for your 2026 return', intro: 'Hi Tom and Priya, just a reminder that we still need your documents to start your return. It only takes a few minutes with the link below.' } },
      { day: 4, kind: 'reply', title: 'Priya uploaded 3 files', detail: 'Matched to payslips, bank interest and donation receipts', received: [0, 1, 4] },
      { day: 7, kind: 'sent', title: 'Reminder for the last 2 documents', detail: 'Only asks for what is still missing', received: [0, 1, 4],
        email: { subject: '2 documents still needed for your 2026 return', intro: 'Hi Tom and Priya, thanks for sending those through. We just need two more to get started.' } },
      { day: 8, kind: 'reply', title: 'Last 2 documents arrived', detail: 'Rental statement and private health statement', received: [0, 1, 2, 3, 4] },
      { day: 8, kind: 'done', title: 'File marked ready to lodge', detail: 'Your team gets one notification, no chasing done by anyone', received: [0, 1, 2, 3, 4] },
    ],
    example: 'Say {firm} has 150 clients and half of them need two reminders. That is 150 chase emails a season that nobody writes.',
    bottleneck: 'document chasing',
  },
}

import AuditClose from './audit-close'

// /pilot section 7, the close (Will, 22 Nov 2026: "do B, the form again"): the
// shared closing band under /pilot's own first heading, so the page opens and
// closes on the same line ("I think we make it find the job, eating your time
// and money"). The band itself is components/site/audit-close.js.
export default function PilotClose(props) {
  return <AuditClose heading="Find the job eating your time and money." source="/pilot (end)" {...props} />
}

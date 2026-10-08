import { NextResponse } from 'next/server'

// Server-side proxy from the public enquiry forms to the marketing engine's
// lead intake. Exists so the webhook secret lives HERE, in server env, and
// never reaches a browser. The form posts to this route; this route forwards
// to the engine with the secret attached.
//
// Fails soft on purpose: the visitor's real submission is the web3forms email,
// which has already happened by the time this runs. A missing env var or an
// engine outage must never surface as an error to the person enquiring, so
// every failure path returns ok and logs for the operator instead.

const HERBERT_TENANT_ID = '6a4acf91-5d44-48b9-bc7a-cdeb1f95a16e'

export async function POST(request) {
  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') return NextResponse.json({ ok: true })

  const engine = process.env.MARKETING_ENGINE_URL
  const secret = process.env.LEAD_WEBHOOK_SECRET
  if (!engine || !secret) {
    console.error('[api/lead] engine forwarding not configured; enquiry only reached email')
    return NextResponse.json({ ok: true })
  }

  const str = v => (typeof v === 'string' ? v.trim().slice(0, 500) : '')

  // No way to contact them means no lead. Without this, an empty POST (a
  // health probe, a bot, a double-submit with cleared fields) became a lead
  // named "Website enquiry" with nothing in it. One of those is already in the
  // engine from the deploy check that proved this route was live.
  if (!str(body.email) && !str(body.phone)) return NextResponse.json({ ok: true, skipped: 'no contact details' })

  // The engine's generic shape (lib/leadIntake normalizeGeneric). A gclid means
  // the visit came from a Google ad, and that attribution is the whole reason
  // this proxy exists: the revenue dashboard joins leads back to ad spend.
  // Everything the form knew about where the visitor came from travels with
  // the lead. The engine keeps the whole payload as `raw`, so these survive
  // even though only the schema fields become columns.
  const attribution = {}
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'page', 'landing_page', 'first_referrer']) {
    const v = str(body[k])
    if (v) attribution[k] = v
  }
  const page = str(body.page)
  const service = str(body.service) || (page.startsWith('/pilot') ? 'AI audit' : '')
  const payload = {
    client_id: HERBERT_TENANT_ID,
    name: str(body.name) || str(body.business) || 'Website enquiry',
    email: str(body.email),
    phone: str(body.phone),
    // Each form names its own service. No guess for one that doesn't: left out,
    // the engine keeps service null and sends its generic "Got your enquiry"
    // reply, where a wrong label would thank them for something they never asked.
    ...(service ? { service } : {}),
    city: 'Adelaide',
    channel: str(body.gclid) ? 'google' : str(body.utm_source) || 'website',
    ...attribution,
  }

  try {
    const res = await fetch(`${engine}/api/leads/in`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-webhook-secret': secret },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) console.error('[api/lead] engine returned', res.status)
  } catch (err) {
    console.error('[api/lead] engine unreachable:', err?.message)
  }

  return NextResponse.json({ ok: true })
}

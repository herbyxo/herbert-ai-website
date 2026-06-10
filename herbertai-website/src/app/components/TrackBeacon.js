'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * First-party, cookieless page-view beacon → HQ's Supabase (hq_site_hits).
 * Stores path, referrer, and device class only — no cookies, no IDs, no PII.
 * The key below is Supabase's *publishable* key; RLS on the table is
 * insert-only for anon, so it can write hits but never read anything.
 */
const ENDPOINT = 'https://pfraycnlwonyppwhaxkf.supabase.co/rest/v1/hq_site_hits'
const PUBLISHABLE_KEY = 'sb_publishable_RzxcJeiVIeSiIqj0w33WXA_cc96R1HU'

export default function TrackBeacon() {
  const pathname = usePathname()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    const device = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
    fetch(ENDPOINT, {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        apikey: PUBLISHABLE_KEY,
        Authorization: `Bearer ${PUBLISHABLE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        path: pathname.slice(0, 300),
        referrer: document.referrer ? document.referrer.slice(0, 500) : null,
        device,
      }),
    }).catch(() => {})
  }, [pathname])

  return null
}

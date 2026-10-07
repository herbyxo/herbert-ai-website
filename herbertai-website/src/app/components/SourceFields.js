'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Attribution for the enquiry forms. Reads utm_* and gclid from the URL, keeps
 * the FIRST touch in localStorage so someone who lands from an ad and books
 * days later is still credited to that ad, renders the values as hidden fields
 * (web3forms forwards every field into the email), and on submit also posts
 * the enquiry to /api/lead so the marketing engine stores the same lead with
 * the same attribution. Never blocks or delays the real submit.
 */
const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid']
const STORE = 'hai_first_touch'

function readTouch() {
  const now = {}
  try {
    const params = new URLSearchParams(window.location.search)
    for (const k of KEYS) {
      const v = params.get(k)
      if (v) now[k] = v.slice(0, 200)
    }
    let stored = null
    try { stored = JSON.parse(localStorage.getItem(STORE) || 'null') } catch { stored = null }
    if (!stored && Object.keys(now).length) {
      stored = { ...now, landing_page: window.location.pathname, first_referrer: document.referrer.slice(0, 500) }
      try { localStorage.setItem(STORE, JSON.stringify(stored)) } catch {}
    }
    return stored || { ...now, first_referrer: document.referrer.slice(0, 500) }
  } catch {
    return now
  }
}

// A form's own `name` attribute shadows an input called "name", so the input
// has to be reached through form.elements.
const val = (form, id) => form.elements.namedItem(id)?.value || ''

export default function SourceFields({ service = 'AI audit' }) {
  const [touch, setTouch] = useState({})
  const [page, setPage] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const t = readTouch()
    // Deferred so the state updates are not synchronous inside the effect
    // (react-hooks/set-state-in-effect); the server-rendered values are empty
    // either way, so there is nothing to mismatch on hydration.
    const timer = setTimeout(() => {
      setTouch(t)
      setPage(window.location.pathname)
    }, 0)
    const form = ref.current?.form
    if (!form) return () => clearTimeout(timer)
    const notify = () => {
      try {
        const body = JSON.stringify({
          name: val(form, 'name'),
          business: val(form, 'business'),
          email: val(form, 'email'),
          phone: val(form, 'phone'),
          message: val(form, 'message'),
          service,
          page: window.location.pathname,
          ...t,
        })
        fetch('/api/lead', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body,
          keepalive: true,
        }).catch(() => {})
      } catch {
        // Never block the real submit.
      }
    }
    form.addEventListener('submit', notify)
    return () => {
      clearTimeout(timer)
      form.removeEventListener('submit', notify)
    }
  }, [service])

  return (
    <>
      <input ref={ref} type="hidden" name="page" value={page} readOnly />
      {KEYS.concat(['landing_page', 'first_referrer']).map(k =>
        touch[k] ? <input key={k} type="hidden" name={k} value={touch[k]} readOnly /> : null,
      )}
    </>
  )
}

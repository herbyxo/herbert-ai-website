import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// 180×180 PNG for iOS "Add to Home Screen". iOS clips with its own mask
// so we render a full square with the design centred — no border-radius
// (iOS applies one).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          color: '#F5F0E5',
          fontSize: 130,
          fontWeight: 700,
          fontFamily: 'sans-serif',
          lineHeight: 1,
          letterSpacing: -6,
        }}
      >
        h
        <div
          style={{
            position: 'absolute',
            top: 28,
            right: 28,
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: '#00FF88',
            boxShadow: '0 0 16px rgba(0,255,136,0.6)',
          }}
        />
      </div>
    ),
    size
  )
}

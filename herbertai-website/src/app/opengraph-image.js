import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Herbert AI — automation & growth studio for SMBs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0A0A',
          color: '#F5F0E5',
          padding: 80,
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -220,
            right: -180,
            width: 560,
            height: 560,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0,255,136,0.22), transparent 60%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#00FF88',
              boxShadow: '0 0 24px rgba(0,255,136,0.6)',
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>
            herbertai
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
              maxWidth: 1000,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 18,
            }}
          >
            <span>Automation & growth</span>
            <span>studio for</span>
            <span style={{ color: '#00FF88', fontStyle: 'italic' }}>SMBs.</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 16,
              color: 'rgba(245,240,229,0.55)',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            herbert-aisolutions.com
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 16,
              color: 'rgba(245,240,229,0.55)',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            Adelaide · AU
          </div>
        </div>
      </div>
    ),
    size
  )
}

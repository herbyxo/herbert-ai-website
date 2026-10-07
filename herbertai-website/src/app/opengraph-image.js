import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt =
  'Herbert AI: custom software and AI for small businesses, built in Adelaide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// The site's own faces, bundled so the card matches the page. Without them
// ImageResponse falls back to its default sans and the serif emphasis is lost.
const font = (file) => readFile(join(process.cwd(), 'assets/og', file))

export default async function OG() {
  const [geistSemi, geistBold, geistMono, serifItalic] = await Promise.all([
    font('Geist-SemiBold.ttf'),
    font('Geist-Bold.ttf'),
    font('GeistMono-Regular.ttf'),
    font('InstrumentSerif-Italic.ttf'),
  ])

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
          fontFamily: 'Geist',
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

        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: -3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Custom software and AI</span>
          <span>for small businesses,</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 22 }}>
            <span>built in</span>
            <span
              style={{
                fontFamily: 'Instrument Serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 100,
                letterSpacing: -1,
                color: '#00FF88',
              }}
            >
              Adelaide.
            </span>
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
              fontFamily: 'Geist Mono',
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
              fontFamily: 'Geist Mono',
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
    {
      ...size,
      fonts: [
        { name: 'Geist', data: geistSemi, weight: 600, style: 'normal' },
        { name: 'Geist', data: geistBold, weight: 700, style: 'normal' },
        { name: 'Geist Mono', data: geistMono, weight: 400, style: 'normal' },
        {
          name: 'Instrument Serif',
          data: serifItalic,
          weight: 400,
          style: 'italic',
        },
      ],
    }
  )
}

import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 256, height: 256 }
export const contentType = 'image/png'

// Raster PNG version of the favicon. Same design as icon.svg.
// Google SERP and older platforms prefer raster over SVG;
// modern browsers will still pick the SVG when both exist.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0A0A0A',
          borderRadius: '22%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          color: '#F5F0E5',
          fontSize: 184,
          fontWeight: 700,
          fontFamily: 'sans-serif',
          lineHeight: 1,
          letterSpacing: -8,
        }}
      >
        h
        <div
          style={{
            position: 'absolute',
            top: 38,
            right: 38,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#00FF88',
            boxShadow: '0 0 24px rgba(0,255,136,0.6)',
          }}
        />
      </div>
    ),
    size
  )
}

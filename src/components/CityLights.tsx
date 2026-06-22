import { useEffect, useRef } from 'react'

// Muted palette inspired by night cities
const COLORS = [
  'rgba(218, 165, 32, 0.7)',  // Goldenrod
  'rgba(176, 196, 222, 0.6)', // Light Steel Blue
  'rgba(70, 130, 180, 0.6)',  // Steel Blue
  'rgba(205, 92, 92, 0.5)',   // Indian Red
  'rgba(240, 248, 255, 0.5)', // Alice Blue
  'rgba(144, 238, 144, 0.4)', // Light Green
]

// Max trail positions to remember per dot
const TRAIL_LENGTH = 12

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  life: number
  maxLife: number
  trail: { x: number; y: number }[]
}

function createDot(w: number, h: number): Dot {
  const x = Math.random() * w
  const y = Math.random() * h

  const scale = 0.003
  const noise = Math.sin(x * scale * 1.3) * Math.cos(y * scale)
  const angleSteps = 4
  const angle = Math.round(noise * angleSteps) * (Math.PI / 2)

  const speed = Math.random() * 0.3 + 0.15

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: Math.random() * 4 + 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    life: 0,
    maxLife: Math.random() * 400 + 200,
    trail: [],
  }
}

export default function CityLights() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let dots: Dot[] = []

    const resize = () => {
      const p = canvas.parentElement
      if (!p) return
      canvas.width = p.clientWidth
      canvas.height = p.clientHeight

      dots = []
      const count = Math.floor((canvas.width * canvas.height) / 6000)
      for (let i = 0; i < count; i++) {
        const d = createDot(canvas.width, canvas.height)
        d.life = Math.random() * d.maxLife
        dots.push(d)
      }
    }

    const animate = () => {
      // Full clear each frame — no sludge residue
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        d.life++

        // Store current position in trail before moving
        d.trail.push({ x: d.x, y: d.y })
        if (d.trail.length > TRAIL_LENGTH) {
          d.trail.shift()
        }

        d.x += d.vx
        d.y += d.vy

        // Smooth fade in/out based on life
        const t = d.life / d.maxLife
        const lifeAlpha = Math.sin(t * Math.PI)

        if (lifeAlpha > 0.01) {
          // Draw trail (oldest to newest, fading in)
          for (let j = 0; j < d.trail.length; j++) {
            const trailAlpha = (j / d.trail.length) * lifeAlpha * 0.4
            if (trailAlpha < 0.01) continue
            ctx.globalAlpha = trailAlpha
            ctx.beginPath()
            const trailRadius = d.radius * (j / d.trail.length) * 0.8
            ctx.arc(d.trail[j].x, d.trail[j].y, trailRadius, 0, Math.PI * 2)
            ctx.fillStyle = d.color
            ctx.fill()
          }

          // Draw main dot
          ctx.globalAlpha = lifeAlpha
          ctx.beginPath()
          ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
          ctx.fillStyle = d.color
          ctx.fill()
          ctx.globalAlpha = 1
        }

        // Respawn when life expires
        if (d.life >= d.maxLife) {
          dots[i] = createDot(canvas.width, canvas.height)
        }
      }

      animId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

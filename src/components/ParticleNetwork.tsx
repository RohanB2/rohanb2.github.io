import { useEffect, useRef } from 'react'

const COLORS = [
  [218, 165, 32],  // Goldenrod
  [176, 196, 222],  // Light Steel Blue
  [70, 130, 180],   // Steel Blue
  [205, 92, 92],    // Indian Red
  [240, 248, 255],  // Alice Blue
  [144, 238, 144],  // Light Green
]

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    
    // Mouse tracking relative to the window, but we calculate its position relative to the canvas
    // so it smoothly interacts even if the mouse is outside the left pane.
    const mouse = { x: -1000, y: -1000 }
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      // Adjust mouse coordinates to match canvas space
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    
    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: number[]

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 1.5 + 0.5
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off walls
        if (this.x < 0 || this.x > canvas!.width) this.vx = -this.vx
        if (this.y < 0 || this.y > canvas!.height) this.vy = -this.vy
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        const [r, g, b] = this.color
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.6)`
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = []
      // Density of particles
      const numberOfParticles = Math.floor((canvas!.width * canvas!.height) / 12000)
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        const [ri, gi, bi] = particles[i].color
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const alpha = 0.15 - distance / 800
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(${ri}, ${gi}, ${bi}, ${alpha})`
            ctx!.stroke()
          }
        }
        
        // Connect to mouse
        const dxMouse = particles[i].x - mouse.x
        const dyMouse = particles[i].y - mouse.y
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
        
        if (distanceMouse < 180) {
            const alpha = 0.25 - distanceMouse / 720
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(mouse.x, mouse.y)
            ctx!.strokeStyle = `rgba(${ri}, ${gi}, ${bi}, ${alpha})`
            ctx!.stroke()
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      
      drawLines()
      
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 0,
        pointerEvents: 'none'
      }} 
    />
  )
}

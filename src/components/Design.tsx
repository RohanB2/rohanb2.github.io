import { useEffect, useRef, useState } from 'react'
import { designs } from '../data/content'
import { Search, ExternalLink, X } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Design() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Motion values for the parallax card effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["3deg", "-3deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-3deg", "3deg"])

  const springConfig = { damping: 30, stiffness: 200, mass: 1 }
  const smoothRotateX = useSpring(rotateX, springConfig)
  const smoothRotateY = useSpring(rotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    // Normalize mouse coordinates from -0.5 to 0.5
    const x = e.clientX / window.innerWidth - 0.5
    const y = e.clientY / window.innerHeight - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  // Reset rotation when modal closes
  useEffect(() => {
    if (!selectedImage) {
      mouseX.set(0)
      mouseY.set(0)
    }
  }, [selectedImage, mouseX, mouseY])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const photos = Array.from(grid.querySelectorAll('.design-item')) as HTMLElement[]
    if (!photos.length) return

    // Tunables for proximity effect
    const RADIUS = 350    // influence distance in px
    const NEAR = 1        // scale of the photo nearest the cursor
    const FAR = 0.85      // scale of photos beyond the radius
    const HOVER = 1.05    // scale of the photo directly under the cursor
    const EASE = 0.15     // easing speed

    let centers: {cx: number, cy: number}[] = []
    function cacheCenters() {
      centers = photos.map(p => {
        const r = p.getBoundingClientRect()
        return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 }
      })
    }
    cacheCenters()
    window.addEventListener('resize', cacheCenters)
    window.addEventListener('scroll', cacheCenters, { passive: true })

    const scales = photos.map(() => 1)
    let jsMouseX = 0, jsMouseY = 0, inside = false, hovered = -1, rafId: number | null = null

    function start() { if (!rafId) rafId = requestAnimationFrame(tick) }

    photos.forEach((photo, i) => {
      photo.addEventListener('mouseenter', () => { hovered = i; start() })
      photo.addEventListener('mouseleave', () => { if (hovered === i) hovered = -1 })
    })

    grid.addEventListener('mouseenter', () => { inside = true; cacheCenters(); start() })
    grid.addEventListener('mousemove', (e) => {
      jsMouseX = e.clientX
      jsMouseY = e.clientY
      inside = true
      start()
    })
    grid.addEventListener('mouseleave', () => { inside = false; hovered = -1; start() })

    function tick() {
      rafId = null
      let moving = false

      for (let i = 0; i < photos.length; i++) {
        let target
        if (!inside) {
          target = 1
        } else if (i === hovered) {
          target = HOVER
        } else {
          const { cx, cy } = centers[i]
          const dx = jsMouseX - cx, dy = jsMouseY - cy
          const t = Math.min(Math.sqrt(dx * dx + dy * dy) / RADIUS, 1)
          target = NEAR + (FAR - NEAR) * t
        }

        const next = scales[i] + (target - scales[i]) * EASE
        if (Math.abs(target - next) > 0.001) {
          scales[i] = next
          moving = true
        } else {
          scales[i] = target
        }

        photos[i].style.transform = `scale(${scales[i].toFixed(4)})`
        photos[i].style.zIndex = i === hovered ? '10' : '1'
      }

      if (moving) rafId = requestAnimationFrame(tick)
    }

    return () => {
      window.removeEventListener('resize', cacheCenters)
      window.removeEventListener('scroll', cacheCenters)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [designs])

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: 700 }}>Design & Graphics</h2>
      
      <div ref={gridRef} className="design-grid">
        {designs.map((design) => (
          <div 
            key={design.id} 
            className="design-item"
            onClick={() => {
              if (design.link) {
                window.open(design.link, '_blank')
              } else {
                setSelectedImage(design.src)
              }
            }}
          >
            <img 
              src={design.src} 
              alt={design.alt} 
            />
            <div className="design-overlay">
              {design.link ? <ExternalLink size={32} /> : <Search size={32} />}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            onMouseMove={handleMouseMove}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              cursor: 'zoom-out',
              perspective: 1200 // Adds depth to the 3D rotation
            }}
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                zIndex: 110
              }}
            >
              <X size={32} />
            </motion.button>

            <motion.div
              style={{
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                transformStyle: 'preserve-3d',
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Fullscreen view"
                style={{
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255,255,255,0.05)',
                  display: 'block' // Removes tiny bottom margin from inline elements
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

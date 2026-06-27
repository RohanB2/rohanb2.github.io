import { useEffect, useRef, useState } from 'react'
import { designs } from '../data/content'
import { Search, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Design() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

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
    if (selectedIndex === null) {
      mouseX.set(0)
      mouseY.set(0)
    }
  }, [selectedIndex, mouseX, mouseY])

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null)
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev !== null && prev === designs.length - 1 ? 0 : prev! + 1))
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev !== null && prev === 0 ? designs.length - 1 : prev! - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex])

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

  const selectedDesign = selectedIndex !== null ? designs[selectedIndex] : null;

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: 700 }}>Graphic Design</h2>
      
      <div ref={gridRef} className="design-grid">
        {designs.map((design, index) => (
          <div 
            key={design.id} 
            className="design-item"
            onClick={() => {
              if (design.link) {
                // If they click the grid item, open in new tab directly (as requested originally)
                window.open(design.link, '_blank')
              } else {
                setSelectedIndex(index)
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
        {selectedDesign && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
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

            {/* Left Nav Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex((prev) => (prev !== null && prev === 0 ? designs.length - 1 : prev! - 1))
              }}
              style={{
                position: 'absolute',
                left: '2rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                zIndex: 110,
                padding: '1rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)'
              }}
            >
              <ChevronLeft size={32} />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDesign.id} // Animate when the image changes
                style={{
                  rotateX: smoothRotateX,
                  rotateY: smoothRotateY,
                  transformStyle: 'preserve-3d',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.5rem'
                }}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: -20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedDesign.src}
                  alt={selectedDesign.alt}
                  style={{
                    maxWidth: '90vw',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255,255,255,0.05)',
                    display: 'block'
                  }}
                />
                
                {selectedDesign.link && (
                  <motion.a
                    href={selectedDesign.link}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: 'white',
                      color: 'black',
                      borderRadius: '9999px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    Open Project <ExternalLink size={16} />
                  </motion.a>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Right Nav Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex((prev) => (prev !== null && prev === designs.length - 1 ? 0 : prev! + 1))
              }}
              style={{
                position: 'absolute',
                right: '2rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                zIndex: 110,
                padding: '1rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)'
              }}
            >
              <ChevronRight size={32} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

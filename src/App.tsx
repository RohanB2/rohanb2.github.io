import { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { play } from 'cuelume'

import About from './components/About'
import Education from './components/Education'
import Work from './components/Work'
import Projects from './components/Projects'
import Design from './components/Design'
import Contact from './components/Contact'
import ParticleNetwork from './components/ParticleNetwork'
import { AnimatedGithubIcon, AnimatedLinkedinIcon, ThemeToggle } from './components/Icons'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [activeSection, setActiveSection] = useState<'about' | 'education' | 'work' | 'projects' | 'design' | 'contact'>('about')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    play('tick')
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'work', label: 'Work' },
    { id: 'projects', label: 'Projects' },
    { id: 'design', label: 'Design' },
    { id: 'contact', label: 'Contact' },
  ] as const

  return (
    <div className="app-container">
      <ParticleNetwork />
      
      {/* Left Pane (Fixed/Sticky) */}
      <div className="left-pane">
        <div className="left-pane-content">
          <div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.1, marginBottom: '0.5rem' }}>
              <span className="reveal-text">Rohan Batra</span>
            </h1>
            {/* <h2 style={{ fontSize: '1.25rem', fontWeight: 400, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Engineer & Graphic Designer
            </h2> */}
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '4rem', flexGrow: 1 }}>
            {navItems.map((item) => (
              <div key={item.id}>
                <span 
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => {
                    play('tick')
                    setActiveSection(item.id)
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </nav>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: 'auto' }}>
            <a href="https://github.com/RohanB2" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <AnimatedGithubIcon />
            </a>
            <a href="https://www.linkedin.com/in/rohan-batra-87a20022a/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <AnimatedLinkedinIcon />
            </a>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>

      {/* Right Pane (Dynamic Content) */}
      <div className="right-pane">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {activeSection === 'about' && <About />}
            {activeSection === 'education' && <Education />}
            {activeSection === 'work' && <Work />}
            {activeSection === 'projects' && <Projects />}
            {activeSection === 'design' && <Design />}
            {activeSection === 'contact' && <Contact />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App

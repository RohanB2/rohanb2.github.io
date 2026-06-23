import { about } from '../data/content'

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '70vh' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: 700 }}>About</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        {about.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

import { about } from '../data/content'

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 12rem)' }}>
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: 700 }}>About</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        {about.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      </div>
    </div>
  )
}

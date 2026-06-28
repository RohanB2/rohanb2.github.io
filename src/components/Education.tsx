import { education } from '../data/content'

export default function Education() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 12rem)' }}>
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: 700 }}>Education</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {education.map((item, index) => (
          <div key={index} className="content-item" style={{ marginBottom: 0 }}>
            <h3 className="content-title" style={{ marginBottom: '0.25rem' }}>{item.institution}</h3>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              {item.degree}
            </div>
            <p className="content-desc" style={{ whiteSpace: 'pre-line' }}>{item.description}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

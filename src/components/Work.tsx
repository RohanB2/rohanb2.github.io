import { work } from '../data/content'

export default function Work() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 12rem)' }}>
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: 700 }}>Work</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {work.map((item, index) => (
          <div key={index} className="content-item" style={{ marginBottom: 0 }}>
            <h3 className="content-title" style={{ marginBottom: '0.25rem' }}>{item.company}</h3>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              {item.role} <span style={{ color: 'var(--text-tertiary)', textTransform: 'none', letterSpacing: 'normal' }}>• {item.period}</span>
            </div>
            <p className="content-desc" style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: item.description }} />
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

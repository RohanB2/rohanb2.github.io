import { education, work } from '../data/content'

export default function Experience() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Education Section */}
      <section>
        <div style={{ 
          fontSize: '0.75rem', 
          letterSpacing: '0.1em', 
          fontWeight: 600, 
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.5rem'
        }}>
          Education
        </div>
        
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
      </section>

      {/* Work Section */}
      <section>
        <div style={{ 
          fontSize: '0.75rem', 
          letterSpacing: '0.1em', 
          fontWeight: 600, 
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.5rem'
        }}>
          Work
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {work.map((item, index) => (
            <div key={index} className="content-item" style={{ marginBottom: 0 }}>
              <h3 className="content-title" style={{ marginBottom: '0.25rem' }}>{item.company}</h3>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                {item.role} <span style={{ color: 'var(--text-tertiary)', textTransform: 'none', letterSpacing: 'normal' }}>• {item.period}</span>
              </div>
              <p className="content-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

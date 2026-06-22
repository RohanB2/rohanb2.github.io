import { projects } from '../data/content'

export default function Projects() {
  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: 700 }}>Projects</h2>
      
      <div>
        {projects.map((project, index) => (
          <div key={index} className="content-item">
            <div className="content-meta">{project.tech.join(' · ')}</div>
            <h3 className="content-title" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {project.title}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a href={project.github} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-tertiary)', textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.textDecorationColor = 'currentColor'} onMouseOut={(e) => e.currentTarget.style.textDecorationColor = 'transparent'}>View Repo ↗</a>
                {/* demo text */}
                {/* <a href={project.demo} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-tertiary)', textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.textDecorationColor = 'currentColor'} onMouseOut={(e) => e.currentTarget.style.textDecorationColor = 'transparent'}>Demo ↗</a> */}
              </div>
            </h3>
            <div className="content-separator"></div>
            <p className="content-desc" style={{ whiteSpace: 'pre-line' }}>{project.description}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

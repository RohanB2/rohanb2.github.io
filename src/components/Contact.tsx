export default function Contact() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 12rem)' }}>
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: 700 }}>Get In Touch</h2>
      
      <div className="content-item">
        <h3 className="content-title">Let's build something together.</h3>
        <div className="content-separator"></div>
        <p className="content-desc" style={{ marginBottom: '2rem' }}>
          Contact me here!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
            <span className="content-meta" style={{ width: '80px', margin: 0 }}>Email</span>
            <a href="mailto:rohanbatra440@gmail.com" style={{ fontWeight: 500, textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.textDecorationColor = 'currentColor'} onMouseOut={(e) => e.currentTarget.style.textDecorationColor = 'transparent'}>rohanbatra440@gmail.com</a>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
            <span className="content-meta" style={{ width: '80px', margin: 0 }}>Social</span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://github.com/RohanB2" style={{ fontWeight: 500, textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.textDecorationColor = 'currentColor'} onMouseOut={(e) => e.currentTarget.style.textDecorationColor = 'transparent'}>GitHub</a>
              <a href="https://www.linkedin.com/in/rohan-batra-87a20022a/" style={{ fontWeight: 500, textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.textDecorationColor = 'currentColor'} onMouseOut={(e) => e.currentTarget.style.textDecorationColor = 'transparent'}>LinkedIn</a>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
            <span className="content-meta" style={{ width: '80px', margin: 0 }}>Location</span>
            <span style={{ fontWeight: 500 }}>Northern Virginia / Charlottesville, VA</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

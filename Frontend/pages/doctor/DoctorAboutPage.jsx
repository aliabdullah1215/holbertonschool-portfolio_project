import { Link } from 'react-router-dom';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const doctorAboutFeatures = [
  {
    title: 'Professional visibility',
    text: 'Present your nutrition expertise in a clear, trusted profile clients can understand.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  },
  {
    title: 'Verified profile',
    text: 'Profile review helps clients know your information was checked before appearing.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Client connection',
    text: 'Share the right contact details so clients can reach you for professional guidance.',
    icon: (
      <svg {...iconProps}>
        <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
      </svg>
    ),
  },
  {
    title: 'Human support layer',
    text: 'Support users who need expert advice alongside personalized nutrition planning.',
    icon: (
      <svg {...iconProps}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

const doctorAboutSteps = [
  {
    number: '1',
    title: 'Create account',
    text: 'Register as a doctor and enter your professional workspace.',
    icon: (
      <svg {...iconProps}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Submit details',
    text: 'Add your specialty, contact information, and certificate file.',
    icon: (
      <svg {...iconProps}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Profile review',
    text: 'The platform reviews your application before showing it to clients.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '4',
    title: 'Appear to clients',
    text: 'Approved profiles become visible inside the Medical Support area.',
    icon: (
      <svg {...iconProps}>
        <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    number: '5',
    title: 'Support care',
    text: 'Clients can contact you for nutrition guidance and consultation.',
    icon: (
      <svg {...iconProps}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </svg>
    ),
  },
];

function DoctorAboutPage() {
  return (
    <article className="workspace-card workspace-card--section client-about-page doctor-about-page">
      <style>{`
        body {
          background: #1C5C2E;
        }

        .doctor-about-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: transparent;
          width: 100%;
          box-sizing: border-box;
        }

        .doctor-about-page .client-about-hero {
          text-align: center;
          padding: 24px 0 56px;
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Updated to match the exact home page pill design */
        .doctor-about-page .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #E2F0E6;
          color: #1C5C2E;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 999px;
          margin-bottom: 24px;
          border: 1px solid #D1E7D6;
        }

        .doctor-about-page .client-about-hero h1 {
          font-size: clamp(38px, 4.5vw, 54px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -2px;
          color: #1C5C2E;
          margin: 0 0 20px;
        }

        /* Styling to target the specific split coloring like "Partner with DataDiet" */
        .doctor-about-page .client-about-hero h1 span.highlight {
          color: #2E8B57;
        }

        .doctor-about-page .client-about-hero p {
          font-size: 17px;
          line-height: 1.65;
          color: #3D5445 !important;
          margin: 0 0 32px;
          font-weight: 500;
          max-width: 720px;
        }

        /* Home Page Action Buttons Integration */
        .doctor-about-page .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
        }

        .doctor-about-page .btn-primary {
          background: #1C5C2E;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 14px;
          padding: 14px 24px;
          border-radius: 999px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(28, 92, 46, 0.15);
          transition: transform 0.2s, background 0.2s;
        }

        .doctor-about-page .btn-primary:hover {
          background: #154522;
          transform: translateY(-2px);
        }

        .doctor-about-page .btn-secondary {
          background: #FFFFFF;
          color: #1C5C2E;
          font-weight: 700;
          font-size: 14px;
          padding: 14px 24px;
          border-radius: 999px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #DFF0E5;
          transition: transform 0.2s, background 0.2s;
        }

        .doctor-about-page .btn-secondary:hover {
          background: #F4FAF6;
          transform: translateY(-2px);
        }

        .doctor-about-page .client-about-section {
          padding: 56px 0;
          border-top: 1px solid #DFF0E5;
          margin-top: 0;
        }

        .doctor-about-page .client-about-section__header--centered {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 44px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .doctor-about-page .client-about-section__header--centered h2 {
          font-size: 32px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -1.2px;
          color: #1C5C2E;
          margin: 0 0 14px;
        }

        .doctor-about-page .client-about-section__header--centered p {
          font-size: 15px;
          line-height: 1.6;
          color: #3D5445 !important;
          margin: 0;
          font-weight: 500;
        }

        .doctor-about-page .client-about-feature-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .doctor-about-page .client-about-steps-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        .doctor-about-page .client-about-feature-card,
        .doctor-about-page .client-about-step-card {
          background: #FFFFFF;
          border: 1px solid #DFF0E5;
          border-radius: 24px;
          padding: 28px 24px;
          box-shadow: 0 10px 30px rgba(28,92,46,0.015), 0 2px 6px rgba(0,0,0,0.015);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          box-sizing: border-box;
        }

        .doctor-about-page .client-about-feature-card:hover,
        .doctor-about-page .client-about-step-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 40px rgba(28,92,46,0.05), 0 4px 12px rgba(0,0,0,0.025);
          border-color: rgba(46,139,87,0.25);
        }

        .doctor-about-page .card-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          background: #F0F7F1;
          color: #2E8B57;
          border-radius: 12px;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        .doctor-about-page .card-icon-wrapper svg {
          width: 20px;
          height: 20px;
        }

        .doctor-about-page .client-about-feature-card h3,
        .doctor-about-page .client-about-step-card h3 {
          font-size: 17px;
          font-weight: 800;
          color: #1C5C2E;
          margin: 0 0 10px;
          line-height: 1.35;
          letter-spacing: -0.3px;
        }

        .doctor-about-page .client-about-feature-card p,
        .doctor-about-page .client-about-step-card p {
          font-size: 13.5px;
          line-height: 1.55;
          color: #3D5445 !important;
          margin: 0;
          font-weight: 500;
        }

        .doctor-about-page .client-about-step-card {
          position: relative;
          padding-top: 48px;
        }

        .doctor-about-page .step-numeric-badge {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10.5px;
          font-weight: 800;
          background: #F0F7F1;
          color: #1C5C2E;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: -0.2px;
        }

        .doctor-about-page .footer {
          background: #1C5C2E;
          padding: 50px 0 38px;
          width: calc(100% + 84px);
          margin: 56px -42px -42px;
          border-radius: 0 0 24px 24px;
        }

        .doctor-about-page .footer-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 60px;
        }

        .doctor-about-page .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 26px;
        }

        .doctor-about-page .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .doctor-about-page .footer-logo-icon {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        .doctor-about-page .footer-logo-text {
          color: white;
          font-size: 18px;
          font-weight: 800;
        }

        .doctor-about-page .footer-links {
          display: flex;
          gap: 24px;
        }

        .doctor-about-page .footer-links a {
          text-decoration: none;
          color: rgba(255,255,255,0.70);
          font-size: 14px;
          font-weight: 600;
          transition: 0.25s ease;
        }

        .doctor-about-page .footer-links a:hover {
          color: white;
        }

        .doctor-about-page .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.12);
          margin-bottom: 24px;
        }

        .doctor-about-page .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .doctor-about-page .footer-copy,
        .doctor-about-page .footer-tagline {
          color: rgba(255,255,255,0.50);
          font-size: 13px;
        }

        @media (max-width: 1400px) {
          .doctor-about-page .client-about-steps-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1100px) {
          .doctor-about-page .client-about-feature-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .doctor-about-page .client-about-steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .doctor-about-page .client-about-hero h1 {
            font-size: 34px;
          }

          .doctor-about-page .client-about-section__header--centered h2 {
            font-size: 26px;
          }

          .doctor-about-page .footer {
            width: calc(100% + 56px);
            margin-inline: -28px;
          }

          .doctor-about-page .footer-container {
            padding: 0 24px;
          }

          .doctor-about-page .footer-inner,
          .doctor-about-page .footer-bottom {
            flex-direction: column;
            gap: 18px;
            text-align: center;
          }

          .doctor-about-page .footer-links {
            justify-content: center;
            gap: 16px;
          }
        }

        @media (max-width: 540px) {
          .doctor-about-page .client-about-feature-grid,
          .doctor-about-page .client-about-steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="client-about-hero">
        {/* Updated Badge Match */}
        <span className="eyebrow">
          <i className="fas fa-user-md"></i> Clinical & Specialist Workspace
        </span>
        
        {/* Highlight split color matching */}
        <h1>Build a trusted doctor profile <span className="highlight">clients can rely on.</span></h1>
        
        <p>
          Data Diet helps nutrition specialists present their expertise, complete
          profile approval, and connect with clients who need professional support.
        </p>

        {/* Home page button pair styling addition */}
        <div className="hero-actions">
          <Link to="/doctor/signup" className="btn-primary">
            <i className="fas fa-file-medical"></i> Join Our Medical Team
          </Link>
          <Link to="/doctor/features" className="btn-secondary">
            <i className="fas fa-plus-square"></i> Why DataDiet
          </Link>
        </div>
      </section>

      <section className="client-about-section">
        <div className="client-about-section__header--centered">
          <span className="eyebrow">Why DataDiet?</span>
          <h2>A cleaner path from profile approval to client support.</h2>
          <p>The doctor workspace keeps onboarding clear, verified, and easy to understand.</p>
        </div>

        <div className="client-about-feature-grid">
          {doctorAboutFeatures.map((feature) => (
            <article className="client-about-feature-card" key={feature.title}>
              <div className="card-icon-wrapper">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="client-about-section">
        <div className="client-about-section__header--centered">
          <span className="eyebrow">Doctor flow</span>
          <h2>How doctors join Data Diet</h2>
          <p>From application to approval, every step is designed to feel straightforward.</p>
        </div>

        <div className="client-about-steps-grid">
          {doctorAboutSteps.map((step) => (
            <article className="client-about-step-card" key={step.number}>
              <div className="step-numeric-badge">{step.number}</div>
              <div className="card-icon-wrapper" style={{ color: '#1C5C2E' }}>
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-inner">
            <div className="footer-logo">
              <img src="https://www.image2url.com/r2/default/images/1779771082419-77f45caf-4ccd-438f-95c7-0caabce26494.png" alt="DataDiet" className="footer-logo-icon" />
              <div className="footer-logo-text">DataDiet</div>
            </div>

            <div className="footer-links">
              <Link to="/doctor/contact">Contact Us</Link>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <div className="footer-copy">© 2026 DataDiet. All rights reserved.</div>
            <div className="footer-tagline">Built with care for healthier lives 🌱</div>
          </div>
        </div>
      </footer>
    </article>
  );
}

export default DoctorAboutPage;

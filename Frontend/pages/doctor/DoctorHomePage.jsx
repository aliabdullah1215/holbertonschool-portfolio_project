import { Link } from 'react-router-dom';

export default function DoctorHomePage() {
  return (
    <div className="doctor-home-page">
      <style>{`
        :root {
          --green-deep: #1C5C2E;
          --green-mid: #2E8B57;
          --bg-mint: #F0F7F1;
          --text-body: #3D5445;
          --border-light: #DFF0E5;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          width: 100%;
          min-height: 100%;
          margin: 0;
          padding: 0;
        }

        body {
          overflow-x: hidden;
          background: var(--green-deep);
        }

        .doctor-home-page {
          width: 100%;
          background: var(--bg-mint);
          overflow-x: hidden;
        }

        .hero {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          padding: 18px 0 64px;
          margin: 0;
          overflow: hidden;
          background: var(--bg-mint);
        }

        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 60px;
          position: relative;
          z-index: 2;
        }

        .hero .container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-inner {
          width: 100%;
          max-width: 860px;
          margin: 0 auto; 
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(46,139,87,0.12);
          color: var(--green-mid);
          font-size: 15px;
          font-weight: 700;
          padding: 10px 22px;
          border-radius: 999px;
          border: 1px solid rgba(46,139,87,0.25);
          margin-bottom: 24px;
        }

        .hero-heading {
          font-size: clamp(40px, 4.8vw, 64px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -2px;
          color: var(--green-deep);
          margin-bottom: 20px;
        }

        .hero-heading span {
          color: var(--green-mid);
        }

        .hero-subtext {
          font-size: clamp(16px, 1.6vw, 20px);
          line-height: 1.65;
          color: var(--text-body);
          margin-bottom: 36px;
          max-width: 700px;
        }

        .hero-ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--green-mid), var(--green-deep));
          color: white;
          border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 16px 34px;
          border-radius: 999px;
          cursor: pointer;
          transition: 0.25s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          box-shadow: 0 10px 28px rgba(46,139,87,0.25);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
        }

        .btn-secondary {
          background: white;
          border: 2px solid var(--border-light);
          color: var(--green-deep);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 16px 34px;
          border-radius: 999px;
          text-decoration: none;
          transition: 0.25s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-secondary:hover {
          transform: translateY(-3px);
          border-color: var(--green-mid);
          box-shadow: 0 8px 24px rgba(28,92,46,0.10);
        }

        .footer {
          background: var(--green-deep);
          padding: 50px 0 38px;
          width: 100%;
          margin: 0 0 -8px;
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 26px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-logo-icon {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        .footer-logo-text {
          color: white;
          font-size: 18px;
          font-weight: 800;
        }

        .footer-links {
          display: flex;
          gap: 24px;
        }

        .footer-links a {
          text-decoration: none;
          color: rgba(255,255,255,0.70);
          font-size: 14px;
          font-weight: 600;
          transition: 0.25s ease;
        }

        .footer-links a:hover {
          color: white;
        }

        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.12);
          margin-bottom: 24px;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-copy,
        .footer-tagline {
          color: rgba(255,255,255,0.50);
          font-size: 13px;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 32px 20px 60px;
            min-height: auto;
          }

          .container {
            padding: 0 24px;
          }

          .footer-inner,
          .footer-bottom {
            flex-direction: column;
            gap: 18px;
            text-align: center;
          }

          .footer-links {
            justify-content: center;
            gap: 16px;
          }

          .hero-heading {
            font-size: 48px;
          }
        }

        @media (max-width: 480px) {
          .hero-ctas {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .hero-heading {
            font-size: 40px;
          }
        }
      `}</style>

      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-label">
              <i className="fas fa-user-md"></i>
              Clinical & Specialist Workspace
            </div>

            <h1 className="hero-heading">
              Partner with <span>DataDiet.</span>
            </h1>

            <p className="hero-subtext">
              Join our trusted network of certified nutrition specialists.
              Validate patient assessment metrics, supervise automated plan
              layouts, and provide professional guidance to support users on
              their wellness journeys.
            </p>

            <div className="hero-ctas">
              <Link to="/doctor/join" className="btn-primary">
                <i className="fas fa-file-medical"></i>
                Join Our Medical Team
              </Link>

              <Link to="/doctor/about" className="btn-secondary">
                <i className="fas fa-book-medical"></i>
                Why DataDiet
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <img src="https://www.image2url.com/r2/default/images/1779771082419-77f45caf-4ccd-438f-95c7-0caabce26494.png" alt="DataDiet" className="footer-logo-icon" />
              <div className="footer-logo-text">DataDiet</div>
            </div>

            <div className="footer-links">
              <Link to="/doctor/contact">Contact Us</Link>
              <Link to="/doctor/team">Our Team</Link>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <div className="footer-copy">
              © 2026 DataDiet. All rights reserved.
            </div>

            <div className="footer-tagline">
              Built with care for healthier lives 🌱
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

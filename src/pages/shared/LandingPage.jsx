import { Link } from 'react-router-dom';
import LogoMark from '../../components/branding/LogoMark';

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero-card hero-card--minimal">
        <div className="hero-copy">
          <LogoMark compact />
          <h1>Data Diet</h1>
          <p>Simple access to personalized nutrition support.</p>

          <div className="hero-actions">
            <Link className="primary-link" to="/register">
              Create Account
            </Link>
            <Link className="ghost-link" to="/login">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

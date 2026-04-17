import { Link } from 'react-router-dom';

const highlights = [
  'A clear client journey separated from the doctor journey',
  'A page structure that can scale without becoming messy',
  'Authentication and role-based routing prepared early',
];

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Data Diet</span>
          <h1>A digital nutrition platform with an organized build path</h1>
          <p>
            We are currently focused on building the core pages and structured
            navigation before moving into feature-by-feature implementation.
          </p>

          <div className="hero-actions">
            <Link className="primary-link" to="/register">
              Create Account
            </Link>
            <Link className="ghost-link" to="/login">
              Sign In
            </Link>
          </div>
        </div>

        <div className="hero-note">
          <h2>What is ready so far?</h2>
          <ul>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-grid">
        <article className="section-card">
          <h2>Client Journey</h2>
          <p>Registration, sign-in, a structured dashboard, and dedicated sections ready for growth.</p>
          <Link className="text-link" to="/client">
            View Client Dashboard
          </Link>
        </article>

        <article className="section-card">
          <h2>Doctor Journey</h2>
          <p>A clear dashboard and a dedicated path for future onboarding and review.</p>
          <Link className="text-link" to="/doctor">
            View Doctor Dashboard
          </Link>
        </article>

        <article className="section-card">
          <h2>Authentication</h2>
          <p>Sign-in and registration are separated cleanly and already connected to the active auth flow.</p>
          <Link className="text-link" to="/login">
            Go to Sign In
          </Link>
        </article>
      </section>
    </div>
  );
}

export default LandingPage;

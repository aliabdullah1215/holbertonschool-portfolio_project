import { Link } from 'react-router-dom';
import LogoMark from '../../components/branding/LogoMark';

const featureIcons = {
  nutrition: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21c4.2-2.4 7-6.3 7-10.7V5.2L12 3 5 5.2v5.1C5 14.7 7.8 18.6 12 21Z" />
      <path d="M9 12.2 11 14l4-4.5" />
    </svg>
  ),
  history: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h13a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3V5Z" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
    </svg>
  ),
  meals: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v8" />
      <path d="M5 3v8" />
      <path d="M9 3v8" />
      <path d="M5 11h4v10" />
      <path d="M16 3c2 1.7 3 4.1 3 7v11" />
    </svg>
  ),
  edits: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 16.5V20h3.5L18 9.5 14.5 6 4 16.5Z" />
      <path d="M13.5 7 17 10.5" />
      <path d="M5 5h6" />
    </svg>
  ),
  doctors: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M4.5 20c.8-3.6 3.5-5.5 7.5-5.5s6.7 1.9 7.5 5.5" />
      <path d="M18 5v4" />
      <path d="M16 7h4" />
    </svg>
  ),
};

const steps = [
  {
    number: '1',
    title: 'Choose your role',
    text: 'Register as a client or doctor and access the right workspace.',
  },
  {
    number: '2',
    title: 'Complete your intake',
    text: 'Clients answer a guided nutrition questionnaire built around real goals.',
  },
  {
    number: '3',
    title: 'Generate your plan',
    text: 'Get calories, macros, meals, and a shopping list from one AI plan.',
  },
  {
    number: '4',
    title: 'Adjust with ease',
    text: 'Replace meals, swap ingredients, or make meals quicker and cheaper.',
  },
  {
    number: '5',
    title: 'Find expert support',
    text: 'Browse approved doctors when you need professional guidance.',
  },
];
const features = [
  {
    icon: featureIcons.nutrition,
    title: 'Personalized nutrition',
    text: 'Plans adapt to goals, activity, food preferences, allergies, and restrictions.',
  },
  {
    icon: featureIcons.history,
    title: 'Clear plan history',
    text: 'Every generated plan is saved automatically so clients can return to it later.',
  },
  {
    icon: featureIcons.meals,
    title: 'Practical meal details',
    text: 'Review calories, macros, meals, prep time, food tags, and shopping items.',
  },
  {
    icon: featureIcons.edits,
    title: 'Local meal edits',
    text: 'Simple changes happen instantly without sending another AI request.',
  },
  {
    icon: featureIcons.doctors,
    title: 'Doctor verification',
    text: 'Doctors submit professional details and certificates before appearing to clients.',
  },
];


function LandingPage() {
  return (
    <div className="landing-page landing-page--public" id="top">
      <header className="landing-nav">
        <div className="landing-nav__brand">
          <LogoMark />
        </div>


        <nav className="landing-nav__links" aria-label="Main navigation">
          <a href="#top">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M5.5 10.5V20h13v-9.5" />
              <path d="M9.5 20v-6h5v6" />
            </svg>
            Home
          </a>
          <a href="#how-it-works">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 10v6" />
              <path d="M12 7.5h.01" />
            </svg>
            About
          </a>
        </nav>



        <div className="landing-nav__actions">
          <Link className="ghost-link" to="/login">
            Sign In
          </Link>
          <Link className="primary-link" to="/register">
            Create Account
          </Link>
        </div>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero__copy">
            <span className="eyebrow">AI nutrition planning with expert support</span>
            <h1>Build a nutrition plan that fits real life.</h1>
            <p>
              Data Diet helps clients generate personalized AI meal plans, save them,
              adjust meals locally, and connect with approved doctors when support is needed.
            </p>

            <div className="hero-actions">
              <Link className="primary-link" to="/register">
                Start as Client
              </Link>
              <a className="ghost-link" href="#doctors">
                Join as Doctor
              </a>
            </div>
          </div>

          <aside className="product-preview" aria-label="Nutrition plan preview">
            <div className="product-preview__top">
              <span className="eyebrow">Plan Summary</span>
              <strong>Weight Loss Plan</strong>
            </div>

            <div className="preview-macros">
              <div>
                <span>Calories</span>
                <strong>1,850</strong>
              </div>
              <div>
                <span>Protein</span>
                <strong>135g</strong>
              </div>
              <div>
                <span>Meals</span>
                <strong>4/day</strong>
              </div>
            </div>

            <div className="preview-meal">
              <span>Breakfast</span>
              <strong>Greek yogurt bowl</strong>
              <p>Quick, high protein, budget friendly</p>
            </div>

            <div className="preview-actions">
              <span>Make quicker</span>
              <span>Replace meal</span>
              <span>Shopping list</span>
            </div>
          </aside>
        </section>

        <section className="landing-section" id="how-it-works">
          <div className="landing-section__header">
            <span className="eyebrow">Simple flow</span>
            <h2>How Data Diet works</h2>
            <p>From intake to saved plans and medical support, the experience stays guided.</p>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section" id="features">
          <div className="landing-section__header">
            <span className="eyebrow">Why choose Data Diet?</span>
            <h2>AI plans that stay useful after generation.</h2>
            <p>The platform is designed around practical nutrition, saved progress, and human support.</p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-card__icon">{feature.icon}</div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="doctor-cta-section" id="doctors">
          <div className="doctor-cta-section__content">
            <span className="eyebrow">For doctors</span>
            <h2>Apply, get reviewed, and appear to clients after approval.</h2>
            <p>
              Doctor accounts can submit professional details and a certificate file.
              Approved profiles become visible in the client medical support page.
            </p>
          </div>

          <div className="doctor-cta-section__action">
            <Link className="primary-link" to="/register">
              Register as Doctor
            </Link>
          </div>
        </section>

        <section className="final-cta-section">
          <span className="eyebrow">Start today</span>
          <h2>Ready to build your first nutrition plan?</h2>
          <p>
            Create an account, complete the guided questionnaire, and generate a reusable plan.
          </p>

          <div className="final-cta-section__actions">
            <Link className="primary-link" to="/register">
              Create Account
            </Link>
            <Link className="ghost-link" to="/login">
              Sign In
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;

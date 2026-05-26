import { Link } from 'react-router-dom';

const aboutSteps = [
  {
    number: '1',
    title: 'Choose your role',
    text: 'Register as a client or doctor and access to the workspace.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Complete your intake',
    text: 'Clients answer a guided nutrition questionnaire built around real goals.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Generate your plan',
    text: 'Get calories, macros, meals, and a shopping list from one AI plan.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
  {
    number: '4',
    title: 'Adjust with ease',
    text: 'Replace meals, and make meals quicker.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    number: '5',
    title: 'Find expert support',
    text: 'Browse Nutritionists when you need professional guidance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

const aboutFeatures = [
  {
    title: 'Personalized nutrition',
    text: 'Plans adapt to goals, activity, food preferences, allergies, and restrictions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Clear plan history',
    text: 'Every generated plan is saved automatically so clients can return to it later and download it.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Practical meal details',
    text: 'Review calories, macros, meals, prep time, food tags, and shopping items.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: 'Meal edits',
    text: 'Simple structural changes happen instantly on your dashboard workspace.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l-7 4a2 2 0 0 0-2 0l-7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

export default function ClientAboutPage() {
  return (
    <article className="workspace-card workspace-card--section client-about-page">
      <style>{`
        :root {
          --green-deep: #1C5C2E;
          --green-mid: #2E8B57;
          --green-secondary: #4A7C59;
          --green-light: #6BAF7E;
          --bg-mint: #F0F7F1;
          --white: #FFFFFF;
          --text-dark: #1C2B1E;
          --text-body: #3D5445;
          --text-secondary: #4A7C59;
          --border-light: #DFF0E5;
        }

        .client-about-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: transparent;
          width: 100%;
          box-sizing: border-box;
        }

        /* CENTERED HERO JUMBOTRON LAYOUT */
        .client-about-hero {
          text-align: center;
          padding: 24px 0 56px 0;
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .client-about-hero .eyebrow {
          display: inline-flex;
          align-items: center;
          background: rgba(46,139,87,0.10);
          color: var(--green-mid);
          font-size: 11px;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 22px;
          text-transform: uppercase;
          letter-spacing: 0.75px;
        }

        .client-about-hero h1 {
          font-size: clamp(38px, 4.5vw, 52px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -2px;
          color: var(--green-deep);
          margin: 0 0 20px 0;
        }

        .client-about-hero p {
          font-size: 16.5px;
          line-height: 1.65;
          color: var(--text-body);
          margin: 0;
          font-weight: 500;
          max-width: 720px;
        }

        /* STRUCTURAL CONTENT DIVISION CONTAINER */
        .client-about-section {
          padding: 56px 0;
          border-top: 1px solid var(--border-light);
        }

        /* CENTERED ZONEHEADER MODULE */
        .client-about-section__header--centered {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 44px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .client-about-section__header--centered .eyebrow {
          display: inline-flex;
          align-items: center;
          background: rgba(46,139,87,0.10);
          color: var(--green-mid);
          font-size: 11px;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 18px;
          text-transform: uppercase;
          letter-spacing: 0.75px;
        }

        .client-about-section__header--centered h2 {
          font-size: 32px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -1.2px;
          color: var(--green-deep);
          margin: 0 0 14px 0;
        }

        .client-about-section__header--centered p {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-body);
          margin: 0;
          font-weight: 500;
        }

        /* LAYOUT CORE GRID MODULES */
        .client-about-feature-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .client-about-steps-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        /* SHARP DECORATIVE CARDS CONFIGURATION - FULLY CENTERED INTERNAL TEXT & ITEMS */
        .client-about-feature-card,
        .client-about-step-card {
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 24px;
          padding: 28px 24px;
          box-shadow: 0 10px 30px rgba(28,92,46,0.015), 0 2px 6px rgba(0,0,0,0.015);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), border-color 0.3s ease;
          box-sizing: border-box;
          cursor: pointer;
        }

        /* REFINED FLOATING PERSPECTIVES ON INTERACTION */
        .client-about-feature-card:hover,
        .client-about-step-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 40px rgba(28,92,46,0.05), 0 4px 12px rgba(0,0,0,0.025);
          border-color: rgba(46,139,87,0.25);
        }

        .card-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          background: var(--bg-mint);
          color: var(--green-mid);
          border-radius: 12px;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        .card-icon-wrapper svg {
          width: 20px;
          height: 20px;
        }

        .client-about-feature-card h3,
        .client-about-step-card h3 {
          font-size: 17px;
          font-weight: 800;
          color: var(--green-deep);
          margin: 0 0 10px 0;
          line-height: 1.35;
          letter-spacing: -0.3px;
        }

        .client-about-feature-card p,
        .client-about-step-card p {
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--text-body);
          margin: 0;
          font-weight: 500;
        }

        /* INTERNAL STEP COUNTER BADGING - MOVED TO TOP CENTER FOR TIDY SYMMETRY */
        .client-about-step-card {
          position: relative;
          padding-top: 48px; /* Room for the absolute top badge */
        }

        .step-numeric-badge {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10.5px;
          font-weight: 800;
          background: var(--bg-mint);
          color: var(--green-deep);
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: -0.2px;
        }

        /* RESPONSIVE CSS MEDIA QUERY OVERRIDES */
        @media (max-width: 1400px) {
          .client-about-steps-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1100px) {
          .client-about-feature-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .client-about-steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .client-about-hero h1 {
            font-size: 34px;
          }
          .client-about-section__header--centered h2 {
            font-size: 26px;
          }
        }

        @media (max-width: 540px) {
          .client-about-feature-grid,
          .client-about-steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* HERO COMPONENT BLOCK */}
      <section className="client-about-hero">
        <span className="eyebrow">AI nutrition planning with expert support</span>
        <h1>Build a nutrition plan that fits real life.</h1>
        <p>
          Data Diet helps clients generate personalized AI meal plans, save them,
          adjust meals, and connect with Nutritionists when support is needed.
        </p>
      </section>

      {/* FEATURES SEGMENT MODULE */}
      <section className="client-about-section">
        <div className="client-about-section__header--centered">
          <span className="eyebrow">Why choose Data Diet?</span>
          <h2>AI plans that stay useful after generation.</h2>
          <p>The platform is designed around practical nutrition, and human support.</p>
        </div>

        <div className="client-about-feature-grid">
          {aboutFeatures.map((feature) => (
            <article className="client-about-feature-card" key={feature.title}>
              <div className="card-icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FLOW INSTRUCTIONS SEGMENT MODULE */}
      <section className="client-about-section">
        <div className="client-about-section__header--centered">
          <span className="eyebrow">Simple flow</span>
          <h2>How Data Diet works</h2>
          <p>From intake to saved plans and medical support, the experience stays guided.</p>
        </div>

        <div className="client-about-steps-grid">
          {aboutSteps.map((step) => (
            <article className="client-about-step-card" key={step.number}>
              <div className="step-numeric-badge">{step.number}</div>
              <div className="card-icon-wrapper" style={{ color: 'var(--green-deep)' }}>
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}

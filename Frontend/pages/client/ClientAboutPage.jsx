const aboutSteps = [
  {
    number: '1',
    title: 'Choose your role',
    text: 'Register as a client or doctor and access to the workspace.',
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
    text: 'Replace meals, and make meals quicker.',
  },
  {
    number: '5',
    title: 'Find expert support',
    text: 'Browse Nutritionists when you need professional guidance.',
  },
];

const aboutFeatures = [
  {
    title: 'Personalized nutrition',
    text: 'Plans adapt to goals, activity, food preferences, allergies, and restrictions.',
  },
  {
    title: 'Clear plan history',
    text: 'Every generated plan is saved automatically so clients can return to it later and download it.',
  },
  {
    title: 'Practical meal details',
    text: 'Review calories, macros, meals, prep time, food tags, and shopping items.',
  },
  {
    title: 'meal edits',
    text: 'Simple changes happen instantly.',
  },
];

function ClientAboutPage() {
  return (
    <article className="workspace-card workspace-card--section client-about-page">
      <section className="client-about-hero">
        <span className="eyebrow">AI nutrition planning with expert support</span>
        <h1>Build a nutrition plan that fits real life.</h1>
        <p>
          Data Diet helps clients generate personalized AI meal plans, save them,
          adjust meals, and connect with Nutritionists when support is needed.
        </p>
      </section>

      <section className="client-about-section">
        <div className="client-about-section__header">
          <span className="eyebrow">Why choose Data Diet?</span>
          <h2>AI plans that stay useful after generation.</h2>
          <p>The platform is designed around practical nutrition, and human support.</p>
        </div>

        <div className="client-about-feature-grid">
          {aboutFeatures.map((feature) => (
            <article className="client-about-feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="client-about-section">
        <div className="client-about-section__header">
          <span className="eyebrow">Simple flow</span>
          <h2>How Data Diet works</h2>
          <p>From intake to saved plans and medical support, the experience stays guided.</p>
        </div>

        <div className="client-about-steps-grid">
          {aboutSteps.map((step) => (
            <article className="client-about-step-card" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}


export default ClientAboutPage;

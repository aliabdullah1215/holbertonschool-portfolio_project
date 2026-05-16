const doctorAboutSteps = [
  {
    number: '1',
    title: 'Create doctor account',
    text: 'Register as a doctor and access your professional workspace.',
  },
  {
    number: '2',
    title: 'Submit your profile',
    text: 'Add your specialty, contact details, and professional certificate.',
  },
  {
    number: '3',
    title: 'Wait for approval',
    text: 'The platform reviews your application before showing your profile.',
  },
  {
    number: '4',
    title: 'Appear to clients',
    text: 'Approved doctors become visible in the Medical Support section.',
  },
  {
    number: '5',
    title: 'Support clients',
    text: 'Clients can contact you for nutrition guidance and consultation.',
  },
];

const doctorAboutFeatures = [
  {
    title: 'Professional visibility',
    text: 'Show your expertise to clients looking for trusted nutrition support.',
  },
  {
    title: 'Verified profile',
    text: 'Approval helps clients know that your profile was reviewed by the platform.',
  },
  {
    title: 'Direct communication',
    text: 'Clients can use your shared contact details to request guidance.',
  },
  {
    title: 'Client support layer',
    text: 'Become part of the human support behind personalized nutrition planning.',
  },
];

function DoctorAboutPage() {
  return (
    <article className="workspace-card workspace-card--section client-about-page doctor-about-page">
      <section className="client-about-hero">
        <span className="eyebrow">Professional nutrition support</span>
        <h1>Grow your presence as a trusted nutrition specialist.</h1>
        <p>
          Data Diet helps doctors present their expertise, complete profile approval,
          and connect with clients who need professional nutrition guidance.
        </p>
      </section>

      <section className="client-about-section">
        <div className="client-about-section__header">
          <span className="eyebrow">Why join Data Diet?</span>
          <h2>A clear place for doctors to support real client needs.</h2>
          <p>The platform connects AI nutrition planning with verified professional support.</p>
        </div>

        <div className="client-about-feature-grid">
          {doctorAboutFeatures.map((feature) => (
            <article className="client-about-feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="client-about-section">
        <div className="client-about-section__header">
          <span className="eyebrow">Doctor flow</span>
          <h2>How doctors join and appear to clients</h2>
          <p>From application to approval, the journey keeps your profile clear and trusted.</p>
        </div>

        <div className="client-about-steps-grid">
          {doctorAboutSteps.map((step) => (
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

export default DoctorAboutPage;

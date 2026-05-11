function DoctorHomePage() {
  return (
    <article className="workspace-card workspace-card--section">
      <span className="eyebrow">Doctor Journey</span>
      <h2>Home</h2>
      <p>Your workspace for onboarding and profile follow-up.</p>

      <section className="content-hero">
        <div>
          <h3>Your next step</h3>
          <p>Complete your application and wait for review.</p>
        </div>
        <div className="content-highlight">
          <span className="eyebrow">Current focus</span>
          <p>Apply {'->'} Await review {'->'} Appear in Medical Support after approval</p>
        </div>
      </section>

      <div className="content-grid">
        <section className="content-card">
          <h3>Professional onboarding</h3>
          <p>Submit your specialty, contact details, and certificate.</p>
        </section>
        <section className="content-card">
          <h3>Trusted visibility</h3>
          <p>Only approved profiles appear for client support.</p>
        </section>
        <section className="content-card">
          <h3>Clear communication</h3>
          <p>Use the contact page if you need platform assistance.</p>
        </section>
      </div>
    </article>
  );
}

export default DoctorHomePage;

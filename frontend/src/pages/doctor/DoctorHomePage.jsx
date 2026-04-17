function DoctorHomePage() {
  return (
    <article className="workspace-card workspace-card--section">
      <span className="eyebrow">Doctor Journey</span>
      <h2>Home</h2>
      <p>
        Welcome to the doctor dashboard. This area helps specialists understand the
        platform, complete onboarding, and prepare to be listed for client support.
      </p>

      <section className="content-hero">
        <div>
          <h3>Your next step</h3>
          <p>
            Complete the doctor application with your professional details and certificate
            so the platform team can review your profile.
          </p>
        </div>
        <div className="content-highlight">
          <span className="eyebrow">Current focus</span>
          <p>Apply {'->'} Await review {'->'} Appear in Medical Support after approval</p>
        </div>
      </section>

      <div className="content-grid">
        <section className="content-card">
          <h3>Professional onboarding</h3>
          <p>
            Share your specialty, contact details, and educational certificate so your
            profile can be reviewed responsibly.
          </p>
        </section>
        <section className="content-card">
          <h3>Trusted visibility</h3>
          <p>
            Only approved doctors are shown to clients, which helps maintain quality and
            trust across the platform.
          </p>
        </section>
        <section className="content-card">
          <h3>Clear communication</h3>
          <p>
            Use the contact page for platform-related questions while your application is
            under review.
          </p>
        </section>
      </div>
    </article>
  );
}

export default DoctorHomePage;

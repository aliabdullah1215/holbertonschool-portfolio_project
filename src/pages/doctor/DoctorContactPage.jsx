function DoctorContactPage() {
  return (
    <article className="workspace-card workspace-card--section">
      <span className="eyebrow">Doctor Journey</span>
      <h2>Contact Us</h2>
      <p>
        Contact the platform administration for onboarding questions, profile review
        updates, or general partnership inquiries.
      </p>

      <div className="content-grid">
        <section className="content-card">
          <h3>Admin phone</h3>
          <p>+966 55 000 0000</p>
          <p>Use this channel for urgent onboarding questions during business hours.</p>
        </section>
        <section className="content-card">
          <h3>Admin email</h3>
          <p>doctors@datadiet.app</p>
          <p>Recommended for profile review follow-up and professional documentation questions.</p>
        </section>
        <section className="content-card">
          <h3>Before contacting us</h3>
          <p>
            Please keep your username and application details ready so the team can help
            you more quickly.
          </p>
        </section>
      </div>
    </article>
  );
}

export default DoctorContactPage;

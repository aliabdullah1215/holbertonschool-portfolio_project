function DoctorContactPage() {
  return (
    <article className="workspace-card workspace-card--section contact-page doctor-contact-page">
      <div className="contact-page__header">
        <h2>Contact our support team</h2>
        <p>Let us know how we can support your doctor profile</p>
      </div>

      <div className="contact-methods">
        <section className="contact-method-card">
          <h3>Email</h3>
          <p>Email - Profile review and documentation support.</p>
          <a href="mailto:doctors@datadiet.app">doctors@datadiet.app</a>
        </section>

        <section className="contact-method-card">
          <h3>Phone</h3>
          <p>Phone - Direct support for urgent onboarding questions.</p>
          <a href="tel:+966550000000">+966 55 000 0000</a>
        </section>

        <section className="contact-method-card">
          <h3>WhatsApp</h3>
          <p>WhatsApp - Quick help for doctor account support.</p>
          <a href="https://wa.me/966550000000" target="_blank" rel="noreferrer">
            +966 55 000 0000
          </a>
        </section>
      </div>
    </article>
  );
}

export default DoctorContactPage;

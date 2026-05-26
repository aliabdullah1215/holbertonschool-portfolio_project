function ClientContactPage() {
  return (
    <article className="workspace-card workspace-card--section contact-page">
      <style>{`
        body {
          background: #1C5C2E;
        }
      `}</style>
      <div className="contact-page__header">
        <h2>Contact our friendly team</h2>
        <p>Let us know how can we help you</p>
      </div>
      <div className="contact-methods">
        <section className="contact-method-card">
          <h3>Email</h3>
          <p>Email — Professional inbox support.</p>
          <a href="mailto:support@datadiet.app">support@datadiet.app</a>
        </section>

        <section className="contact-method-card">
          <h3>Phone</h3>
          <p>Phone — Direct expert assistance.</p>
          <a href="tel:+966500000000">+966 50 000 0000</a>
        </section>

        <section className="contact-method-card">
          <h3>WhatsApp</h3>
          <p>WhatsApp — Instant support.</p>
          <a href="https://wa.me/966500000000" target="_blank" rel="noreferrer">
            +966 50 000 0000
          </a>
        </section>
      </div>

    </article>

  );
}

export default ClientContactPage;

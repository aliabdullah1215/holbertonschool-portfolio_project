function ClientAboutPage() {
  return (
    <article className="workspace-card workspace-card--section">
      <span className="eyebrow">Client Journey</span>
      <h2>About the Platform</h2>
      <p>
        Data Diet is a digital nutrition platform built to make healthy planning more
        personalized, practical, and easier to access.
      </p>

      <div className="content-grid">
        <section className="content-card">
          <h3>Our mission</h3>
          <p>
            We aim to help users turn personal nutrition goals into clear next steps by
            combining guided tools, organized planning, and access to professional support.
          </p>
        </section>
        <section className="content-card">
          <h3>How the platform helps</h3>
          <p>
            Clients can explore AI-powered planning later, use quick health calculators,
            review plan history, and connect with approved doctors when needed.
          </p>
        </section>
        <section className="content-card">
          <h3>Why it matters</h3>
          <p>
            Nutrition guidance is more effective when it is relevant to the individual,
            easy to revisit, and supported by trustworthy specialists.
          </p>
        </section>
      </div>
    </article>
  );
}

export default ClientAboutPage;

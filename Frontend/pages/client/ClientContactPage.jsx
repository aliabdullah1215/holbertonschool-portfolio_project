function ClientContactPage() {
  return (
    <article className="workspace-card workspace-card--section">
      <span className="eyebrow">Client Journey</span>
      <h2>Contact Us</h2>
      <p>
        Reach the platform team through the support channels below for account help,
        onboarding questions, or general guidance.
      </p>

      <div className="content-grid">
        <section className="content-card">
          <h3>Phone support</h3>
          <p>+966 50 000 0000</p>
          <p>Available during standard working hours for general inquiries.</p>
        </section>
        <section className="content-card">
          <h3>Email</h3>
          <p>support@datadiet.app</p>
          <p>Best for follow-up questions, account issues, and onboarding requests.</p>
        </section>
        <section className="content-card">
          <h3>Response guidance</h3>
          <p>
            For faster assistance, include your username and a short description of the
            issue you are facing.
          </p>
        </section>
      </div>
    </article>
  );
}

export default ClientContactPage;

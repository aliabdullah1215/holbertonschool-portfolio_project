function ClientHomePage() {
  return (
    <article className="workspace-card workspace-card--section">
      <span className="eyebrow">Client Journey</span>
      <h2>Home</h2>
      <p>Everything you need stays organized in one clean place.</p>

      <section className="content-hero">
        <div>
          <h3>Start where you need</h3>
          <p>Use plans, tools, and support pages whenever you are ready.</p>
        </div>
        <div className="content-highlight">
          <span className="eyebrow">Suggested flow</span>
          <p>Assessment Tools {'->'} AI Plans {'->'} Plans History {'->'} Medical Support</p>
        </div>
      </section>

      <div className="content-grid">
        <section className="content-card">
          <h3>Build your plan</h3>
          <p>Create a plan based on your details and goals.</p>
        </section>
        <section className="content-card">
          <h3>Track your progress</h3>
          <p>Review saved plans and stay consistent over time.</p>
        </section>
        <section className="content-card">
          <h3>Access human support</h3>
          <p>Reach approved doctors whenever you need expert guidance.</p>
        </section>
      </div>
    </article>
  );
}

export default ClientHomePage;

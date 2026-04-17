function ClientHomePage() {
  return (
    <article className="workspace-card workspace-card--section">
      <span className="eyebrow">Client Journey</span>
      <h2>Home</h2>
      <p>
        Welcome to your client dashboard. This space is designed to help you move from
        assessment to action with clear next steps and supportive tools.
      </p>

      <section className="content-hero">
        <div>
          <h3>Start with the right section</h3>
          <p>
            Use AI Plans when you are ready to build a personalized meal plan, open
            Assessment Tools for quick health indicators, and check Medical Support when
            you want to speak with an approved specialist.
          </p>
        </div>
        <div className="content-highlight">
          <span className="eyebrow">Recommended flow</span>
          <p>Assessment Tools {'->'} AI Plans {'->'} Plans History {'->'} Medical Support</p>
        </div>
      </section>

      <div className="content-grid">
        <section className="content-card">
          <h3>Build your plan</h3>
          <p>
            Your nutrition journey begins with personal data, goals, and practical
            recommendations tailored to your daily needs.
          </p>
        </section>
        <section className="content-card">
          <h3>Track your progress</h3>
          <p>
            Keep an overview of the plans you generate so you can revisit your activity
            timeline and stay consistent.
          </p>
        </section>
        <section className="content-card">
          <h3>Access human support</h3>
          <p>
            When you need expert advice, you can browse approved doctors and contact the
            specialist that best fits your situation.
          </p>
        </section>
      </div>
    </article>
  );
}

export default ClientHomePage;

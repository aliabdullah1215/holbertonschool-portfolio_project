const planHistory = [
  {
    id: 1,
    createdAt: '15 Apr 2026',
    goal: 'Weight loss',
    focus: 'High-protein structure',
    status: 'Ready',
    note: 'Designed around a calorie deficit with simple meal timing.',
  },
  {
    id: 2,
    createdAt: '08 Apr 2026',
    goal: 'Weight maintenance',
    focus: 'Balanced daily routine',
    status: 'Archived',
    note: 'Saved as a reference plan for a stable routine and moderate activity.',
  },
  {
    id: 3,
    createdAt: '01 Apr 2026',
    goal: 'Healthy eating reset',
    focus: 'Habit-focused structure',
    status: 'Draft summary',
    note: 'Focused on consistency, hydration, and portion awareness.',
  },
];

function ClientPlansHistoryPage() {
  return (
    <article className="workspace-card workspace-card--section">
      <span className="eyebrow">Client Journey</span>
      <h2>Your Plans</h2>
      <p>
        This section keeps a lightweight history of your generated plans. It shows when a
        plan was created and the main summary details without displaying the full plan.
      </p>

      <section className="content-hero">
        <div>
          <h3>Why this section stays simple</h3>
          <p>
            Plans History is meant to help you remember what was created and when, while
            keeping the page fast and easy to scan.
          </p>
        </div>
        <div className="content-highlight">
          <span className="eyebrow">Section rule</span>
          <p>Summary only, not the full generated nutrition plan.</p>
        </div>
      </section>

      <div className="history-list">
        {planHistory.map((plan) => (
          <article className="history-card" key={plan.id}>
            <div className="history-card__top">
              <div>
                <span className="eyebrow">Created {plan.createdAt}</span>
                <h3>{plan.goal}</h3>
              </div>
              <span className="history-status">{plan.status}</span>
            </div>

            <div className="history-meta">
              <span>
                <strong>Focus:</strong> {plan.focus}
              </span>
              <span>
                <strong>Date:</strong> {plan.createdAt}
              </span>
            </div>

            <p>{plan.note}</p>
          </article>
        ))}
      </div>
    </article>
  );
}

export default ClientPlansHistoryPage;

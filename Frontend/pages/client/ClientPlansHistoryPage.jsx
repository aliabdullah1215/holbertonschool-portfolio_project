import { useEffect, useRef, useState } from 'react';
import NutritionPlanView from '../../features/aiPlans/components/NutritionPlanView';
import { getMySavedPlans, getSavedPlanById } from '../../features/aiPlans/services/aiPlansService';
import { replaceMealWithAlternative } from '../../features/aiPlans/utils/planEditors';

function formatDate(value) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return 'Unknown date';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}

function getMonthKey(value) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return '';
  }

  return `${parsed.getFullYear()}-${parsed.getMonth()}`;
}

function getMostFrequentValue(items, fallback) {
  const counts = new Map();

  items.forEach((item) => {
    const value = String(item || '').trim();

    if (value) {
      counts.set(value, (counts.get(value) || 0) + 1);
    }
  });

  let topValue = fallback;
  let topCount = 0;

  counts.forEach((count, value) => {
    if (count > topCount) {
      topValue = value;
      topCount = count;
    }
  });

  return topValue;
}

function StatIcon({ type }) {
  const paths = {
    plans: 'M4 5.5A2.5 2.5 0 0 1 6.5 3h9A2.5 2.5 0 0 1 18 5.5v13A2.5 2.5 0 0 1 15.5 21h-9A2.5 2.5 0 0 1 4 18.5v-13Zm4 2h6M8 11h6M8 15h4',
    month: 'M7 3v3M17 3v3M4 8h16M6.5 5h11A2.5 2.5 0 0 1 20 7.5v10A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-10A2.5 2.5 0 0 1 6.5 5Z',
    goal: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
    latest: 'M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[type]} />
    </svg>
  );
}

function buildPlanStats(plans) {
  const currentMonthKey = getMonthKey(new Date());
  const thisMonthCount = plans.filter(
    (plan) => getMonthKey(plan.created_at) === currentMonthKey
  ).length;

  const latestPlan = plans.reduce((latest, plan) => {
    if (!latest) {
      return plan;
    }

    return new Date(plan.created_at) > new Date(latest.created_at) ? plan : latest;
  }, null);

  return [
    {
      id: 'total',
      label: 'Total Plans',
      value: plans.length,
      icon: 'plans',
    },
    {
      id: 'month',
      label: 'This Month',
      value: thisMonthCount,
      icon: 'month',
    },
    {
      id: 'goal',
      label: 'Top Goal',
      value: getMostFrequentValue(plans.map((plan) => plan.goal), 'No plans'),
      icon: 'goal',
    },
    {
      id: 'latest',
      label: 'Latest Plan',
      value: latestPlan?.goal || 'No plans',
      icon: 'latest',
    },
  ];
}

export function ClientPlansHistoryPage() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [originalSelectedPlan, setOriginalSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlanLoading, setIsPlanLoading] = useState(false);
  const [error, setError] = useState('');
  const selectedPlanRef = useRef(null);
  const shouldScrollToSelectedPlanRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPlans() {
      setIsLoading(true);
      setError('');

      try {
        const savedPlans = await getMySavedPlans();

        if (isMounted) {
          setPlans(savedPlans);
        }
      } catch (requestError) {
        if (isMounted) {
          const serverMessage = requestError.response?.data?.detail || requestError.message;
          setError(serverMessage || 'Unable to load your saved plans right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (
      shouldScrollToSelectedPlanRef.current &&
      !isPlanLoading &&
      selectedPlan?.plan_content &&
      selectedPlanRef.current
    ) {
      selectedPlanRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      shouldScrollToSelectedPlanRef.current = false;
    }
  }, [isPlanLoading, selectedPlan]);

  async function handleSelectPlan(planId) {
    setIsPlanLoading(true);
    setError('');
    shouldScrollToSelectedPlanRef.current = true;

    try {
      const plan = await getSavedPlanById(planId);
      setSelectedPlan(plan);
      setOriginalSelectedPlan(plan);
    } catch (requestError) {
      const serverMessage = requestError.response?.data?.detail || requestError.message;
      setError(serverMessage || 'Unable to load this plan right now.');
    } finally {
      setIsPlanLoading(false);
    }
  }

  function applySavedPlanLocalEdit(editor) {
    setSelectedPlan((current) => {
      if (!current?.plan_content) {
        return current;
      }

      return {
        ...current,
        plan_content: editor(current.plan_content),
      };
    });
  }

  function resetSavedPlanLocalEdits() {
    if (originalSelectedPlan) {
      setSelectedPlan(originalSelectedPlan);
    }
  }

  const planStats = buildPlanStats(plans);

  return (
    <article className="workspace-card workspace-card--section plans-history-page">
      <style>{`
        :root {
          --green-deep: #1C5C2E;
          --green-mid: #2E8B57;
          --green-secondary: #4A7C59;
          --green-light: #6BAF7E;
          --bg-mint: #F0F7F1;
          --white: #FFFFFF;
          --text-dark: #1C2B1E;
          --text-body: #3D5445;
          --text-secondary: #4A7C59;
          --border-light: #DFF0E5;
        }

        .plans-history-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: transparent;
          width: 100%;
          box-sizing: border-box;
        }

        /* CENTERED MAIN HEADER MODULE */
        .plans-history-main-header {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 48px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .plans-history-main-header .eyebrow {
          display: inline-flex;
          align-items: center;
          background: rgba(46,139,87,0.10);
          color: var(--green-mid);
          font-size: 11px;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 18px;
          text-transform: uppercase;
          letter-spacing: 0.75px;
        }

        .plans-history-main-header h1 {
          font-size: clamp(34px, 4.5vw, 48px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -1.8px;
          color: var(--green-deep);
          margin: 0 0 16px 0;
        }

        .plans-history-main-header p {
          font-size: 16px;
          line-height: 1.6;
          color: var(--text-body);
          margin: 0;
          font-weight: 500;
          max-width: 680px;
        }

        /* TWO-COLUMN WORKSPACE BLOCK GRID */
        .plans-history-content {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 32px;
          align-items: start;
          border-top: 1px solid var(--border-light);
          padding-top: 48px;
        }

        /* SECTION ZONE TITLES */
        .plans-history-box h2 {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.8px;
          color: var(--green-deep);
          margin: 0 0 24px 0;
          text-align: left;
        }

        /* CORE VERTICAL LIST PACKAGING */
        .history-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* DECORATIVE CARD DESIGNS - INTERACTIVES WITH FLOATING PERSPECTIVES */
        .history-card,
        .plan-stat-card,
        .selected-plan-banner {
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(28,92,46,0.015), 0 2px 6px rgba(0,0,0,0.015);
          box-sizing: border-box;
          transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), border-color 0.3s ease;
        }

        .history-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }

        .history-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 35px rgba(28,92,46,0.04), 0 4px 12px rgba(0,0,0,0.02);
          border-color: rgba(46,139,87,0.2);
        }

        .history-card__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .history-card .eyebrow {
          font-size: 11px;
          font-weight: 700;
          color: var(--green-mid);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
          margin-bottom: 6px;
        }

        .history-card h3 {
          font-size: 19px;
          font-weight: 800;
          color: var(--green-deep);
          margin: 0;
          line-height: 1.3;
          letter-spacing: -0.4px;
        }

        /* METADATA CHIPS LAYOUT */
        .history-meta {
          font-size: 13.5px;
          color: var(--text-body);
          border-top: 1px dashed var(--border-light);
          padding-top: 14px;
        }

        .history-meta strong {
          color: var(--green-deep);
          font-weight: 700;
        }

        /* WORKSPACE INTERACTION VIEW ACTION TRIGGER */
        .history-view-button {
          font-family: inherit;
          background: var(--bg-mint);
          color: var(--green-deep);
          border: 1px solid transparent;
          padding: 10px 18px;
          border-radius: 14px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }

        .history-view-button:hover:not(:disabled) {
          background: var(--green-deep);
          color: var(--white);
        }

        .history-view-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* SIDE PANEL STATS ARCHITECTURE */
        .plan-stats-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-top: 56px;
        }

        .plan-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .plan-stat-card {
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .plan-stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 32px rgba(28,92,46,0.04), 0 4px 10px rgba(0,0,0,0.015);
          border-color: rgba(46,139,87,0.18);
        }

        .plan-stat-card__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--bg-mint);
          color: var(--green-mid);
          border-radius: 12px;
          margin-bottom: 14px;
        }

        .plan-stat-card__icon svg {
          width: 20px;
          height: 20px;
        }

        .plan-stat-card__label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.25px;
        }

        .plan-stat-card strong {
          font-size: 16px;
          font-weight: 800;
          color: var(--green-deep);
          line-height: 1.2;
        }

        /* CONTEXT FOOTNOTE NOTEBOARD */
        .plan-stats-message {
          background: var(--bg-mint);
          border-radius: 20px;
          padding: 20px;
          text-align: center;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .plan-stats-message span {
          font-size: 13.5px;
          color: var(--text-body);
          line-height: 1.5;
        }

        .plan-stats-message strong {
          font-size: 13.5px;
          color: var(--green-deep);
          font-weight: 700;
        }

        /* LIVE VIEWER ACCENT BLOCK CONTAINER */
        .selected-plan-section {
          margin-top: 56px;
          border-top: 1px solid var(--border-light);
          padding-top: 48px;
        }

        .selected-plan-banner {
          padding: 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 750px;
          margin: 0 auto 40px auto;
        }

        .selected-plan-banner .eyebrow {
          display: inline-flex;
          background: rgba(46,139,87,0.10);
          color: var(--green-mid);
          font-size: 10.5px;
          font-weight: 800;
          padding: 5px 12px;
          border-radius: 999px;
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .selected-plan-banner h3 {
          font-size: 26px;
          font-weight: 800;
          color: var(--green-deep);
          margin: 0 0 10px 0;
          letter-spacing: -0.8px;
        }

        .selected-plan-banner p {
          font-size: 14.5px;
          color: var(--text-body);
          margin: 0;
          line-height: 1.5;
        }

        /* LOADING, ERROR FEEDBACK BANNER ALIGNMENTS */
        .form-feedback, .history-loading-msg, .section-note {
          text-align: center;
          padding: 20px;
          margin: 20px auto;
          font-weight: 500;
        }
        .form-feedback--error {
          color: #D32F2F;
          background: #FFEBEE;
          border-radius: 14px;
          max-width: 600px;
        }
        .history-loading-msg {
          color: var(--text-secondary);
        }
        .section-note {
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 24px;
          max-width: 500px;
          padding: 40px 24px;
        }
        .section-note h3 {
          color: var(--green-deep);
          margin: 0 0 10px 0;
          font-size: 20px;
          font-weight: 800;
        }
        .section-note p {
          color: var(--text-body);
          margin: 0;
          font-size: 14.5px;
          line-height: 1.6;
        }

        /* GRID BREAKPOINTS RESPONSIVITY OVERRIDES */
        @media (max-width: 1024px) {
          .plans-history-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .plan-stats-column {
            padding-top: 0;
          }
        }
        @media (max-width: 640px) {
          .plan-stats-grid {
            grid-template-columns: 1fr;
          }
          .history-card__top {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .history-view-button {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      {/* CORE INTRO HEADER SEGMENT */}
      <section className="plans-history-main-header">
        <span className="eyebrow">Saved Plan Archives</span>
        <h1>Your Plan History</h1>
        <p>Review your historical saved nutrition breakdowns, monitor macro stats profiles, and open targets back inside the real-time adjustments engine.</p>
      </section>

      {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}

      {isLoading ? <p className="history-loading-msg">Loading your saved plans...</p> : null}

      {!isLoading && plans.length === 0 ? (
        <div className="section-note">
          <h3>No saved plans yet</h3>
          <p>Generate your first nutrition plan from the AI Plans page and it will appear here.</p>
        </div>
      ) : null}

      {!isLoading && plans.length > 0 ? (
        <div className="plans-history-content">
          {/* LEFT INTERACTIVE LIST */}
          <section className="plans-history-box">
            <h2>Your plans</h2>

            <div className="history-list">
              {plans.map((plan) => (
                <article className="history-card" key={plan.id}>
                  <div className="history-card__top">
                    <div>
                      <span className="eyebrow">Created {formatDate(plan.created_at)}</span>
                      <h3>{plan.goal}</h3>
                    </div>

                    <button
                      className="history-view-button"
                      type="button"
                      onClick={() => handleSelectPlan(plan.id)}
                      disabled={isPlanLoading}
                    >
                      {selectedPlan?.id === plan.id ? 'Reload plan' : 'View plan'}
                    </button>
                  </div>

                  <div className="history-meta">
                    <span>
                      <strong>Focus:</strong> {plan.focus}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* RIGHT UTILITIES METRICS GRID */}
          <aside className="plan-stats-column">
            <section className="plan-stats-grid" aria-label="Saved plans statistics">
              {planStats.map((stat) => (
                <article className="plan-stat-card" key={stat.id}>
                  <span className="plan-stat-card__icon">
                    <StatIcon type={stat.icon} />
                  </span>
                  <div>
                    <span className="plan-stat-card__label">{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </div>
                </article>
              ))}
            </section>

            <p className="plan-stats-message">
              <span>Customize your meals and download your personalized plan anytime.</span>
              <strong>Build healthier habits, one meal at a time.</strong>
            </p>
          </aside>
        </div>
      ) : null}

      {isPlanLoading ? <p className="history-loading-msg" style={{ marginTop: '40px' }}>Loading selected plan...</p> : null}

      {/* PLAN OUTPUT WORKSPACE INTERFACE */}
      {selectedPlan?.plan_content ? (
        <section ref={selectedPlanRef} className="selected-plan-section">
          <div className="selected-plan-banner">
            <span className="eyebrow">Selected Workspace View</span>
            <h3>{selectedPlan.goal}</h3>
            <p>
              Saved on {formatDate(selectedPlan.created_at)} with a target emphasis focused around {selectedPlan.focus}.
            </p>
          </div>

          <NutritionPlanView
            isApplyingLocalEdit={false}
            plan={selectedPlan.plan_content}
            onReplaceMeal={(mealId) =>
              applySavedPlanLocalEdit((plan) => replaceMealWithAlternative(plan, mealId))
            }
            onReset={resetSavedPlanLocalEdits}
          />
        </section>
      ) : null}
    </article>
  );
}

export default ClientPlansHistoryPage;                  <div className="history-card__top">
                    <div>
                      <span className="eyebrow">Created {formatDate(plan.created_at)}</span>
                      <h3>{plan.goal}</h3>
                    </div>

                    <button
                      className="history-view-button"
                      type="button"
                      onClick={() => handleSelectPlan(plan.id)}
                      disabled={isPlanLoading}
                    >
                      {selectedPlan?.id === plan.id ? 'Reload plan' : 'View plan'}
                    </button>
                  </div>

                  <div className="history-meta">
                    <span>
                      <strong>Focus:</strong> {plan.focus}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

                    <aside className="plan-stats-column">
            <section className="plan-stats-grid" aria-label="Saved plans statistics">
              {planStats.map((stat) => (
                <article className="plan-stat-card" key={stat.id}>
                  <span className="plan-stat-card__icon">
                    <StatIcon type={stat.icon} />
                  </span>
                  <div>
                    <span className="plan-stat-card__label">{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </div>
                </article>
              ))}
            </section>

            <p className="plan-stats-message">
              <span>Customize your meals and download your personalized plan anytime.</span>
              <strong>Build healthier habits, one meal at a time.</strong>
            </p>
          </aside>
        </div>
      ) : null}

      {isPlanLoading ? <p>Loading selected plan...</p> : null}

      {selectedPlan?.plan_content ? (
        <section ref={selectedPlanRef} className="selected-plan-section">
          <div className="content-grid">
            <div className="content-card">
              <span className="eyebrow">Selected Plan</span>
              <h3>{selectedPlan.goal}</h3>
              <p>
                Saved on {formatDate(selectedPlan.created_at)} with focus on {selectedPlan.focus}.
              </p>
            </div>
          </div>

          <NutritionPlanView
            isApplyingLocalEdit={false}
            plan={selectedPlan.plan_content}
            onReplaceMeal={(mealId) =>
              applySavedPlanLocalEdit((plan) => replaceMealWithAlternative(plan, mealId))
            }
            onReset={resetSavedPlanLocalEdits}
          />


        </section>
      ) : null}
    </article>
  );
}

export default ClientPlansHistoryPage;

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
    <svg viewBox="0 0 24 24" aria-hidden="true">
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

function ClientPlansHistoryPage() {
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
      {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}

      {isLoading ? <p>Loading your saved plans...</p> : null}

      {!isLoading && plans.length === 0 ? (
        <div className="section-note">
          <h3>No saved plans yet</h3>
          <p>Generate your first nutrition plan from the AI Plans page and it will appear here.</p>
        </div>
      ) : null}
      {!isLoading && plans.length > 0 ? (
        <div className="plans-history-content">
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

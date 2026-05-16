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

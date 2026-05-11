import { useEffect, useState } from 'react';
import NutritionPlanView from '../../features/aiPlans/components/NutritionPlanView';
import { getMySavedPlans, getSavedPlanById } from '../../features/aiPlans/services/aiPlansService';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isPlanLoading, setIsPlanLoading] = useState(false);
  const [error, setError] = useState('');

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

  async function handleSelectPlan(planId) {
    setIsPlanLoading(true);
    setError('');

    try {
      const plan = await getSavedPlanById(planId);
      setSelectedPlan(plan);
    } catch (requestError) {
      const serverMessage = requestError.response?.data?.detail || requestError.message;
      setError(serverMessage || 'Unable to load this plan right now.');
    } finally {
      setIsPlanLoading(false);
    }
  }

  return (
    <article className="workspace-card workspace-card--section">
      <span className="eyebrow">Client Journey</span>
      <h2>Your Plans</h2>
      <p>
        This section keeps your saved AI plans available after sign-in so you can return to
        previous nutrition recommendations any time.
      </p>

      <section className="content-hero">
        <div>
          <h3>Your plans are now saved automatically</h3>
          <p>
            Each plan generated from the AI Plans section is stored in your account and can
            be opened again from this page.
          </p>
        </div>
        <div className="content-highlight">
          <span className="eyebrow">What you can do</span>
          <p>Review summaries first, then open any saved plan for full details.</p>
        </div>
      </section>

      {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}

      {isLoading ? <p>Loading your saved plans...</p> : null}

      {!isLoading && plans.length === 0 ? (
        <div className="section-note">
          <h3>No saved plans yet</h3>
          <p>Generate your first nutrition plan from the AI Plans page and it will appear here.</p>
        </div>
      ) : null}

      <div className="history-list">
        {plans.map((plan) => (
          <article className="history-card" key={plan.id}>
            <div className="history-card__top">
              <div>
                <span className="eyebrow">Created {formatDate(plan.created_at)}</span>
                <h3>{plan.goal}</h3>
              </div>
              <span className="history-status">{plan.status === 'active' ? 'Ready' : plan.status}</span>
            </div>

            <div className="history-meta">
              <span>
                <strong>Focus:</strong> {plan.focus}
              </span>
              <span>
                <strong>Date:</strong> {formatDate(plan.created_at)}
              </span>
            </div>

            <p>{plan.note}</p>

            <div className="meal-actions">
              <button type="button" onClick={() => handleSelectPlan(plan.id)} disabled={isPlanLoading}>
                {selectedPlan?.id === plan.id ? 'Reload plan' : 'View plan'}
              </button>
            </div>
          </article>
        ))}
      </div>

      {isPlanLoading ? <p>Loading selected plan...</p> : null}

      {selectedPlan?.plan_content ? (
        <section className="content-grid">
          <div className="content-card">
            <span className="eyebrow">Selected Plan</span>
            <h3>{selectedPlan.goal}</h3>
            <p>
              Saved on {formatDate(selectedPlan.created_at)} with focus on {selectedPlan.focus}.
            </p>
          </div>
        </section>
      ) : null}

      {selectedPlan?.plan_content ? (
        <NutritionPlanView
          isApplyingLocalEdit={false}
          plan={selectedPlan.plan_content}
          readOnly
        />
      ) : null}
    </article>
  );
}

export default ClientPlansHistoryPage;

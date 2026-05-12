import { useEffect, useMemo, useState } from 'react';
import AiPlanQuestionnaire from './components/AiPlanQuestionnaire';
import NutritionPlanView from './components/NutritionPlanView';
import { questionnaireSteps } from './config/questionnaireConfig';
import { generateAiPlan } from './services/aiPlansService';
import { normalizeAiPlanAnswers } from './utils/normalizeAnswers';
import {
  filterBudgetMeals,
  filterQuickMeals,
  increaseVarietyFromAlternatives,
  replaceIngredientWithAlternative,
  replaceMealWithAlternative,
} from './utils/planEditors';
import { validateNutritionPlan } from './utils/planValidation';
import { validateAiPlanAnswers } from './utils/validation';

const storageKey = 'data-diet-ai-plans-session';

const initialAnswers = {
  goalType: 'weight_loss',
  goalPace: 'moderate',
  age: '',
  sex: 'female',
  weightKg: '',
  heightCm: '',
  activityLevel: 'moderate',
  doesExercise: 'yes',
  trainingDaysPerWeek: '3',
  trainingTypes: ['walking'],
  hasAllergies: 'no',
  allergies: '',
  medicalConditions: '',
  dietaryRestrictions: '',
  dietType: 'balanced',
  preferredFoods: '',
  dislikedFoods: '',
  excludedIngredients: '',
  mealsPerDay: '3',
  prefersQuickMeals: 'yes',
  budgetSensitive: 'no',
  cookingLevel: 'basic',
  scheduleStyle: 'busy',
  additionalNotes: '',
  detailLevel: 'detailed',
  includeAlternatives: 'yes',
  varietyLevel: 'medium',
  language: 'en',
};

function AiPlansWorkspace() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepErrors, setStepErrors] = useState({});
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [originalPlan, setOriginalPlan] = useState(null);
  const [savedPlanMeta, setSavedPlanMeta] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplyingLocalEdit, setIsApplyingLocalEdit] = useState(false);

/* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const storedValue = sessionStorage.getItem(storageKey);

    if (!storedValue) {
      return;
    }

    try {
      const parsed = JSON.parse(storedValue);
      setAnswers(parsed.answers ?? initialAnswers);
      setGeneratedPlan(parsed.generatedPlan ?? null);
      setOriginalPlan(parsed.originalPlan ?? null);
      setSavedPlanMeta(parsed.savedPlanMeta ?? null);
    } catch {
      sessionStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        answers,
        generatedPlan,
        originalPlan,
        savedPlanMeta,
      })
    );
  }, [answers, generatedPlan, originalPlan, savedPlanMeta]);

  const normalizedProfile = useMemo(() => normalizeAiPlanAnswers(answers), [answers]);

  function handleAnswerChange(event) {
    const { name, value } = event.target;
    setAnswers((current) => ({
      ...current,
      [name]: value,
    }));
    setStepErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleNextStep() {
    const nextErrors = validateAiPlanAnswers(answers, questionnaireSteps[currentStepIndex].id);

    if (Object.keys(nextErrors).length > 0) {
      setStepErrors(nextErrors);
      return;
    }

    setStepErrors({});
    setCurrentStepIndex((current) => Math.min(current + 1, questionnaireSteps.length - 1));
  }

  function handlePreviousStep() {
    setCurrentStepIndex((current) => Math.max(current - 1, 0));
  }

  async function handleGeneratePlan() {
    const nextErrors = validateAiPlanAnswers(answers);

    if (Object.keys(nextErrors).length > 0) {
      setStepErrors(nextErrors);
      return;
    }

    setError('');
    setStepErrors({});
    setIsSubmitting(true);

    try {
      const savedPlan = await generateAiPlan(normalizedProfile);
      const validation = validateNutritionPlan(savedPlan.plan);

      if (!validation.isValid) {
        throw new Error(validation.message);
      }

      setGeneratedPlan(savedPlan.plan);
      setOriginalPlan(savedPlan.plan);
      setSavedPlanMeta({
        id: savedPlan.id,
        goal: savedPlan.goal,
        focus: savedPlan.focus,
        createdAt: savedPlan.created_at,
      });
    } catch (requestError) {
      const serverMessage = requestError.response?.data?.detail || requestError.message;
      setError(serverMessage || 'Unable to generate a nutrition plan right now.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function applyLocalEdit(editor) {
    if (!generatedPlan) {
      return;
    }

    setIsApplyingLocalEdit(true);
    setGeneratedPlan((current) => editor(current));
    setTimeout(() => setIsApplyingLocalEdit(false), 150);
  }

  function resetLocalEdits() {
    if (originalPlan) {
      setGeneratedPlan(originalPlan);
    }
  }

  return (
    <article className="workspace-card workspace-card--section">
      <span className="eyebrow">Client Journey</span>
      <h2>AI Plans</h2>
      <p>
        Complete the dynamic questionnaire, generate a structured nutrition plan once, and
        then refine it locally without calling AI again for simple changes.
      </p>

      <section className="content-grid ai-plans-intro">
        <div className="content-card">
          <span className="eyebrow">Smart Intake</span>
          <h3>Complete one guided questionnaire</h3>
          <p>
            Move step by step through the intake so the plan is built from clear and
            structured client data.
          </p>
        </div>
        <div className="content-card">
          <span className="eyebrow">One AI Call</span>
          <h3>Generate once, then refine locally</h3>
          <p>
            The backend sends your profile to Groq one time, then simple adjustments happen
            directly in the current session.
          </p>
        </div>
        <div className="content-card">
          <span className="eyebrow">Flexible Output</span>
          <h3>Review meals with quick adjustments</h3>
          <p>
            After generation, you can make meals quicker, cheaper, or swap alternatives
            without rebuilding the whole plan.
          </p>
        </div>
      </section>

      {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}

      <AiPlanQuestionnaire
        answers={answers}
        currentStepIndex={currentStepIndex}
        errors={stepErrors}
        isSubmitting={isSubmitting}
        onBack={handlePreviousStep}
        onChange={handleAnswerChange}
        onNext={handleNextStep}
        onSubmit={handleGeneratePlan}
      />

      {generatedPlan ? (
        <>
          {savedPlanMeta ? (
            <div className="section-note">
              <h3>Plan saved to Your Plans</h3>
              <p>
                This plan was saved automatically and will stay available the next time you
                sign in.
              </p>
            </div>
          ) : null}
          <NutritionPlanView
            isApplyingLocalEdit={isApplyingLocalEdit}
            plan={generatedPlan}
            onIncreaseVariety={() => applyLocalEdit(increaseVarietyFromAlternatives)}
            onMakeBudget={() => applyLocalEdit(filterBudgetMeals)}
            onMakeQuick={() => applyLocalEdit(filterQuickMeals)}
            onReplaceIngredient={(mealId, foodId) =>
              applyLocalEdit((plan) => replaceIngredientWithAlternative(plan, mealId, foodId))
            }
            onReplaceMeal={(mealId) =>
              applyLocalEdit((plan) => replaceMealWithAlternative(plan, mealId))
            }
            onReset={resetLocalEdits}
          />
        </>
      ) : (
        <div className="section-note">
          <h3>No generated plan yet</h3>
          <p>Complete the questionnaire and generate your first plan to review it here.</p>
        </div>
      )}
    </article>
  );
}

export default AiPlansWorkspace;

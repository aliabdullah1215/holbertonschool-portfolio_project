import { useMemo, useState } from 'react';

const initialPlanForm = {
  goal: 'weight-loss',
  age: '',
  weightKg: '',
  heightCm: '',
  activityLevel: 'moderate',
  allergy: '',
  dietaryPreference: 'balanced',
  mealsPerDay: '3',
  notes: '',
};

const goalLabels = {
  'weight-loss': 'Weight loss',
  maintenance: 'Weight maintenance',
  'weight-gain': 'Weight gain',
  'healthy-habits': 'Healthy habits',
};

const activityLabels = {
  sedentary: 'Sedentary',
  light: 'Lightly active',
  moderate: 'Moderately active',
  active: 'Very active',
};

const preferenceLabels = {
  balanced: 'Balanced',
  high_protein: 'High protein',
  low_carb: 'Lower carb',
  vegetarian: 'Vegetarian',
};

function ClientAiPlansPage() {
  const [form, setForm] = useState(initialPlanForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  const summary = useMemo(
    () => [
      { label: 'Goal', value: goalLabels[form.goal] },
      { label: 'Age', value: form.age || 'Not provided yet' },
      { label: 'Weight', value: form.weightKg ? `${form.weightKg} kg` : 'Not provided yet' },
      { label: 'Height', value: form.heightCm ? `${form.heightCm} cm` : 'Not provided yet' },
      { label: 'Activity', value: activityLabels[form.activityLevel] },
      { label: 'Allergy', value: form.allergy || 'No allergy added' },
      { label: 'Preference', value: preferenceLabels[form.dietaryPreference] },
      { label: 'Meals per day', value: form.mealsPerDay },
      { label: 'Notes', value: form.notes || 'No extra notes yet' },
    ],
    [form]
  );

  return (
    <article className="workspace-card workspace-card--section">
      <span className="eyebrow">Client Journey</span>
      <h2>AI Plans</h2>
      <p>
        Fill in this questionnaire to prepare the information that will later be sent to
        the AI plan generator. For now, the page captures and organizes your inputs.
      </p>

      <section className="content-hero">
        <div>
          <h3>How this step works</h3>
          <p>
            We collect your goal, measurements, activity level, food constraints, and
            preferences first. In the next phase, these answers will power your generated
            nutrition plan.
          </p>
        </div>
        <div className="content-highlight">
          <span className="eyebrow">Current stage</span>
          <p>Questionnaire and structured summary only. AI generation comes next.</p>
        </div>
      </section>

      <div className="ai-plan-grid">
        <section className="assessment-card assessment-card--form">
          <h3>Plan questionnaire</h3>
          <p>Answer the questions below to prepare your nutrition request.</p>

          <form className="auth-form assessment-form">
            <label>
              Goal
              <select name="goal" value={form.goal} onChange={handleChange}>
                <option value="weight-loss">Weight loss</option>
                <option value="maintenance">Weight maintenance</option>
                <option value="weight-gain">Weight gain</option>
                <option value="healthy-habits">Healthy habits</option>
              </select>
            </label>

            <label>
              Age
              <input
                name="age"
                type="number"
                min="1"
                placeholder="28"
                value={form.age}
                onChange={handleChange}
              />
            </label>

            <label>
              Weight (kg)
              <input
                name="weightKg"
                type="number"
                min="1"
                step="0.1"
                placeholder="72"
                value={form.weightKg}
                onChange={handleChange}
              />
            </label>

            <label>
              Height (cm)
              <input
                name="heightCm"
                type="number"
                min="1"
                step="0.1"
                placeholder="168"
                value={form.heightCm}
                onChange={handleChange}
              />
            </label>

            <label>
              Activity level
              <select name="activityLevel" value={form.activityLevel} onChange={handleChange}>
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly active</option>
                <option value="moderate">Moderately active</option>
                <option value="active">Very active</option>
              </select>
            </label>

            <label>
              Allergy or food restriction
              <input
                name="allergy"
                type="text"
                placeholder="Peanuts, lactose, gluten..."
                value={form.allergy}
                onChange={handleChange}
              />
            </label>

            <label>
              Dietary preference
              <select
                name="dietaryPreference"
                value={form.dietaryPreference}
                onChange={handleChange}
              >
                <option value="balanced">Balanced</option>
                <option value="high_protein">High protein</option>
                <option value="low_carb">Lower carb</option>
                <option value="vegetarian">Vegetarian</option>
              </select>
            </label>

            <label>
              Meals per day
              <select name="mealsPerDay" value={form.mealsPerDay} onChange={handleChange}>
                <option value="3">3 meals</option>
                <option value="4">4 meals</option>
                <option value="5">5 meals</option>
                <option value="6">6 meals</option>
              </select>
            </label>

            <label>
              Extra notes
              <textarea
                name="notes"
                rows="5"
                placeholder="Share any useful context about your routine, schedule, or food preferences."
                value={form.notes}
                onChange={handleChange}
              />
            </label>
          </form>
        </section>

        <section className="assessment-card ai-summary-card">
          <div className="assessment-card__header">
            <span className="eyebrow">Prepared Output</span>
            <h3>Questionnaire Summary</h3>
          </div>
          <p>
            This summary shows the exact information structure we can later send to the AI
            plan generation flow.
          </p>

          <div className="summary-list">
            {summary.map((item) => (
              <div className="summary-row" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

export default ClientAiPlansPage;

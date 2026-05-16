import { useMemo, useState } from 'react';

const initialValues = {
  weightKg: '',
  heightCm: '',
  age: '',
  gender: 'female',
  activityLevel: 'moderate',
};

const activityFactors = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

function getBmiCategory(bmi) {
  if (bmi < 18.5) {
    return 'Underweight';
  }

  if (bmi < 25) {
    return 'Healthy range';
  }

  if (bmi < 30) {
    return 'Overweight';
  }

  return 'Obesity range';
}

function getBmiMessage(bmi) {
  if (bmi < 18.5) {
    return 'A higher-calorie nutrition plan may be helpful if your goal is healthy weight gain.';
  }

  if (bmi < 25) {
    return 'Your BMI falls in the general healthy range. Keep focusing on sustainable habits.';
  }

  if (bmi < 30) {
    return 'A gradual calorie deficit and regular movement may support weight management.';
  }

  return 'It may help to combine nutrition changes with guidance from a specialist for a safer plan.';
}

function ClientAssessmentToolsPage() {
  const [values, setValues] = useState(initialValues);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  const results = useMemo(() => {
    const weight = Number(values.weightKg);
    const heightCm = Number(values.heightCm);
    const age = Number(values.age);
    const heightM = heightCm / 100;

    const hasBmiInputs = weight > 0 && heightCm > 0;
    const bmi = hasBmiInputs ? weight / (heightM * heightM) : null;

    const hasCalorieInputs = hasBmiInputs && age > 0;
    let bmr = null;

    if (hasCalorieInputs) {
      if (values.gender === 'male') {
        bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161;
      }
    }

    const maintenanceCalories = bmr ? bmr * activityFactors[values.activityLevel] : null;
    const waterLiters = weight > 0 ? weight * 0.033 : null;

    return {
      bmi,
      bmiCategory: bmi ? getBmiCategory(bmi) : null,
      bmiMessage: bmi ? getBmiMessage(bmi) : null,
      maintenanceCalories,
      waterLiters,
    };
  }, [values]);

  return (
    <article className="workspace-card workspace-card--section assessment-tools-page">
      <h2>Assessment Tools</h2>

      <div className="assessment-grid">
        <section className="assessment-card assessment-card--form">
          
          <form className="auth-form assessment-form">
            <label>
              Weight (kg)
              <input
                name="weightKg"
                type="number"
                min="1"
                step="0.1"
                placeholder="70"
                value={values.weightKg}
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
                placeholder="170"
                value={values.heightCm}
                onChange={handleChange}
              />
            </label>

            <label>
              Age
              <input
                name="age"
                type="number"
                min="1"
                placeholder="30"
                value={values.age}
                onChange={handleChange}
              />
            </label>

            <label>
              Gender
              <select name="gender" value={values.gender} onChange={handleChange}>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </label>

            <label>
              Activity level
              <select name="activityLevel" value={values.activityLevel} onChange={handleChange}>
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly active</option>
                <option value="moderate">Moderately active</option>
                <option value="active">Very active</option>
              </select>
            </label>
          </form>
        </section>

        <section className="assessment-card">
          <div className="assessment-card__header">
            <span className="eyebrow"></span>
            <h3>BMI Calculator</h3>
          </div>
          {results.bmi ? (
            <>
              <p className="assessment-value">{results.bmi.toFixed(1)}</p>
              <p className="assessment-badge">{results.bmiCategory}</p>
              <p>{results.bmiMessage}</p>
            </>
          ) : (
            <p>Enter your weight and height to calculate your body mass index.</p>
          )}
        </section>

        <section className="assessment-card">
          <div className="assessment-card__header">
            <span className="eyebrow"></span>
            <h3>Estimated Daily Calories</h3>
          </div>
          {results.maintenanceCalories ? (
            <>
              <p className="assessment-value">
                {Math.round(results.maintenanceCalories)} kcal
              </p>
              <p>
                This is a maintenance estimate based on the Mifflin-St Jeor equation and
                your selected activity level.
              </p>
            </>
          ) : (
            <p>Enter your weight, height, age, gender, and activity level to see an estimate.</p>
          )}
        </section>

        <section className="assessment-card">
          <div className="assessment-card__header">
            <span className="eyebrow"></span>
            <h3>Daily Water Target</h3>
          </div>
          {results.waterLiters ? (
            <>
              <p className="assessment-value">{results.waterLiters.toFixed(1)} L</p>
              <p>
                This is a simple hydration estimate based on body weight. Hot weather and
                exercise may increase your needs.
              </p>
            </>
          ) : (
            <p>Enter your weight to estimate a practical daily hydration target.</p>
          )}
        </section>
      </div>
    </article>
  );
}

export default ClientAssessmentToolsPage;

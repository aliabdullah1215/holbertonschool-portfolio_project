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
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Healthy range';
  if (bmi < 30) return 'Overweight';
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

export default function ClientAssessmentToolsPage() {
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

        .assessment-tools-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: transparent;
          width: 100%;
        }

        .assessment-tools-page h2 {
          font-size: 28px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1px;
          color: var(--green-deep);
          margin-bottom: 24px;
          margin-top: 0;
        }

        .assessment-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        .assessment-card {
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 24px;
          padding: 26px;
          box-shadow: 0 10px 30px rgba(28,92,46,0.02), 0 2px 6px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .assessment-card--form {
          background: var(--white);
          border-color: var(--border-light);
        }

        .assessment-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .assessment-form label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-dark);
        }

        .assessment-form input,
        .assessment-form select {
          width: 100%;
          height: 44px;
          background: var(--bg-mint);
          border: 1px solid var(--border-light);
          border-radius: 12px;
          padding: 0 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          color: var(--text-dark);
          font-weight: 600;
          outline: none;
          box-sizing: border-box;
          transition: 0.2s ease;
        }

        .assessment-form input:focus,
        .assessment-form select:focus {
          border-color: var(--green-mid);
          background: var(--white);
          box-shadow: 0 0 0 4px rgba(46,139,87,0.08);
        }

        .assessment-card__header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .card-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--bg-mint);
          color: var(--green-mid);
          border-radius: 10px;
          flex-shrink: 0;
        }

        .assessment-card__header h3 {
          font-size: 18px;
          font-weight: 800;
          color: var(--green-deep);
          margin: 0;
        }

        .assessment-card p {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-body);
          margin: 0;
        }

        .assessment-result-content {
          margin-top: auto;
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .assessment-value {
          font-size: 40px;
          font-weight: 800;
          color: var(--green-mid);
          line-height: 1;
          margin-bottom: 8px !important;
          letter-spacing: -1px;
        }

        .assessment-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(46,139,87,0.10);
          color: var(--green-mid);
          font-size: 11px;
          font-weight: 800;
          padding: 6px 12px;
          border-radius: 999px;
          margin-bottom: 12px !important;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .assessment-card .description-text {
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-body);
        }

        @media (max-width: 1200px) {
          .assessment-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 680px) {
          .assessment-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <h2>Assessment Tools</h2>

      <div className="assessment-grid">
        {/* INPUT PANEL COMPONENT */}
        <section className="assessment-card assessment-card--form">
          <form className="auth-form assessment-form" onSubmit={(e) => e.preventDefault()}>
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

        {/* BMI CARD BLOCK */}
        <section className="assessment-card">
          <div className="assessment-card__header">
            <div className="card-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3>BMI Calculator</h3>
          </div>
          <p className="description-text">
            {results.bmi 
              ? 'Your computed body mass distribution metric based on height-to-weight alignment ratios.' 
              : 'Enter your weight and height to calculate your body mass index.'
            }
          </p>
          {results.bmi && (
            <div className="assessment-result-content">
              <p className="assessment-value">{results.bmi.toFixed(1)}</p>
              <p className="assessment-badge">{results.bmiCategory}</p>
              <p className="description-text">{results.bmiMessage}</p>
            </div>
          )}
        </section>

        {/* CALORIE CARD BLOCK */}
        <section className="assessment-card">
          <div className="assessment-card__header">
            <div className="card-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
              </svg>
            </div>
            <h3>Estimated Daily Calories</h3>
          </div>
          <p className="description-text">
            {results.maintenanceCalories 
              ? 'This is a maintenance estimate based on the Mifflin-St Jeor equation and your selected activity level.' 
              : 'Enter your weight, height, age, gender, and activity level to see an estimate.'
            }
          </p>
          {results.maintenanceCalories && (
            <div className="assessment-result-content">
              <p className="assessment-value">
                {Math.round(results.maintenanceCalories).toLocaleString()}
              </p>
              <p className="assessment-badge">kcal / day baseline</p>
            </div>
          )}
        </section>

        {/* WATER CARD BLOCK */}
        <section className="assessment-card">
          <div className="assessment-card__header">
            <div className="card-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z"></path>
              </svg>
            </div>
            <h3>Daily Water Target</h3>
          </div>
          <p className="description-text">
            {results.waterLiters 
              ? 'This is a simple hydration estimate based on body weight. Hot weather and exercise may increase your needs.' 
              : 'Enter your weight to estimate a practical daily hydration target.'
            }
          </p>
          {results.waterLiters && (
            <div className="assessment-result-content">
              <p className="assessment-value">{results.waterLiters.toFixed(1)}</p>
              <p className="assessment-badge">Liters / day</p>
            </div>
          )}
        </section>
      </div>
    </article>
  );
}

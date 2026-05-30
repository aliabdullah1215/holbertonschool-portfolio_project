import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="client-page-wrapper">
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

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--green-deep);
        }

        .client-page-wrapper {
          width: 100%;
          min-height: 100vh;
          background: var(--bg-mint);
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .assessment-tools-content {
          flex: 1;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 60px 100px;
          margin-top: -16px;

        }

        .assessment-tools-page {
          width: 100%;
        }

        .assessment-tools-page h2 {
          font-size: clamp(32px, 4vw, 44px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1.5px;
          color: var(--green-deep);
          margin-bottom: 36px;
          margin-top: 0;
        }

        .assessment-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          align-items: stretch;
          width: 100%;
        }

        .assessment-card {
          background: var(--white);
          border: 3px solid rgba(28, 92, 46, 0.42);
          border-radius: 28px;
          padding: 30px;
          box-shadow:
            0 22px 52px rgba(28, 92, 46, 0.14),
            0 4px 14px rgba(28, 92, 46, 0.1);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .assessment-card:hover {
          border-color: rgba(28, 92, 46, 0.68);
          box-shadow:
            0 24px 60px rgba(28, 92, 46, 0.18),
            0 6px 18px rgba(28, 92, 46, 0.12);
        }

        .assessment-card--form {
          background: var(--white);
          border-color: var(--border-light);
        }

        .assessment-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
          width: 100%;
        }

        .assessment-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-dark);
        }

        .assessment-form input,
        .assessment-form select {
          width: 100%;
          height: 46px;
          background: var(--bg-mint);
          border: 1px solid var(--border-light);
          border-radius: 14px;
          padding: 0 16px;
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
          gap: 14px;
          margin-bottom: 16px;
        }

        .card-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: var(--bg-mint);
          color: var(--green-mid);
          border-radius: 12px;
          flex-shrink: 0;
        }

        .assessment-card__header h3 {
          font-size: 19px;
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
          margin-top: -10px;
          padding: 4px 0 18px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          order: 2;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 18px;
        }

        .assessment-tools-page .assessment-card .assessment-value {
          font-size: 46px !important;
          font-weight: 900;
          color: var(--green-deep);
          line-height: 0.95;
          margin: 0 !important;
          letter-spacing: 0;
        }

        .assessment-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(46,139,87,0.13);
          color: var(--green-deep);
          font-size: 13px;
          font-weight: 900;
          padding: 9px 16px;
          border-radius: 999px;
          margin: 0 !important;
          text-transform: uppercase;
          letter-spacing: 0.2px;
        }

        .assessment-card .description-text {
          font-size: 15px;
          line-height: 1.7;
          color: #243f2d;
          font-weight: 500;
        }

                .assessment-card > p {
          order: 3;
          margin-top: 18px;
        }

        /* FOOTER BRACKETS */
        .footer {
          background: var(--green-deep);
          padding: 60px 0 40px;
          margin-top: auto;
          width: 100%;
          overflow: hidden;
        }

        .footer-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 60px;
          box-sizing: border-box;
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-logo-icon {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        .footer-logo-text {
          color: white;
          font-size: 18px;
          font-weight: 800;
        }

        .footer-links {
          display: flex;
          gap: 24px;
        }

        .footer-links a {
          text-decoration: none;
          color: rgba(255,255,255,0.70);
          font-size: 14px;
          font-weight: 600;
          transition: 0.25s ease;
        }

        .footer-links a:hover {
          color: white;
        }

        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.12);
          margin-bottom: 24px;
          width: 100%;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-copy,
        .footer-tagline {
          color: rgba(255,255,255,0.50);
          font-size: 13px;
        }

        @media (max-width: 1200px) {
          .assessment-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .assessment-tools-content {
            padding: 40px 24px;
          }
          .footer-container {
            padding: 0 24px;
          }
          .footer-inner,
          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
        }

        @media (max-width: 640px) {
          .assessment-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* CORE DISPLAY ELEMENT */}
      <main className="assessment-tools-content">
        <div className="assessment-tools-page">
        

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
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-inner">
            <div className="footer-logo">
              <img src="https://www.image2url.com/r2/default/images/1779771082419-77f45caf-4ccd-438f-95c7-0caabce26494.png" alt="DataDiet" className="footer-logo-icon" />
              <div className="footer-logo-text">DataDiet</div>
            </div>

            <div className="footer-links">
              <Link to="/client/contact">Contact us</Link>
              <Link to="/client/team">Our Team</Link>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <div className="footer-copy">© 2026 DataDiet. All rights reserved.</div>
            <div className="footer-tagline">Built with care for healthier lives 🌱</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

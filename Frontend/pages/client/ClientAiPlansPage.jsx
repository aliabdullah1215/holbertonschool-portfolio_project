import { useState } from 'react';
import { Link } from 'react-router-dom';

export const questionnaireSteps = [
  {
    id: 'goal',
    title: 'Goal',
    description: 'Tell us what outcome you want from your nutrition plan.',
    fields: [
      {
        id: 'goalType',
        label: 'Primary goal',
        type: 'select',
        options: [
          { value: 'weight_loss', label: 'Weight loss' },
          { value: 'maintenance', label: 'Weight maintenance' },
          { value: 'weight_gain', label: 'Weight gain' },
          { value: 'healthy_habits', label: 'Healthy habits' },
        ],
      },
      {
        id: 'goalPace',
        label: 'Preferred pace',
        type: 'select',
        options: [
          { value: 'gentle', label: 'Gentle' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'aggressive', label: 'Aggressive' },
        ],
        condition: (answers) => answers.goalType !== 'maintenance',
      },
    ],
  },
  {
    id: 'body-data',
    title: 'Body Data',
    description: 'Basic measurements help us shape a realistic plan.',
    fields: [
      { id: 'age', label: 'Age', type: 'number', min: 1, placeholder: '28' },
      {
        id: 'sex',
        label: 'Sex',
        type: 'select',
        options: [
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
        ],
      },
      {
        id: 'weightKg',
        label: 'Weight (kg)',
        type: 'number',
        min: 1,
        step: '0.1',
        placeholder: '72',
      },
      {
        id: 'heightCm',
        label: 'Height (cm)',
        type: 'number',
        min: 1,
        step: '0.1',
        placeholder: '168',
      },
    ],
  },
  {
    id: 'activity',
    title: 'Activity',
    description: 'We need to understand your movement and training routine.',
    fields: [
      {
        id: 'activityLevel',
        label: 'Daily activity level',
        type: 'select',
        options: [
          { value: 'sedentary', label: 'Sedentary' },
          { value: 'light', label: 'Lightly active' },
          { value: 'moderate', label: 'Moderately active' },
          { value: 'active', label: 'Very active' },
        ],
      },
      {
        id: 'doesExercise',
        label: 'Do you exercise regularly?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 'trainingDaysPerWeek',
        label: 'Training days per week',
        type: 'select',
        options: [
          { value: '1', label: '1 day' },
          { value: '2', label: '2 days' },
          { value: '3', label: '3 days' },
          { value: '4', label: '4 days' },
          { value: '5', label: '5 days' },
          { value: '6', label: '6 days' },
          { value: '7', label: '7 days' },
        ],
        condition: (answers) => answers.doesExercise === 'yes',
      },
      {
        id: 'trainingTypes',
        label: 'Training types',
        type: 'checkbox-group',
        options: [
          { value: 'walking', label: 'Walking' },
          { value: 'gym', label: 'Gym' },
          { value: 'running', label: 'Running' },
          { value: 'home_workouts', label: 'Home workouts' },
          { value: 'sports', label: 'Sports' },
        ],
        condition: (answers) => answers.doesExercise === 'yes',
      },
    ],
  },
  {
    id: 'health',
    title: 'Health',
    description: 'Food safety and restrictions come before optimization.',
    fields: [
      {
        id: 'hasAllergies',
        label: 'Do you have food allergies?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 'allergies',
        label: 'List your allergies',
        type: 'text',
        placeholder: 'Lactose, peanuts, gluten...',
        condition: (answers) => answers.hasAllergies === 'yes',
      },
      {
        id: 'medicalConditions',
        label: 'Medical conditions',
        type: 'text',
        placeholder: 'Diabetes, hypertension, PCOS...',
      },
      {
        id: 'dietaryRestrictions',
        label: 'Dietary restrictions',
        type: 'text',
        placeholder: 'Low sodium, halal only, no seafood...',
      },
    ],
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Personal food preferences help the plan feel realistic.',
    fields: [
      {
        id: 'dietType',
        label: 'Preferred diet style',
        type: 'select',
        options: [
          { value: 'balanced', label: 'Balanced' },
          { value: 'high_protein', label: 'High protein' },
          { value: 'low_carb', label: 'Lower carb' },
          { value: 'vegetarian', label: 'Vegetarian' },
        ],
      },
      {
        id: 'preferredFoods',
        label: 'Preferred foods',
        type: 'text',
        placeholder: 'Chicken, rice, yogurt, oats...',
      },
      {
        id: 'dislikedFoods',
        label: 'Disliked foods',
        type: 'text',
        placeholder: 'Mushrooms, tuna, olives...',
      },
      {
        id: 'excludedIngredients',
        label: 'Ingredients to avoid',
        type: 'text',
        placeholder: 'Protein powder, spicy sauces...',
      },
    ],
  },
  {
    id: 'behavior',
    title: 'Behavior',
    description: 'This helps us adapt the plan to real life, not just theory.',
    fields: [
      {
        id: 'mealsPerDay',
        label: 'Meals per day',
        type: 'select',
        options: [
          { value: '3', label: '3 meals' },
          { value: '4', label: '4 meals' },
          { value: '5', label: '5 meals' },
          { value: '6', label: '6 meals' },
        ],
      },
      {
        id: 'prefersQuickMeals',
        label: 'Do you prefer quick meals?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 'budgetSensitive',
        label: 'Is budget a major concern?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 'cookingLevel',
        label: 'Cooking confidence',
        type: 'select',
        options: [
          { value: 'basic', label: 'Basic' },
          { value: 'comfortable', label: 'Comfortable' },
          { value: 'advanced', label: 'Advanced' },
        ],
      },
      {
        id: 'scheduleStyle',
        label: 'Typical routine',
        type: 'select',
        options: [
          { value: 'busy', label: 'Busy' },
          { value: 'structured', label: 'Structured' },
          { value: 'shift_based', label: 'Shift-based' },
          { value: 'flexible', label: 'Flexible' },
        ],
      },
      {
        id: 'additionalNotes',
        label: 'Additional notes',
        type: 'textarea',
        placeholder: 'Anything else we should consider when building your nutrition plan?',
      },
    ],
  },
  {
    id: 'output-preferences',
    title: 'Output Preferences',
    description: 'Choose how you want the plan to feel when it is generated.',
    fields: [
      {
        id: 'detailLevel',
        label: 'Plan detail level',
        type: 'select',
        options: [
          { value: 'simple', label: 'Simple' },
          { value: 'detailed', label: 'Detailed' },
        ],
      },
      {
        id: 'includeAlternatives',
        label: 'Include meal alternatives?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 'varietyLevel',
        label: 'Variety preference',
        type: 'select',
        options: [
          { value: 'low', label: 'Low variety' },
          { value: 'medium', label: 'Medium variety' },
          { value: 'high', label: 'High variety' },
        ],
      },
      {
        id: 'language',
        label: 'Output language',
        type: 'select',
        options: [{ value: 'en', label: 'English' }],
      },
    ],
  },
];

export default function ClientAiPlansPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({
    goalType: 'weight_loss',
    goalPace: 'moderate',
    age: '',
    sex: 'male',
    weightKg: '',
    heightCm: '',
    activityLevel: 'moderate',
    doesExercise: 'no',
    trainingDaysPerWeek: '3',
    trainingTypes: [],
    hasAllergies: 'no',
    allergies: '',
    medicalConditions: '',
    dietaryRestrictions: '',
    dietType: 'balanced',
    preferredFoods: '',
    dislikedFoods: '',
    excludedIngredients: '',
    mealsPerDay: '3',
    prefersQuickMeals: 'no',
    budgetSensitive: 'no',
    cookingLevel: 'comfortable',
    scheduleStyle: 'structured',
    additionalNotes: '',
    detailLevel: 'detailed',
    includeAlternatives: 'yes',
    varietyLevel: 'medium',
    language: 'en',
  });

  const [loading, setLoading] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);

  const currentStep = questionnaireSteps[currentStepIndex];

  const handleInputChange = (fieldId, value) => {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleCheckboxChange = (fieldId, optionValue, isChecked) => {
    setAnswers((prev) => {
      const currentList = prev[fieldId] || [];
      const updatedList = isChecked
        ? [...currentList, optionValue]
        : currentList.filter((item) => item !== optionValue);
      return { ...prev, [fieldId]: updatedList };
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStepIndex < questionnaireSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setPlanGenerated(true);
      }, 2000);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

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
          background: var(--bg-mint);
        }

        .client-page-wrapper {
          width: 100%;
          min-height: 100vh;
          background: var(--bg-mint);
          overflow-x: hidden;
          padding-top: 40px;
          position: relative;
        }

        .hero {
          position: relative;
          overflow: hidden;
          padding: 40px 0 80px;
        }

        .hero-blobs {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 60px;
        }

        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: flex-start;
          position: relative;
          z-index: 2;
        }

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(46,139,87,0.10);
          color: var(--green-mid);
          font-size: 13px;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(46,139,87,0.20);
          margin-bottom: 28px;
        }

        .hero-heading {
          font-size: clamp(44px, 5vw, 72px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -2px;
          color: var(--green-deep);
          margin-bottom: 26px;
        }

        .hero-heading span {
          color: var(--green-mid);
        }

        .hero-subtext {
          max-width: 560px;
          font-size: 18px;
          line-height: 1.8;
          color: var(--text-body);
          margin-bottom: 40px;
        }

        /* CARD STYLE CONTAINER */
        .hero-card-wrapper {
          display: flex;
          justify-content: center;
          position: relative;
        }

        .dashboard-card {
          width: 540px;
          max-width: 100%;
          background: white;
          border-radius: 28px;
          padding: 30px;
          box-shadow: 0 24px 70px rgba(28,92,46,0.15), 0 4px 14px rgba(0,0,0,0.05);
          position: relative;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .card-title-small {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }

        .card-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--green-deep);
        }

        .card-badge {
          background: rgba(46,139,87,0.10);
          color: var(--green-mid);
          font-size: 11px;
          font-weight: 800;
          padding: 6px 12px;
          border-radius: 999px;
        }

        .step-description {
          font-size: 14px;
          color: var(--text-body);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .progress-bar-container {
          width: 100%;
          height: 6px;
          background: #EBF4EE;
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--green-mid);
          transition: width 0.3s ease;
        }

        .divider {
          height: 1px;
          background: var(--border-light);
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 8px;
        }

        .form-input, .form-textarea {
          width: 100%;
          background: var(--bg-mint);
          border: 1px solid var(--border-light);
          padding: 12px 16px;
          border-radius: 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          color: var(--text-dark);
          font-weight: 600;
          outline: none;
          transition: 0.2s ease;
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: var(--green-mid);
          background: white;
          box-shadow: 0 0 0 4px rgba(46,139,87,0.08);
        }

        /* GRID FOR SELECTIONS BUTTONS */
        .button-group-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .custom-choice-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-mint);
          padding: 14px 16px;
          border-radius: 14px;
          cursor: pointer;
          user-select: none;
          border: 1px solid transparent;
          font-size: 13px;
          font-weight: 700;
          color: var(--green-deep);
          transition: 0.2s ease;
        }

        .custom-choice-btn:hover {
          background: #E4F2E7;
        }

        .custom-choice-btn.selected {
          background: rgba(46,139,87,0.08);
          border-color: var(--green-mid);
        }

        /* FORCED PERFECT CIRCULAR RADIO INDICATOR FOR ALL CHOICE SELECTIONS */
        .choice-indicator-circle {
          width: 16px;
          height: 16px;
          border-radius: 50%; /* Pure Circle */
          border: 2px solid var(--green-light);
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          transition: 0.2s ease;
          flex-shrink: 0;
        }

        .custom-choice-btn.selected .choice-indicator-circle {
          border-color: var(--green-mid);
          background: var(--green-mid);
        }

        /* Inner Dot for Checked Circle Effect */
        .choice-indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: white;
          display: block;
        }

        /* WIZARD ACTIONS STYLES */
        .wizard-actions-row {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn-back {
          background: white;
          border: 2px solid var(--border-light);
          color: var(--green-deep);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          padding: 12px 24px;
          border-radius: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.2s ease;
        }

        .btn-back:hover {
          border-color: var(--green-mid);
          background: var(--bg-mint);
        }

        .btn-continue {
          flex: 1;
          background: linear-gradient(135deg, var(--green-mid), var(--green-deep));
          color: white;
          border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          padding: 12px;
          border-radius: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 6px 18px rgba(46,139,87,0.15);
          transition: 0.2s ease;
        }

        .btn-continue:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }

        /* SUCCESS SCREEN RESPONSE CONFIGS */
        .success-wrapper {
          text-align: center;
          padding: 20px 0 10px;
        }

        .success-icon {
          font-size: 52px;
          color: var(--green-mid);
          margin-bottom: 16px;
        }

        .success-title {
          font-size: 20px;
          font-weight: 800;
          color: var(--green-deep);
          margin-bottom: 8px;
        }

        .success-text {
          font-size: 14px;
          color: var(--text-body);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .card-actions-row {
          display: flex;
          gap: 12px;
        }

        .action-link-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--bg-mint);
          border: 1px solid var(--border-light);
          padding: 12px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 700;
          color: var(--green-deep);
          text-decoration: none;
          transition: 0.2s ease;
        }

        .action-link-btn:hover {
          background: white;
          border-color: var(--green-mid);
          transform: translateY(-1px);
        }

        /* GLOBAL APPLICATION FOOTER */
        .footer {
          background: var(--green-deep);
          padding: 50px 0 30px;
          margin-top: 40px;
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 26px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-logo-icon {
          width: 38px;
          height: 38px;
          background: rgba(255,255,255,0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-logo-icon i {
          color: white;
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

        @media (max-width: 1024px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 60px;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 24px;
          }
          .hero-heading {
            font-size: 48px;
          }
          .button-group-grid {
            grid-template-columns: 1fr;
          }
          .footer-inner, .footer-bottom {
            flex-direction: column;
            gap: 18px;
            text-align: center;
          }
        }
      `}</style>

      {/* GRAPHIC DECORATIONS */}
      <section className="hero">
        <svg
          className="hero-blobs"
          viewBox="0 0 1728 700"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <ellipse cx="180" cy="240" rx="280" ry="220" fill="rgba(46,139,87,0.06)" />
          <ellipse cx="1580" cy="160" rx="200" ry="160" fill="rgba(46,139,87,0.05)" />
          <ellipse cx="1400" cy="580" rx="260" ry="180" fill="rgba(28,92,46,0.05)" />
        </svg>

        <div className="container">
          <div className="hero-inner">

            {/* LEFT CONTAINER HEADER DATA */}
            <div>
              <div className="hero-label">
                <i className="fas fa-wand-magic-sparkles"></i>
                AI Intelligent Engine V3
              </div>

              <h1 className="hero-heading">
                Configure your <span>Nutrition Plan.</span>
              </h1>

              <p className="hero-subtext">
                Complete our multidimensional profiling sequence. Our neural model matches metabolism parameters, habits, and body stats to build your custom diet.
              </p>
            </div>

            {/* RIGHT SIDE DATA SEQUENCE LAYOUT */}
            <div className="hero-card-wrapper">
              <div className="dashboard-card">

                {!planGenerated ? (
                  <>
                    <div className="card-header">
                      <div>
                        <div className="card-title-small">Step {currentStepIndex + 1} of {questionnaireSteps.length}</div>
                        <div className="card-title">{currentStep.title}</div>
                      </div>
                      <div className="card-badge">Dynamic Data</div>
                    </div>

                    <p className="step-description">{currentStep.description}</p>

                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${((currentStepIndex + 1) / questionnaireSteps.length) * 100}%` }}
                      ></div>
                    </div>

                    <div className="divider"></div>

                    <form onSubmit={handleNext}>
                      {currentStep.fields.map((field) => {
                        if (field.condition && !field.condition(answers)) {
                          return null;
                        }

                        return (
                          <div className="form-group" key={field.id}>
                            <label className="form-label">{field.label}</label>

                            {/* SELECT ELEMENT AS CIRCLE SELECTION BUTTONS */}
                            {field.type === 'select' && (
                              <div className="button-group-grid">
                                {field.options.map((opt) => {
                                  const isSelected = answers[field.id] === opt.value;
                                  return (
                                    <div
                                      key={opt.value}
                                      className={`custom-choice-btn ${isSelected ? 'selected' : ''}`}
                                      onClick={() => handleInputChange(field.id, opt.value)}
                                    >
                                      <div className="choice-indicator-circle">
                                        {isSelected && <span className="choice-indicator-dot"></span>}
                                      </div>
                                      <span>{opt.label}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* TEXT / NUMBER DATA FIELD INJECTORS */}
                            {(field.type === 'text' || field.type === 'number') && (
                              <input
                                type={field.type}
                                min={field.min}
                                step={field.step}
                                placeholder={field.placeholder}
                                value={answers[field.id] || ''}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                className="form-input"
                                required={field.type === 'number'}
                              />
                            )}

                            {/* TEXTAREA DESCRIPTIVE COMPONENT */}
                            {field.type === 'textarea' && (
                              <textarea
                                placeholder={field.placeholder}
                                value={answers[field.id] || ''}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                className="form-textarea"
                              />
                            )}

                            {/* RADIO FIELDS AS CIRCLE SELECTION BUTTONS */}
                            {field.type === 'radio' && (
                              <div className="button-group-grid">
                                {field.options.map((opt) => {
                                  const isSelected = answers[field.id] === opt.value;
                                  return (
                                    <div
                                      key={opt.value}
                                      className={`custom-choice-btn ${isSelected ? 'selected' : ''}`}
                                      onClick={() => handleInputChange(field.id, opt.value)}
                                    >
                                      <div className="choice-indicator-circle">
                                        {isSelected && <span className="choice-indicator-dot"></span>}
                                      </div>
                                      <span>{opt.label}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* CHECKBOX GROUPS AS CIRCLE SELECTION BUTTONS */}
                            {field.type === 'checkbox-group' && (
                              <div className="button-group-grid">
                                {field.options.map((opt) => {
                                  const isChecked = (answers[field.id] || []).includes(opt.value);
                                  return (
                                    <div
                                      key={opt.value}
                                      className={`custom-choice-btn ${isChecked ? 'selected' : ''}`}
                                      onClick={() => handleCheckboxChange(field.id, opt.value, !isChecked)}
                                    >
                                      <div className="choice-indicator-circle">
                                        {isChecked && <span className="choice-indicator-dot"></span>}
                                      </div>
                                      <span>{opt.label}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* BOTTOM ACTION LAYOUT WIZARD ROW */}
                      <div className="wizard-actions-row">
                        {currentStepIndex > 0 && (
                          <button type="button" onClick={handlePrev} className="btn-back">
                            <i className="fas fa-arrow-left"></i> Back
                          </button>
                        )}
                        <button type="submit" className="btn-continue" disabled={loading}>
                          {loading ? (
                            <>
                              <i className="fas fa-spinner fa-spin"></i> Processing Profiles...
                            </>
                          ) : currentStepIndex === questionnaireSteps.length - 1 ? (
                            <>
                              <i className="fas fa-wand-magic-sparkles"></i> Build My Plan
                            </>
                          ) : (
                            <>
                              Next Step <i className="fas fa-arrow-right"></i>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  /* THE FIXED GREEN BOTTOM BUTTON ACTION COMPONENT BLOCK */
                  <div className="success-wrapper">
                    <i className="fas fa-circle-check success-icon"></i>
                    <h3 className="success-title">Plan Successfully Processed!</h3>
                    <p className="success-text">
                      Your target metadata, training metrics, and food rules have been configured. Your diet sheet is live on your personal tracking dashboard.
                    </p>

                    <div className="card-actions-row">
                      <button onClick={() => { setPlanGenerated(false); setCurrentStepIndex(0); }} className="action-link-btn">
                        <i className="fas fa-rotate-left"></i> Retake Form
                      </button>
                      <Link to="/client/home" className="action-link-btn" style={{ background: 'var(--green-mid)', color: 'white' }}>
                        <i className="fas fa-chart-line"></i> View Tracking
                      </Link>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <div className="footer-logo-text">DataDiet</div>
            </div>

            <div className="footer-links">
              <Link to="/client/home">Dashboard</Link>
              <Link to="/client/ai-plans">AI Plans</Link>
              <Link to="/client/contact">Contact</Link>
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

import { questionnaireSteps } from '../config/questionnaireConfig';
import { updateCheckboxArray } from '../utils/answerHelpers';

function FieldControl({ field, value, onChange }) {
  if (field.type === 'select') {
    return (
      <select name={field.id} value={value} onChange={onChange}>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'radio') {
    return (
      <div className="choice-group">
        {field.options.map((option) => (
          <label key={option.value} className="choice-chip">
            <input
              checked={value === option.value}
              name={field.id}
              type="radio"
              value={option.value}
              onChange={onChange}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    );
  }

  if (field.type === 'checkbox-group') {
    return (
      <div className="choice-group">
        {field.options.map((option) => (
          <label key={option.value} className="choice-chip">
            <input
              checked={value.includes(option.value)}
              name={field.id}
              type="checkbox"
              value={option.value}
              onChange={(event) =>
                onChange({
                  target: {
                    name: field.id,
                    value: updateCheckboxArray(value, event.target.value),
                  },
                })
              }
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        name={field.id}
        rows="5"
        placeholder={field.placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <input
      name={field.id}
      type={field.type}
      min={field.min}
      step={field.step}
      placeholder={field.placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

function AiPlanQuestionnaire({
  answers,
  currentStepIndex,
  errors,
  isSubmitting,
  onBack,
  onChange,
  onNext,
  onSubmit,
}) {
  const currentStep = questionnaireSteps[currentStepIndex];
  const visibleFields = currentStep.fields.filter(
    (field) => !field.condition || field.condition(answers)
  );
  const isLastStep = currentStepIndex === questionnaireSteps.length - 1;

  return (
    <section className="assessment-card assessment-card--form">
      <div className="assessment-card__header">
        <span className="eyebrow">
          Step {currentStepIndex + 1} of {questionnaireSteps.length}
        </span>
        <h3>{currentStep.title}</h3>
      </div>
      <p>{currentStep.description}</p>

      <div className="step-progress">
        {questionnaireSteps.map((step, index) => (
          <div
            key={step.id}
            className={`step-progress__item ${
              index === currentStepIndex ? 'step-progress__item--active' : ''
            } ${index < currentStepIndex ? 'step-progress__item--done' : ''}`}
          >
            <span>{index + 1}</span>
            <small>{step.title}</small>
          </div>
        ))}
      </div>

      <div className="auth-form assessment-form">
        {visibleFields.map((field) => (
          <label key={field.id}>
            {field.label}
            <FieldControl field={field} value={answers[field.id]} onChange={onChange} />
            {errors[field.id] ? <span className="field-error">{errors[field.id]}</span> : null}
          </label>
        ))}
      </div>

      <div className="wizard-actions">
        <button
          className="ghost-link ghost-link--button"
          type="button"
          onClick={onBack}
          disabled={currentStepIndex === 0}
        >
          Back
        </button>
        {isLastStep ? (
          <button type="button" onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Generating plan...' : 'Generate plan'}
          </button>
        ) : (
          <button type="button" onClick={onNext}>
            Continue
          </button>
        )}
      </div>
    </section>
  );
}

export default AiPlanQuestionnaire;

import { useEffect, useState } from 'react';
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
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const currentStep = questionnaireSteps[currentStepIndex];
  const visibleFields = currentStep.fields.filter(
    (field) => !field.condition || field.condition(answers)
  );
  const currentField = visibleFields[currentFieldIndex] || visibleFields[0];
  const isLastStep = currentStepIndex === questionnaireSteps.length - 1;
  const isLastQuestion = currentFieldIndex === visibleFields.length - 1;

  useEffect(() => {
    setCurrentFieldIndex(0);
  }, [currentStepIndex]);

  useEffect(() => {
    if (currentFieldIndex > visibleFields.length - 1) {
      setCurrentFieldIndex(Math.max(visibleFields.length - 1, 0));
    }
  }, [currentFieldIndex, visibleFields.length]);

  useEffect(() => {
    function handleQuestionError(event) {
      setCurrentFieldIndex(event.detail.fieldIndex);
    }

    window.addEventListener('ai-plan-question-error', handleQuestionError);

    return () => {
      window.removeEventListener('ai-plan-question-error', handleQuestionError);
    };
  }, []);

  function handlePreviousQuestion() {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex((current) => current - 1);
      return;
    }

    onBack();
  }

  function handleNextQuestion() {
    if (errors[currentField.id]) {
      return;
    }

    if (!isLastQuestion) {
      setCurrentFieldIndex((current) => current + 1);
      return;
    }

    if (isLastStep) {
      onSubmit();
      return;
    }

    onNext();
  }


  return (
    <section className="assessment-card assessment-card--form assessment-card--single-question">
      <div className="step-progress step-progress--compact">
        {questionnaireSteps.map((step, index) => (
          <div
            key={step.id}
            className={`step-progress__item ${index === currentStepIndex ? 'step-progress__item--active' : ''
              } ${index < currentStepIndex ? 'step-progress__item--done' : ''}`}
          >
            <span>{index + 1}</span>
            <small>{step.title}</small>
          </div>
        ))}
      </div>

      <div className="assessment-question-card">
        <div className="assessment-card__header">
          <span className="eyebrow">
            Section {currentStepIndex + 1} of {questionnaireSteps.length}
          </span>
          <h3>{currentStep.title}</h3>
          <p>{currentStep.description}</p>
        </div>

        <div className="question-progress">
          Question {currentFieldIndex + 1} of {visibleFields.length}
        </div>

        <div className="auth-form assessment-form assessment-form--single">
          <label>
            {currentField.label}
            <FieldControl field={currentField} value={answers[currentField.id]} onChange={onChange} />
            
          </label>
        </div>

        <div className="wizard-actions wizard-actions--question">
          <button
            className="ghost-link ghost-link--button"
            type="button"
            onClick={handlePreviousQuestion}
            disabled={currentStepIndex === 0 && currentFieldIndex === 0}
          >
            Previous
          </button>

          <button
            className="wizard-next-button"
            type="button"
            onClick={handleNextQuestion}
            disabled={isSubmitting}
          >

            {isLastStep && isLastQuestion
              ? isSubmitting
                ? 'Generating plan...'
                : 'Generate plan'
              : isLastQuestion
                ? 'Next section'
                : 'Next question'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default AiPlanQuestionnaire;

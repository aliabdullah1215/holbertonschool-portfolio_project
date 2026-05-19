import { questionnaireSteps } from '../config/questionnaireConfig';

function isEmptyValue(value) {
  return value === '' || value === null || value === undefined;
}

export function validateAiPlanField(field, answers) {
  const value = answers[field.id];

  if (field.type === 'checkbox-group' && (!Array.isArray(value) || value.length === 0)) {
    return 'Please select at least one option.';
  }

  if (isEmptyValue(value)) {
    return 'This field is required.';
  }

  if (field.type === 'number' && Number(value) <= 0) {
    return 'Please enter a valid value.';
  }

  return '';
}

export function validateAiPlanAnswers(answers, stepId = null) {
  const errors = {};
  const stepsToValidate = stepId
    ? questionnaireSteps.filter((step) => step.id === stepId)
    : questionnaireSteps;

  stepsToValidate.forEach((step) => {
    step.fields.forEach((field) => {
      const isVisible = !field.condition || field.condition(answers);

      if (!isVisible) {
        return;
      }

      const value = answers[field.id];

      if (field.type === 'checkbox-group' && (!Array.isArray(value) || value.length === 0)) {
        errors[field.id] = 'Please select at least one option.';
        return;
      }

      if (isEmptyValue(value)) {
        errors[field.id] = 'This field is required.';
        return;
      }

      if (field.type === 'number' && Number(value) <= 0) {
        errors[field.id] = 'Please enter a valid value.';
      }
    });
  });

  return errors;
}

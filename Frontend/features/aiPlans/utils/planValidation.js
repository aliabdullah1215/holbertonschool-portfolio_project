const requiredRootKeys = [
  'summary',
  'days',
  'shopping_list',
  'plan_tags',
  'fallback_message',
];

export function validateNutritionPlan(plan) {
  if (!plan || typeof plan !== 'object') {
    return { isValid: false, message: 'The generated plan is missing or invalid.' };
  }

  const missingKeys = requiredRootKeys.filter((key) => !(key in plan));

  if (missingKeys.length > 0) {
    return {
      isValid: false,
      message: `The generated plan is missing required sections: ${missingKeys.join(', ')}.`,
    };
  }

  if (!Array.isArray(plan.days) || plan.days.length === 0) {
    return { isValid: false, message: 'The generated plan must include at least one day.' };
  }

  return { isValid: true, message: '' };
}

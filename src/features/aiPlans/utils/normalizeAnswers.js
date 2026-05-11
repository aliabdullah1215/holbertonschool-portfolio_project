import { coerceBoolean, coerceNumber, parseCsvInput } from './answerHelpers';

export function normalizeAiPlanAnswers(answers) {
  return {
    profile: {
      age: coerceNumber(answers.age),
      sex: answers.sex,
      weight_kg: coerceNumber(answers.weightKg),
      height_cm: coerceNumber(answers.heightCm),
    },
    goal: {
      type: answers.goalType,
      pace: answers.goalPace || 'moderate',
    },
    activity: {
      level: answers.activityLevel,
      does_exercise: coerceBoolean(answers.doesExercise),
      training_days_per_week: coerceBoolean(answers.doesExercise)
        ? coerceNumber(answers.trainingDaysPerWeek)
        : 0,
      training_type: coerceBoolean(answers.doesExercise) ? answers.trainingTypes : [],
    },
    health: {
      has_allergies: coerceBoolean(answers.hasAllergies),
      allergies: coerceBoolean(answers.hasAllergies) ? parseCsvInput(answers.allergies) : [],
      medical_conditions: parseCsvInput(answers.medicalConditions),
      dietary_restrictions: parseCsvInput(answers.dietaryRestrictions),
    },
    preferences: {
      diet_type: answers.dietType,
      preferred_foods: parseCsvInput(answers.preferredFoods),
      disliked_foods: parseCsvInput(answers.dislikedFoods),
      excluded_ingredients: parseCsvInput(answers.excludedIngredients),
    },
    behavior: {
      meals_per_day: coerceNumber(answers.mealsPerDay),
      prefers_quick_meals: coerceBoolean(answers.prefersQuickMeals),
      budget_sensitive: coerceBoolean(answers.budgetSensitive),
      cooking_level: answers.cookingLevel,
      schedule_style: answers.scheduleStyle,
      additional_notes: answers.additionalNotes.trim(),
    },
    output_preferences: {
      detail_level: answers.detailLevel,
      include_alternatives: coerceBoolean(answers.includeAlternatives),
      variety_level: answers.varietyLevel,
      language: answers.language,
    },
  };
}

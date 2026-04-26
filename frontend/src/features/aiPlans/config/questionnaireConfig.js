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

function clonePlan(plan) {
  return structuredClone(plan);
}

function updateMeals(plan, updater) {
  const nextPlan = clonePlan(plan);

  nextPlan.days = nextPlan.days.map((day) => ({
    ...day,
    meals: day.meals.map((meal) => updater(meal)),
  }));

  return nextPlan;
}

export function replaceMealWithAlternative(plan, mealId, alternativeId = null) {
  return updateMeals(plan, (meal) => {
    if (meal.meal_id !== mealId || !Array.isArray(meal.meal_alternatives) || meal.meal_alternatives.length === 0) {
      return meal;
    }

    const selectedAlternative = alternativeId
      ? meal.meal_alternatives.find((item) => item.meal_id === alternativeId)
      : meal.meal_alternatives[0];

    if (!selectedAlternative) {
      return meal;
    }

    return {
      ...selectedAlternative,
      meal_id: meal.meal_id,
      meal_alternatives: meal.meal_alternatives.filter(
        (alternative) => alternative.meal_id !== selectedAlternative.meal_id
      ),
    };
  });
}

export function replaceIngredientWithAlternative(plan, mealId, foodId) {
  return updateMeals(plan, (meal) => {
    if (meal.meal_id !== mealId) {
      return meal;
    }

    return {
      ...meal,
      foods: meal.foods.map((food) => {
        if (food.food_id !== foodId || !Array.isArray(food.substitutions) || food.substitutions.length === 0) {
          return food;
        }

        const replacement = food.substitutions[0];
        return {
          ...replacement,
          food_id: food.food_id,
          substitutions: food.substitutions.slice(1),
        };
      }),
    };
  });
}

export function filterQuickMeals(plan) {
  return updateMeals(plan, (meal) => {
    if (meal.tags?.includes('quick')) {
      return meal;
    }

    const quickAlternative = meal.meal_alternatives?.find((alternative) =>
      alternative.tags?.includes('quick')
    );

    return quickAlternative
      ? {
          ...quickAlternative,
          meal_id: meal.meal_id,
          meal_alternatives: meal.meal_alternatives.filter(
            (alternative) => alternative.meal_id !== quickAlternative.meal_id
          ),
        }
      : meal;
  });
}

export function filterBudgetMeals(plan) {
  return updateMeals(plan, (meal) => {
    if (meal.cost_estimation === 'low') {
      return meal;
    }

    const budgetAlternative = meal.meal_alternatives?.find(
      (alternative) => alternative.cost_estimation === 'low'
    );

    return budgetAlternative
      ? {
          ...budgetAlternative,
          meal_id: meal.meal_id,
          meal_alternatives: meal.meal_alternatives.filter(
            (alternative) => alternative.meal_id !== budgetAlternative.meal_id
          ),
        }
      : meal;
  });
}

export function increaseVarietyFromAlternatives(plan) {
  const nextPlan = clonePlan(plan);

  nextPlan.days = nextPlan.days.map((day) => ({
    ...day,
    meals: day.meals.map((meal, index) => {
      if (!Array.isArray(meal.meal_alternatives) || meal.meal_alternatives.length === 0) {
        return meal;
      }

      const alternative = meal.meal_alternatives[index % meal.meal_alternatives.length];

      return {
        ...meal,
        meal_alternatives: meal.meal_alternatives.filter(
          (item) => item.meal_id !== alternative.meal_id
        ).concat([
          {
            ...meal,
            meal_id: `${meal.meal_id}_previous`,
          },
        ]),
        foods: alternative.foods,
        tags: alternative.tags,
        title: alternative.title,
        prep_time_minutes: alternative.prep_time_minutes,
        cost_estimation: alternative.cost_estimation,
      };
    }),
  }));

  return nextPlan;
}

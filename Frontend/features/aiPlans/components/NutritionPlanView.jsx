function NutritionPlanView({
  isApplyingLocalEdit,
  plan,
  onIncreaseVariety,
  onMakeBudget,
  onMakeQuick,
  onReplaceIngredient,
  onReplaceMeal,
  onReset,
  readOnly = false,
}) {
  return (
    <section className="nutrition-plan">
      <div className="content-hero">
        <div className="content-card plan-summary-card">
          <div className="plan-summary-card__top">
            <div>
              <span className="eyebrow">Plan Summary</span>
              <h3>{plan.summary.plan_goal?.replace('_', ' ') || 'Personalized Nutrition Plan'}</h3>
            </div>

            {!readOnly ? (
              <button className="ghost-link ghost-link--button" type="button" onClick={onReset}>
                Reset the plan
              </button>
            ) : null}
          </div>

          <div className="macro-grid">
            <div className="macro-card">
              <span>Calories</span>
              <strong>{plan.summary.daily_calories}</strong>
            </div>
            <div className="macro-card">
              <span>Protein</span>
              <strong>{plan.summary.daily_macros.protein_g} g</strong>
            </div>
            <div className="macro-card">
              <span>Carbs</span>
              <strong>{plan.summary.daily_macros.carbs_g} g</strong>
            </div>
            <div className="macro-card">
              <span>Fat</span>
              <strong>{plan.summary.daily_macros.fat_g} g</strong>
            </div>
          </div>
        </div>

      </div>

      <div className="plan-days">
        {plan.days.map((day) => (
          <article className="plan-day-card" key={day.day_number}>

            <div className="plan-meal-list">
              {day.meals.map((meal) => (
                <article className="plan-meal-card" key={meal.meal_id}>
                  <div className="plan-meal-card__header">
                    <div>
                      <span className="eyebrow">{meal.meal_type}</span>
                      <h4>{meal.title}</h4>
                    </div>
                  </div>

                  <div className="tag-list">
                    {meal.tags?.map((tag) => (
                      <span className="tag-pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="food-list">
                    {meal.foods.map((food) => (
                      <div className="food-row" key={food.food_id}>
                        <div>
                          <strong>{food.name}</strong>
                          <span>{food.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="meal-actions">
                    <button
                      className="ghost-link ghost-link--button"
                      type="button"
                      disabled={readOnly || !meal.meal_alternatives?.length}
                      onClick={() => onReplaceMeal(meal.meal_id)}
                    >
                      Replace meal
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="content-grid">
        <section className="content-card">
          <h3>Shopping list</h3>
          <ul className="plan-list">
            {plan.shopping_list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="content-card plan-tags-card">
          <h3>Plan tags</h3>
          <div className="tag-list plan-tags-list">
            {plan.plan_tags.map((tag) => (
              <span className="tag-pill" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </section>
        <section className="content-card fallback-card">
          <h3>Fallback message</h3>
          <p>{plan.fallback_message || 'No fallback message was needed for this plan.'}</p>
        </section>

      </div>
    </section>
  );
}

export default NutritionPlanView;

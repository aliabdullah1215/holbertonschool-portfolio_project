function printPlanAsPdf(plan) {
  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    return;
  }

  const mealsHtml = plan.days
    .map((day) =>
      day.meals
        .map(
          (meal) => `
            <section class="meal">
              <p class="meal-type">${meal.meal_type}</p>
              <h3>${meal.title}</h3>
              <ul>
                ${meal.foods
              .map((food) => `<li><strong>${food.name}</strong> - ${food.quantity}</li>`)
              .join('')}
              </ul>
            </section>
          `
        )
        .join('')
    )
    .join('');

  printWindow.document.write(`
    <html>
      <head>
        <title>Nutrition Plan</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #143222;
            padding: 32px;
          }

          h1 {
            color: #043d18;
            font-size: 32px;
            margin-bottom: 8px;
          }

          .summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin: 24px 0;
          }

          .summary div,
          .meal {
            border: 1px solid #cfe4d4;
            border-radius: 14px;
            padding: 16px;
          }

          .meal {
            margin-bottom: 16px;
          }

          .meal-type {
            color: #2f6a42;
            font-weight: 700;
            text-transform: capitalize;
          }
        </style>
      </head>
      <body>
        <h1>${plan.summary.plan_goal?.replace('_', ' ') || 'Nutrition Plan'}</h1>

        <div class="summary">
          <div><p>Calories</p><strong>${plan.summary.daily_calories}</strong></div>
          <div><p>Protein</p><strong>${plan.summary.daily_macros.protein_g} g</strong></div>
          <div><p>Carbs</p><strong>${plan.summary.daily_macros.carbs_g} g</strong></div>
          <div><p>Fat</p><strong>${plan.summary.daily_macros.fat_g} g</strong></div>
        </div>

        ${mealsHtml}

        <h2>Shopping list</h2>
        <ul>
          ${plan.shopping_list.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

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

            <div className="plan-summary-actions">
              <button
                className="plan-action-button plan-action-button--primary"
                type="button"
                onClick={() => printPlanAsPdf(plan)}
              >
                <i className="fas fa-file-arrow-down"></i>
                Save as PDF
              </button>

              {!readOnly ? (
                <button className="plan-action-button plan-action-button--ghost" type="button" onClick={onReset}>
                  <i className="fas fa-rotate-left"></i>
                  Reset the plan
                </button>
              ) : null}
            </div>

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
                      className="plan-action-button plan-action-button--small"
                      type="button"
                      disabled={readOnly || !meal.meal_alternatives?.length}
                      onClick={() => onReplaceMeal(meal.meal_id)}
                    >
                      <i className="fas fa-repeat"></i>
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

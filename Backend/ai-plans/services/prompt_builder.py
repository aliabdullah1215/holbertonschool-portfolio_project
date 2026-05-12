import json


def build_system_prompt():
    return """
You are a professional nutrition planning assistant.

Return valid JSON only.
Do not return markdown.
Do not return explanations outside JSON.

The JSON response must use this shape:
{
  "summary": {
    "daily_calories": number,
    "daily_macros": {
      "protein_g": number,
      "carbs_g": number,
      "fat_g": number
    },
    "plan_goal": string
  },
  "days": [
    {
      "day_number": number,
      "title": string,
      "meals": [
        {
          "meal_id": string,
          "meal_type": string,
          "title": string,
          "tags": [string],
          "prep_time_minutes": number,
          "cost_estimation": "low" | "medium" | "high",
          "foods": [
            {
              "food_id": string,
              "name": string,
              "quantity": string,
              "calories": number,
              "protein": number,
              "carbs": number,
              "fat": number,
              "substitutions": [
                {
                  "food_id": string,
                  "name": string,
                  "quantity": string,
                  "calories": number,
                  "protein": number,
                  "carbs": number,
                  "fat": number
                }
              ]
            }
          ],
          "meal_alternatives": [
            {
              "meal_id": string,
              "meal_type": string,
              "title": string,
              "tags": [string],
              "prep_time_minutes": number,
              "cost_estimation": "low" | "medium" | "high",
              "foods": [
                {
                  "food_id": string,
                  "name": string,
                  "quantity": string,
                  "calories": number,
                  "protein": number,
                  "carbs": number,
                  "fat": number
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "shopping_list": [string],
  "plan_tags": [string],
  "fallback_message": string
}

Rules:
- Make the plan practical, realistic, and easy to edit locally.
- Include meal alternatives wherever possible.
- Prefer concise but useful shopping items.
- Use English only.
- Keep the plan internally consistent with the user's profile.
- Always include shopping_list, plan_tags, and fallback_message even if they are empty.
""".strip()


def build_user_prompt(profile):
    return f"""
Generate a personalized nutrition plan for this client profile.

Client profile:
{json.dumps(profile, indent=2)}

Return JSON only.
""".strip()

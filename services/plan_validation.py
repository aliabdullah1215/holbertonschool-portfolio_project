required_profile_keys = [
    "profile",
    "goal",
    "activity",
    "health",
    "preferences",
    "behavior",
    "output_preferences",
]

required_plan_keys = [
    "summary",
    "days",
    "shopping_list",
    "plan_tags",
    "fallback_message",
]


def hydrate_generated_plan(plan):
    if not isinstance(plan, dict):
        return plan

    hydrated_plan = dict(plan)
    hydrated_plan.setdefault("shopping_list", [])
    hydrated_plan.setdefault("plan_tags", [])
    hydrated_plan.setdefault("fallback_message", "")

    return hydrated_plan


def validate_normalized_profile(profile):
    if not isinstance(profile, dict):
        return "Invalid profile payload."

    missing_keys = [key for key in required_profile_keys if key not in profile]

    if missing_keys:
        return f"Missing required profile sections: {', '.join(missing_keys)}."

    if (
        not profile["profile"].get("age")
        or not profile["profile"].get("weight_kg")
        or not profile["profile"].get("height_cm")
    ):
        return "Profile age, weight, and height are required."

    if not profile["goal"].get("type"):
        return "Goal type is required."

    if not profile["activity"].get("level"):
        return "Activity level is required."

    return None


def validate_generated_plan(plan):
    if not isinstance(plan, dict):
        return "The generated plan is not a JSON object."

    missing_keys = [key for key in required_plan_keys if key not in plan]

    if missing_keys:
        return f"The generated plan is missing required keys: {', '.join(missing_keys)}."

    if not isinstance(plan.get("days"), list) or not plan["days"]:
        return "The generated plan must include at least one day."

    return None

import json
import os
from urllib import error, request

from ai_plans.services.plan_validation import hydrate_generated_plan, validate_generated_plan
from ai_plans.services.prompt_builder import build_system_prompt, build_user_prompt


def strip_code_fences(content):
    cleaned = content.strip()

    if cleaned.startswith("```"):
        cleaned = cleaned.split("\n", 1)[-1]

        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]

    return cleaned.strip()


def request_nutrition_plan(profile):
    payload = {
        "model": os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile"),
        "temperature": 0.4,
        "messages": [
            {"role": "system", "content": build_system_prompt()},
            {"role": "user", "content": build_user_prompt(profile)},
        ],
        "response_format": {"type": "json_object"},
    }

    groq_request = request.Request(
        url="https://api.groq.com/openai/v1/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "DataDiet/1.0 (+Django backend; AI Plans)",
            "Authorization": f"Bearer {os.environ['GROQ_API_KEY']}",
        },
        method="POST",
    )

    try:
        with request.urlopen(groq_request, timeout=60) as response:
            raw_response = json.loads(response.read().decode("utf-8"))
    except error.HTTPError as exc:
        details = exc.read().decode("utf-8", errors="ignore")
        raise ValueError(f"Groq request failed: {details or exc.reason}") from exc
    except error.URLError as exc:
        raise ValueError("Unable to reach Groq right now.") from exc

    content = raw_response.get("choices", [{}])[0].get("message", {}).get("content", "")

    if not content:
        raise ValueError("Groq returned an empty response.")

    try:
        plan = json.loads(strip_code_fences(content))
    except json.JSONDecodeError as exc:
        raise ValueError("Groq returned invalid JSON.") from exc

    plan = hydrate_generated_plan(plan)

    validation_error = validate_generated_plan(plan)

    if validation_error:
        raise ValueError(validation_error)

    return plan

from os import environ

from rest_framework import permissions, status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from ai_plans.models import SavedNutritionPlan
from ai_plans.serializers import (
    SavedNutritionPlanDetailSerializer,
    SavedNutritionPlanListSerializer,
)
from ai_plans.services.groq_client import request_nutrition_plan
from ai_plans.services.plan_validation import validate_normalized_profile


class IsClientUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "client"
        )


class GenerateAiPlanView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsClientUser]

    def post(self, request, *args, **kwargs):
        profile = request.data
        validation_error = validate_normalized_profile(profile)

        if validation_error:
            return Response({"detail": validation_error}, status=status.HTTP_400_BAD_REQUEST)

        if not environ.get("GROQ_API_KEY"):
            return Response(
                {"detail": "Groq API key is not configured on the server."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        try:
            plan = request_nutrition_plan(profile)
        except ValueError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_502_BAD_GATEWAY)
        except Exception:
            return Response(
                {"detail": "Unable to generate a nutrition plan right now."},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        saved_plan = SavedNutritionPlan.objects.create(
            user=request.user,
            goal=_extract_goal(plan),
            focus=_extract_focus(plan),
            note=_build_note(plan),
            profile_snapshot=profile,
            plan_content=plan,
        )

        return Response(
            {
                "id": saved_plan.id,
                "goal": saved_plan.goal,
                "focus": saved_plan.focus,
                "note": saved_plan.note,
                "status": saved_plan.status,
                "created_at": saved_plan.created_at,
                "plan": plan,
            },
            status=status.HTTP_200_OK,
        )


class SavedNutritionPlanListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsClientUser]
    serializer_class = SavedNutritionPlanListSerializer

    def get_queryset(self):
        return SavedNutritionPlan.objects.filter(user=self.request.user)


class SavedNutritionPlanDetailView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsClientUser]
    serializer_class = SavedNutritionPlanDetailSerializer

    def get_queryset(self):
        return SavedNutritionPlan.objects.filter(user=self.request.user)


def _extract_goal(plan):
    return str(
        plan.get("summary", {}).get("plan_goal", "Personalized nutrition plan")
    ).replace("_", " ").title()


def _extract_focus(plan):
    plan_tags = plan.get("plan_tags") or []

    if plan_tags:
        return str(plan_tags[0]).replace("_", " ").title()

    first_day_title = (plan.get("days") or [{}])[0].get("title")
    if first_day_title:
        return first_day_title

    return "Structured meal plan"


def _build_note(plan):
    fallback_message = plan.get("fallback_message")

    if fallback_message:
        return str(fallback_message)[:220]

    shopping_list = plan.get("shopping_list") or []
    if shopping_list:
        return f"Includes {len(shopping_list)} shopping list items for quick review."

    return "Generated nutrition plan ready to review."

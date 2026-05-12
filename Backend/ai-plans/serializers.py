from rest_framework import serializers

from .models import SavedNutritionPlan


class SavedNutritionPlanListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedNutritionPlan
        fields = ("id", "goal", "focus", "note", "status", "created_at")


class SavedNutritionPlanDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedNutritionPlan
        fields = (
            "id",
            "goal",
            "focus",
            "note",
            "status",
            "created_at",
            "updated_at",
            "profile_snapshot",
            "plan_content",
        )

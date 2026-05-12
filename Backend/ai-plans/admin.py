from django.contrib import admin

from .models import SavedNutritionPlan


@admin.register(SavedNutritionPlan)
class SavedNutritionPlanAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "goal", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("user__username", "goal", "focus")

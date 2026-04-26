from django.urls import path

from .views import GenerateAiPlanView, SavedNutritionPlanDetailView, SavedNutritionPlanListView

urlpatterns = [
    path("generate/", GenerateAiPlanView.as_view(), name="generate-ai-plan"),
    path("", SavedNutritionPlanListView.as_view(), name="saved-ai-plans"),
    path("<int:pk>/", SavedNutritionPlanDetailView.as_view(), name="saved-ai-plan-detail"),
]

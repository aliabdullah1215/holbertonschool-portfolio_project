from django.conf import settings
from django.db import models


class SavedNutritionPlan(models.Model):
    STATUS_CHOICES = (
        ("active", "Active"),
        ("archived", "Archived"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="saved_nutrition_plans",
    )
    goal = models.CharField(max_length=120)
    focus = models.CharField(max_length=160, blank=True)
    note = models.TextField(blank=True)
    profile_snapshot = models.JSONField()
    plan_content = models.JSONField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="active")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.user.username} - {self.goal}"

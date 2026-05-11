import api from '../../../api/axios';

export async function generateAiPlan(normalizedProfile) {
  const response = await api.post('ai-plans/generate/', normalizedProfile);
  return response.data;
}

export async function getMySavedPlans() {
  const response = await api.get('ai-plans/');
  return response.data;
}

export async function getSavedPlanById(planId) {
  const response = await api.get(`ai-plans/${planId}/`);
  return response.data;
}

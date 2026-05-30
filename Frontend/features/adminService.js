import api from '../api/axios';

export async function getDoctorApplications() {
  const response = await api.get('users/admin/doctor-applications/');
  return response.data;
}

export async function approveDoctorApplication(applicationId) {
  const response = await api.post(`users/doctor-applications/${applicationId}/approve/`);
  return response.data;
}

export async function rejectDoctorApplication(applicationId) {
  const response = await api.post(`users/doctor-applications/${applicationId}/reject/`);
  return response.data;
}
export async function getAdminUsers() {
  const response = await api.get('users/admin/users/');
  return response.data;
}
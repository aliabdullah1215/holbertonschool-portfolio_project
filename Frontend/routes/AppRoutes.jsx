import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import LoginScreen from '../pages/auth/LoginScreen';
import RegisterScreen from '../pages/auth/RegisterScreen';
import AdminDoctorApplicationsPage from '../pages/admin/AdminDoctorApplicationsPage';
import AdminHomePage from '../pages/admin/AdminHomePage';
import AdminShellPage from '../pages/admin/AdminShellPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import ClientAboutPage from '../pages/client/ClientAboutPage';
import ClientAiPlansPage from '../pages/client/ClientAiPlansPage';
import ClientAssessmentToolsPage from '../pages/client/ClientAssessmentToolsPage';
import ClientContactPage from '../pages/client/ClientContactPage';
import ClientHomePage from '../pages/client/ClientHomePage';
import ClientMedicalSupportPage from '../pages/client/ClientMedicalSupportPage';
import ClientPlansHistoryPage from '../pages/client/ClientPlansHistoryPage';
import ClientShellPage from '../pages/client/ClientShellPage';
import DoctorAboutPage from '../pages/doctor/DoctorAboutPage';
import DoctorContactPage from '../pages/doctor/DoctorContactPage';
import DoctorHomePage from '../pages/doctor/DoctorHomePage';
import DoctorJoinPage from '../pages/doctor/DoctorJoinPage';
import DoctorShellPage from '../pages/doctor/DoctorShellPage';
import LandingPage from '../pages/shared/LandingPage';
import TeamPage from '../pages/shared/TeamPage';
import HomeContactPage from '../pages/shared/HomeContactPage';
import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';
import ScrollToTop from '../components/ScrollToTop';

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="client/contact" element={<HomeContactPage />} />

        <Route
          element={
            <GuestRoute>
              <AuthLayout />
            </GuestRoute>
          }
        >
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Route>

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminShellPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<AdminHomePage />} />
          <Route path="doctor-applications" element={<AdminDoctorApplicationsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>

        <Route
          path="/client"
          element={
            <ProtectedRoute allowedRole="client">
              <ClientShellPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<ClientHomePage />} />
          <Route path="assessment-tools" element={<ClientAssessmentToolsPage />} />
          <Route path="plans-history" element={<ClientPlansHistoryPage />} />
          <Route path="ai-plans" element={<ClientAiPlansPage />} />
          <Route path="medical-support" element={<ClientMedicalSupportPage />} />
          <Route path="contact" element={<ClientContactPage />} />
          <Route path="about" element={<ClientAboutPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>

        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorShellPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<DoctorHomePage />} />
          <Route path="join" element={<DoctorJoinPage />} />
          <Route path="contact" element={<DoctorContactPage />} />
          <Route path="about" element={<DoctorAboutPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
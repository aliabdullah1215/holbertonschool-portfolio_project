import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import LoginScreen from '../pages/auth/LoginScreen';
import RegisterScreen from '../pages/auth/RegisterScreen';
import ClientAboutPage from '../pages/client/ClientAboutPage';
import ClientAiPlansPage from '../pages/client/ClientAiPlansPage';
import ClientAssessmentToolsPage from '../pages/client/ClientAssessmentToolsPage';
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
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="client/contact" element={<HomeContactPage />} />

        {/* Guest Routes (Auth) */}
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

        {/* Protected Client Routes */}
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
          <Route path="about" element={<ClientAboutPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>

        {/* Protected Doctor Routes */}
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

        {/* Fallback Catch-All Route */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default AppRoutes;      </Route>

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
  );
}

export default AppRoutes;

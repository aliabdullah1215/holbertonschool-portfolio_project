# Sprint Reviews - Data Diet MVP

## Introduction

This document summarizes the completed features demonstrated at the end of each sprint for the Data Diet MVP. The review is based on the repository structure, source code, README files, technical documentation, frontend pages, backend APIs, and available repository files and documentation.

Exact sprint dates are not confirmed from the repository, so the sprint reviews are organized by implemented feature progression.

---

## Sprint 1 Review

### Sprint Goal

Establish the MVP foundation by creating the full-stack project structure, user authentication, role-based access, and the first version of client and doctor dashboard navigation.

### Completed Features

- React + Vite frontend structure.
- Django REST Framework backend structure.
- Custom user model with `client` and `doctor` roles.
- User registration endpoint.
- User login endpoint with JWT token generation.
- Current authenticated user endpoint.
- Frontend authentication storage and session restoration.
- Protected frontend routes for:
  - Client dashboard
  - Doctor dashboard
  - Admin dashboard
- Shared dashboard shell and role-based route protection.
- Initial public pages such as landing, login, and register screens.

### Demo Summary

At the end of Sprint 1, the team could demonstrate a user registering or logging in, receiving JWT-based authentication, and being routed to the correct dashboard based on account role. The frontend could protect private dashboard pages and prevent users from accessing routes outside their role.

### Related Areas of the Codebase

- `Backend/users/models.py`
- `Backend/users/views.py`
- `Backend/users/serializers.py`
- `Backend/users/urls.py`
- `Backend/core/settings.py`
- `Backend/core/urls.py`
- `Frontend/context/AuthContext.jsx`
- `Frontend/context/useAuth.jsx`
- `Frontend/features/auth/authService.js`
- `Frontend/features/auth/authStorage.js`
- `Frontend/features/auth/routeByRole.js`
- `Frontend/routes/AppRoutes.jsx`
- `Frontend/routes/ProtectedRoute.jsx`
- `Frontend/routes/GuestRoute.jsx`
- `Frontend/pages/auth/LoginScreen.jsx`
- `Frontend/pages/auth/RegisterScreen.jsx`

---

## Sprint 2 Review

### Sprint Goal

Build the main Data Diet user workflows for clients and doctors, including doctor applications, approved doctor discovery, AI nutrition plan generation, and saved plan retrieval.

### Completed Features

- Doctor application submission workflow.
- Certificate/document upload for doctor applications.
- Backend validation for doctor application data:
  - Age range validation
  - Phone number validation
  - Certificate file size validation
- Doctor application status retrieval for doctor users.
- Approved doctors listing endpoint.
- Client Medical Support page that displays approved doctors.
- AI nutrition questionnaire frontend flow.
- Questionnaire answer normalization before API submission.
- Backend AI plan generation endpoint.
- Groq API integration for nutrition plan generation.
- Backend validation for normalized nutrition profile payloads.
- Backend validation and hydration of generated nutrition plans.
- Persistent saved nutrition plans using JSON fields.
- Saved plan list endpoint.
- Saved plan detail endpoint.
- Client plan history page.
- Frontend display of generated plans with:
  - Daily calories
  - Macros
  - Meal breakdown
  - Shopping list
  - Plan tags
  - Fallback message
- Local plan adjustment actions in the frontend, including meal replacement and plan reset.
- Session storage for the current AI plan flow.

### Demo Summary

At the end of Sprint 2, the team could demonstrate a client completing the AI nutrition questionnaire, generating a personalized plan through the backend AI integration, viewing the structured plan, and later reopening saved plans from the history page. The team could also demonstrate a doctor submitting an application with certificate upload and clients seeing approved doctors in the Medical Support section after approval.

### Related Areas of the Codebase

- `Backend/ai_plans/models.py`
- `Backend/ai_plans/views.py`
- `Backend/ai_plans/serializers.py`
- `Backend/ai_plans/urls.py`
- `Backend/ai_plans/services/groq_client.py`
- `Backend/ai_plans/services/prompt_builder.py`
- `Backend/ai_plans/services/plan_validation.py`
- `Backend/users/models.py`
- `Backend/users/views.py`
- `Backend/users/serializers.py`
- `Frontend/features/aiPlans/AiPlansWorkspace.jsx`
- `Frontend/features/aiPlans/components/AiPlanQuestionnaire.jsx`
- `Frontend/features/aiPlans/components/NutritionPlanView.jsx`
- `Frontend/features/aiPlans/config/questionnaireConfig.js`
- `Frontend/features/aiPlans/services/aiPlansService.js`
- `Frontend/features/aiPlans/utils/normalizeAnswers.js`
- `Frontend/features/aiPlans/utils/validation.js`
- `Frontend/features/aiPlans/utils/planValidation.js`
- `Frontend/features/aiPlans/utils/planEditors.js`
- `Frontend/pages/client/ClientAiPlansPage.jsx`
- `Frontend/pages/client/ClientPlansHistoryPage.jsx`
- `Frontend/pages/client/ClientMedicalSupportPage.jsx`
- `Frontend/pages/doctor/DoctorJoinPage.jsx`

---

## Sprint 3 Review

### Sprint Goal

Polish the MVP, improve admin and dashboard workflows, strengthen frontend-backend integration, and prepare the project for deployment and final submission.

### Completed Features

- Admin dashboard route and pages.
- Admin users page.
- Admin doctor applications page.
- Backend admin endpoints for:
  - Listing users
  - Listing doctor applications
  - Approving doctor applications
  - Rejecting doctor applications
- Doctor approval creates a verified doctor profile.
- Rejected and approved applications are marked as processed.
- Frontend admin approval and rejection actions.
- Production-oriented backend configuration using:
  - Environment variables
  - `DATABASE_URL`
  - `SECRET_KEY`
  - `DEBUG`
  - `ALLOWED_HOSTS`
  - WhiteNoise static file support
  - Gunicorn dependency
- CORS configuration for local and deployed frontend origins.
- Frontend API base URL configuration through `VITE_API_BASE_URL`.
- UI/UX updates across landing page, client dashboard pages, doctor dashboard pages, and shared dashboard layout.
- Documentation files present in the repository:
  - `README.md`
  - `Idea Development Documentation.md`
  - `Project Charter Development.md`
  - `Technical Documentation.md`

### Demo Summary

At the end of Sprint 3, the team could demonstrate a more complete MVP flow: users can authenticate, access role-based dashboards, clients can generate and revisit AI nutrition plans, doctors can submit applications, admins can approve or reject doctor applications, and approved doctors can appear in the client medical support directory. The project also includes deployment-related configuration for a production-style environment.

### Related Areas of the Codebase

- `Frontend/pages/admin/AdminShellPage.jsx`
- `Frontend/pages/admin/AdminHomePage.jsx`
- `Frontend/pages/admin/AdminUsersPage.jsx`
- `Frontend/pages/admin/AdminDoctorApplicationsPage.jsx`
- `Frontend/features/adminService.js`
- `Backend/users/views.py`
- `Backend/users/serializers.py`
- `Backend/users/urls.py`
- `Backend/core/settings.py`
- `Frontend/api/axios.js`
- `package.json`
- `Backend/requirements.txt`
- `README.md`
- `Technical Documentation.md`
- `Project Charter Development.md`
- `Idea Development Documentation.md`

---

## Final MVP Review Summary

### What the MVP Can Do Now

The Data Diet MVP currently supports the main foundation of an AI-powered nutrition platform. Based on the repository, the MVP can:

- Register users as clients or doctors.
- Authenticate users with JWT tokens.
- Restore authenticated sessions on the frontend.
- Route users to role-specific dashboards.
- Protect frontend routes by role.
- Allow clients to complete a structured AI nutrition questionnaire.
- Generate AI-powered nutrition plans through the Groq API.
- Validate client profile data before AI generation.
- Validate generated plan structure before returning it to the user.
- Save generated nutrition plans to the backend.
- Allow clients to view saved plan history.
- Allow clients to open full saved plan details.
- Display nutrition plan summaries, macros, meals, shopping lists, tags, and fallback notes.
- Allow local frontend adjustments to generated or saved plans.
- Allow doctors to submit applications with certificate files.
- Allow doctors to view submitted application status.
- Allow admins to review doctor applications.
- Allow admins to approve or reject doctor applications.
- Display approved doctors in the client Medical Support page.
- Use environment-based configuration for backend and frontend deployment readiness.

### Main User Workflows Completed

- Visitor registers as a client or doctor.
- Registered user logs in and is routed to the correct dashboard.
- Client completes the AI questionnaire and generates a personalized nutrition plan.
- Client views the generated nutrition plan and saves it automatically.
- Client opens the Plans History page and reviews saved plans.
- Client opens the Medical Support page and views approved doctors.
- Doctor submits a professional application with certificate upload.
- Doctor checks application status after submission.
- Admin reviews doctor applications and approves or rejects them.
- Approved doctor appears in the client-facing medical support directory.

### Notes and Unconfirmed Items

- Exact sprint dates are not confirmed from the repository.
- Automated test coverage is not confirmed from the repository; `Backend/users/tests.py` is currently a placeholder.
- A complete production deployment pipeline is not confirmed from the repository, but deployment-related settings and dependencies are present.
- Appointment booking, payments, live chat, wearable integration, and native mobile apps are not confirmed from the repository and appear outside the MVP scope.

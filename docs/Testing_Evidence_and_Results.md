# Testing Evidence and Results - Data Diet MVP

## Testing Strategy

Testing for the Data Diet MVP is based on manual browser testing, API testing, frontend-backend integration verification, database operation checks, and production deployment validation. The project is deployed and accessible through the public production domain.

No complete automated test suite is confirmed in the repository. The visible backend test file, `Backend/users/tests.py`, is still a placeholder, so this document does not claim automated test results.

### Manual Testing

Manual testing verifies the main user workflows through the browser:

- Visitor registration
- User login and logout
- Role-based dashboard access
- Client dashboard navigation
- Doctor dashboard navigation
- Admin dashboard navigation
- AI nutrition questionnaire completion
- Generated nutrition plan display
- Saved nutrition plan history review
- Doctor application submission
- Admin approval and rejection of doctor applications
- Approved doctor listing in the client Medical Support page
- Public production deployment accessibility

### API Testing

API testing should be performed using Postman, browser developer tools, or curl against the Django REST endpoints.

Main API areas:

- `/api/users/register/`
- `/api/users/login/`
- `/api/users/me/`
- `/api/token/`
- `/api/token/refresh/`
- `/api/users/doctor-application/`
- `/api/users/approved-doctors/`
- `/api/users/admin/doctor-applications/`
- `/api/users/doctor-applications/<id>/approve/`
- `/api/users/doctor-applications/<id>/reject/`
- `/api/ai-plans/generate/`
- `/api/ai-plans/`
- `/api/ai-plans/<id>/`

### Frontend-Backend Integration Testing

Integration testing confirms that the React frontend correctly calls the Django backend through Axios, attaches JWT tokens to protected requests, refreshes expired tokens when possible, and redirects users based on their role.

Relevant frontend files:

- `Frontend/api/axios.js`
- `Frontend/features/auth/authService.js`
- `Frontend/routes/ProtectedRoute.jsx`
- `Frontend/routes/AppRoutes.jsx`
- `Frontend/features/aiPlans/services/aiPlansService.js`
- `Frontend/features/adminService.js`

### Database Operation Verification

Database verification confirms that records are created and retrieved correctly for:

- Users
- Doctor applications
- Doctor profiles after approval
- Saved nutrition plans
- Uploaded certificate file references

Relevant backend models:

- `Backend/users/models.py`
- `Backend/ai_plans/models.py`

---

## Test Cases

| Test Case ID | Feature | Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC-001 | User registration | Open the production registration page, submit username, email, password, and role. | A new user is created and the user can proceed to authentication. | Registration workflow is implemented and confirmed working in production. | PASS |
| TC-002 | User login | Open the production login page and submit valid username and password. | User receives an authenticated session and is redirected based on role. | Login workflow is implemented and confirmed working in production. | PASS |
| TC-003 | Invalid login | Submit invalid credentials to `/api/users/login/`. | API returns `401 Unauthorized` with an error message. | Error branch exists in `LoginView`. Execution evidence not attached. | Manual evidence required |
| TC-004 | JWT current user | Send authenticated GET request to `/api/users/me/`. | Current user profile, role, and permissions are returned. | Current user endpoint and serializer are implemented. Execution evidence not attached. | Manual evidence required |
| TC-005 | JWT refresh | Send refresh token to `/api/token/refresh/`. | New access token is returned. | SimpleJWT refresh route is configured and frontend refresh logic exists. Execution evidence not attached. | Manual evidence required |
| TC-006 | Client dashboard access | Log in as a client in production and open `/client/home`. | Client dashboard loads. | Role-based client dashboard access is confirmed working in production. | PASS |
| TC-007 | Doctor dashboard access | Log in as a doctor in production and open `/doctor/home`. | Doctor dashboard loads. | Role-based doctor dashboard access is confirmed working in production. | PASS |
| TC-008 | Admin dashboard access | Log in as staff/superuser in production and open `/admin-dashboard/home`. | Admin dashboard loads. | Role-based admin dashboard access is confirmed working in production. | PASS |
| TC-009 | Unauthorized route protection | Try to open a protected route without login. | User is redirected to `/login`. | `ProtectedRoute.jsx` redirects unauthenticated users to login. Execution evidence not attached. | Manual evidence required |
| TC-010 | Wrong-role route protection | Log in as client and try to access `/doctor/home`. | User is redirected to their correct role route. | `ProtectedRoute.jsx` redirects users when `allowedRole` does not match. Execution evidence not attached. | Manual evidence required |
| TC-011 | AI questionnaire validation | Leave required AI questionnaire fields empty and attempt to continue or generate. | User sees validation errors and cannot submit incomplete data. | Frontend validation utilities and backend profile validation exist. Execution evidence not attached. | Manual evidence required |
| TC-012 | AI nutrition plan generation | Complete questionnaire as a client and submit to `/api/ai-plans/generate/` with production AI configuration available. | Backend validates profile, calls Groq API, saves plan, and returns generated plan. | Endpoint, Groq client, prompt builder, validation, and save logic are implemented. Production screenshot placeholder is listed below. | Manual evidence required |
| TC-013 | AI generation without Groq key | Submit AI plan request without `GROQ_API_KEY`. | API returns service unavailable message. | Backend checks missing `GROQ_API_KEY` and returns `503`. Execution evidence not attached. | Manual evidence required |
| TC-014 | AI plan access limited to clients | Attempt AI plan generation as a non-client user. | Request is rejected by permission logic. | `IsClientUser` permission is implemented for AI plan endpoints. Execution evidence not attached. | Manual evidence required |
| TC-015 | Saved nutrition plans list | Generate plans as a client, then GET `/api/ai-plans/`. | User receives a list of their saved plans. | Saved plan list endpoint and serializer are implemented. Production screenshot placeholder is listed below. | Manual evidence required |
| TC-016 | Saved nutrition plan detail | Open a saved plan by ID through `/api/ai-plans/<id>/`. | User receives full saved plan details including profile snapshot and plan content. | Saved plan detail endpoint and serializer are implemented. Execution evidence not attached. | Manual evidence required |
| TC-017 | Saved plan ownership | Try to access another user's saved plan ID. | Access should be denied or return not found. | Querysets filter saved plans by `request.user`, supporting ownership protection. Execution evidence not attached. | Manual evidence required |
| TC-018 | Saved plan limit | Generate more than five plans as the same client. | API blocks the request after five saved plans. | Backend checks existing saved plan count and returns `403` after five plans. Execution evidence not attached. | Manual evidence required |
| TC-019 | Doctor application submission | Log in as doctor and submit application with profile details and certificate file. | Application is created with pending status. | Doctor application endpoint, multipart parser, model, serializer, and frontend form exist. Production screenshot placeholder is listed below. | Manual evidence required |
| TC-020 | Doctor application duplicate prevention | Submit a second application as the same doctor. | API rejects duplicate application. | Backend checks existing application and returns `400`. Execution evidence not attached. | Manual evidence required |
| TC-021 | Doctor application validation | Submit invalid age, invalid phone number, or oversized certificate file. | API returns validation errors. | Serializer validation exists for age, phone number, and certificate size. Execution evidence not attached. | Manual evidence required |
| TC-022 | Client cannot submit doctor application | Log in as client and POST to `/api/users/doctor-application/`. | API rejects request. | Backend rejects non-doctor users with `403`. Execution evidence not attached. | Manual evidence required |
| TC-023 | Admin doctor application list | Log in as admin and open admin doctor applications page. | Admin can view submitted doctor applications. | Backend admin endpoint and frontend admin page exist. Execution evidence not attached. | Manual evidence required |
| TC-024 | Admin approve doctor application | Admin approves a pending doctor application. | Application status becomes approved and doctor profile is created. | Approval endpoint updates status and creates `DoctorProfile`. Execution evidence not attached. | Manual evidence required |
| TC-025 | Admin reject doctor application | Admin rejects a pending doctor application. | Application status becomes rejected. | Rejection endpoint updates status and reviewed timestamp. Execution evidence not attached. | Manual evidence required |
| TC-026 | Approved doctors listing | Approve a doctor and GET `/api/users/approved-doctors/`. | Approved doctor appears in listing. | Approved doctors endpoint filters applications with `status='approved'`. Execution evidence not attached. | Manual evidence required |
| TC-027 | Frontend API base URL | Open the public production domain and use an API-backed workflow. | Frontend calls the deployed backend API base URL successfully. | Production deployment is confirmed live and accessible through the public production domain. | PASS |
| TC-028 | Production backend configuration | Use production environment configuration for database, secret key, allowed hosts, CORS, and API credentials. | Backend runs successfully with production-style environment settings. | The live production deployment is confirmed accessible. Repository settings support environment-based deployment configuration. | PASS |
| TC-029 | Static/media configuration | Upload doctor certificate and access certificate URL. | Uploaded certificate URL is returned and accessible in the configured environment. | Media settings and certificate URL serialization exist. Production file access evidence not attached. | Manual evidence required |
| TC-030 | Frontend build readiness | Run frontend build command. | Vite build completes successfully. | Build script exists in `package.json`, and the project is deployed through the public production domain. Latest build log is not attached. | PASS |

---

## Bug Summary

| Bug | Severity | Status | Resolution |
|---|---|---|---|
| Frontend-backend CORS connection issues | High | Resolved in code | CORS settings were added and updated in `Backend/core/settings.py`, including local and deployed frontend origins. |
| Production API URL mismatch risk | High | Resolved in code | Frontend Axios configuration uses `VITE_API_BASE_URL` with a localhost fallback. Production access is confirmed through the public domain. |
| Missing or incorrect environment configuration for deployment | High | Improved in code | Backend settings use environment variables such as `DATABASE_URL`, `SECRET_KEY`, `DEBUG`, and `ALLOWED_HOSTS`. |
| Missing Groq API key blocks AI generation | High | Handled in code | AI generation endpoint returns a clear `503` response when `GROQ_API_KEY` is not configured. |
| AI service invalid or empty response | High | Handled in code | Groq client validates empty responses, invalid JSON, and generated plan structure before returning data. |
| Doctor certificate upload/media path issue | Medium | Resolved in code | Media settings and certificate file URL handling are implemented. |
| Doctor application invalid input | Medium | Resolved in code | Serializer validates age, phone number format, minimum phone length, and certificate file size. |
| Duplicate doctor applications | Medium | Resolved in code | Backend prevents a doctor from submitting more than one application. |
| Merge conflicts during doctor application integration | Medium | Resolved in repository history | Commit history includes a merge-conflict resolution related to completing the doctor application flow. |
| Documentation accidentally deleted in earlier branch history | Medium | Resolved in repository history | Documentation files were later restored according to commit history. |
| Custom domain unavailable during earlier setup | Low | Resolved by removal | CNAME/domain setup was removed when the custom domain was not available at that time. The project is now deployed through a public production domain. |
| Lack of automated test coverage | Medium | Open improvement | Final repository does not contain a complete automated test suite. Manual/API testing remains the primary QA approach. |

---

## Evidence

Testing screenshots should be stored under:

```text
docs/testing-assets/
```

The following screenshot placeholders should be attached in that folder for final submission:

- Screenshot to attach: `docs/testing-assets/registration-success.png`
- Screenshot to attach: `docs/testing-assets/login-success.png`
- Screenshot to attach: `docs/testing-assets/ai-plan-generation.png`
- Screenshot to attach: `docs/testing-assets/saved-plans.png`
- Screenshot to attach: `docs/testing-assets/doctor-application.png`
- Screenshot to attach: `docs/testing-assets/production-homepage.png`

### Additional Evidence to Attach

- Postman collection or API response screenshots for authentication endpoints.
- Postman collection or API response screenshots for doctor application endpoints.
- Postman collection or API response screenshots for admin approval/rejection endpoints.
- Postman collection or API response screenshots for AI nutrition plan generation.
- Postman collection or API response screenshots for saved nutrition plan endpoints.
- Browser network screenshot showing authenticated API requests with bearer token.
- Deployment log showing successful frontend build.
- Deployment log showing successful backend startup.
- Deployment log showing successful database migration.

No automated test execution report is claimed because automated test results are not confirmed in the repository.

---

## Final QA Conclusion

Based on repository inspection and confirmed production availability, the Data Diet MVP is ready for demonstration for the core verified workflows:

- User registration
- User login
- Role-based dashboard access
- Public production deployment accessibility

The repository also contains implemented support for AI nutrition plan generation, saved nutrition plans, doctor applications, admin approval/rejection, and approved doctor listings. These workflows should retain manual/API evidence attachments before final submission unless screenshots, Postman results, or logs are already available outside the repository.

The MVP should be presented as manually tested and production-accessible, without claiming automated test coverage.

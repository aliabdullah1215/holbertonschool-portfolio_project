# Sprint Retrospectives - Data Diet MVP

## Introduction

This document reflects on the team process, challenges, and improvements across the development of the Data Diet MVP. It is based on the repository structure, implementation evidence, documentation, Git branches, and commit history available in the project.

The exact sprint dates are not confirmed from the repository, so the retrospectives are organized around the visible development progression of the MVP.

---

## Sprint 1 Retrospective

### What Went Well

- The team established a clear MVP direction around an AI-powered nutrition platform.
- The project was organized as a full-stack application with a React + Vite frontend and Django REST Framework backend.
- Early authentication and role-based access work created a strong foundation for later features.
- Separate client and doctor dashboard structures helped the team divide frontend work by user role.
- Git branches show that the team worked on focused areas such as authentication, registration, login, client dashboard, doctor dashboard, and welcome/landing pages.

### Challenges Faced

- The team had to align frontend routing with backend user roles early in the project.
- The project required coordination between authentication, JWT tokens, protected routes, and role-based redirects.
- Initial frontend and backend work likely required manual API testing to confirm that registration, login, and current-user retrieval worked together.
- Some documentation files were deleted in earlier frontend branches and later restored, based on commit history. This indicates that file ownership and branch coordination needed improvement.
- Automated testing was not strongly visible in the final repository. Backend test files exist, but at least `Backend/users/tests.py` is still a placeholder.

### Improvements for Next Sprint

- Define clear ownership for shared files such as documentation, routing, and global styles.
- Agree on backend API response formats before frontend integration.
- Add simple backend tests for registration, login, and current-user APIs.
- Use pull requests for feature integration into `Dev` so authentication and routing changes can be reviewed before merging.
- Keep documentation files protected from accidental deletion during frontend or UI branch work.

---

## Sprint 2 Retrospective

### What Went Well

- The team expanded the MVP from basic authentication into real product workflows.
- Doctor application functionality was implemented with backend models, serializers, views, file upload support, and frontend form submission.
- The backend included useful validation for doctor applications, including age, phone number, and certificate file size checks.
- The client Medical Support workflow was connected to approved doctor data.
- The AI nutrition plan feature became a core MVP capability, including questionnaire flow, profile normalization, Groq API integration, generated-plan validation, and saved plan persistence.
- The frontend and backend were integrated through Axios services and authenticated API requests.
- Git history shows active feature branches for doctor applications, approved doctors, JWT permissions, certificate upload/media storage, and AI plans.

### Challenges Faced

- Frontend-backend integration became more complex as multiple authenticated workflows were added.
- AI plan generation required careful validation because the backend depends on structured input and structured JSON output from an external AI service.
- The AI feature required environment configuration for `GROQ_API_KEY` and model settings, which can create local setup and debugging issues.
- Commit history includes fixes such as `Fix backend AI plans integration` and moving AI plan files into the backend, showing that project organization and integration required adjustment.
- Doctor application flows required coordination between file uploads, media settings, permissions, frontend form data, and approval status.
- CORS and REST framework settings needed configuration to allow frontend-backend communication.

### Improvements for Next Sprint

- Document required environment variables clearly for both local development and deployment.
- Add API testing checklists for:
  - Doctor application submission
  - Approved doctors listing
  - AI plan generation
  - Saved plan listing and detail retrieval
- Add validation tests for AI profile payloads and doctor application data.
- Keep frontend API services centralized so endpoint changes do not require edits across many components.
- Review branch structure before merging large AI or backend changes to reduce file movement and integration issues.

---

## Sprint 3 Retrospective

### What Went Well

- The MVP was polished with major UI/UX updates across landing, client, doctor, admin, and dashboard pages.
- The admin dashboard was added, including doctor application review and approval/rejection actions.
- Backend admin endpoints were implemented for listing users, listing doctor applications, approving applications, and rejecting applications.
- Deployment readiness improved through environment-based Django settings, `DATABASE_URL`, `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, WhiteNoise, Gunicorn, and CORS configuration.
- The frontend API base URL was configured through `VITE_API_BASE_URL`, improving deployment flexibility.
- Commit history shows deployment-related work such as Render preparation, frontend API URL configuration, CORS origin updates, and production-related settings.
- Documentation was restored and expanded, including README, project charter, idea documentation, and technical documentation.

### Challenges Faced

- Commit history includes several merge commits and revert commits, suggesting that integration and UI changes sometimes conflicted or needed correction.
- A commit explicitly mentions resolving merge conflicts and completing the doctor application flow, which confirms merge conflict handling was part of the project process.
- Deployment configuration required multiple updates, including CORS, allowed hosts, API URLs, and environment variables.
- A CNAME file was created and later removed because the custom domain was not available, showing that deployment/domain setup needed adjustment.
- Large UI updates across many pages increased the chance of styling inconsistencies and merge conflicts.
- Production debugging was likely needed around frontend-backend API connectivity, based on CORS and Render-related commits.

### Improvements for Next Sprint

- Use smaller pull requests for UI changes instead of large page-wide updates.
- Create a deployment checklist covering:
  - Backend environment variables
  - Frontend API base URL
  - CORS origins
  - Allowed hosts
  - Database URL
  - Static/media file handling
- Add smoke tests for deployed environments, especially login, AI plan generation, doctor application submission, and approved doctors listing.
- Review merge conflicts in shared files carefully before merging into `Dev` or `main`.
- Add a release checklist before merging `Dev` into `main`.

---

## Overall Process Improvements

### Git Workflow

The repository shows a useful branching structure with `main`, `Dev`, frontend feature branches, backend feature branches, and AI plan branches. This helped separate work by area. However, the number of merge and revert commits suggests that the team should continue improving merge discipline.

Recommended improvements:

- Keep `main` stable and merge only tested work from `Dev`.
- Keep feature branches focused on one feature or workflow.
- Pull the latest `Dev` before starting major work.
- Avoid mixing documentation deletion, UI changes, and routing changes in the same branch.
- Use clearer commit messages that describe the reason for the change, not only the file updated.

### Branching and Pull Requests

The technical documentation describes a planned workflow using feature branches, pull requests, review, `Dev`, and `main`. The repository branches support this approach, but pull request review activity is not visible directly from the local repository.

Recommended improvements:

- Require pull requests before merging feature branches into `Dev`.
- Assign at least one reviewer for shared areas such as routing, authentication, settings, and global CSS.
- Use pull request descriptions to list tested workflows.
- Keep large UI redesigns split by page or dashboard area.
- Protect documentation files from accidental removal during branch merges.

### Testing

The project documentation recommends unit, integration, manual, and end-to-end testing. In the final repository, automated test coverage is not strongly confirmed. Some test-related commits exist in history, but the visible `Backend/users/tests.py` file is still a placeholder.

Recommended improvements:

- Add Django tests for:
  - User registration
  - Login
  - Current user endpoint
  - Doctor application submission
  - Approved doctors listing
  - Admin approval and rejection
  - AI plan validation
- Add frontend manual test scripts for:
  - Client login and dashboard access
  - Doctor application submission
  - Admin approval workflow
  - Client AI plan generation
  - Saved plan history
- Use Postman or similar API testing collections for repeatable backend verification.
- Run `npm run lint` and backend checks before merging.

### Deployment

The repository includes deployment-oriented improvements such as environment-based Django settings, `dj-database-url`, WhiteNoise, Gunicorn, production CORS origins, and frontend API URL configuration. This shows meaningful progress toward deployment readiness.

Recommended improvements:

- Maintain a `.env.example` file listing required variables.
- Document deployment steps separately for frontend and backend.
- Verify production values for:
  - `DATABASE_URL`
  - `SECRET_KEY`
  - `DEBUG`
  - `ALLOWED_HOSTS`
  - `GROQ_API_KEY`
  - `GROQ_MODEL`
  - `VITE_API_BASE_URL`
- Add a deployment smoke-test checklist.
- Keep custom domain setup separate from core deployment until the domain is confirmed available.

### Communication

The project documentation identifies Discord as the main communication channel and WhatsApp for quick communication. The repository also shows multiple developers working across frontend, backend, AI, documentation, and deployment areas, which requires regular coordination.

Recommended improvements:

- Hold short sprint planning meetings to confirm priorities and owners.
- Hold integration checkpoints before merging large features.
- Keep a shared list of API contracts and environment variables.
- Document known blockers as they happen, especially around deployment, CORS, AI API setup, and database configuration.
- End each sprint with a short demo and a written list of unfinished or risky items.

---

## Final Reflection

Across the MVP, the team successfully moved from project setup and authentication into a functioning AI nutrition platform with client, doctor, and admin workflows. The most important process lessons were the need for stronger merge discipline, clearer API contracts, more repeatable testing, and better deployment checklists. These improvements would reduce integration risk and make future sprints more predictable.

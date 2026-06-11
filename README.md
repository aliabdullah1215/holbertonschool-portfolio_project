# Data Diet

Data Diet is a full-stack nutrition planning platform that generates personalized meal plans using structured client information and the Groq API. It also provides role-specific workflows for clients, nutrition specialists, and administrators.

The application is deployed at [datadiet.app](https://datadiet.app).

## Project Overview

Nutrition advice is often generic, difficult to organize, or disconnected from professional support. Data Diet addresses this by collecting structured information about a client's body measurements, goals, activity, health conditions, food preferences, budget, and routine before generating a personalized nutrition plan.

The platform serves three user groups:

- **Clients** generate, review, and revisit personalized nutrition plans.
- **Doctors and nutrition specialists** submit professional applications and certificates.
- **Administrators** manage users and approve or reject doctor applications.

Generated plans include calorie and macro targets, meals, alternatives, shopping lists, and plan tags. Approved specialists are displayed to clients through the medical support directory.

## Key Features

### Authentication and Authorization

- Client and doctor account registration.
- JWT-based authentication using access and refresh tokens.
- Automatic access-token refresh through Axios interceptors.
- Role-based frontend routes for clients, doctors, and administrators.
- Protected backend endpoints with Django REST Framework permissions.

### Client Features

- Multi-step nutrition questionnaire covering:
  - Goals and preferred pace
  - Body measurements
  - Activity and exercise
  - Allergies, medical conditions, and dietary restrictions
  - Food preferences
  - Budget, cooking ability, and schedule
  - Output and variety preferences
- AI-generated nutrition plans through the Groq API.
- Generated-plan validation before plans are returned to clients.
- Saved nutrition-plan history and detailed plan review.
- Maximum of five saved nutrition plans per client.
- Meal replacement using generated alternatives.
- Local plan adjustments and reset functionality.
- Printable nutrition-plan view for saving as PDF.
- Shopping lists, nutrition summaries, macros, and plan tags.
- Approved nutrition-specialist directory.
- BMI, estimated maintenance calories, and daily water-target calculators.
- Interactive client dashboard meal checklist.

### Doctor Features

- Dedicated doctor dashboard and routes.
- Professional application form.
- Certificate upload with Cloudinary-backed storage.
- Application-status review.
- Certificate file access after submission.
- Prevention of duplicate doctor applications.
- Server-side validation for age, phone number, and certificate size.

### Administrator Features

- Dedicated administrator dashboard.
- Registered-user overview with roles and account status.
- Doctor-application review.
- Certificate review.
- Approve or reject pending doctor applications.
- Automatic creation of a verified doctor profile after approval.
- Django administration interface for doctor applications and saved plans.

## System Architecture

```text
React + Vite Frontend
        |
        | HTTPS / JSON / JWT
        v
Django REST Framework API
        |
        +-- PostgreSQL
        +-- Groq API
        +-- Cloudinary
```

### Frontend

The frontend is a React single-page application built with Vite. React Router manages public and role-protected routes. Authentication state is managed through React Context, while Axios handles API communication and JWT refresh behavior.

Frontend source files are organized inside `Frontend/`, while frontend tooling configuration and `package.json` are located at the repository root.

### Backend

The backend is a Django REST Framework application organized into two main Django apps:

- `users`: authentication, user roles, doctor applications, and administration.
- `ai_plans`: AI plan generation, validation, persistence, and retrieval.

The backend validates normalized questionnaire data before requesting a nutrition plan from Groq. Generated responses must match the required JSON structure before they are saved.

### Database

PostgreSQL is configured through `DATABASE_URL`.

The primary persisted entities are:

- Custom users with client or doctor roles
- Doctor applications
- Verified doctor profiles
- Saved nutrition plans
- Client profile snapshots and generated plan JSON

### External Services

- **Groq API:** Generates structured nutrition plans.
- **Cloudinary:** Stores uploaded doctor certificates.
- **Render:** Hosts the production frontend, backend, and PostgreSQL database.

## Technology Stack

### Frontend

- JavaScript
- React 19
- Vite 8
- React Router
- Axios
- React Context API
- CSS
- Tailwind CSS and PostCSS tooling
- ESLint

### Backend

- Python
- Django 6
- Django REST Framework
- SimpleJWT
- django-cors-headers
- django-cloudinary-storage
- dj-database-url
- Gunicorn
- WhiteNoise

### Data and Services

- PostgreSQL
- Groq API
- Cloudinary
- Render

## Project Structure

```text
holbertonschool-portfolio_project/
├── Backend/
│   ├── ai_plans/
│   │   ├── services/             # Groq client, prompts, and plan validation
│   │   ├── models.py             # Saved nutrition plans
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── core/
│   │   ├── settings.py           # Django, database, CORS, storage, and JWT settings
│   │   └── urls.py               # Root API routing
│   ├── users/
│   │   ├── models.py             # Users, doctor applications, and profiles
│   │   ├── permissions.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
├── Frontend/
│   ├── api/                      # Axios API client
│   ├── app/                      # Application root
│   ├── components/               # Shared components and layouts
│   ├── context/                  # Authentication context
│   ├── features/                 # Authentication, admin, and AI plan logic
│   ├── pages/                    # Client, doctor, admin, auth, and shared pages
│   ├── routes/                   # Application and protected routes
│   ├── styles/                   # Shared application styles
│   └── main.jsx
├── docs/                         # Sprint, retrospective, and testing documentation
├── package.json                  # Frontend dependencies and scripts
├── vite.config.js
└── README.md
```

## Installation and Local Setup

### Prerequisites

- Node.js and npm
- Python
- PostgreSQL
- Groq API credentials
- Cloudinary account and credentials

### Clone the Repository

```bash
git clone https://github.com/aliabdullah1215/holbertonschool-portfolio_project.git
cd holbertonschool-portfolio_project
```

### Backend Setup

```bash
cd Backend
python -m venv venv
```

Activate the virtual environment:

```bash
# Windows PowerShell
.\venv\Scripts\Activate.ps1
```

```bash
# Linux or macOS
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `Backend/.env` and configure the required environment variables:

```env
SECRET_KEY=replace_with_a_secure_secret
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DATABASE_URL=postgresql://username:password@localhost:5432/data_diet

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Apply migrations:

```bash
python manage.py migrate
```

Optionally create an administrator:

```bash
python manage.py createsuperuser
```

### Frontend Setup

From the repository root:

```bash
npm install
```

Create a frontend environment file such as `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8000/api/
```

## Running the Application

Start the backend from `Backend/`:

```bash
python manage.py runserver
```

Start the frontend from the repository root:

```bash
npm run dev
```

Local services will normally be available at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- Django admin: `http://localhost:8000/admin/`

Useful frontend commands:

```bash
npm run build
npm run lint
npm run preview
```

## API Overview

All application API endpoints are prefixed with `/api/`.

### Authentication and Users

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/users/register/` | Register a client or doctor account | Public |
| `POST` | `/api/users/login/` | Authenticate and return JWT tokens | Public |
| `GET` | `/api/users/me/` | Return the authenticated user | Authenticated |
| `POST` | `/api/token/` | Obtain JWT tokens using SimpleJWT | Public |
| `POST` | `/api/token/refresh/` | Refresh an access token | Public |
| `GET` | `/api/users/approved-doctors/` | List approved doctors | Public |

### Doctor Applications

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/users/doctor-application/` | Retrieve the current user's application | Authenticated |
| `POST` | `/api/users/doctor-application/` | Submit a doctor application | Doctor |
| `GET` | `/api/users/admin/doctor-applications/` | List doctor applications | Admin |
| `POST` | `/api/users/doctor-applications/<id>/approve/` | Approve an application | Admin |
| `POST` | `/api/users/doctor-applications/<id>/reject/` | Reject an application | Admin |
| `GET` | `/api/users/admin/users/` | List platform users | Admin |

### AI Nutrition Plans

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/ai-plans/generate/` | Generate and save a nutrition plan | Client |
| `GET` | `/api/ai-plans/` | List the client's saved plans | Client |
| `GET` | `/api/ai-plans/<id>/` | Retrieve a saved plan and profile snapshot | Client |

Saved-plan queries are filtered by the authenticated user to prevent access to another client's plans.

## Deployment

The production application uses Render-oriented configuration:

- The React frontend is built using `npm run build`.
- The generated static site is served from the Vite `dist` directory.
- The Django backend runs through Gunicorn.
- PostgreSQL is configured through `DATABASE_URL`.
- Static backend files are served using WhiteNoise.
- Uploaded certificate media is stored through Cloudinary.
- Production frontend origins are included in Django's CORS configuration.
- The frontend connects to the deployed API through `VITE_API_BASE_URL`.

Typical backend deployment commands are:

```bash
pip install -r requirements.txt
python manage.py migrate
gunicorn core.wsgi:application
```

No infrastructure-as-code or `render.yaml` file is currently included, so Render services and environment variables must be configured through the Render dashboard.

For a static frontend deployment using client-side routing, configure the hosting service to rewrite unmatched routes to `/index.html`.

## Testing

The repository documents manual browser, API, integration, database, and deployment testing in `docs/Testing_Evidence_and_Results.md`.

The current backend test file is a placeholder, and no complete automated test suite is included.

Available verification commands include:

```bash
npm run lint
npm run build
python manage.py test
```

## Future Improvements

- Add automated backend, frontend, integration, and end-to-end tests.
- Add OpenAPI documentation for the REST API.
- Expand `.env.example` to include every required backend variable.
- Add version-controlled Render or container deployment configuration.
- Add pagination, search, and filtering to administrator tables.
- Add API operations for archiving or deleting saved plans.
- Persist client-side plan edits and meal tracking to the backend.
- Improve accessibility and continue responsive-layout testing.
- Add multilingual nutrition-plan generation.
- Move browser authentication tokens to a more secure cookie-based strategy.
- Add production monitoring, structured logging, and deployment smoke tests.

## Safety Notice

Generated nutrition plans are intended to support general nutrition planning and should not replace medical diagnosis or advice from a licensed healthcare professional. Users with medical conditions should consult a qualified specialist.

## Team and Contributors

Repository history and project documentation identify the following contributors:

- **Ali Summan** - Project Manager
- **Omar Al-Anazi** - Frontend Developer
- **Mohammed Basulaiman** - Full-Stack Developer
- **Hussam Al-Mutairi** - Backend Developer

Git history also includes contributions under the aliases `AliSumman`, `Ali Summan`, `omar-hail`, `Mohammed Basuliman`, `M_2005`, `oDoDyK`, and `Hussam`.

# Data Diet

Data Diet is an AI-powered nutrition platform that connects clients with nutrition specialists while providing personalized meal plans generated from structured health and lifestyle data.

The platform combines nutritional expertise with artificial intelligence to deliver tailored nutrition plans based on each user's unique profile, goals, health conditions, activity level, and preferences.

## Live Demo

**Production Website:**
https://datadiet.app



---

## Project Overview

Many people struggle to find personalized nutrition guidance that fits their lifestyle, goals, health conditions, and budget. At the same time, nutrition specialists need an accessible way to reach and support potential clients.

Data Diet addresses this challenge by collecting structured client information and transforming it into personalized nutrition plans using artificial intelligence. The platform also provides a workflow for nutrition specialists to join the platform and connect with potential clients.

The platform serves three primary user groups:

* **Clients** generate, review, and manage personalized nutrition plans.
* **Nutrition Specialists** submit professional applications and credentials.
* **Administrators** review applications, manage users, and oversee platform operations.

Generated plans include nutritional targets, meal suggestions, alternatives, shopping lists, and dietary recommendations tailored to each user's profile.

---

## Why Data Diet?

Data Diet was created to bridge the gap between generic diet recommendations and personalized nutritional guidance.

Rather than providing one-size-fits-all meal plans, the platform generates recommendations based on real user data, including body measurements, activity levels, goals, dietary restrictions, and lifestyle preferences.

By combining AI-powered planning with specialist verification and support, Data Diet aims to make personalized nutrition more accessible and practical.

---

## Key Features

### Authentication & Authorization

* Client and specialist account registration.
* JWT-based authentication and authorization.
* Automatic access-token refresh.
* Protected routes and role-based access control.
* Secure Django REST Framework permission system.

### Client Features

* Multi-step nutrition assessment questionnaire.
* AI-generated personalized nutrition plans.
* Nutrition plan history and retrieval.
* Interactive plan customization and meal replacement.
* Printable nutrition-plan export.
* Shopping lists and nutrition summaries.
* Approved nutrition-specialist directory.
* BMI calculator.
* Estimated maintenance calorie calculator.
* Daily water-intake calculator.
* Interactive meal-tracking dashboard.

### Specialist Features

* Specialist application workflow.
* Certificate upload and verification process.
* Application status tracking.
* Duplicate application prevention.
* Validation for uploaded credentials.

### Administrator Features

* User management dashboard.
* Specialist application review system.
* Application approval and rejection workflows.
* Certificate review functionality.
* Role and account management.
* Django administration interface.

---

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

* React Single Page Application (SPA)
* Vite build tooling
* React Router
* Axios API communication
* React Context for authentication state management

### Backend

The backend is built with Django REST Framework and is primarily organized into:

* `users` – authentication, roles, specialist applications, and administration.
* `ai_plans` – AI plan generation, validation, storage, and retrieval.

### Database

PostgreSQL is used as the primary database and is configured through environment variables.

Core entities include:

* Users
* Specialist Applications
* Specialist Profiles
* Nutrition Plans
* Client Assessment Data

### External Services

* **Groq API** – AI-powered nutrition plan generation.
* **Cloudinary** – Media and certificate storage.
* **Render** – Application hosting and deployment.

---

## Technology Stack

### Frontend

* JavaScript
* React
* Vite
* React Router
* Axios
* React Context API
* CSS
* Tailwind CSS
* ESLint

### Backend

* Python
* Django
* Django REST Framework
* SimpleJWT
* django-cors-headers
* django-cloudinary-storage
* dj-database-url
* Gunicorn
* WhiteNoise

### Data & Services

* PostgreSQL
* Groq API
* Cloudinary
* Render

---

## Project Structure

```text
holbertonschool-portfolio_project/
├── Backend/
│   ├── ai_plans/
│   ├── users/
│   ├── core/
│   ├── manage.py
│   └── requirements.txt
│
├── Frontend/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── context/
│   ├── api/
│   └── main.jsx
│
├── docs/
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation & Local Setup

### Prerequisites

* Node.js
* npm
* Python
* PostgreSQL
* Groq API Key
* Cloudinary Account

### Clone Repository

```bash
git clone https://github.com/aliabdullah1215/holbertonschool-portfolio_project.git
cd holbertonschool-portfolio_project
```

### Backend Setup

```bash
cd Backend

python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py createsuperuser
```

### Frontend Setup

```bash
npm install
npm run dev
```

---

## Running the Application

### Backend

```bash
python manage.py runserver
```

### Frontend

```bash
npm run dev
```

Default local addresses:

* Frontend: http://localhost:5173
* Backend: http://localhost:8000
* Admin Panel: http://localhost:8000/admin

---

## API Overview

### Authentication

* User Registration
* User Login
* JWT Token Refresh
* Current User Retrieval

### Specialist Management

* Submit Specialist Application
* View Application Status
* Approve/Reject Applications
* Retrieve Approved Specialists

### Nutrition Plans

* Generate AI Nutrition Plan
* Retrieve Saved Plans
* View Plan Details

---

## Deployment

The production environment is hosted on Render.

Deployment components:

* React frontend build
* Django backend API
* PostgreSQL database
* Cloudinary media storage
* WhiteNoise static file serving
* Environment-based configuration

Production URL:

https://datadiet.app

---

## Testing

The project includes manual testing documentation covering:

* User Authentication
* Nutrition Plan Generation
* Specialist Applications
* Administrative Workflows
* Database Operations
* Deployment Verification

Available verification commands:

```bash
npm run lint
npm run build
python manage.py test
```

---

## Future Improvements

* Automated backend and frontend testing.
* Appointment booking between clients and specialists.
* Advanced nutrition analytics and progress tracking.
* Mobile application support.
* Multilingual platform support.
* Enhanced administrator reporting and dashboards.
* Search and filtering capabilities.
* Accessibility improvements.
* Production monitoring and logging.

---

## Safety Notice

Generated nutrition plans are intended to assist users in nutrition planning and should not replace professional medical advice, diagnosis, or treatment. Users with medical conditions should consult qualified healthcare professionals before making significant dietary changes.

---

## Team

* **Ali Summan** — Project Manager & Team Lead
* **Omar Al-Anazi** — Frontend Development
* **Mohammed Basulaiman** — Full-Stack Development
* **Hussam Al-Mutairi** — Backend Development

# Data Diet Sequence Diagrams

These sequence diagrams are based on the current implementation in the repository.

## 1) Doctor Application Approval Flow

Note: the project currently has no dedicated approval API endpoint. Approval appears to happen through Django Admin by updating `DoctorApplication.status` from `pending` to `approved`.

```mermaid
sequenceDiagram
    autonumber
    actor Doctor as Doctor User
    participant DoctorUI as DoctorJoinPage
    participant API as Django API
    participant Serializer as DoctorApplicationSerializer
    participant DB as PostgreSQL
    actor Admin as Platform Admin
    participant AdminUI as Django Admin

    Doctor->>DoctorUI: Open "Join Us as a Doctor"
    DoctorUI->>API: GET /api/users/doctor-application/
    API->>DB: Query DoctorApplication by request.user
    DB-->>API: No application found
    API-->>DoctorUI: 404 Not Found

    Doctor->>DoctorUI: Fill form + upload certificate
    DoctorUI->>API: POST /api/users/doctor-application/
    API->>Serializer: Validate request data
    Serializer-->>API: Validated payload
    API->>DB: Create DoctorApplication(status="pending")
    DB-->>API: Saved application
    API-->>DoctorUI: 201 Created + application data
    DoctorUI-->>Doctor: Show "submitted successfully"

    Admin->>AdminUI: Open doctor applications in admin panel
    AdminUI->>DB: Load pending applications
    DB-->>AdminUI: DoctorApplication records
    Admin->>AdminUI: Review certificate and details
    AdminUI->>DB: Update DoctorApplication.status = "approved"
    DB-->>AdminUI: Application updated
```

## 2) Showing Approved Doctor Profile In Client Interface

Note: in the current frontend, approved doctors are displayed in `ClientMedicalSupportPage`. The data source is `DoctorApplication` records filtered by `status='approved'`.

```mermaid
sequenceDiagram
    autonumber
    actor Client as Client User
    participant ClientUI as ClientMedicalSupportPage
    participant Axios as axios instance
    participant API as Django API
    participant View as ApprovedDoctorListView
    participant Serializer as ApprovedDoctorSerializer
    participant DB as PostgreSQL

    Client->>ClientUI: Open Medical Support page
    ClientUI->>Axios: api.get("users/approved-doctors/")
    Axios->>Axios: Attach Bearer access token
    Axios->>API: GET /api/users/approved-doctors/

    API->>View: Check IsAuthenticated
    View->>DB: Query DoctorApplication where status="approved"
    DB-->>View: Approved doctor applications
    View->>Serializer: Serialize each approved application
    Serializer-->>View: id, username, full_name, specialty, phone_number, contact_email
    View-->>API: Serialized list
    API-->>Axios: 200 OK + approved doctors array
    Axios-->>ClientUI: response.data

    alt Doctors found
        ClientUI->>ClientUI: setDoctors(response.data)
        ClientUI-->>Client: Render doctor cards
    else No approved doctors
        ClientUI-->>Client: Render "No approved doctors yet"
    end
```

## 3) End-To-End Combined View

```mermaid
sequenceDiagram
    autonumber
    actor Doctor as Doctor User
    participant DoctorUI as DoctorJoinPage
    participant API as Django API
    participant DB as PostgreSQL
    actor Admin as Platform Admin
    participant AdminUI as Django Admin
    actor Client as Client User
    participant ClientUI as ClientMedicalSupportPage

    Doctor->>DoctorUI: Submit doctor application
    DoctorUI->>API: POST /api/users/doctor-application/
    API->>DB: Save application with status="pending"
    DB-->>API: Application saved
    API-->>DoctorUI: 201 Created

    Admin->>AdminUI: Review pending application
    AdminUI->>DB: Update status to "approved"
    DB-->>AdminUI: Update confirmed

    Client->>ClientUI: Open Medical Support
    ClientUI->>API: GET /api/users/approved-doctors/
    API->>DB: Fetch approved applications only
    DB-->>API: Approved doctor records
    API-->>ClientUI: Doctor list
    ClientUI-->>Client: Display approved doctor profile card
```

## Implementation References

- [views.py](/C:/Data-Diet/backend/users/views.py)
- [serializers.py](/C:/Data-Diet/backend/users/serializers.py)
- [admin.py](/C:/Data-Diet/backend/users/admin.py)
- [DoctorJoinPage.jsx](/C:/Data-Diet/frontend/src/pages/doctor/DoctorJoinPage.jsx)
- [ClientMedicalSupportPage.jsx](/C:/Data-Diet/frontend/src/pages/client/ClientMedicalSupportPage.jsx)

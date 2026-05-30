import { useEffect, useState } from 'react';
import {
  approveDoctorApplication,
  getDoctorApplications,
  rejectDoctorApplication,
} from '../../features/adminService';

function AdminDoctorApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeApplicationId, setActiveApplicationId] = useState(null);
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(
    (application) => application.status === 'pending'
  ).length;
  const approvedApplications = applications.filter(
    (application) => application.status === 'approved'
  ).length;
  const rejectedApplications = applications.filter(
    (application) => application.status === 'rejected'
  ).length;

  async function loadApplications() {
    setError('');
    setIsLoading(true);

    try {
      const data = await getDoctorApplications();
      setApplications(data);
    } catch {
      setError('Unable to load doctor applications.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  async function handleApprove(applicationId) {
    setActiveApplicationId(applicationId);
    setError('');

    try {
      await approveDoctorApplication(applicationId);
      await loadApplications();
    } catch {
      setError('Unable to approve this application.');
    } finally {
      setActiveApplicationId(null);
    }
  }

  async function handleReject(applicationId) {
    setActiveApplicationId(applicationId);
    setError('');

    try {
      await rejectDoctorApplication(applicationId);
      await loadApplications();
    } catch {
      setError('Unable to reject this application.');
    } finally {
      setActiveApplicationId(null);
    }
  }

  return (
    <section className="dashboard-section-page admin-doctor-applications-page">
      <div className="dashboard-section-page__heading">
        <h1>Doctor Applications</h1>
        <p>Review submitted doctor applications and approve or reject pending requests.</p>
      </div>

      {isLoading ? <p className="status-card">Loading doctor applications...</p> : null}
      {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}

      {!isLoading && applications.length === 0 ? (
        <p className="status-card">No doctor applications found.</p>
      ) : null}

      {!isLoading && applications.length > 0 ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Account</th>
                <th>Specialty</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Certificate</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <strong>{application.full_name}</strong>
                    <span>{application.age} years old</span>
                  </td>
                  <td>
                    <strong>{application.username}</strong>
                    <span>{application.user_email}</span>
                  </td>
                  <td>{application.specialty}</td>
                  <td>
                    <strong>{application.phone_number}</strong>
                    <span>{application.contact_email}</span>
                  </td>
                  <td>
                    <span className={`admin-status admin-status--${application.status}`}>
                      {application.status}
                    </span>
                  </td>
                  <td>
                    {application.certificate_file_url ? (
                      <a
                        href={application.certificate_file_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View file
                      </a>
                    ) : (
                      'No file'
                    )}
                  </td>
                  <td>
                    {application.status === 'pending' ? (
                      <div className="admin-actions">
                        <button
                          type="button"
                          onClick={() => handleApprove(application.id)}
                          disabled={activeApplicationId === application.id}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(application.id)}
                          disabled={activeApplicationId === application.id}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span>Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export default AdminDoctorApplicationsPage;
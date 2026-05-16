import { useEffect, useState } from 'react';
import api from '../../api/axios';

function ClientMedicalSupportPage() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadApprovedDoctors() {
      try {
        const response = await api.get('users/approved-doctors/');

        if (isMounted) {
          setDoctors(response.data);
        }
      } catch {
        if (isMounted) {
          setError('Unable to load approved doctors right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadApprovedDoctors();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <article className="workspace-card workspace-card--section medical-support-page">
      <h2>Medical Support</h2>

      {isLoading ? <div className="section-note">Loading approved doctors...</div> : null}
      {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}

      {!isLoading && !error && doctors.length === 0 ? (
        <div className="section-note">
          <h3>No approved doctors yet</h3>
          <p>
            Approved doctor profiles will appear here after the platform team reviews
            and accepts their applications.
          </p>
        </div>
      ) : null}

      {!isLoading && !error && doctors.length > 0 ? (
        <div className="medical-support-content">
          <div className="doctor-directory">
            {doctors.map((doctor) => (
              <article className="doctor-card" key={doctor.id}>
                <div className="doctor-card__header">
                  <h3>Dr. {doctor.full_name}</h3>
                </div>
                <p>{doctor.specialty}</p>
                <div className="doctor-card__details">
                  <span>
                    <strong>Email:</strong> {doctor.contact_email}
                  </span>
                  <span>
                    <strong>Phone:</strong> {doctor.phone_number}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="medical-support-statement">
            <span>Trusted by certified</span>
            <span>nutrition specialists</span>
            <span>with proven expertise.</span>
          </div>

        </div>
      ) : null}

    </article>
  );
}

export default ClientMedicalSupportPage;

import { useEffect, useState } from 'react';
import api from '../../api/axios';

const initialForm = {
  fullName: '',
  age: '',
  specialty: '',
  phoneNumber: '',
  contactEmail: '',
  certificateFile: null,
};

function DoctorJoinPage() {
  const [formData, setFormData] = useState(initialForm);
  const [application, setApplication] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadApplication() {
      try {
        const response = await api.get('users/doctor-application/');

        if (isMounted) {
          setApplication(response.data);
        }
      } catch (requestError) {
        if (requestError.response?.status !== 404 && isMounted) {
          setError('Unable to load your doctor application right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadApplication();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleFileChange(event) {
    const nextFile = event.target.files?.[0] || null;
    setFormData((current) => ({ ...current, certificateFile: nextFile }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('full_name', formData.fullName);
      payload.append('age', formData.age);
      payload.append('specialty', formData.specialty);
      payload.append('phone_number', formData.phoneNumber);
      payload.append('contact_email', formData.contactEmail);
      payload.append('certificate_file', formData.certificateFile);

      const response = await api.post('users/doctor-application/', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setApplication(response.data);
      setSuccessMessage('Your doctor application has been submitted successfully.');
      setFormData(initialForm);
    } catch (requestError) {
      const firstError = Object.values(requestError.response?.data || {})[0];
      setError(
        Array.isArray(firstError)
          ? firstError[0]
          : 'Unable to submit your application. Please review the form and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <div className="status-card">Loading your doctor application...</div>;
  }

  return (
    <article className="workspace-card workspace-card--section doctor-join-page">

      {application ? (
        <div className="section-note-list">
          <div className="section-note">
            <h3>Application submitted</h3>
            <p>
              Your request is currently marked as <strong>{application.status}</strong>.
            </p>
          </div>
          <div className="section-note">
            <h3>Submitted profile</h3>
            <p>
              {application.full_name} | {application.specialty} | {application.contact_email}
            </p>
          </div>
          {application.certificate_file_url ? (
            <div className="section-note">
              <h3>Certificate file</h3>
              <p>
                <a
                  className="text-link"
                  href={application.certificate_file_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open uploaded certificate
                </a>
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="doctor-join-layout">
          <form className="auth-form doctor-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Age
              <input
                name="age"
                type="number"
                min="18"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Specialty
              <input
                name="specialty"
                type="text"
                placeholder="Clinical Nutrition"
                value={formData.specialty}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Phone number
              <input
                name="phoneNumber"
                type="text"
                placeholder="+966..."
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Contact email
              <input
                name="contactEmail"
                type="email"
                placeholder="doctor@example.com"
                value={formData.contactEmail}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Educational certificate
              <input
                name="certificateFile"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                required
              />
            </label>

            {successMessage ? (
              <p className="form-feedback form-feedback--success">{successMessage}</p>
            ) : null}
            {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting application...' : 'Submit Application'}
            </button>
          </form>

          <aside className="doctor-join-copy">
            <h3>Join our medical team</h3>
            <p>
              Share your professional details so clients can discover your expertise
              after your profile is approved.
            </p>
          </aside>
        </div>

      )}
    </article>
  );
}

export default DoctorJoinPage;

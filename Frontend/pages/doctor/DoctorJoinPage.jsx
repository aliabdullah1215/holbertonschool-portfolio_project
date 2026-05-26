import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [fieldErrors, setFieldErrors] = useState({});
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
    
    // Clear error for this field when user starts typing
    setFieldErrors((current) => {
      const fieldMap = {
        fullName: 'full_name',
        age: 'age',
        specialty: 'specialty',
        phoneNumber: 'phone_number',
        contactEmail: 'contact_email',
      };
      const apiFieldName = fieldMap[name];
      if (apiFieldName && current[apiFieldName]) {
        const newErrors = { ...current };
        delete newErrors[apiFieldName];
        return newErrors;
      }
      return current;
    });
  }

  function handleFileChange(event) {
    const nextFile = event.target.files?.[0] || null;
    setFormData((current) => ({ ...current, certificateFile: nextFile }));
    
    // Clear error for certificate when a new file is uploaded
    setFieldErrors((current) => {
      if (current.certificate_file) {
        const newErrors = { ...current };
        delete newErrors.certificate_file;
        return newErrors;
      }
      return current;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setFieldErrors({});
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
      const errorData = requestError.response?.data || {};
      setFieldErrors(errorData);
      const firstError = Object.values(errorData)[0];
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
      <style>{`
        body {
          background: #1C5C2E;
        }

        .doctor-join-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(250, 255, 250, 0.93));
          overflow: hidden;
        }

        .doctor-join-hero {
          text-align: center;
          max-width: 780px;
          margin: 0 auto 42px;
          padding: 24px 0 18px;
        }

        .doctor-join-hero .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #E2F0E6;
          color: #1C5C2E;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 999px;
          margin-bottom: 24px;
          border: 1px solid #D1E7D6;
        }

        .doctor-join-hero h1 {
          font-size: clamp(38px, 4.5vw, 52px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -2px;
          color: #1C5C2E;
          margin: 0 0 18px;
        }

        .doctor-join-hero p {
          font-size: 16.5px;
          line-height: 1.65;
          color: #3D5445 !important;
          margin: 0 auto;
          font-weight: 500;
          max-width: 680px;
        }

        .doctor-join-layout {
          display: grid;
          grid-template-columns: minmax(320px, 520px) 1fr;
          align-items: stretch;
          gap: 48px;
          margin-top: 0;
        }

        .doctor-form {
          background: #FFFFFF;
          border: 1px solid #DFF0E5;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 10px 30px rgba(28,92,46,0.02), 0 2px 6px rgba(0,0,0,0.02);
        }

        .doctor-form label {
          color: #1C5C2E;
          font-size: 14px;
          font-weight: 800;
          gap: 9px;
        }

        .doctor-form input {
          width: 100%;
          min-height: 54px;
          border: 1.5px solid #DFF0E5;
          border-radius: 16px;
          background: #F8FCF9;
          color: #1C2B1E;
          padding: 0 18px;
          font-size: 15px;
          font-weight: 650;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.75), 0 8px 18px rgba(28,92,46,0.04);
          transition: 0.2s ease;
        }

        .doctor-form input::placeholder {
          color: rgba(61,84,69,0.55);
          font-weight: 600;
        }

        .doctor-form input:hover {
          border-color: rgba(46,139,87,0.38);
          background: #FFFFFF;
        }

        .doctor-form input:focus {
          background: #FFFFFF;
          border-color: #2E8B57;
          box-shadow: 0 0 0 4px rgba(46,139,87,0.12), 0 12px 24px rgba(28,92,46,0.07);
        }

        .doctor-form input.input-error,
        .doctor-form input.input-error:hover,
        .doctor-form input.input-error:focus {
          background: #FDECEC !important;
          border-color: #E25D5D !important;
          color: #9F1F1F !important;
          box-shadow: 0 0 0 4px rgba(226,93,93,0.12), 0 12px 24px rgba(159,31,31,0.07) !important;
        }

        .doctor-form input.input-error::placeholder {
          color: rgba(159,31,31,0.55) !important;
        }

        .doctor-form input[type="file"] {
          min-height: 58px;
          padding: 10px 12px;
          cursor: pointer;
        }

        .doctor-form input[type="file"]::file-selector-button {
          border: none;
          border-radius: 999px;
          background: linear-gradient(135deg, #2E8B57, #1C5C2E);
          color: #FFFFFF;
          font-weight: 800;
          padding: 10px 18px;
          margin-right: 14px;
          cursor: pointer;
          box-shadow: 0 8px 18px rgba(46,139,87,0.22);
          transition: 0.2s ease;
        }

        .doctor-form input[type="file"]::file-selector-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 24px rgba(46,139,87,0.28);
        }

        .doctor-form .form-feedback {
          margin: 0;
          padding: 14px 16px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 750;
          line-height: 1.45;
        }

        .doctor-form .form-feedback--error {
          background: #FDECEC;
          border: 1.5px solid #E25D5D;
          color: #9F1F1F;
          box-shadow: 0 10px 22px rgba(159,31,31,0.08);
        }

        .doctor-form .form-feedback--success {
          background: rgba(46,139,87,0.12);
          border: 1.5px solid rgba(46,139,87,0.28);
          color: #1C5C2E;
          box-shadow: 0 10px 22px rgba(28,92,46,0.06);
        }

        .doctor-join-copy {
          background: linear-gradient(135deg, #F0F7F1 0%, #FFFFFF 100%);
          border: 1px solid #DFF0E5;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(28,92,46,0.02), 0 2px 6px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .doctor-join-copy h3 {
          margin: 0 0 20px;
          color: #1C5C2E;
          font-size: clamp(30px, 3.2vw, 44px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -1.5px;
        }

        .doctor-join-copy p {
          color: #3D5445 !important;
          font-size: 15.5px;
          line-height: 1.7;
          margin: 0 0 24px;
        }

        .doctor-join-copy .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .doctor-join-copy .benefits-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          color: #3D5445;
          font-size: 14.5px;
          font-weight: 600;
        }

        .doctor-join-copy .benefits-list li:last-child {
          margin-bottom: 0;
        }

        .doctor-join-copy .benefits-list li i {
          color: #2E8B57;
          font-size: 18px;
        }

        .doctor-join-page .footer {
          background: #1C5C2E;
          padding: 50px 0 38px;
          width: calc(100% + 56px);
          margin: 56px -28px -28px;
          border-radius: 0 0 24px 24px;
        }

        .doctor-join-page .footer-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 60px;
        }

        .doctor-join-page .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 26px;
        }

        .doctor-join-page .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .doctor-join-page .footer-logo-icon {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        .doctor-join-page .footer-logo-text {
          color: white;
          font-size: 18px;
          font-weight: 800;
        }

        .doctor-join-page .footer-links {
          display: flex;
          gap: 24px;
        }

        .doctor-join-page .footer-links a {
          text-decoration: none;
          color: rgba(255,255,255,0.70);
          font-size: 14px;
          font-weight: 600;
          transition: 0.25s ease;
        }

        .doctor-join-page .footer-links a:hover {
          color: white;
        }

        .doctor-join-page .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.12);
          margin-bottom: 24px;
        }

        .doctor-join-page .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .doctor-join-page .footer-copy,
        .doctor-join-page .footer-tagline {
          color: rgba(255,255,255,0.50);
          font-size: 13px;
        }

        @media (max-width: 980px) {
          .doctor-join-layout {
            grid-template-columns: 1fr;
          }

          .doctor-join-copy {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .doctor-join-page .footer-container {
            padding: 0 24px;
          }

          .doctor-join-page .footer-inner,
          .doctor-join-page .footer-bottom {
            flex-direction: column;
            gap: 18px;
            text-align: center;
          }

          .doctor-join-page .footer-links {
            justify-content: center;
            gap: 16px;
          }
        }
      `}</style>

      <section className="doctor-join-hero">
        <span className="eyebrow">
          <i className="fas fa-user-md"></i> Medical team application
        </span>
        <h1>Join DataDiet as a nutrition specialist.</h1>
        <p>
          Submit your professional details and certificate so your doctor profile can be reviewed.
        </p>
      </section>

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
          {/* Form now contains noValidate attribute to let custom classes process immediately */}
          <form className="auth-form doctor-form" onSubmit={handleSubmit} noValidate>
            <label>
              Full name
              <input
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className={fieldErrors.full_name ? 'input-error' : ''}
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
                className={fieldErrors.age ? 'input-error' : ''}
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
                className={fieldErrors.specialty ? 'input-error' : ''}
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
                className={fieldErrors.phone_number ? 'input-error' : ''}
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
                className={fieldErrors.contact_email ? 'input-error' : ''}
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
                className={fieldErrors.certificate_file ? 'input-error' : ''}
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
            <ul className="benefits-list">
              <li>
                <i className="fas fa-check-circle"></i>
                Verified professional profile
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Direct client connections
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Flexible consultation schedule
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Grow your nutrition practice
              </li>
            </ul>
          </aside>
        </div>
      )}

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-inner">
            <div className="footer-logo">
              <img src="https://www.image2url.com/r2/default/images/1779771082419-77f45caf-4ccd-438f-95c7-0caabce26494.png" alt="DataDiet" className="footer-logo-icon" />
              <div className="footer-logo-text">DataDiet</div>
            </div>

            <div className="footer-links">
              <Link to="/doctor/contact">Contact Us</Link>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <div className="footer-copy">© 2026 DataDiet. All rights reserved.</div>
            <div className="footer-tagline">Built with care for healthier lives 🌱</div>
          </div>
        </div>
      </footer>
    </article>
  );
}

export default DoctorJoinPage;

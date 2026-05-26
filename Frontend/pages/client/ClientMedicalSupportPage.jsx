import { useEffect, useState } from 'react';
import api from '../../api/axios';

export function ClientMedicalSupportPage() {
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
      <style>{`
        :root {
          --green-deep: #1C5C2E;
          --green-mid: #2E8B57;
          --green-secondary: #4A7C59;
          --green-light: #6BAF7E;
          --bg-mint: #F0F7F1;
          --white: #FFFFFF;
          --text-dark: #1C2B1E;
          --text-body: #3D5445;
          --text-secondary: #4A7C59;
          --border-light: #DFF0E5;
        }

        .medical-support-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: transparent;
          width: 100%;
          box-sizing: border-box;
        }

        /* CENTERED INTRO HEADER SECTION */
        .medical-support-header {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 48px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .medical-support-header .eyebrow {
          display: inline-flex;
          align-items: center;
          background: rgba(46,139,87,0.10);
          color: var(--green-mid);
          font-size: 11px;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 18px;
          text-transform: uppercase;
          letter-spacing: 0.75px;
        }

        .medical-support-header h1 {
          font-size: clamp(34px, 4.5vw, 48px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -1.8px;
          color: var(--green-deep);
          margin: 0 0 16px 0;
        }

        .medical-support-header p {
          font-size: 16px;
          line-height: 1.6;
          color: var(--text-body);
          margin: 0;
          font-weight: 500;
          max-width: 680px;
        }

        /* MAIN WRAPPER CONTAINER */
        .medical-support-content {
          display: flex;
          flex-direction: column;
          gap: 56px;
          border-top: 1px solid var(--border-light);
          padding-top: 48px;
        }

        /* REFINED CARD DIRECTORY GRID */
        .doctor-directory {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* DELICATE DOCTOR CARD DECORATIONS */
        .doctor-card {
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 24px;
          padding: 28px 24px;
          box-shadow: 0 10px 30px rgba(28,92,46,0.015), 0 2px 6px rgba(0,0,0,0.015);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-sizing: border-box;
          transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), border-color 0.3s ease;
        }

        /* FLUID ELEVATED INTERACTION ON HOVER */
        .doctor-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 40px rgba(28,92,46,0.05), 0 4px 12px rgba(0,0,0,0.025);
          border-color: rgba(46,139,87,0.25);
        }

        /* AVATAR BADGE HOLDER placeholder */
        .doctor-avatar-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          background: var(--bg-mint);
          color: var(--green-mid);
          border-radius: 14px;
          margin-bottom: 18px;
        }

        .doctor-avatar-wrapper svg {
          width: 22px;
          height: 22px;
        }

        .doctor-card__header h3 {
          font-size: 19px;
          font-weight: 800;
          color: var(--green-deep);
          margin: 0 0 6px 0;
          letter-spacing: -0.4px;
          line-height: 1.3;
        }

        .doctor-card > p {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--green-mid);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 20px 0;
        }

        /* METADATA INFO STACKS */
        .doctor-card__details {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-top: 1px dashed var(--border-light);
          padding-top: 18px;
        }

        .doctor-detail-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--text-body);
        }

        .doctor-detail-item svg {
          width: 14px;
          height: 14px;
          color: var(--text-secondary);
          flex-shrink: 0;
        }

        .doctor-detail-item strong {
          font-weight: 700;
          color: var(--green-deep);
        }

        /* CENTERED DESIGN BANNER STATEMENT */
        .medical-support-statement {
          background: var(--bg-mint);
          border: 1px dashed rgba(46,139,87,0.15);
          border-radius: 24px;
          padding: 32px;
          text-align: center;
          max-width: 650px;
          margin: 16px auto 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .medical-support-statement span {
          display: block;
          font-size: 20px;
          font-weight: 800;
          color: var(--green-deep);
          letter-spacing: -0.5px;
          line-height: 1.3;
        }

        /* LOADING / FEEDBACK BOX STATES */
        .form-feedback, .support-loading-msg, .section-note {
          text-align: center;
          padding: 20px;
          margin: 20px auto;
          font-weight: 500;
        }
        .form-feedback--error {
          color: #D32F2F;
          background: #FFEBEE;
          border-radius: 14px;
          max-width: 600px;
        }
        .support-loading-msg {
          color: var(--text-secondary);
        }
        .section-note {
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 24px;
          max-width: 520px;
          padding: 44px 24px;
        }
        .section-note h3 {
          color: var(--green-deep);
          margin: 0 0 10px 0;
          font-size: 20px;
          font-weight: 800;
        }
        .section-note p {
          color: var(--text-body);
          margin: 0;
          font-size: 14.5px;
          line-height: 1.6;
        }

        /* SYSTEM BREAKPOINT RESPONSIVENESS */
        @media (max-width: 1100px) {
          .doctor-directory {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 680px) {
          .doctor-directory {
            grid-template-columns: 1fr;
          }
          .medical-support-statement span {
            font-size: 17px;
          }
        }
      `}</style>

      {/* CORE INTRO HEADER SYSTEM */}
      <section className="medical-support-header">
        <span className="eyebrow">Expert Support</span>
        <h1>Medical Support Network</h1>
        <p>Connect securely with certified clinical experts and specialized professionals to validate targets, assess macro profiles, or oversee extensive structural plan transformations.</p>
      </section>

      {isLoading ? <div className="support-loading-msg">Loading approved doctors...</div> : null}
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
          
          {/* MEDICAL EXPERTS INTERACTIVE DIRECTORY GRID */}
          <div className="doctor-directory">
            {doctors.map((doctor) => (
              <article className="doctor-card" key={doctor.id}>
                
                <div className="doctor-avatar-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>

                <div className="doctor-card__header">
                  <h3>Dr. {doctor.full_name}</h3>
                </div>
                
                <p>{doctor.specialty}</p>
                
                <div className="doctor-card__details">
                  <span className="doctor-detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <strong>Email:</strong> {doctor.contact_email}
                  </span>
                  
                  <span className="doctor-detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <strong>Phone:</strong> {doctor.phone_number}
                  </span>
                </div>

              </article>
            ))}
          </div>

          {/* LOWER DESIGN STATEMENT FOOTER MODULE */}
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

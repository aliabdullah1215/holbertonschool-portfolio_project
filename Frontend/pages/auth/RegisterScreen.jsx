import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../context/useAuth';

const initialForm = {
  username: '',
  email: '',
  password: '',
  role: 'client',
};

function RegisterScreen() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    
    if (fieldErrors[name]) {
      setFieldErrors((current) => ({ ...current, [name]: false }));
    }
    if (globalError) {
      setGlobalError('');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setGlobalError('');
    setFieldErrors({});
    setSuccessMessage('');

    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) {
      errors.username = true;
    }
    if (!formData.password.trim()) {
      errors.password = true;
    }
    
    if (!formData.email.trim()) {
      errors.email = true;
      setGlobalError('Please fill out all required fields.');
    } else if (!emailRegex.test(formData.email)) {
      errors.email = true;
      setGlobalError('Please enter a valid email address.');
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      if (!formData.email.trim() || (formData.username.trim() && formData.password.trim())) {
        if (!emailRegex.test(formData.email) && formData.email.trim()) {
          setGlobalError('Please enter a valid email address.');
        } else {
          setGlobalError('Please fill out all required fields.');
        }
      }
      return;
    }

    setIsSubmitting(true);

    try {
      await register(formData);
      setSuccessMessage('Account created successfully. You can sign in now.');
      setFormData(initialForm);
      window.setTimeout(() => {
        navigate('/login', { replace: true });
      }, 900);
    } catch (requestError) {
      const fallbackMessage = 'Unable to create the account. Please review the form and try again.';
      const serverData = requestError.response?.data || {};
      
      const newFieldErrors = {};
      Object.keys(serverData).forEach((key) => {
        if (key in initialForm) {
          newFieldErrors[key] = true;
        }
      });
      setFieldErrors(newFieldErrors);

      const firstError = Object.values(serverData)[0];
      setGlobalError(Array.isArray(firstError) ? firstError[0] : fallbackMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rw">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --green-deep: #1C5C2E;
          --green-mid: #2E8B57;
          --green-secondary: #4A7C59;
          --bg-mint: #F0F7F1;
          --white: #FFFFFF;
          --text-dark: #1C2B1E;
          --text-body: #3D5445;
          --text-secondary: #4A7C59;
          --border-light: #DFF0E5;
          --red-error: #DC3545;
        }

        /* ── Viewport Layout Fixes ── */
        .rw {
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          
          overflow: hidden;
          background-color: var(--white);
        }

        /* ════════ LEFT PANEL ════════ */
        .rw-left {
          background: var(--bg-mint);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 80px;
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .rw-blobs {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .rw-left-inner {
          position: relative;
          z-index: 1;
          max-width: 520px;
          margin: 0 auto;
          width: 100%;
        }

        .rw-header-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 56px;
          width: 100%;
        }

        .rw-logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .rw-logo-icon {
          width: 40px;
          height: 42px;
          background: linear-gradient(135deg, var(--green-mid), var(--green-deep));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rw-logo-icon i { color: #fff; font-size: 18px; }

        .rw-logo-text {
          font-size: 22px;
          font-weight: 800;
          color: var(--green-deep);
          letter-spacing: -0.4px;
        }

        .rw-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(46,139,87,0.10);
          color: var(--green-mid);
          font-size: 13px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 100px;
          border: 1px solid rgba(46,139,87,0.20);
          letter-spacing: 0.2px;
          white-space: nowrap;
        }

        .rw-h1 {
          font-size: clamp(32px, 2.8vw, 48px);
          font-weight: 800;
          color: var(--green-deep);
          letter-spacing: -1.5px;
          line-height: 1.15;
          margin-bottom: 22px;
        }

        .rw-h1 span { color: var(--green-mid); }

        .rw-sub {
          font-size: 16px;
          color: var(--text-body);
          line-height: 1.75;
          max-width: 440px;
          margin-bottom: 44px;
        }

        .rw-creds { display: flex; flex-direction: column; gap: 16px; }

        .rw-cred {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 15px;
          color: var(--text-body);
          font-weight: 500;
        }

        .rw-cred-dot {
          width: 26px;
          height: 26px;
          background: rgba(46,139,87,0.12);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .rw-cred-dot i { color: var(--green-mid); font-size: 11px; }

        .rw-stat-card {
          margin-top: 56px;
          background: white;
          border-radius: 20px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1.5px solid var(--border-light);
          box-shadow: 0 12px 32px rgba(28,92,46,0.09);
          max-width: 380px;
        }

        .rw-stat-icon {
          width: 48px;
          height: 48px;
          background: rgba(46,139,87,0.10);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .rw-stat-icon i { color: var(--green-mid); font-size: 19px; }
        .rw-stat-title { font-size: 15px; font-weight: 700; color: var(--green-deep); margin-bottom: 4px; }
        .rw-stat-sub { font-size: 13px; color: var(--text-secondary); font-weight: 500; line-height: 1.5; }


        /* ════════ RIGHT PANEL ════════ */
        .rw-right {
          background: var(--white);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 80px;
          overflow-y: auto;
          height: 100%;
        }

        .rw-right-inner {
          max-width: 460px;
          width: 100%;
          margin: 0 auto;
        }

        .rw-form-heading { margin-bottom: 32px; }

        .rw-form-heading h2 {
          font-size: 28px;
          font-weight: 800;
          color: var(--green-deep);
          letter-spacing: -0.6px;
          margin-bottom: 6px;
        }

        .rw-form-heading p { font-size: 15px; color: var(--text-body); line-height: 1.6; }

        .rw-tabs {
          display: flex;
          background: var(--bg-mint);
          border-radius: 100px;
          padding: 5px;
          gap: 6px;
          margin-bottom: 32px;
          border: 1px solid var(--border-light);
        }

        .rw-tabs a {
          flex: 1;
          text-align: center;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          padding: 11px 0;
          border-radius: 100px;
          color: var(--text-secondary);
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }

        .rw-tabs a:hover { color: var(--green-deep); }

        .rw-tabs a.active {
          background: white;
          color: var(--green-deep);
          box-shadow: 0 3px 12px rgba(28,92,46,0.10);
        }

        .rw-form { display: flex; flex-direction: column; gap: 20px; }

        .rw-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--green-deep);
        }

        .rw-form input {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: var(--text-dark);
          background: var(--bg-mint);
          border: 1.5px solid var(--border-light);
          border-radius: 14px;
          padding: 13px 18px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          width: 100%;
        }

        .rw-form input::placeholder { color: #A8C4AE; font-weight: 400; }

        .rw-form input:focus {
          border-color: var(--green-mid);
          background: var(--white);
          box-shadow: 0 0 0 4px rgba(46,139,87,0.12);
        }

        /* ── Individual Input Error Styles ── */
        .rw-form input.rw-input--error {
          border-color: rgba(220, 53, 69, 0.6) !important;
          background: rgba(220, 53, 69, 0.04) !important;
        }
        
        .rw-form input.rw-input--error:focus {
          border-color: var(--red-error) !important;
          background: var(--white) !important;
          box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.15) !important;
        }

        .rw-roles { display: flex; gap: 12px; }

        .rw-role {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 0;
          border-radius: 14px;
          border: 1.5px solid var(--border-light);
          background: var(--bg-mint);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s, box-shadow 0.2s;
        }

        .rw-role:hover { border-color: rgba(46,139,87,0.30); color: var(--green-deep); }

        .rw-role.selected {
          background: rgba(46,139,87,0.10);
          border-color: var(--green-mid);
          color: var(--green-deep);
          box-shadow: 0 3px 12px rgba(46,139,87,0.12);
        }

        .rw-role i { font-size: 15px; }

        .rw-fb {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 18px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
        }

        .rw-fb--ok  { background: rgba(46,139,87,0.09); color: var(--green-deep); border: 1px solid rgba(46,139,87,0.20); }
        .rw-fb--err { background: rgba(220,53,69,0.07); color: #c0392b; border: 1px solid rgba(220,53,69,0.18); }

        .rw-submit {
          background: linear-gradient(135deg, var(--green-mid), var(--green-deep));
          color: white;
          border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 15px 0;
          border-radius: 100px;
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          margin-top: 8px;
        }

        .rw-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(46,139,87,0.38);
        }

        .rw-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .rw-nudge {
          text-align: center;
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 24px;
        }

        .rw-nudge a {
          color: var(--green-mid);
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s;
        }

        .rw-nudge a:hover { color: var(--green-deep); }

        /* ── Responsive adjustments ── */
        @media (max-width: 1024px) {
          .rw-left { padding: 48px 48px; }
          .rw-right { padding: 48px 48px; }
        }

        @media (max-width: 900px) {
          .rw { 
            grid-template-columns: 1fr; 
            position: absolute;
            height: auto; 
            min-height: 100vh;
            overflow-y: initial; 
          }
          .rw-left { display: none; }
          .rw-right { padding: 48px 32px; height: auto; }
        }

        @media (max-width: 480px) {
          .rw-right { padding: 36px 20px; }
        }
      `}</style>

      {/* ══════ LEFT PANEL ══════ */}
      <div className="rw-left">
        <svg className="rw-blobs" viewBox="0 0 720 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="600" cy="160" rx="260" ry="210" fill="rgba(46,139,87,0.09)" />
          <ellipse cx="80"  cy="700" rx="200" ry="160" fill="rgba(46,139,87,0.06)" />
          <ellipse cx="400" cy="500" rx="150" ry="120" fill="rgba(28,92,46,0.04)" />
          <g opacity="0.25">
            {[40,80,120].flatMap(x => [40,80,120].map(y =>
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="#2E8B57" />
            ))}
            {[560,600,640].flatMap(x => [740,780,820].map(y =>
              <circle key={`r${x}-${y}`} cx={x} cy={y} r="2.5" fill="#2E8B57" />
            ))}
          </g>
        </svg>

        <div className="rw-left-inner">
          <div className="rw-header-row">
            <Link to="/" className="rw-logo">
              <div className="rw-logo-icon"><i className="fas fa-seedling"></i></div>
              <span className="rw-logo-text">Data Diet</span>
            </Link>

            <div className="rw-pill">
              <i className="fas fa-sparkles"></i>
              AI nutrition planning with expert support
            </div>
          </div>

          <h1 className="rw-h1">
            Build a nutrition plan<br />
            that fits <span>real life.</span>
          </h1>

          <p className="rw-sub">
            Data Diet helps you generate personalized AI meal plans, save them, and connect with nutritionists when support is needed.
          </p>

          <div className="rw-creds">
            {[
              'Personalized to your specific health goals',
              'Editable at any point — no locked plans',
              'Backed by verified nutrition professionals',
            ].map(text => (
              <div className="rw-cred" key={text}>
                <div className="rw-cred-dot"><i className="fas fa-check"></i></div>
                {text}
              </div>
            ))}
          </div>

          <div className="rw-stat-card">
            <div className="rw-stat-icon"><i className="fas fa-fire-flame-curved"></i></div>
            <div>
              <div className="rw-stat-title">1,850 kcal · Daily target</div>
              <div className="rw-stat-sub">AI-calibrated to your body, goals, and lifestyle.</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════ RIGHT PANEL ══════ */}
      <div className="rw-right">
        <div className="rw-right-inner">

          <div className="rw-form-heading">
            <h2>Create your account</h2>
            <p>Start your nutrition journey in under a minute.</p>
          </div>

          <div className="rw-tabs">
            <Link to="/login">Sign In</Link>
            <Link to="/register" className="active">Sign Up</Link>
          </div>

          <form className="rw-form" onSubmit={handleSubmit} noValidate>
            <label>
              Username
              <input 
                name="username" 
                type="text" 
                placeholder="your_username"
                className={fieldErrors.username ? 'rw-input--error' : ''}
                value={formData.username} 
                onChange={handleChange} 
                required 
              />
            </label>

            <label>
              Email
              <input 
                name="email" 
                type="email" 
                placeholder="name@example.com"
                className={fieldErrors.email ? 'rw-input--error' : ''}
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </label>

            <label>
              Password
              <input 
                name="password" 
                type="password" 
                placeholder="••••••••"
                className={fieldErrors.password ? 'rw-input--error' : ''}
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </label>

            <label>
              Account type
              <div className="rw-roles">
                <button type="button"
                  className={`rw-role${formData.role === 'client' ? ' selected' : ''}`}
                  onClick={() => setFormData(c => ({ ...c, role: 'client' }))}>
                  <i className="fas fa-user"></i> Client
                </button>
                <button type="button"
                  className={`rw-role${formData.role === 'doctor' ? ' selected' : ''}`}
                  onClick={() => setFormData(c => ({ ...c, role: 'doctor' }))}>
                  <i className="fas fa-stethoscope"></i> Doctor
                </button>
              </div>
            </label>

            {successMessage && (
              <div className="rw-fb rw-fb--ok">
                <i className="fas fa-circle-check"></i>{successMessage}
              </div>
            )}
            {globalError && (
              <div className="rw-fb rw-fb--err">
                <i className="fas fa-circle-exclamation"></i>{globalError}
              </div>
            )}

            <button type="submit" className="rw-submit" disabled={isSubmitting}>
              {isSubmitting
                ? <><i className="fas fa-spinner fa-spin"></i> Creating account…</>
                : <><i className="fas fa-arrow-right"></i> Create Account</>}
            </button>
          </form>

          <p className="rw-nudge">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;

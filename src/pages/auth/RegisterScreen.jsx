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
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
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
      const firstError = Object.values(requestError.response?.data || {})[0];
      setError(Array.isArray(firstError) ? firstError[0] : fallbackMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-card">
      <span className="eyebrow">Create Account</span>
      <h2>Start your account</h2>
      <p>Create your profile and continue inside Data Diet.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            name="username"
            type="text"
            placeholder="Choose a username"
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
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Account type
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="client">Client</option>
            <option value="doctor">Doctor</option>
          </select>
        </label>

        {successMessage ? (
          <p className="form-feedback form-feedback--success">{successMessage}</p>
        ) : null}
        {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="auth-card__footer">
        Already have an account? <Link to="/login">Go to sign in</Link>
      </p>
    </section>
  );
}

export default RegisterScreen;

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
    <section className="auth-card auth-card--centered">
      <div className="auth-card__heading">
        <h2>Welcome</h2>
        <p>Sign in to your account or create a new one</p>
      </div>

      <div className="auth-tabs" aria-label="Authentication tabs">
        <Link className="auth-tabs__item" to="/login">
          Sign In
        </Link>
        <Link className="auth-tabs__item auth-tabs__item--active" to="/register">
          Sign Up
        </Link>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            name="username"
            type="text"
            placeholder="your_username"
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
    </section>
  );

}

export default RegisterScreen;

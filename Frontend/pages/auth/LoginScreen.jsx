import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import { routeByRole } from '../../features/auth/routeByRole';

function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await login(formData);
      navigate(routeByRole(user.role), { replace: true });
    } catch {
      setError('Unable to sign in. Please check your username and password.');
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
        <Link className="auth-tabs__item auth-tabs__item--active" to="/login">
          Sign In
        </Link>
        <Link className="auth-tabs__item" to="/register">
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

        {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </section>
  );
}

export default LoginScreen;

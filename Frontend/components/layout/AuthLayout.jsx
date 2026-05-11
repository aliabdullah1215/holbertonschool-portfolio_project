import { Link, Outlet } from 'react-router-dom';
import LogoMark from '../branding/LogoMark';

const authLinks = [
  { label: 'Sign In', to: '/login' },
  { label: 'Create Account', to: '/register' },
];

function AuthLayout() {
  return (
    <div className="auth-layout">
      <aside className="auth-layout__panel">
        <LogoMark />
        <h1>Personal nutrition in a calm, clear space.</h1>
        <p>Sign in or create your account to continue.</p>

        <nav className="auth-layout__nav" aria-label="Authentication links">
          {authLinks.map((link) => (
            <Link key={link.to} className="ghost-link" to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="auth-layout__content">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;

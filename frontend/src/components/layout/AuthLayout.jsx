import { Link, Outlet } from 'react-router-dom';

const authLinks = [
  { label: 'Sign In', to: '/login' },
  { label: 'Create Account', to: '/register' },
];

function AuthLayout() {
  return (
    <div className="auth-layout">
      <aside className="auth-layout__panel">
        <span className="eyebrow">Data Diet</span>
        <h1>A digital nutrition platform built on a clean foundation</h1>
        <p>
          This area is dedicated to authentication so sign-in, registration,
          and role-based navigation remain clear from the start.
        </p>

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

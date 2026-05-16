import { Link, Outlet } from 'react-router-dom';
import LogoMark from '../branding/LogoMark';

function AuthLayout() {
  return (
    <div className="auth-page">
      <header className="auth-topbar">
        <div className="auth-topbar__brand">
          <LogoMark compact />
        </div>

        <nav className="auth-topbar__links" aria-label="Authentication navigation">
          
        </nav>

        <div className="auth-topbar__actions">
          <Link className="ghost-link" to="/login">
            Sign In
          </Link>
          <Link className="primary-link" to="/register">
            Sign Up
          </Link>
        </div>
      </header>

      <main className="auth-page__main">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;

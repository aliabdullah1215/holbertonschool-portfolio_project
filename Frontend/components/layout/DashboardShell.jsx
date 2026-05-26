import { Link, NavLink, Outlet } from 'react-router-dom';
import LogoMark from '../branding/LogoMark';
import useAuth from '../../context/useAuth';

function DashboardShell({ title, description, sections, homePath = '/' }) {
  const { logout, user } = useAuth();
  const teamPath = homePath.startsWith('/doctor') ? '/doctor/team' : '/client/team';

  return (
    <div className="dashboard-layout dashboard-layout--topnav">
      <header className="dashboard-topbar">
        <div className="dashboard-topbar__brand">
          <LogoMark compact to={homePath} />

        </div>

        <nav className="dashboard-topbar__nav" aria-label="Dashboard navigation">
          {sections.map((section) => (
            <NavLink
              key={section.to}
              to={section.to}
              className={({ isActive }) =>
                `dashboard-topbar__link${isActive ? ' dashboard-topbar__link--active' : ''}`
              }
            >
              {section.label || section.title}
            </NavLink>
          ))}
        </nav>

        <button className="dashboard-topbar__logout" type="button" onClick={logout}>
          Logout
        </button>
      </header>

      <main className="dashboard-page">


        <section className="dashboard-layout__workspace">
          <Outlet />
        </section>
      </main>
      <footer className="dashboard-footer">
        <div className="dashboard-footer__brand">
          <LogoMark compact to={homePath} />
          <span>© 2026 DataDiet. All rights reserved.</span>
        </div>

        <div className="dashboard-footer__links">
          <Link to={teamPath} aria-label="GitHub team page">
            GitHub
          </Link>
          <Link to={teamPath} aria-label="LinkedIn team page">
            LinkedIn
          </Link>
        </div>
      </footer>

    </div>
  );
}

export default DashboardShell;

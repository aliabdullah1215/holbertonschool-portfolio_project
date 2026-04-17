import { Link, NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../context/useAuth';

function DashboardShell({ title, description, sections, homePath }) {
  const { logout, user } = useAuth();

  return (
    <div className="dashboard-layout">
      <header className="dashboard-layout__header">
        <div>
          <span className="eyebrow">Data Diet</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {user ? (
            <p className="dashboard-layout__welcome">
              Current account: <strong>{user.username}</strong>
            </p>
          ) : null}
        </div>

        <nav className="dashboard-layout__actions" aria-label="Quick navigation">
          <Link className="ghost-link" to="/">
            Public Home
          </Link>
          <Link className="primary-link" to={homePath}>
            Refresh View
          </Link>
          <button className="ghost-link ghost-link--button" type="button" onClick={logout}>
            Sign Out
          </button>
        </nav>
      </header>

      <div className="dashboard-layout__body">
        <aside className="dashboard-sidebar" aria-label="Dashboard sections">
          <div className="dashboard-sidebar__header">
            <h2>Sections</h2>
            <p>Each section now lives on its own page so we can expand it cleanly later.</p>
          </div>

          <nav className="dashboard-sidebar__nav">
            {sections.map((section) => (
              <NavLink
                key={section.to}
                to={section.to}
                className={({ isActive }) =>
                  `dashboard-nav-link${isActive ? ' dashboard-nav-link--active' : ''}`
                }
              >
                <strong>{section.title}</strong>
                <span>{section.description}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="dashboard-layout__workspace">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default DashboardShell;

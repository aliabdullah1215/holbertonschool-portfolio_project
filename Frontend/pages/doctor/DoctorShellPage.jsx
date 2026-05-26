import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../context/useAuth';

const navLinks = [
  {
    label: 'Home',
    path: '/doctor/home',
    icon: 'fa-house',
  },
  {
    label: 'About',
    path: '/doctor/about',
    icon: 'fa-circle-info',
  },
  {
    label: 'Join Medical Team',
    path: '/doctor/join',
    icon: 'fa-user-md',
  },
];

function DoctorShellPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="doctor-shell-layout">
      <style>{`
        :root {
          --green-deep: #1C5C2E;
          --green-mid: #2E8B57;
          --green-secondary: #4A7C59;

          --bg-mint: #F0F7F1;
          --white: #FFFFFF;

          --text-dark: #1C2B1E;
          --text-body: #3D5445;

          --border-light: #DFF0E5;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--bg-mint);
          overflow-x: hidden !important;
        }

        .doctor-shell-layout {
          min-height: 100vh;
          background: var(--bg-mint);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* =========================
           NAVBAR 
        ========================= */

        .shell-navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0; /* Fixed the typo here */
          right: 0;
          z-index: 999;
          display: flex;
          justify-content: center;
          padding: 20px 0; 
        }

        .shell-navbar {
          width: 1350px; 
          max-width: calc(100vw - 40px);
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 999px;
          padding: 16px 24px; 
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow:
            0 12px 45px rgba(28, 92, 46, 0.1),
            0 2px 12px rgba(0, 0, 0, 0.04);
        }

        .shell-logo {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
        }

        .shell-logo-icon {
          width: 56px;
          height: 56px;
          object-fit: contain;
        }

        .shell-logo-text {
          font-size: 26px; 
          font-weight: 800;
          letter-spacing: -0.5px;
          color: var(--green-deep);
        }

        .shell-links {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .shell-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text-body);
          font-size: 16px; 
          font-weight: 700;
          padding: 14px 22px;
          border-radius: 999px;
          transition: 0.25s ease;
        }

        .shell-link:hover {
          background: var(--bg-mint);
          color: var(--green-deep);
        }

        .shell-link.active {
          background: rgba(46, 139, 87, 0.12);
          color: var(--green-deep);
        }

        .shell-signout {
          background: white;
          border: 1.5px solid var(--border-light);
          color: var(--green-secondary);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 14px 26px;
          border-radius: 999px;
          cursor: pointer;
          transition: 0.25s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .shell-signout:hover {
          border-color: #dc3545;
          color: #dc3545;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(220, 53, 69, 0.12);
        }

        /* =========================
           CONTENT AREA
        ========================= */

        .doctor-shell-content {
          padding-top: 120px;
          min-height: 100vh;
        }

        /* =========================
           RESPONSIVE REFORMS
        ========================= */

        @media (max-width: 1200px) {
          .shell-navbar {
            border-radius: 32px;
            flex-direction: column;
            gap: 18px;
            padding: 20px;
          }
          .doctor-shell-content {
            padding-top: 240px; 
          }
        }

        @media (max-width: 768px) {
          .shell-navbar {
            max-width: calc(100vw - 20px);
          }

          .shell-links {
            width: 100%;
          }

          .shell-link {
            font-size: 14px;
            padding: 12px 16px;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <div className="shell-navbar-wrapper">
        <nav className="shell-navbar">
          <Link to="/doctor/home" className="shell-logo">
            <img src="https://www.image2url.com/r2/default/images/1779771082419-77f45caf-4ccd-438f-95c7-0caabce26494.png" alt="DataDiet" className="shell-logo-icon" />
            <div className="shell-logo-text">DataDiet</div>
          </Link>

          <div className="shell-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={
                  location.pathname === link.path
                    ? 'shell-link active'
                    : 'shell-link'
                }
              >
                <i className={`fas ${link.icon}`}></i>
                {link.label}
              </Link>
            ))}
          </div>

          <button className="shell-signout" onClick={handleSignOut}>
            <i className="fas fa-arrow-right-from-bracket"></i>
            Sign Out
          </button>
        </nav>
      </div>

      {/* RENDERED ROUTE SUBPAGES */}
      <main className="doctor-shell-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DoctorShellPage;

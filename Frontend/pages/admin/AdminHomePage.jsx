import { Link } from 'react-router-dom';
import useAuth from '../../context/useAuth';

function AdminHomePage() {
  const { user } = useAuth();

  return (
    <section className="client-home-page">
      <div className="client-home-hero">
        <h1>Admin Dashboard</h1>
        <p>
          Welcome {user?.username || 'Admin'}. Review platform activity, doctor
          applications, and users.
        </p>

        <div className="client-home-actions">
          <Link className="client-home-cta" to="/admin-dashboard/doctor-applications">
            Doctor applications
          </Link>

          <Link className="client-home-cta" to="/admin-dashboard/permissions">
            View permissions
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AdminHomePage;
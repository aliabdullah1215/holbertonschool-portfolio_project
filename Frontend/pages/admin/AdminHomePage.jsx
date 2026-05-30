import { Link } from 'react-router-dom';
import useAuth from '../../context/useAuth';

const adminCards = [
  {
    title: 'Doctor Applications',
    description: 'Review doctor requests, check certificates, and approve qualified medical profiles.',
    path: '/admin-dashboard/doctor-applications',
    icon: 'fa-user-doctor',
    action: 'Review applications',
  },
  {
    title: 'Platform Users',
    description: 'Monitor registered accounts, roles, staff permissions, and account activity.',
    path: '/admin-dashboard/users',
    icon: 'fa-users',
    action: 'View users',
  },
];

function AdminHomePage() {
  const { user } = useAuth();

  return (
    <section className="admin-home-page">
      <div className="admin-home-hero">
        <span className="admin-home-eyebrow">
          <i className="fas fa-shield-halved"></i>
          Admin Workspace
        </span>

        <h1>Welcome, {user?.username || 'Admin'}</h1>

        <p>
          Manage DataDiet operations from one clean workspace. Review doctor applications,
          monitor users, and keep the platform organized.
        </p>
      </div>

      <div className="admin-home-grid">
        {adminCards.map((card) => (
          <Link className="admin-home-card" to={card.path} key={card.path}>
            <span className="admin-home-card__icon">
              <i className={`fas ${card.icon}`}></i>
            </span>

            <div>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>

            <strong>
              {card.action}
              <i className="fas fa-arrow-right"></i>
            </strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default AdminHomePage;
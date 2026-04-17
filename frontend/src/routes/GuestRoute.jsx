import { Navigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import { routeByRole } from '../features/auth/routeByRole';

function GuestRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <div className="status-card">Preparing the page...</div>;
  }

  if (isAuthenticated && user) {
    return <Navigate replace to={routeByRole(user.role)} />;
  }

  return children;
}

export default GuestRoute;

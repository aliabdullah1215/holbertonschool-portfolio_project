import { Navigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import { routeByRole } from '../features/auth/routeByRole';

function ProtectedRoute({ allowedRole, children }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <div className="status-card">Checking your session...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate replace to="/login" />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate replace to={routeByRole(user.role)} />;
  }

  return children;
}

export default ProtectedRoute;

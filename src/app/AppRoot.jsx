import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../context/AuthContext';
import AppRoutes from '../routes/AppRoutes';

function AppRoot() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoot;

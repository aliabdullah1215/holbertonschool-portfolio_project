import { createContext, useEffect, useState } from 'react';
import {
  clearAuthStorage,
  getStoredAccessToken,
  getStoredRefreshToken,
  getStoredUser,
  setAuthStorage,
} from '../features/auth/authStorage';
import {
  fetchCurrentUser,
  loginUser,
  refreshAccessToken,
  registerUser,
} from '../features/auth/authService';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function hydrateAuth() {
      const accessToken = getStoredAccessToken();
      const refreshToken = getStoredRefreshToken();

      if (!accessToken) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const currentUser = await fetchCurrentUser();

        if (isMounted) {
          setUser(currentUser);
          setAuthStorage({
            access: accessToken,
            refresh: refreshToken,
            user: currentUser,
          });
        }
      } catch {
        try {
          const { access, refresh } = await refreshAccessToken();
          const currentUser = await fetchCurrentUser();

          if (isMounted) {
            setUser(currentUser);
            setAuthStorage({
              access,
              refresh: refresh || refreshToken,
              user: currentUser,
            });
          }
        } catch {
          clearAuthStorage();

          if (isMounted) {
            setUser(null);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    hydrateAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleRegister(payload) {
    return registerUser(payload);
  }

  async function handleLogin(credentials) {
    const result = await loginUser(credentials);
    setUser(result.user);
    return result.user;
  }

  function handleLogout() {
    clearAuthStorage();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
export { AuthContext };

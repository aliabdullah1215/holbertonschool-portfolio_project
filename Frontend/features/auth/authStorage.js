const ACCESS_TOKEN_KEY = 'data_diet_access_token';
const REFRESH_TOKEN_KEY = 'data_diet_refresh_token';
const USER_KEY = 'data_diet_user';

export function getStoredAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getStoredUser() {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    clearAuthStorage();
    return null;
  }
}

export function setAuthStorage({ access, refresh, user }) {
  if (typeof access === 'string') {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
  }

  if (typeof refresh === 'string') {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }

  if (user !== undefined) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function clearAuthStorage() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

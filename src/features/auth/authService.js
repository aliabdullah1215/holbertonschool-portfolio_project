import api from '../../api/axios';
import {
  clearAuthStorage,
  getStoredRefreshToken,
  getStoredUser,
  setAuthStorage,
} from './authStorage';

export async function registerUser(payload) {
  const response = await api.post('users/register/', payload);
  return response.data;
}

export async function loginUser(credentials) {
  const tokenResponse = await api.post('token/', credentials);
  const { access, refresh } = tokenResponse.data;

  setAuthStorage({
    access,
    refresh,
    user: null,
  });

  try {
    const user = await fetchCurrentUser();

    setAuthStorage({
      access,
      refresh,
      user,
    });

    return { access, refresh, user };
  } catch (error) {
    clearAuthStorage();
    throw error;
  }
}

export async function fetchCurrentUser() {
  const response = await api.get('users/me/');
  return response.data;
}

export async function refreshAccessToken() {
  const refresh = getStoredRefreshToken();

  if (!refresh) {
    throw new Error('Missing refresh token');
  }

  const response = await api.post('token/refresh/', { refresh });
  setAuthStorage({
    access: response.data.access,
    refresh,
    user: getStoredUser(),
  });
  return response.data;
}

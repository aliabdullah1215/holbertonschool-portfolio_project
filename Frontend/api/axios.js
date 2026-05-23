import axios from 'axios';
import {
    clearAuthStorage,
    getStoredAccessToken,
    getStoredRefreshToken,
    getStoredUser,
    setAuthStorage,
} from '../features/auth/authStorage';

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to inject the JWT access token
api.interceptors.request.use((config) => {
    const token = getStoredAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Response interceptor to handle token refresh logic
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = getStoredRefreshToken();

        // Check if error is 401 (Unauthorized) and we have a refresh token
        if (
            error.response?.status === 401 &&
            refreshToken &&
            !originalRequest?._retry &&
            !originalRequest?.url?.includes('users/login/') // Updated to match your login path
        ) {
            originalRequest._retry = true;

            try {
                // IMPORTANT: Ensure this path matches your Django JWT refresh URL
                // If using SimpleJWT default views, it might be 'token/refresh/' or similar
                const refreshResponse = await axios.post(
                    `${API_BASE_URL}token/refresh/`,
                    { refresh: refreshToken }
                );

                const nextAccessToken = refreshResponse.data.access;
                const nextRefreshToken = refreshResponse.data.refresh || refreshToken;

                setAuthStorage({
                    access: nextAccessToken,
                    refresh: nextRefreshToken,
                    user: getStoredUser(),
                });

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh fails, log out the user
                clearAuthStorage();
                window.location.href = '/login'; // Redirect to login screen
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
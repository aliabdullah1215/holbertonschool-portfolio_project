import axios from 'axios';
import {
    clearAuthStorage,
    getStoredAccessToken,
    getStoredRefreshToken,
    getStoredUser,
    setAuthStorage,
} from '../features/auth/authStorage';

const api = axios.create({
    // Use port 8000 to match the Django backend
    baseURL: 'http://localhost:8000/api/', 
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
                    'http://localhost:8000/api/token/refresh/', 
                    { refresh: refreshToken }
                );

                const nextAccessToken = refreshResponse.data.access;

                // Update the storage with the new access token
                setAuthStorage({
                    access: nextAccessToken,
                    refresh: refreshToken,
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
import axios from "axios";
import { BASE_URL, AUTH } from "../constants/API_ENDPOINTS";

// creating an instance of axios with baseURL


const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // enable credentials with each request/response
    headers: {
        'Content-Type': 'application/json', // Default content type for requests
        // 'Authorization': `Bearer ${accessToken}`, // Default authorization header
    },
});

API.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('access-token');
        if (accessToken) {
            config.headers.Authorization = `Bearer${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const refreshTokenLocal = localStorage.getItem('refresh-token');
        if (error.response && error.response.status === 401) {
            try {
                const refreshResponse = await axios.post(BASE_URL + AUTH.POST_REFRESH_TOKEN, {
                    refreshToken: refreshTokenLocal,
                });

                const { accessToken, refreshToken } = refreshResponse.data;
                localStorage.setItem('access-token', accessToken);
                localStorage.setItem('refresh-token', refreshToken);

                // Retry the original request with the new access token
                const originalRequest = error.config;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return API(originalRequest);
            } catch (refreshError) {
                // Handle refresh token error (e.g., logout)
                console.error('Refresh token error:', refreshError);
                localStorage.removeItem('access-token');
                localStorage.removeItem('refresh-token');
                window.location.href = '/';
            }
        }

        return Promise.reject(error);
    }
);


export default API;
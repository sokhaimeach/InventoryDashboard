import { getAccessToken } from '@/utils/tokenStorage';
import axios from 'axios';

// Base URL for the API, read from environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use((config) => {
        const token = getAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use((response) => {
    return response.data; // Normalize response to return data
}, (error) => {
    if (error.response) {
        const { status } = error.response;
        if (status === 401) {
            console.error("Unauthorized, redirecting to login...");
        }

        if (status === 500) {
            console.error("Server error: ",  "An error occurred on the server.");
        }
    }

    return Promise.reject(error);
});

export default api;
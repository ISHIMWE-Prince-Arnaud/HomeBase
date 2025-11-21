import axios from "axios";

// Base URL from environment or default to localhost
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important for HTTP-only cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized (e.g., redirect to login if needed, though React Query usually handles this via state)
    if (error.response?.status === 401) {
      // Optional: Trigger a global event or just let the caller handle it
      console.warn("Unauthorized access");
    }
    return Promise.reject(error);
  }
);

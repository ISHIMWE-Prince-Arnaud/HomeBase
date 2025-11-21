import { api } from "@/api/client";
import type { LoginInput, RegisterInput } from "./schema";

export interface User {
  id: number;
  email: string;
  name: string;
  profileImage?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export const authApi = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    // If backend has a logout endpoint (for clearing cookies), call it.
    // Otherwise, just client-side cleanup.
    // Assuming backend might have one, or we just rely on client.
    // Based on backend analysis, there isn't a specific logout endpoint that clears cookies if we use JWT in headers,
    // but if we use cookies, we might need one.
    // For now, we'll just return resolved.
    return Promise.resolve();
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>("/auth/profile");
    return response.data;
  },
};

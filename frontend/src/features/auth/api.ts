import { api } from "@/api/client";
import type { LoginInput, RegisterInput } from "./schema";

export interface User {
  id: number;
  email: string;
  name: string;
  profileImage?: string;
}

export interface AuthResponse {
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
    await api.post("/auth/logout");
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>("/auth/users/me");
    return response.data;
  },
};

import { api } from "@/api/client";
import type { CreateChoreInput, UpdateChoreInput } from "./schema";
import type { User } from "../auth/api";

export interface Chore {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  isComplete: boolean;
  householdId: number;
  assignedToId?: number;
  assignedTo?: User;
  createdAt: string;
  updatedAt: string;
}

export const choresApi = {
  getAll: async (): Promise<Chore[]> => {
    const response = await api.get<Chore[]>("/chores");
    return response.data;
  },

  getOne: async (id: number): Promise<Chore> => {
    const response = await api.get<Chore>(`/chores/${id}`);
    return response.data;
  },

  create: async (data: CreateChoreInput): Promise<Chore> => {
    const response = await api.post<Chore>("/chores", data);
    return response.data;
  },

  update: async (id: number, data: UpdateChoreInput): Promise<Chore> => {
    const response = await api.patch<Chore>(`/chores/${id}`, data);
    return response.data;
  },

  complete: async (id: number): Promise<Chore> => {
    const response = await api.patch<Chore>(`/chores/${id}/complete`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/chores/${id}`);
  },
};

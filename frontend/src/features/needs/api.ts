import { api } from "@/api/client";
import type { CreateNeedInput, MarkPurchasedInput, UpdateNeedInput } from "./schema";

export interface Need {
  id: number;
  name: string;
  quantity?: string;
  category?: string;
  isPurchased: boolean;
  householdId: number;
  addedById: number;
  purchasedAt?: string;
  purchasedById?: number;
  createdAt: string;
  updatedAt: string;
}

export const needsApi = {
  getAll: async () => {
    const response = await api.get<Need[]>("/needs");
    return response.data;
  },
  create: async (data: CreateNeedInput) => {
    const response = await api.post<Need>("/needs", data);
    return response.data;
  },
  update: async (id: number, data: UpdateNeedInput) => {
    const response = await api.patch<Need>(`/needs/${id}`, data);
    return response.data;
  },
  markPurchased: async (id: number, data: MarkPurchasedInput) => {
    const response = await api.patch<Need>(`/needs/${id}/purchase`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/needs/${id}`);
  },
};

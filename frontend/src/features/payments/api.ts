import { api } from "@/api/client";
import type { CreatePaymentInput } from "./schema";

export interface Payment {
  id: number;
  fromUserId: number;
  toUserId: number;
  amount: number;
  householdId: number;
  createdAt: string;
}

export const paymentsApi = {
  getAll: async () => {
    const response = await api.get<Payment[]>("/payments");
    return response.data;
  },
  create: async (data: CreatePaymentInput) => {
    const response = await api.post<Payment>("/payments", data);
    return response.data;
  },
};

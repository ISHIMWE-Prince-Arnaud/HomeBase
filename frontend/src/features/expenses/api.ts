import { api } from "@/api/client";
import type { CreateExpenseInput } from "./schema";

export interface Expense {
  id: number;
  description: string;
  totalAmount: number;
  date: string;
  paidById: number;
  householdId: number;
  createdAt: string;
  updatedAt: string;
  // We might want to expand this with splits if needed for display
}

export interface Balance {
  [userId: number]: number; // Positive means they are owed, negative means they owe
}

export interface Settlement {
  fromUserId: number;
  toUserId: number;
  amount: number;
}

export const expensesApi = {
  getAll: async () => {
    const response = await api.get<Expense[]>("/expenses");
    return response.data;
  },
  create: async (data: CreateExpenseInput) => {
    const response = await api.post<Expense>("/expenses", data);
    return response.data;
  },
  getBalance: async () => {
    const response = await api.get<Balance>("/expenses/balance");
    return response.data;
  },
  getSettlements: async () => {
    const response = await api.get<Settlement[]>("/expenses/settlements");
    return response.data;
  },
};

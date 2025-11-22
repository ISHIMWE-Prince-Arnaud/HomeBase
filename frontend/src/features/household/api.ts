import { api } from "@/api/client";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Household {
  id: number;
  name: string;
  currency: string;
  members: User[];
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export const householdApi = {
  getMyHousehold: async () => {
    const response = await api.get<Household>("/households/me");
    return response.data;
  },
};

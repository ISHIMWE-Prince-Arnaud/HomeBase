import { api } from "@/api/client";
import type { CreateHouseholdInput, JoinHouseholdInput } from "./schema";

export interface HouseholdMember {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
}

export interface Household {
  id: number;
  name: string;
  currency: string;
  members: HouseholdMember[];
  ownerId: number;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
}

export const householdApi = {
  getMyHousehold: async () => {
    const response = await api.get<Household>("/households/me");
    return response.data;
  },
  create: async (data: CreateHouseholdInput) => {
    const response = await api.post<Household>("/households", data);
    return response.data;
  },
  join: async (data: JoinHouseholdInput) => {
    const response = await api.post<Household>("/households/join", data);
    return response.data;
  },
  leave: async () => {
    await api.post("/households/leave");
  },
};

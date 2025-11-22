import { z } from "zod";

export const createHouseholdSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
});

export const joinHouseholdSchema = z.object({
  inviteCode: z
    .string()
    .min(8, "Invite code must be at least 8 characters")
    .max(12, "Invite code must be at most 12 characters")
    .regex(/^[A-Z0-9]+$/, "Invite code must be uppercase letters and numbers"),
});

export type CreateHouseholdInput = z.infer<typeof createHouseholdSchema>;
export type JoinHouseholdInput = z.infer<typeof joinHouseholdSchema>;

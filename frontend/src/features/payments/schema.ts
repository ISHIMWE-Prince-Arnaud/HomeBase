import { z } from "zod";

export const createPaymentSchema = z.object({
  toUserId: z.coerce.number().min(1, "Recipient is required"),
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;

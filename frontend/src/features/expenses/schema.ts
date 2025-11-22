import { z } from "zod";

export const createExpenseSchema = z.object({
  description: z.string().min(1, "Description is required"),
  totalAmount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  date: z.string().optional(), // ISO date string
  paidById: z.coerce.number().min(1, "Payer is required"),
  participants: z
    .array(z.number())
    .min(1, "At least one participant is required"),
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;

import { z } from "zod";

export const createNeedSchema = z.object({
  name: z.string().min(1, "Name is required").max(120, "Name is too long"),
  quantity: z.string().max(60, "Quantity is too long").optional(),
  category: z.string().max(40, "Category is too long").optional(),
});

export const updateNeedSchema = createNeedSchema.partial();

export const markPurchasedSchema = z
  .object({
    createExpense: z.boolean().optional(),
    amount: z.coerce
      .number()
      .min(1, "Amount must be at least 1")
      .optional()
      .or(z.literal(0)), // Allow 0 if not creating expense, but validation logic below handles the dependency
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.createExpense && (!data.amount || data.amount <= 0)) {
        return false;
      }
      return true;
    },
    {
      message: "Amount is required when creating an expense",
      path: ["amount"],
    }
  );

export type CreateNeedInput = z.infer<typeof createNeedSchema>;
export type UpdateNeedInput = z.infer<typeof updateNeedSchema>;
export type MarkPurchasedInput = z.infer<typeof markPurchasedSchema>;

import { z } from "zod";

export const createChoreSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100),
  description: z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    z.string().optional()
  ),
  dueDate: z
    .preprocess(
      (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
      z.string().optional()
    )
    .refine((val) => {
      if (!val) return true;
      const date = new Date(val);
      return !isNaN(date.getTime()) && date.getTime() > Date.now();
    }, "Due date must be in the future"),
  assignedToId: z.coerce.number().optional(), // coerce because select inputs might return strings
});

export const updateChoreSchema = z.object({
  title: z.string().min(2).max(100).optional(),
  description: z.string().optional(),
  isComplete: z.boolean().optional(),
  dueDate: z.string().optional(),
  assignedToId: z.number().nullable().optional(),
});

export type CreateChoreInput = z.infer<typeof createChoreSchema>;
export type UpdateChoreInput = z.infer<typeof updateChoreSchema>;

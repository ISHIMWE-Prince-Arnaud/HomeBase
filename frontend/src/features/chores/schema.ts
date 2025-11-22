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
  title: z.string().min(2).max(100).optional(), // Added title/desc to update schema as backend allows full update via PATCH if needed, though backend DTO only showed specific fields, the controller uses UpdateChoreDto which usually allows partials. Wait, backend UpdateChoreDto ONLY has isComplete, dueDate, assignedToId. Let's check if I missed something.
  // Re-reading backend UpdateChoreDto: isComplete, dueDate, assignedToId.
  // However, usually users want to update title/desc too.
  // Let's stick to what the backend DTO explicitly defined for now to avoid 400s,
  // BUT the backend controller `update` method takes `UpdateChoreDto`.
  // Let's look at `UpdateChoreDto` again.
  // It has `isComplete`, `dueDate`, `assignedToId`.
  // It does NOT have title or description.
  // This seems like a backend limitation or design choice.
  // I will implement the schema based on the backend DTO.
  isComplete: z.boolean().optional(),
  dueDate: z.string().optional(),
  assignedToId: z.number().nullable().optional(),
});

export type CreateChoreInput = z.infer<typeof createChoreSchema>;
export type UpdateChoreInput = z.infer<typeof updateChoreSchema>;

// src/schemas/profileSchema.ts
import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(300, "Bio can't be longer than 300 characters").optional(),
  location: z.string().optional(),
});

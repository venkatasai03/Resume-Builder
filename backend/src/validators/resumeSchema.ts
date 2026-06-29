import z from "zod";

export const resumeSchema = z.object({
  name: z.string().min(5).max(15),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number"),
  linkedin: z.string().url(),
  summary: z.string().min(25).max(500),
  skills: z.array(z.string()).min(1),
  experience: z.array(
    z.object({
      jobTitle: z.string(),
      company: z.string(),
      location: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      responsibilities: z.array(z.string()),
    }),
  ),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      graduationYear: z.string(),
    }),
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      technologies: z.string(),
    }),
  ),
  template: z.string(),
});

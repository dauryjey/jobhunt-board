import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";

export const validator = withZod(z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters long."),
  company: z.string().trim().min(1, "Company name is required"),
  location: z.string().trim().min(1, "Location is required"),
  description: z.string().trim().min(10, "Description is required"),
  requirements: z.string().min(1, "You should put at least one requirement.")
}))
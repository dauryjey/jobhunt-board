import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";

export const validator = withZod(
  z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Must be a valid email"),
    password: z.string().trim().min(1, "Password is required"),
  })
);

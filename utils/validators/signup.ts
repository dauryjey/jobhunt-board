import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";

export const validator = withZod(
  z
    .object({
      firstName: z.string().trim().min(1, "First name is required"),
      lastName: z.string().trim().min(1, "Last name is required"),
      email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Must be a valid email"),
      password: z
        .string()
        .trim()
        .min(1, "Password is required")
        .refine(
          (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password),
          {
            message:
              "The password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.",
          }
        ),
      confirmPassword: z.string().trim().min(1, "Confirm password is required"),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
);

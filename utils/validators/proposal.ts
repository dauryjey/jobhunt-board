import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";

export const validator = withZod(
  z.object({
    proposal: z
      .string()
      .trim()
      .min(200, "Your cover letter is too short")
      .max(1000, "Your cover letter is too long."),
  })
);

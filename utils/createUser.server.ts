import bcrypt from "bcryptjs";
import { db } from "utils/db.server";
import { authenticator } from "./auth.server";
import { validationError } from "remix-validated-form";
export const createUser = async (request: Request, isEmployer: boolean) => {
  const form = await request.clone().formData();

  const [fname, lname, email, password, description] = [
    form.get("fname") as string,
    form.get("lname") as string,
    form.get("email") as string,
    form.get("password") as string,
    form.get("description") as string,
  ];

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    if (isEmployer) {
      await db.employer.create({
        data: {
          fname,
          lname,
          email,
          password: hashedPassword,
        },
      });

      return await authenticator.authenticate("form", request, {
        successRedirect: "/",
        context: { FormData: form },
      });
    } else {
      await db.user.create({
        data: {
          fname,
          lname,
          email,
          password: hashedPassword,
          description,
        },
      });
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "PrismaClientKnownRequestError"
    ) {
      return validationError({
        formId: "authForm",
        fieldErrors: {
          email: "Email already exists",
        },
      });
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

import bcrypt from "bcryptjs";
import { db } from "utils/db.server";
import { authenticator } from "./auth.server";
import { validationError } from "remix-validated-form";

export const createUser = async (request: Request, isEmployer: boolean) => {
  const form = await request.clone().formData();

  /* 
  The use of "as" is necessitated by form.get(), which returns "FormDataEntryValue | null." 
  However, remix form validation ensures that every field invariably contains a string.
  */

  const [firstName, lastName, email, password] = [
    form.get("firstName") as string,
    form.get("lastName") as string,
    form.get("email") as string,
    form.get("password") as string,
    form.get("description") as string,
  ];

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    if (isEmployer) {
      await db.employer.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });
    }

    await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return await authenticator.authenticate("form", request, {
      successRedirect: "/jobs",
      throwOnError: true,
      context: { FormData: form },
    });
  } catch (error) {
    if (error instanceof Response) return error;

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
    }

    return console.error(error);
  }
};

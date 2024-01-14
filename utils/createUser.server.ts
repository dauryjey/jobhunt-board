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

  const [fname, lname, email, password, description] = [
    form.get("fname") as string,
    form.get("lname") as string,
    form.get("email") as string,
    form.get("password") as string,
    form.get("description") as string,
  ];

  let error: unknown = undefined;

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
    }

    await db.user.create({
      data: {
        fname,
        lname,
        email,
        password: hashedPassword,
        description,
      },
    });
  } catch (err) {
    error = err;
    /* 
      The returned validationError is intended for utilization by the Remix form validation library, subsequently displayed on the frontend.
    */
    if (err instanceof Error && err.name === "PrismaClientKnownRequestError") {
      return validationError({
        formId: "authForm",
        fieldErrors: {
          email: "Email already exists",
        },
      });
    }

    console.error(err);
  }

  if (!error) {
    // If the authenticator is not returned in here, the catch block will interpret it as an error.
    return await authenticator.authenticate("form", request, {
      successRedirect: "/jobs",
      context: { FormData: form },
    });
  }
};

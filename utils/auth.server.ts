import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcryptjs";
import { db } from "utils/db.server";
import { Employer, User } from "@prisma/client";
import { validationError } from "remix-validated-form";

export const authenticator = new Authenticator<User | Employer | Error | null>(
  sessionStorage
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email: string = form.get("email") as string;
    const password: string = form.get("password") as string;
    const isEmployer: string = form.get("isEmployer") as string;

    let user: User | Employer | null = null;

    if (isEmployer === "on") {
      user = await db.employer.findUnique({
        where: {
          email,
        },
      });
    }
    user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      validationError({
        formId: "authForm",
        fieldErrors: {
          email: "The email entered is wrong",
        },
      });
      throw new AuthorizationError();
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      console.log("The password entered is wrong.");
      throw new AuthorizationError();
    }

    return user;
  })
);

import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcryptjs";
import { db } from "utils/db.server";
import { User } from "@prisma/client";

export const authenticator = new Authenticator<User | Error | null>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.log("The email entered is wrong.");
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

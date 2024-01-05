import bcrypt from "bcryptjs";
import { db } from "utils/db.server";
import { authenticator } from "./auth.server";

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
  
  if (isEmployer) {
    await db.employer.create({
      data: {
        fname,
        lname,
        email,
        password: hashedPassword,
      },
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

  return await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: isEmployer ? "/signup/employer" : "/signup/user",
    context: { FormData: form },
  });
};

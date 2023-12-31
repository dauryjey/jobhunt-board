import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { authenticator } from "utils/auth.server";
import { db } from "utils/db.server";
import { AuthForm } from "~/components/Auth/AuthForm";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  return user;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.clone().formData();
  const fname = form.get("fname") as string;
  const lname = form.get("lname") as string;
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      fname,
      lname,
      email,
      password: hashedPassword,
    },
  });

  return await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/auth/signup",
    context: { FormData: form },
  });
};

export default function Signup() {
  const inputs: authInputs[] = [
    { name: "fname", value: "First name", type: "text", required: true },
    { name: "lname", value: "Last name", type: "text", required: true },
    {
      name: "email",
      value: "Email",
      type: "text",
      required: true,
      addon: "✉️",
    },
    {
      name: "password",
      value: "Password",
      type: "password",
      required: true,
      addon: "🔒",
    },
    {
      name: "repeat-password",
      value: "Repeat password",
      type: "password",
      required: true,
      addon: "🔒",
    },
  ];

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-5">
      <AuthForm inputs={inputs} title="Sign up" />
    </main>
  );
}

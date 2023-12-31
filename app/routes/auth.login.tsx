import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "utils/auth.server";
import { AuthForm } from "~/components/Auth/AuthForm";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  return user;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/auth/login"
  });
};

export default function Login() {
  const inputs: authInputs[] = [
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
  ];

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-5">
      <AuthForm inputs={inputs} title="Log In" />
    </main>
  );
}

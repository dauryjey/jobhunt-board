import { ActionFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Checkbox, Label } from "flowbite-react";
import { validationError } from "remix-validated-form";
import { authenticator } from "utils/auth.server";
import { validator } from "utils/validators/login";
import { AuthForm } from "~/components/Auth/AuthForm";
import { inputs } from "~/data/loginForm";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    return await authenticator.authenticate("form", request, {
      successRedirect: "/jobs",
      failureRedirect: "/login",
    });
  } catch (error) {
    console.error("Authentication Error:", error);

    return validationError({
      formId: "authForm",
      fieldErrors: {
        password:
          "Please verify that your email and password are accurate, or confirm the existence of your user account.",
      },
    });
  }
};

export default function Login() {
  return (
    <section className="flex flex-col justify-center items-center gap-5">
      <AuthForm inputs={inputs} title="Log In" validator={validator} action="/login">
        <div>
          <Checkbox name="isEmployer" id="isEmployer" />
          <Label htmlFor="isEmployer" className="ml-2">
            I&apos;m an employer
          </Label>
        </div>
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link to="/signup/user" className="text-blue-500 hover:text-blue-700">
            Sign up
          </Link>
        </p>
      </AuthForm>
    </section>
  );
}

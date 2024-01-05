import { ActionFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { authenticator } from "utils/auth.server";
import { AuthForm } from "~/components/Auth/AuthForm";
import { inputs } from "~/data/loginForm";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};

export default function Login() {
  return (
    <section className="flex flex-col justify-center items-center h-screen gap-5">
      <AuthForm inputs={inputs} title="Log In">
        <div>
          <input type="checkbox" name="isEmployer" id="isEmployer" />
          <label htmlFor="isEmployer" className="ml-2">I&apos;m an employer</label>
        </div>
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign up
          </Link>
        </p>
      </AuthForm>
    </section>
  );
}

import { ActionFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { createUser } from "utils/createUser.server";
import { AuthForm } from "~/components/Auth/AuthForm";
import { inputs } from "~/data/signupForm";
import { validator } from "utils/validators/signup";

export const action = async ({ request }: ActionFunctionArgs) => {
  return createUser(request, false);
};

export default function Signup() {
  return (
    <section className="md:w-1/4">
      <AuthForm inputs={inputs} title="Sign up" validator={validator} />
      <p className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
          Log in
        </Link>
      </p>
      <p className="text-center">
        <Link
          to="/signup/employer"
          className="text-blue-500 hover:text-blue-700"
        >
          Sign up as employer
        </Link>
      </p>
    </section>
  );
}

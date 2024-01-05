import { ActionFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { createUser } from "utils/createUser.server";
import { AuthForm } from "~/components/Auth/AuthForm";
import { inputs } from "~/data/signupForm";

export const action = async ({ request }: ActionFunctionArgs) => {
  return createUser(request, true)
};

export default function EmployerSignUp() {
  return (
    <section>
      <AuthForm inputs={inputs} title="Sign up as employer">
        <p className="text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700"
          >
            Log in
          </Link>
        </p>
        <p className="text-center">
          <Link
            to="/signup/user"
            className="text-blue-500 hover:text-blue-700"
          >
            Sign up as job hunter
          </Link>
        </p>
      </AuthForm>
    </section>
  );
}

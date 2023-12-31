import { ActionFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { createUser } from "utils/createUser.server";
import { AuthForm } from "~/components/Auth/AuthForm";
import { inputs } from "~/data/signupForm";
import { validator } from "utils/validators/signup";
import { validationError } from "remix-validated-form";

export const action = async ({ request }: ActionFunctionArgs) => {
  const result = await validator.validate(await request.clone().formData());

  if (result.error) {
    return validationError(result.error);
  }

  return createUser(request, true);
};

export default function EmployerSignUp() {
  return (
    <section className="md:w-1/4">
      <AuthForm
        inputs={inputs}
        title="Sign up as employer"
        validator={validator}
      >
        <input
          type="checkbox"
          name="isEmployer"
          id="isEmployer"
          hidden
          defaultChecked
        />
      </AuthForm>
      <p className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
          Log in
        </Link>
      </p>
      <p className="text-center">
        <Link to="/signup/user" className="text-blue-500 hover:text-blue-700">
          Sign up as job hunter
        </Link>
      </p>
    </section>
  );
}

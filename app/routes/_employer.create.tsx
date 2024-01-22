import { Employer, User } from "@prisma/client";
import { useActionData, useNavigation } from "@remix-run/react";
import { Button, Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi/index.js";
import { ActionFunctionArgs } from "react-router";
import { redirect } from "remix-typedjson";
import { ValidatedForm, useIsValid, validationError } from "remix-validated-form";
import { authenticator } from "utils/auth.server";
import { db } from "utils/db.server";
import { validator } from "utils/validators/job";
import { FormInput } from "~/components/Common/Input/FormInput";
import { Loading } from "~/components/Common/Message/Loading";
import { Title } from "~/components/Common/Title/Title";
import { jobInput } from "~/data/jobForm";

export const action = async ({ request }: ActionFunctionArgs) => {
  const user: User | Employer | null = await authenticator.isAuthenticated(
    request
  );

  const result = await validator.validate(await request.clone().formData());
  
  
  if (result.error) {
    return validationError(result.error);
  }

  const form = await request.formData();

  const [title, company, location, description, requirements] = [
    form.get("title") as string,
    form.get("company") as string,
    form.get("location") as string,
    form.get("description") as string,
    form.get("requirements")?.toString().split(", ")
  ];

  if (user && form) {
    try {
      await db.job.create({
        data: {
          title,
          company,
          location,
          description,
          requirements,
          employerId: user.id
        }
      });
  
      return redirect("/dashboard");
    } catch (err) {
      console.error(err);
      return { err };
    }
  } else {
    return redirect("/")
  }

};

export default function CreateJob () {
  const error = useActionData<typeof action>();

  const isFormValid = useIsValid("authForm");
  const { state } = useNavigation();

  return (
    <>
      <main className="flex flex-col justify-center items-center gap-4">
        <section className="mt-2">
          <Title title="Create job" />
        </section>
        <ValidatedForm
          id="jobUpdate"
          method="put"
          validator={validator}
          className="grid gap-4 w-[300px]"
        >
          {jobInput.map((input) => (
            <FormInput key={input.name} {...input} />
          ))}
          <Button
            type="submit"
            color="blue"
            pill
            disabled={!isFormValid || state === "loading"}
          >
            Submit
          </Button>

          <Loading state={state} />
        </ValidatedForm>
        {error && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              It seems something went wrong. Please try again.
            </div>
            <Toast.Toggle />
          </Toast>
        )}
      </main>
    </>
)}
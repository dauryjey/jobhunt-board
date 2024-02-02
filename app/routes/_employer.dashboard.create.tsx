import { Employer, User } from "@prisma/client";
import { useActionData, useNavigation } from "@remix-run/react";
import { Button } from "flowbite-react";
import { ActionFunctionArgs } from "react-router";
import { redirect } from "remix-typedjson";
import { ValidatedForm, useIsValid, validationError } from "remix-validated-form";
import { authenticator } from "utils/auth.server";
import { db } from "utils/db.server";
import { validator } from "utils/validators/job";
import { FormInput } from "~/components/Common/Input/FormInput";
import { Loading } from "~/components/Common/Message/Loading";
import { ErrorToast } from "~/components/Common/Toast/Error";
import { EMPLOYER_DASHBOARD, HOME } from "~/const/routes";
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
  
      return redirect(EMPLOYER_DASHBOARD);
    } catch (err) {
      console.error(err);
      return { err };
    }
  } else {
    return redirect(HOME)
  }

};

export default function CreateJob () {
  const error = useActionData<typeof action>();

  const isFormValid = useIsValid("authForm");
  const { state } = useNavigation();

  return (
    <>
      <section className="flex flex-col gap-4 w-full order-1 xl:order-3 xl:ml-10">
        <section>
        <span className="font-semibold text-2xl">Create</span>
        </section>
        <ValidatedForm
          id="jobUpdate"
          method="put"
          validator={validator}
          className="grid gap-4 w-[300px]"
          defaultValues={{}}
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
        <ErrorToast error={error} />
      </section>
    </>
)}
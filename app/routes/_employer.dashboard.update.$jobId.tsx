import { Employer, Job, User } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { Button } from "flowbite-react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { ValidatedForm, useIsValid } from "remix-validated-form";
import { authenticator } from "utils/auth.server";
import { db } from "utils/db.server";
import { validator } from "utils/validators/job";
import { FormInput } from "~/components/Common/Input/FormInput";
import { jobInput } from "~/data/jobForm";
import { Loading } from "~/components/Common/Message/Loading";
import { validateForm } from "utils/validateForm.server";
import { ErrorToast } from "~/components/Common/Toast/Error";
import { EMPLOYER_DASHBOARD } from "~/const/routes";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const validatorErr = await validateForm(request, validator);

  if (validatorErr) return validatorErr;

  const form = await request.formData();

  const [id, title, company, location, description, requirements] = [
    params.jobId as string,
    form.get("title") as string,
    form.get("company") as string,
    form.get("location") as string,
    form.get("description") as string,
    form.get("requirements")?.toString().split(", "),
  ];

  try {
    await db.job.update({
      where: {
        id,
      },
      data: {
        title,
        company,
        location,
        description,
        requirements,
      },
    });

    return redirect(EMPLOYER_DASHBOARD);
  } catch (err) {
    console.error(err);
    return { err };
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const user: User | Employer | null = await authenticator.isAuthenticated(
    request
  );

  const jobId = params.jobId;

  if (user && user.role === "employer" && jobId) {
    const job: Job | null = await db.job.findUnique({
      where: {
        id: jobId,
        employerId: user.id,
      },
    });

    if (!job) {
      return redirect(EMPLOYER_DASHBOARD);
    }

    return typedjson({ job });
  }

  return redirect(EMPLOYER_DASHBOARD);
};

export default function UpdateJob() {
  const { job } = useTypedLoaderData<typeof loader>();
  const error = useActionData<typeof action>();

  const isFormValid = useIsValid("authForm");
  const { state } = useNavigation();

  return (
    <>
      <section className="flex flex-col gap-4 w-full order-1 xl:order-3 xl:ml-10">
        <div>
          <span className="font-semibold text-2xl">Update</span>
        </div>
        <ValidatedForm
          id="jobUpdate"
          method="put"
          validator={validator}
          defaultValues={{
            title: job?.title,
            company: job?.company,
            location: job?.location,
            description: job?.description,
            requirements: job?.requirements.join(", "),
          }}
          className="grid gap-4 w-[300px] self-center xl:self-start"
        >
          {jobInput.map((input) => (
            <FormInput key={input.name} {...input} />
          ))}
          <Button
            type="submit"
            color="blue"
            disabled={!isFormValid || state === "loading"}
          >
            Submit
          </Button>

          <Loading state={state} />
        </ValidatedForm>
        <ErrorToast error={error} />
      </section>
    </>
  );
}

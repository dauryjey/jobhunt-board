import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { Badge, Button } from "flowbite-react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { ValidatedForm, useIsValid } from "remix-validated-form";
import { authenticator } from "utils/auth.server";
import { checkJobExistence } from "utils/db.checkJobExistence.server";
import { db } from "utils/db.server";
import { findUserJobApplication } from "utils/findUserJobApplication.server";
import { validateForm } from "utils/validateForm.server";
import { validator } from "utils/validators/proposal";
import { FormInput } from "~/components/Common/Input/FormInput";
import { ErrorToast } from "~/components/Common/Toast/Error";
import { HOME, LOGIN } from "~/const/routes";
import { proposalForm } from "~/data/proposalForm";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: LOGIN,
  });

  const { id } = user;

  const jobId = params.jobId;

  if (!user) {
    return redirect(LOGIN);
  }

  if (!jobId || user.role === "employer") {
    return redirect(HOME);
  }

  const doesJobExist = await checkJobExistence(params);

  if (!doesJobExist) {
    return redirect(HOME);
  }

  const hasAppliedForJob = await findUserJobApplication({
    jobId,
    userId: id,
  });

  return typedjson({
    doesJobExist,
    hasAppliedForJob,
  });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const validatorErr = await validateForm(request, validator);

  if (validatorErr) return validatorErr;

  const form = await request.formData();
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect(HOME);
  }

  const { id } = user;
  const jobId = params.jobId as string;

  const proposal = form.get("proposal") as string;

  try {
    await db.application.create({
      data: {
        message: proposal,
        userId: id,
        jobId,
      },
    });

    return null;
  } catch (err) {
    console.error(err);
    return { err };
  }
};

export default function JobPost() {
  const { doesJobExist, hasAppliedForJob } =
    useTypedLoaderData<typeof loader>();
  const { job } = doesJobExist;
  const error = useActionData<typeof action>();
  const isFormValid = useIsValid("proposalForm");

  const { state } = useNavigation();

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Job Details</h2>
      </div>

      <section className="bg-gray-100 rounded-xl p-6">
        <h2 className="text-2xl font-medium mb-2">
          {job.title.toLocaleUpperCase()}
        </h2>
        <small className="block text-gray-600 mb-4">{job.company}</small>
        <p className="mb-4">{job.description}</p>

        <div className="flex flex-wrap gap-2">
          {job.requirements.map((requirement: string, idx: number) => (
            <Badge key={idx} color="dark">
              {requirement}
            </Badge>
          ))}
        </div>
      </section>

      <section className="mt-8">
        {hasAppliedForJob ? (
          <>
            <h2 className="text-3xl font-semibold mb-4">Your Application</h2>
            <div className="max-w-2xl overflow-hidden">
              <p className="mb-4">{hasAppliedForJob.message}</p>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <span className="text-3xl font-semibold">
                Send Your Cover Letter
              </span>
            </div>
            <ValidatedForm
              validator={validator}
              className="mt-2"
              id="proposalForm"
              name="proposalForm"
              method="post"
            >
              <FormInput {...proposalForm} />
              <Button
                color="blue"
                className="mt-4"
                disabled={!isFormValid || state === "loading"}
                type="submit"
              >
                Send Application
              </Button>
            </ValidatedForm>
            <ErrorToast error={error} />
          </>
        )}
      </section>
    </>
  );
}

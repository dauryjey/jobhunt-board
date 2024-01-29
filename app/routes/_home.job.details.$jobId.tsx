import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { Badge, Button } from "flowbite-react";
import { redirect, useTypedLoaderData } from "remix-typedjson";
import {
  ValidatedForm,
  useIsValid,
} from "remix-validated-form";
import { authenticator } from "utils/auth.server";
import { checkJobExistence } from "utils/db.checkJobExistence.server";
import { db } from "utils/db.server";
import { validateForm } from "utils/validateForm.server";
import { validator } from "utils/validators/proposal";
import { FormInput } from "~/components/Common/Input/FormInput";
import { ErrorToast } from "~/components/Common/Toast/Error";
import { proposalForm } from "~/data/proposalForm";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const doesJobExist = await checkJobExistence(params);

  if (!doesJobExist) {
    return redirect("/");
  }

  return doesJobExist;
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const validatorErr = await validateForm(request, validator);

  if (validatorErr) return validatorErr;

  const form = await request.formData();
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect("/");
  }

  const { id } = user;
  const jobId = params.jobId as string;

  const proposal = form.get("proposal") as string;

  try {
    const application = await db.application.create({
      data: {
        message: proposal,
        userId: id,
        jobId
      },
    });

    return application;
  } catch (err) {
    console.error(err);
    return { err };
  }
};

export default function JobPost() {
  const { job } = useTypedLoaderData<typeof loader>();
  const error = useActionData<typeof action>();
  const isFormValid = useIsValid("proposalForm");
  const { state } = useNavigation();

  return (
    <>
      <div>
        <h2 className="text-3xl font-semibold mb-4">Job Details</h2>
      </div>
      <section className="bg-gray-100 rounded-xl p-4">
        <h2 className="text-2xl font-medium">
          {job.title.toLocaleUpperCase()}
        </h2>
        <small>{job.company}</small>
        <p>{job.description}</p>
        <div className="flex flex-wrap gap-2">
          {job.requirements.map((requirement, idx) => (
            <Badge key={idx} color="dark">
              {requirement}
            </Badge>
          ))}
        </div>
      </section>
      <section className="mt-4">
        <div>
          <span className="text-3xl font-semibold">Send your cover letter</span>
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
            Send application
          </Button>
        </ValidatedForm>
        <ErrorToast error={error} />
      </section>
    </>
  );
}

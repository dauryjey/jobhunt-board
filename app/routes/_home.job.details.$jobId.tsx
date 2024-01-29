import { LoaderFunctionArgs } from "@remix-run/node";
import { Badge, Button } from "flowbite-react";
import { redirect, useTypedLoaderData } from "remix-typedjson";
import { ValidatedForm } from "remix-validated-form";
import { authenticator } from "utils/auth.server";
import { checkJobExistence } from "utils/db.checkJobExistence.server";
import { validator } from "utils/validators/proposal";
import { FormInput } from "~/components/Common/Input/FormInput";
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

export default function JobPost() {
  const { job } = useTypedLoaderData<typeof loader>();

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
        <ValidatedForm validator={validator} className="mt-2">
          <FormInput {...proposalForm} />
          <Button color="blue" className="mt-4">
            Send proposal
          </Button>
        </ValidatedForm>
      </section>
    </>
  );
}

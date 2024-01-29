import { LoaderFunctionArgs } from "@remix-run/node";
import { Badge } from "flowbite-react";
import { redirect, useTypedLoaderData } from "remix-typedjson";
import { checkJobExistence } from "utils/db.checkJobExistence.server";
import { Status } from "~/components/Jobs/JobCard/Status";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const doesJobExist = await checkJobExistence(params)

  if (!doesJobExist) {
    return redirect("/")
  }

  return doesJobExist
};

export default function JobDetails() {
  const { job } = useTypedLoaderData<typeof loader>();

  return (
    <>
    <section>
      <h2 className="text-2xl font-semibold mb-4">Your job posting</h2>
      <div className="bg-gray-100 rounded-xl p-4">
        <span className="font-semibold text-xl">{job.title}</span>
        <div>
          <Status available={job.available} />
        </div>
        <div>
          <p className="pb-0.5">{job.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {job.requirements.map((requirement, idx) => (
            <Badge key={idx} color="dark">
              {requirement}
            </Badge>
          ))}
        </div>
      </div>
    </section>
    <section className="mt-4">
      <span className="text-2xl font-semibold">Proposals</span>
    </section>
    </>
  );
}

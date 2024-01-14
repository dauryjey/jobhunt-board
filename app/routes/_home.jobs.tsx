import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { db } from "utils/db.server";
import { Categories } from "~/components/Common/Categories/Categories";
import { JobList } from "~/components/Jobs/JobList/JobList";

export const loader = async () => {
  const jobs = await db.job.findMany();

  return typedjson({ jobs });
};

export default function Jobs() {
  const { jobs } = useTypedLoaderData<typeof loader>();

  return (
    <main className="mt-4">
      <section className="flex justify-center w-full">
        <Categories />
      </section>
      <section className="grid justify-center xl:grid-cols-4 gap-4 p-4">
        {jobs.length === 0 ? (
          <span className="font-semibold text-medium">No jobs found.</span>
        ) : (
          <JobList jobs={jobs} />
        )}
      </section>
    </main>
  );
}

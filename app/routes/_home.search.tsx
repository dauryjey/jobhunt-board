import { LoaderFunctionArgs } from "@remix-run/node";
import { useNavigation } from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { db } from "utils/db.server";
import { Categories } from "~/components/Common/Categories/Categories";
import { JobList } from "~/components/Jobs/JobList/JobList";
import { JOBS_DASHBOARD_PAGE1 } from "~/const/routes";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query) {
    return redirect(JOBS_DASHBOARD_PAGE1);
  }

  const jobs = await db.job.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return typedjson({ jobs });
};

export default function Search() {
  const { jobs } = useTypedLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <main className="mt-4">
      <section className="flex justify-center w-full">
        <Categories />
      </section>
      <section className="grid justify-center xl:grid-cols-4 gap-4 p-4">
        {navigation.state === "loading" ? (
          <span className="font-semibold text-medium">Loading...</span>
        ) : jobs.length === 0 ? (
          <span className="font-semibold text-medium">No jobs found.</span>
        ) : (
          <JobList jobs={jobs} />
        )}
      </section>
    </main>
  );
}

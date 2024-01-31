import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { db } from "utils/db.server";
import { JobSection } from "~/components/Jobs/JobSection/JobSection";
import { JOBS_DASHBOARD } from "~/const/routes";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.category) {
    return redirect(JOBS_DASHBOARD);
  }

  // Prisma lacks an insensitive filter for arrays.
  const category: string =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);

  const jobs = await db.job.findMany({
    where: {
      requirements: {
        has: `${category}`,
      },
    },
  });

  return typedjson({ jobs });
};

export default function Category() {
  const { jobs } = useTypedLoaderData<typeof loader>();

  return (
    <>
      <JobSection jobs={jobs} />
    </>
  );
}

import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { db } from "utils/db.server";
import { JobSection } from "~/components/Jobs/JobSection/JobSection";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.category) {
    return redirect("/jobs");
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
      <header className="border-b p-4">
        <JobSection jobs={jobs} />
      </header>
    </>
  );
}

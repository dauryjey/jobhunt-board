import { LoaderFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { db } from "utils/db.server";
import { getPagination } from "utils/getPagination";
import { JobSection } from "~/components/Jobs/JobSection/JobSection";
import { JOBS_DASHBOARD_PAGE1 } from "~/const/routes";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  if (!params.category) {
    return redirect(JOBS_DASHBOARD_PAGE1);
  }

  // Prisma lacks an insensitive filter for arrays.
  const category: string =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);

  const { skip, take, currentPage, totalPages } = await getPagination({
    request,
    tableToCount: "job",
    pageSize: 9,
    redirectTo: `/${category}?page=1`,
  });

  const jobs = await db.job.findMany({
    where: {
      requirements: {
        has: `${category}`,
      },
    },
    skip,
    take,
  });

  return typedjson({ jobs, totalPages, currentPage, category });
};

export default function Category() {
  const { jobs, totalPages, currentPage, category } =
    useTypedLoaderData<typeof loader>();
  const navigate = useNavigate();

  const onPageChange = (page: number) => navigate(`/${category}?page=${page}`);

  return (
    <JobSection
      jobs={jobs}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />
  );
}

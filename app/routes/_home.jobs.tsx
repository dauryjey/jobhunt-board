import { LoaderFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { db } from "utils/db.server";
import { getPagination } from "utils/getPagination";
import { JobSection } from "~/components/Jobs/JobSection/JobSection";
import { JOBS_DASHBOARD_PAGE, JOBS_DASHBOARD_PAGE1 } from "~/const/routes";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { skip, take, currentPage, totalPages } = await getPagination({
    request,
    tableToCount: "job",
    pageSize: 9,
    redirectTo: JOBS_DASHBOARD_PAGE1,
  });

  const jobs = await db.job.findMany({
    skip,
    take,
  })

  return typedjson({ jobs, totalPages, currentPage });
};

export default function Jobs() {
  const { jobs, totalPages, currentPage } =
    useTypedLoaderData<typeof loader>();
  const navigate = useNavigate();

  const onPageChange = (page: number) =>
    navigate(`${JOBS_DASHBOARD_PAGE}${page}`);

  return (
    <JobSection
      jobs={jobs}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />
  );
}

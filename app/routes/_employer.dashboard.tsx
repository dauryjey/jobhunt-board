import { Employer, User } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useNavigate, useOutletContext } from "@remix-run/react";
import { Button, Pagination } from "flowbite-react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { authenticator } from "utils/auth.server";
import { db } from "utils/db.server";
import { getPagination } from "utils/getPagination";
import { EmployerProfile } from "~/components/Dashboard/EmployerProfile";
import { JobList } from "~/components/Jobs/JobList/JobList";
import {
  CREATE_JOB,
  EMPLOYER_DASHBOARD,
  EMPLOYER_DASHBOARD_PAGE,
  JOBS_DASHBOARD_PAGE1,
} from "~/const/routes";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user: User | Employer | null = await authenticator.isAuthenticated(
    request
  );

  const { skip, take, currentPage, totalPages } = await getPagination({
    request,
    tableToCount: "job",
    pageSize: 3,
    redirectTo: EMPLOYER_DASHBOARD,
    currentPageDefault: 1,
  });

  if (user && user.role === "employer") {
    const jobs = await db.job.findMany({
      where: {
        employerId: user.id,
      },
      skip,
      take,
    });

    return typedjson({ jobs, currentPage, totalPages });
  }

  return redirect(JOBS_DASHBOARD_PAGE1);
};
export default function Dashboard() {
  const { jobs, totalPages, currentPage } = useTypedLoaderData<typeof loader>();
  const navigate = useNavigate();

  const onPageChange = (page: number) =>
    navigate(`${EMPLOYER_DASHBOARD_PAGE}${page}`);

  const user = useOutletContext<User>();

  return (
    <>
      <section className="md:flex gap-5">
        <EmployerProfile user={user} jobs={jobs} />
        <section className="md:w-4/6">
          <div className="flex justify-center my-4 xl:block">
            <Button color="blue" as={Link} to={CREATE_JOB}>
              Post a new job
            </Button>
          </div>
          <section className="flex flex-col xl:flex-row gap-10">
            <div className="flex flex-col items-center xl:items-start gap-4 box-border [&>div]:w-full order-2">
              <span className="font-semibold text-2xl self-start">Jobs</span>
              <JobList jobs={jobs} isEmployer />
            </div>
            <Outlet />
          </section>
          <section className="flex my-4 justify-center xl:justify-start">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </section>
        </section>
      </section>
    </>
  );
}

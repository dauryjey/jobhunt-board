import { Employer, User } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "flowbite-react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { authenticator } from "utils/auth.server";
import { db } from "utils/db.server";
import { EmployerProfile } from "~/components/Dashboard/EmployerProfile";
import { JobList } from "~/components/Jobs/JobList/JobList";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user: User | Employer | null = await authenticator.isAuthenticated(
    request
  );

  if (user && user.role === "employer") {
    const jobs = await db.job.findMany({
      where: {
        employerId: user.id,
      },
    });

    return typedjson({ user, jobs });
  }

  return redirect("/jobs");
};
export default function Dashboard() {
  const { user, jobs } = useTypedLoaderData<typeof loader>();

  return (
    <>
      <main className="md:flex gap-5 m-5">
        <EmployerProfile user={user} jobs={jobs} />
        <section className="md:w-4/6">
          <div className="flex justify-center my-4 md:block">
            <Button color="blue" as={Link} to={"/dashboard/create"}>Post a new job</Button>
          </div>
          <JobList jobs={jobs} isEmployer />
        </section>
      </main>
    </>
  );
}
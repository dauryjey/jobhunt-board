import { Employer, User } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useOutletContext } from "@remix-run/react";
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

    return typedjson({ jobs });
  }

  return redirect("/jobs");
};
export default function Dashboard() {
  const { jobs } = useTypedLoaderData<typeof loader>();
  const user = useOutletContext<User>()

  return (
    <>
      <main className="md:flex gap-5 m-5 [&>aside]:place-self-start">
        <EmployerProfile user={user} jobs={jobs} />
        <section className="md:w-4/6">
          <div className="flex justify-center my-4 md:block">
            <Button color="blue" as={Link} to={"/create"}>Post a new job</Button>
          </div>
          <div className="grid gap-4">
            <JobList jobs={jobs} isEmployer />
          </div>
        </section>
      </main>
    </>
  );
}

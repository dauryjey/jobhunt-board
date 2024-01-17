import { Employer, User } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Button } from "flowbite-react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { authenticator } from "utils/auth.server";
import { db } from "utils/db.server";
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
        <aside className="bg-gray-100 p-5 self-center rounded-xl w-2/6 md:w-2/6 md:h-[80vh]">
          <p className="font-semibold text-2xl">{`${user.firstName} ${user.lastName}`}</p>
        </aside>
        <section className="md:w-4/6">
          <div className="mb-4">
            <Button color="blue">Post a new job</Button>
          </div>
          <JobList jobs={jobs} isEmployer />
        </section>
      </main>
    </>
  );
}

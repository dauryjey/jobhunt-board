import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Categories } from "~/components/Common/Categories/Categories";
import { JobList } from "~/components/Jobs/JobList/JobList";
import { NavigationBar } from "~/components/Common/NavigationBar/NavigationBar";
import { db } from "utils/db.server";
import { Button } from "flowbite-react";
import { Link } from "@remix-run/react";
import { authenticator } from "utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Job Board for Devs" },
    { name: "description", content: "App for developers to look for work" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const [user, jobs] = await Promise.all([
    authenticator.isAuthenticated(request),
    db.jobListing.findMany(),
  ]);

  return typedjson({ user, jobs });
};

export default function Index() {
  const { user, jobs } = useTypedLoaderData<typeof loader>();

  return (
    <>
      <header className="border-b p-4">
        <NavigationBar>
          {!user && (
            <>
              <Button color="gray" pill>
                Log In
              </Button>
              <Button as={Link} to="/auth/signup" color="blue" pill>
                Sign Up
              </Button>
            </>
          )}
        </NavigationBar>
      </header>
      <main className="mt-4">
        <section className="flex justify-center w-full">
          <Categories />
        </section>
        <section className="grid justify-center xl:grid-cols-4 gap-4 p-4">
          <JobList jobs={jobs} />
        </section>
      </main>
    </>
  );
}

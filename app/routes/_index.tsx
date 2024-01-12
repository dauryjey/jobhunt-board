import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Categories } from "~/components/Common/Categories/Categories";
import { JobList } from "~/components/Jobs/JobList/JobList";
import { NavigationBar } from "~/components/Common/NavigationBar/NavigationBar";
import { db } from "utils/db.server";
import { Button } from "flowbite-react";
import { Form, Link, useNavigation, useSearchParams } from "@remix-run/react";
import { authenticator } from "utils/auth.server";
import { useState } from "react";
import { Search } from "~/components/Common/Search/Search";

export const meta: MetaFunction = () => {
  return [
    { title: "Job Board for Devs" },
    { name: "description", content: "App for developers to look for work" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);

  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (!query) {
    const jobs = await db.job.findMany();

    return typedjson({ user, jobs });
  }

  const jobs = await db.job.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return typedjson({ user, jobs });
};

export default function Index() {
  const { user, jobs } = useTypedLoaderData<typeof loader>();

  const navigation = useNavigation();
  const [search, setSearch] = useState<string>("");
  const [, setSearchParams] = useSearchParams();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();

    params.set("query", `${search}`);
    setSearchParams(params);
  };

  return (
    <>
      <header className="border-b p-4">
        <NavigationBar>
          <Search handleChange={handleChange} handleSubmit={handleSubmit} />
          <div className="flex justify-center gap-2 sm:order-last w-full mt-4 md:w-auto md:m-0">
            {user ? (
              <Form method="post" action="/logout">
                <Button color="blue" pill type="submit">
                  Log out
                </Button>
              </Form>
            ) : (
              <>
                <Button as={Link} to="/login" color="gray" pill>
                  Log In
                </Button>
                <Button as={Link} to="/signup/user" color="blue" pill>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </NavigationBar>
      </header>
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
    </>
  );
}

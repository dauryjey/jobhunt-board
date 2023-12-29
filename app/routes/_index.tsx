import { type MetaFunction } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Categories } from "~/components/Common/Categories/Categories";
import { JobList } from "~/components/Jobs/JobList/JobList";
import { NavigationBar } from "~/components/Common/NavigationBar/NavigationBar";
import { db } from "utils/db.server";
import { Button } from "flowbite-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Job Board for Devs" },
    { name: "description", content: "App for developers to look for work" },
  ];
};

export const loader = async () => {
  return typedjson(await db.jobListing.findMany());
};

export default function Index() {
  const jobs = useTypedLoaderData<typeof loader>();

  return (
    <>
      <header className="border-b p-4">
        <NavigationBar>
          <Button color="gray" pill>Log In</Button>
          <Button color="blue" pill>Sign Up</Button>
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

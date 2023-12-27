import { type MetaFunction } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Categories } from "~/components/Home/Categories/Categories";
import { JobList } from "~/components/Home/JobList/JobList";
import { NavigationBar } from "~/components/Home/NavigationBar/NavigationBar";
import { db } from "~/utils/db.server";

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
        <NavigationBar />
      </header>
      <main className="pt-2">
        <section className="flex justify-center w-full">
          <Categories />
        </section>
        <section className="grid justify-center xl:grid-cols-2 gap-5">
          <JobList jobs={jobs} />
        </section>
      </main>
    </>
  );
}

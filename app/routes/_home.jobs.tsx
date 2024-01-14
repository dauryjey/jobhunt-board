import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { db } from "utils/db.server";
import { JobSection } from "~/components/Jobs/JobSection/JobSection";

export const loader = async () => {
  const jobs = await db.job.findMany();

  return typedjson({ jobs });
};

export default function Jobs() {
  const { jobs } = useTypedLoaderData<typeof loader>();

  return (
    <JobSection jobs={jobs} />
  );  
}

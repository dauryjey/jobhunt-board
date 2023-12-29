import { JobListing } from "@prisma/client";
import { JobCard } from "../JobCard/JobCard";

export const JobList = ({ jobs }: { jobs: JobListing[] }) => {
  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
};

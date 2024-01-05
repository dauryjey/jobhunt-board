import { Job } from "@prisma/client";
import { JobCard } from "../JobCard/JobCard";

export const JobList = ({ jobs }: { jobs: Job[] }) => {
  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
};

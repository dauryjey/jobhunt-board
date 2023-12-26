/* eslint-disable react/prop-types */
import { JobCard } from "../JobCard/JobCard";

export const JobList = ({ jobs }: { jobs: Job[] }) => {
  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </>
  );
};

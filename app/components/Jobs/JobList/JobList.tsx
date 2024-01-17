import { Job } from "@prisma/client";
import { UserJobCard } from "../JobCard/UserJobCard";
import { EmployerJobCard } from "../JobCard/EmployerJobCard";

interface JobListProps {
  jobs: Job[];
  isEmployer?: boolean;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  isEmployer,
}: JobListProps) => {
  return (
    <>
      {jobs.map((job) => {
        if (isEmployer) {
          return <EmployerJobCard key={job.id} job={job} />;
        }

        return <UserJobCard key={job.id} job={job} />;
      })}
    </>
  );
};

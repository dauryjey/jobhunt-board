import { Categories } from "~/components/Common/Categories/Categories";
import { JobList } from "../JobList/JobList";
import { Job } from "@prisma/client";
import { Pagination } from "flowbite-react";

interface JobSectionProps {
  jobs: Job[];
  isEmployer?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void
}

export const JobSection: React.FC<JobSectionProps> = ({
  jobs,
  isEmployer,
  currentPage,
  totalPages,
  onPageChange
}: JobSectionProps) => {
  return (
    <main className="mt-4">
      {!isEmployer && (
        <section className="flex justify-center w-full">
          <Categories />
        </section>
      )}

      <section className="grid justify-center xl:grid-cols-3 gap-4 p-4">
        {jobs.length === 0 ? (
          <span className="font-semibold text-medium">No jobs found.</span>
        ) : (
          <JobList jobs={jobs} isEmployer={isEmployer} />
        )}
      </section>
      <section className="flex justify-center mb-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </section>
    </main>
  );
};

import { Categories } from "~/components/Common/Categories/Categories"
import { JobList } from "../JobList/JobList"
import { Job } from "@prisma/client"

interface JobSectionProps {
  jobs: Job[]
}

export const JobSection: React.FC<JobSectionProps> = ({ jobs }: JobSectionProps) => {
  return (
    <main className="mt-4">
    <section className="flex justify-center w-full">
      <Categories />
    </section>
    <section className="grid justify-center xl:grid-cols-4 gap-4 p-4">
      {jobs.length === 0 ? (
        <span className="font-semibold text-medium">No jobs found.</span>
      ) : (
        <JobList jobs={jobs} />
      )}
    </section>
  </main>
  )
}
import { Job } from "@prisma/client";
import { Link } from "@remix-run/react";
import { Badge, Button, Card } from "flowbite-react";
import { Status } from "./Status";
import { DELETE_JOB, JOB_DETAILS_EMPLOYER, UPDATE_JOB } from "~/const/routes";

export const EmployerJobCard = ({ job }: { job: Job }) => {
  return (
    <Card
      className="max-w-md [&>div]:md:flex-row [&>div]:justify-start [&>div]:w-full"
      horizontal
    >
      <div className="w-10/12">
        <div>
          <div>
            <Status available={job.available} />
          </div>
          <p className="text-2xl font-bold">
            <Link to={`${JOB_DETAILS_EMPLOYER}${job.id}`}>{job.title}</Link>
          </p>
          <small>{job.company}</small>
          <div className="line-clamp-3">
            <p className="pb-0.5">{job.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((requirement, idx) => (
              <Badge key={idx} color="dark">
                {requirement}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="flex md:flex-col justify-center items-center gap-2">
        <Button color="blue" outline as={Link} to={`${UPDATE_JOB}${job.id}`}>
          Edit
        </Button>
        <Button color="red" as={Link} to={`${DELETE_JOB}${job.id}`}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

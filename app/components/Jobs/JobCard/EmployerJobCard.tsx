import { Job } from "@prisma/client";
import { Link } from "@remix-run/react";
import { Badge, Button, Card } from "flowbite-react";

export const EmployerJobCard = ({ job }: { job: Job }) => {
  return (
    <Card className="max-w-md [&>div]:md:flex-row [&>div]:justify-start [&>div]:w-full" horizontal>
      <div className="w-10/12">
        <div>
          <h5 className="text-2xl font-bold">{job.title}</h5>
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
        <Button color="blue" outline as={Link} to={`/update/${job.id}`}>
          Edit
        </Button>
        <Button color="red" as={Link} to={`/delete/${job.id}`}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

/* eslint-disable react/prop-types */
import { Job } from "@prisma/client";
import { Link } from "@remix-run/react";
import { Badge, Button, Card } from "flowbite-react";

export const UserJobCard = ({ job }: { job: Job }) => {
  return (
    <Card className="max-w-xl">
      <div>
      <h5 className="text-2xl font-bold">{job.title}</h5>
      <small>{job.company}</small>
      </div>
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
      <Button color="blue" as={Link} to={`/job/details/${job.id}`}>Read More</Button>
    </Card>
  );
};

/* eslint-disable react/prop-types */
import { Job } from "@prisma/client";
import { Link } from "@remix-run/react";
import { Badge, Button, Card } from "flowbite-react";

export const UserJobCard = ({ job }: { job: Job }) => {
  return (
    <Card className="max-w-xl shadow-none border-2 h-full flex">
      <div className="flex-grow">
        <div className="place-self-start">
          <h5 className="text-2xl font-bold">{job.title}</h5>
          <small>{job.company}</small>
        </div>
        <div className="line-clamp-3">
          <p className="pb-0.5">{job.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {job.requirements.map((requirement, idx) => (
          <Badge key={idx} color="dark">
            {requirement}
          </Badge>
        ))}
      </div>
      <Button
        className="w-32"
        color="blue"
        as={Link}
        to={`/job/details/${job.id}`}
      >
        Read More
      </Button>
    </Card>
  );
};

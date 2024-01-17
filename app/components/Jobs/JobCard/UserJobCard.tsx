/* eslint-disable react/prop-types */
import { Job } from "@prisma/client";
import { Badge, Button, Card } from "flowbite-react";

export const UserJobCard = ({ job }: { job: Job }) => {
  return (
    <Card className="max-w-sm">
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
      <Button color="blue">Read More</Button>
    </Card>
  );
};

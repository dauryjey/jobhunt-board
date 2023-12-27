/* eslint-disable react/prop-types */
import { JobListing } from "@prisma/client";
import { Badge, Button, Card } from "flowbite-react";

export const JobCard = ({ job }: { job: JobListing }) => {
  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold">{job.title}</h5>
      <small>{job.company}</small>
      <p>{job.description}</p>
      <div className="flex gap-2">
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

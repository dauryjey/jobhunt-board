/* eslint-disable react/prop-types */
import { Job } from "@prisma/client";
import { Link } from "@remix-run/react";
import { Badge, Button, Card } from "flowbite-react";
import { JOB_DETAILS_USER } from "~/const/routes";

export const UserJobCard = ({ job }: { job: Job }) => {
  return (
    <Card className="max-w-full lg:max-w-xl shadow-none border-2 h-full flex flex-col lg:flex-row p-4 border-box">
      <div className="flex-grow lg:w-2/3">
        <div className="place-self-start">
          <h5 className="text-xl lg:text-2xl font-bold">{job.title}</h5>
          <small>{job.company}</small>
        </div>
        <div className="line-clamp-3">
          <p className="pb-0.5">{job.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 lg:w-1/3">
        {job.requirements.map((requirement, idx) => (
          <Badge key={idx} color="dark">
            {requirement}
          </Badge>
        ))}
      </div>
      <Button
        className="w-full lg:w-32 mt-2 lg:mt-0"
        color="blue"
        as={Link}
        to={`${JOB_DETAILS_USER}${job.id}`}
      >
        Read More
      </Button>
    </Card>
  );
};

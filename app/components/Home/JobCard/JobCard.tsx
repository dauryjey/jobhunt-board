import { Badge, Button, Card } from "flowbite-react";

interface Props extends Job {}

export const JobCard: React.FC<Props> = (job: Props) => {
  const { title, company, description, requirements } = job;

  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold">{title}</h5>
      <small>{company}</small>
      <p>{description}</p>
      <div className="flex gap-2">
        {requirements.map((requirement, idx) => (
          <Badge key={idx} color="dark">
            {requirement}
          </Badge>
        ))}
      </div>
      <Button color="blue">Read More</Button>
    </Card>
  );
};

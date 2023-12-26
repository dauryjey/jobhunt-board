import { Button } from "flowbite-react";

interface Props {
  text: string;
}

export const MainButton: React.FC<Props> = ({ text }: Props) => {
  return (
    <Button pill color="blue">
      {text}
    </Button>
  );
};

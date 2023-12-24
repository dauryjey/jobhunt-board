import { Button } from "flowbite-react";

interface Props {
  text: string;
}

export const MainButton: React.FC<Props> = ({ text }: Props) => {
  return (
    <Button className="rounded-full bg-sky-700 enabled:hover:bg-sky-600 focus:ring-0">
      {text}
    </Button>
  );
};

import { Message } from "./Message";

interface LoadingProps {
  state: string;
}

export const Loading: React.FC<LoadingProps> = ({ state }: LoadingProps) => {
  return (
    <>{state === "loading" || state === "submitting" && <Message msg={"Loading..."} />}</>
  );
};

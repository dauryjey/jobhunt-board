import { Form } from "@remix-run/react";
import { Button } from "flowbite-react";
import { Title } from "../Common/Title/Title";
import { FormInput } from "../Common/Input/FormInput";

interface AuthFormProps {
  title: string;
  inputs: authInputs[];
}

export const AuthForm: React.FC<AuthFormProps> = ({ title, inputs }: AuthFormProps) => {
  return (
    <>
      <Title title={title} />
      <Form method="post" className="flex flex-col gap-4">
        {inputs.map((input) => (
          <FormInput key={input.name} {...input} />
        ))}
        <Button type="submit" color="blue" pill>
          {title}
        </Button>
      </Form>
    </>
  );
};

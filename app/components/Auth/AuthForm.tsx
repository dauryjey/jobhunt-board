import { Button } from "flowbite-react";
import { Title } from "../Common/Title/Title";
import { FormInput } from "../Common/Input/FormInput";
import { ValidatedForm, Validator, useIsValid } from "remix-validated-form";

interface AuthFormProps {
  title: string;
  inputs: authInputs[];
  validator: Validator<{
    [fieldName: string]: unknown;
  }>;
  children?: React.ReactNode;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  inputs,
  validator,
  children,
}: AuthFormProps) => {
  const isFormValid = useIsValid("authForm");

  return (
    <>
      <div className="text-center pb-4">
        <Title title={title} />
      </div>
      <div className="flex justify-center">
        <ValidatedForm
          id="authForm"
          validator={validator}
          method="post"
          className="grid gap-4 max-w-[300px]"
        >
          {inputs.map((input) => (
            <FormInput key={input.name} {...input} />
          ))}
          <Button type="submit" color="blue" pill disabled={!isFormValid}>
            {title}
          </Button>
          {children}
        </ValidatedForm>
      </div>
    </>
  );
};

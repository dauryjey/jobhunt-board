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

export const AuthForm: React.FC<AuthFormProps> = ({ title, inputs, validator, children }: AuthFormProps) => {
  const isFormValid = useIsValid("authForm")
  
  return (
    <>
      <div className="pb-2">
        <Title title={title} />
      </div>
      <ValidatedForm id="authForm" validator={validator} method="post" className="flex flex-col gap-4">
        {inputs.map((input) => (
          <FormInput key={input.name} {...input} />
        ))}
      <Button type="submit" color="blue" pill disabled={!isFormValid}>
          {title}
        </Button>
        {children}
      </ValidatedForm>
    </>
  );
};

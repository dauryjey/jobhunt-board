import { Label, TextInput } from "flowbite-react";

interface FormInputProps {
  name: string;
  value: string;
  type: string;
  required: boolean;
  addon?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  value,
  type,
  required,
  addon,
}: FormInputProps) => {
  return (
    <div>
      {type !== "checkbox" && (
        <div className="mb-2 block">
          <Label htmlFor={name} value={value} className="font-semibold" />
        </div>
      )}
      <TextInput
        name={name}
        type={type}
        required={required}
        addon={addon}
        id={name}
      />
    </div>
  );
};

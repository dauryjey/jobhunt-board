import { Label, TextInput, Textarea } from "flowbite-react";
import { useField } from "remix-validated-form";

interface FormInputProps {
  name: string;
  value: string;
  type: string;
  required: boolean;
  addon?: string;
  rows?: number;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  value,
  type,
  required,
  addon,
  rows
}: FormInputProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      {type !== "checkbox" && (
        <div className="mb-2 block">
          <Label
            htmlFor={name}
            value={value}
            className="font-semibold"
            color={error && "failure"}
          />
        </div>
      )}
      {
        {
          textarea: (
            <Textarea
              name={name}
              required={required}
              id={name}
              {...getInputProps({ id: name })}
              color={error && "failure"}
              helperText={error}
              rows={rows || 4}
            />
          ),
          text: (
            <TextInput
              name={name}
              type={type}
              required={required}
              addon={addon}
              id={name}
              {...getInputProps({ id: name })}
              color={error && "failure"}
              helperText={error}
            />
          ),
          password: (
            <TextInput
            name={name}
            type={type}
            required={required}
            addon={addon}
            id={name}
            {...getInputProps({ id: name })}
            color={error && "failure"}
            helperText={error}
            />
          )
        }[type]
      }
    </div>
  );
};

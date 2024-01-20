
export const inputs: ValidatedInput[] = [
  { name: "firstName", value: "First name", type: "text", required: true },
  { name: "lastName", value: "Last name", type: "text", required: true },
  {
    name: "email",
    value: "Email",
    type: "text",
    required: true,
    addon: "✉️",
  },
  {
    name: "password",
    value: "Password",
    type: "password",
    required: true,
    addon: "🔒",
  },
  {
    name: "confirmPassword",
    value: "Repeat password",
    type: "password",
    required: true,
    addon: "🔒",
  },
];

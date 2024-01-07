
export const inputs: authInputs[] = [
  { name: "fname", value: "First name", type: "text", required: true },
  { name: "lname", value: "Last name", type: "text", required: true },
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

interface ValidatedInput {
  name: string;
  value: string;
  type: string;
  required: boolean;
  addon?: string;
  rows?: number;
}
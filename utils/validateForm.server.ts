import { Validator, validationError } from "remix-validated-form";

export const validateForm = async (request: Request, validatorProp: Validator<unknown>) => {
  const validator = validatorProp

  const result = await validator.validate(await request.clone().formData());

  if (result.error) return validationError(result.error);

  return false;
};

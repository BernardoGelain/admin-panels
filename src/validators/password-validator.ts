import { requiredFieldValidator } from "./required-field-validator";

export const passwordValidator = (fieldName?: string) => {
  const _fieldName = fieldName ?? "Senha";

  return requiredFieldValidator(_fieldName).min(6, { message: `${_fieldName} deve conter 6 caracteres` });
};

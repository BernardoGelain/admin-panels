import { requiredFieldValidator } from "./required-field-validator";

export const emailValidator = (fieldName?: string) =>
  requiredFieldValidator(fieldName ?? "E-mail").email("Email inválido");

import { z } from "zod";

export const requiredFieldDateValidator = (fieldName: string) =>
  z.date({
    required_error: `${fieldName} é obrigatório`,
    invalid_type_error: `${fieldName} é obrigatório`,
  });

import { z } from "zod";

export const requiredFieldValidator = (fieldName: string) =>
  z
    .string({
      required_error: `${fieldName} é obrigatório`,
      invalid_type_error: `${fieldName} é obrigatório`,
    })
    .min(1, {
      message: `${fieldName} é obrigatório`,
    });

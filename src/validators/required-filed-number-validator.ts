import { z } from "zod";

export const requiredFieldNumberValidator = (fieldName: string) =>
  z
    .number({
      required_error: `${fieldName} é obrigatório`,
      invalid_type_error: `${fieldName} é obrigatório`,
    })
    .min(0, {
      message: `${fieldName} é obrigatório`,
    });

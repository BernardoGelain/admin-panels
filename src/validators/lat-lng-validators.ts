import { z } from "zod";

export const latitudeSchema = z
  .union([
    z.number(), // Aceita números diretamente
    z.string().transform((val) => parseFloat(val)), // Converte strings para números
  ])
  .refine(
    (val) => {
      return val >= -90 && val <= 90;
    },
    {
      message: "Latitude deve estar entre -90 e 90.",
    }
  );

export const longitudeSchema = z
  .union([
    z.number(), // Aceita números diretamente
    z.string().transform((val) => parseFloat(val)), // Converte strings para números
  ])
  .refine((val) => val >= -180 && val <= 180, {
    message: "Longitude deve estar entre -180 e 180.",
  });

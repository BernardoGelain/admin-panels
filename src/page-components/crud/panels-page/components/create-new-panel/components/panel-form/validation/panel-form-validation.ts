import { z } from "zod";
import { latitudeSchema, longitudeSchema } from "~/validators/lat-lng-validators";
import { requiredFieldValidator } from "~/validators/required-field-validator";

export const PanelFormValidation = z.object({
  name: requiredFieldValidator("Nome"),
  lat: latitudeSchema,
  lng: longitudeSchema,
});

export type PanelFormValues = z.infer<typeof PanelFormValidation>;

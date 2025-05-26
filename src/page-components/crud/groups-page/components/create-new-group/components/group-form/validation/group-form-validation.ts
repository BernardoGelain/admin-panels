import { z } from "zod";
import { requiredFieldValidator } from "~/validators/required-field-validator";

export const GroupFormValidation = z.object({
  name: requiredFieldValidator("Nome"),
  description: requiredFieldValidator("Descrição"),
  panelIds: z.array(z.number()).optional(),
});

export type GroupFormValues = z.infer<typeof GroupFormValidation>;

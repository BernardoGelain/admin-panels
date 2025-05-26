import { z } from "zod";
import { requiredFieldValidator } from "~/validators/required-field-validator";

export const TicketTypesFormValidation = z.object({
  organizationId: requiredFieldValidator("Organização"),
  name: requiredFieldValidator("Nome"),
  price: requiredFieldValidator("Preço"),
  ticketType: z.enum(["APP", "PRINT"], {
    message: "Tipo de ingresso inválido",
    required_error: "Tipo de ingresso é obrigatório",
  }),
  ticketwithdraw: z.string().optional(),
});

export type TicketTypesFormValues = z.infer<typeof TicketTypesFormValidation>;

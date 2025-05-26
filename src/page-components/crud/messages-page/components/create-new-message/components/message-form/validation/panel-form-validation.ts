import { z } from "zod";
import { requiredFieldValidator } from "~/validators/required-field-validator";

export const MessageFormValidation = z.object({
  content: requiredFieldValidator("Mensagem"),
  panelIds: z
    .array(z.number(), {
      required_error: "Selecione pelo menos um painel (ou deixe vazio).",
    })
    .optional(),
  groupIds: z
    .array(z.number(), {
      required_error: "Selecione pelo menos um grupo (ou deixe vazio).",
    })
    .optional(),
});

export type MessageFormValues = z.infer<typeof MessageFormValidation>;

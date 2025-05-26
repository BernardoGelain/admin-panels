import { z } from "zod";
import { emailValidator } from "~/validators/email-validator";
import { passwordValidator } from "~/validators/password-validator";

export const LoginFormValidation = z.object({
  email: emailValidator(),
  password: passwordValidator(),
});

export type LoginFormData = z.infer<typeof LoginFormValidation>;

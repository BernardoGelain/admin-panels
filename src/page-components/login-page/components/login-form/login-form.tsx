"use client";

import { FormProvider, useForm } from "react-hook-form";
import { ControlledTextInput } from "~/components/form/controlled-input/controlled-input";
import { LoginFormData, LoginFormValidation } from "./validation/login-form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../../hooks/use-login-mutation";
import { FormSubmitButton } from "~/components/form/form-submit-button/form-submit-button";

export function LoginForm() {
  const loginMutation = useLoginMutation();

  const login = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormValidation),
  });

  async function onSubmitLoginForm(data: LoginFormData) {
    await loginMutation.mutateAsync({
      email: data.email,
      password: data.password,
    });
  }

  return (
    <FormProvider {...login}>
      <form className="flex flex-col gap-4" onSubmit={login.handleSubmit(onSubmitLoginForm)}>
        <ControlledTextInput name="email" label="E-mail" />
        <ControlledTextInput name="password" label="Senha" type="password" />
        <FormSubmitButton>Entrar</FormSubmitButton>
      </form>
    </FormProvider>
  );
}

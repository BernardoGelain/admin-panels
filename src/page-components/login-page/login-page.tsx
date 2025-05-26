"use client";

import Image from "next/image";
import { LoginForm } from "./components/login-form/login-form";
import { ThemeSwitcher } from "~/components/theme/theme-switcher/theme-switcher";
import { useTheme } from "next-themes";

export function LoginPage() {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 bg-background text-foreground">
      <div className="absolute flex items-center justify-center z-40 w-max top-4 right-4 md:top-12 md:right-12">
        <ThemeSwitcher />
      </div>

      {/* Lado visual com marca */}
      <div className="hidden md:flex relative bg-secondary">
        <div className="absolute inset-0 bg-marcante-gradient" />
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full  text-primary-foreground">
          <div
            className={`${theme === "light" ? "bg-secondary-300" : "bg-secondary-900"}  p-12 w-full py-28 flex justify-center flex-col items-center`}
          >
            <Image alt="Marcante Logo" src="/logo-login.png" width={300} height={300} className="w-80 animate-marcante-float" />
            <span className="font-semibold text-primary text-3xl mt-2">Marcante Admin</span>
          </div>
        </div>
      </div>

      {/* Lado do formulário */}
      <div className="flex flex-col justify-center p-6 md:p-8">
        <div className="md:hidden flex flex-col items-center mb-8">
          <Image alt="Marcante Logo" src="/logo-login.png" width={150} height={150} className="w-40 animate-marcante-float" />
          <span className="font-semibold text-2xl mt-2">Marcante Admin</span>
        </div>

        <div className="mx-auto w-full max-w l rounded-xl bg-card p-24">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-primary-600">Login</h1>
            <p className="text-sm text-muted-foreground">Digite seu e-mail e sua senha para entrar</p>
          </div>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

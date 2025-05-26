import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import nookies from "nookies";
import { APP_ROUTES } from "~/config/app-routes";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// 🔧 Função de login simulada (mock)
async function login({ email, password }: LoginParams): Promise<{ body: LoginResponse }> {
  // Simula validação simples
  if (email === "teste@teste.com" && password === "123456") {
    return {
      body: {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      },
    };
  }

  throw new Error("Credenciais inválidas");
}

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: async (loginResponse) => {
      // Salva tokens fake nos cookies
      nookies.set(null, "token", loginResponse.body.accessToken, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: "/",
      });

      nookies.set(null, "refreshToken", loginResponse.body.refreshToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      // Redireciona para rota protegida
      router.push(APP_ROUTES.HOME);
    },
  });
};

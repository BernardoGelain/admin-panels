import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import nookies from "nookies";
import { useRouter } from "next/navigation";
import api from "~/api/api"; // 👈 aqui você usa o *não autorizado* (sem token)
import { APP_ROUTES } from "~/config/app-routes";
import { AxiosError } from "axios";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

async function login(params: LoginParams): Promise<LoginResponse> {
  const response = await api.post("/auth/login", params);
  return response.data;
}

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (loginResponse) => {
      nookies.set(null, "token", loginResponse.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      nookies.set(null, "refreshToken", loginResponse.refreshToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      toast.success("Login realizado com sucesso!");
      router.push(APP_ROUTES.HOME);
    },
    onError: (error: AxiosError) => {
      if (error.status === 401) return toast.error("Credenciais incorretas");
      toast.error("Erro ao fazer login.");
    },
  });
};

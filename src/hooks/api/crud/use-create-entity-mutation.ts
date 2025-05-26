"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import authorizedApi from "~/api/authorized-api";
import { API_ROUTES } from "~/config/api-routes";
import { APP_ROUTES } from "~/config/app-routes";
import { QUERY_KEYS } from "~/query-keys/query-keys";

async function createEntity<T>({ params, route }: { params: T; route: string }) {
  const response = await authorizedApi.post(route, params);
  return response;
}

type UseCreateEntityMutationParams = {
  successMessage: string;
  queryKey: keyof typeof QUERY_KEYS;
  redirectPath: keyof typeof APP_ROUTES;
  route: keyof typeof API_ROUTES;
};

export function useCreateEntityMutation<T>({ queryKey, redirectPath, successMessage, route }: UseCreateEntityMutationParams) {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: T) =>
      createEntity<T>({
        params,
        route: API_ROUTES[route],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        // @ts-ignore - no types
        queryKey: [QUERY_KEYS[queryKey].LIST],

        refetchType: "all",
      });
      toast.success(successMessage);
      router.push(`${window.location.origin}/${APP_ROUTES[redirectPath]}`);
    },
  });
}

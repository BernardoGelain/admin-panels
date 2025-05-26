import { useQuery } from "@tanstack/react-query";
import authorizedApi from "~/api/authorized-api";
import { API_ROUTES } from "~/config/api-routes";

type GetEntityDetailsParams = {
  entityId: number;
  entityBaseUrl: string;
};

type GetEntityDetailsResponse<T> = {
  body: T;
};

async function getEntityDetails<T>(params: GetEntityDetailsParams) {
  const response = await authorizedApi.get<GetEntityDetailsResponse<T>>(
    `${params.entityBaseUrl}/${params.entityId}`
  );
  return response.data;
}

type UseGetEntityDetails = {
  queryKey: string;
  enabled: boolean;
  entityId: number;
  entityBaseUrl: keyof typeof API_ROUTES;
};

export function useGetEntityDetails<T>({
  enabled,
  entityId,
  queryKey,
  entityBaseUrl,
}: UseGetEntityDetails) {
  return useQuery({
    queryKey: [queryKey, entityId, entityBaseUrl],
    queryFn: () =>
      getEntityDetails<T>({
        entityId,
        entityBaseUrl: API_ROUTES[entityBaseUrl],
      }),
    enabled,
  });
}

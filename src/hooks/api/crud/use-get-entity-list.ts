import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import authorizedApi from "~/api/authorized-api";
import { API_ROUTES } from "~/config/api-routes";
import { GetListParamsBase } from "~/types/get-list-params-base";
import { PaginatedResponse } from "~/types/paginated-response";

async function getEntityList<T>({ keywords, page = 1, pageSize = 50, sort, entityBaseUrl }: GetListParamsBase) {
  const queryParams = new URLSearchParams();

  if (keywords) {
    queryParams.set("keywords", keywords);
  }

  if (sort) {
    queryParams.set("sort", sort);
  }

  queryParams.set("page", String(page));
  queryParams.set("pageSize", String(pageSize));

  const response = await authorizedApi.get<PaginatedResponse<T>>(`${entityBaseUrl}?${queryParams.toString()}`);

  return response.data;
}

type UseGetEntityListParams = {
  queryKey: string;
  entityBaseUrl: keyof typeof API_ROUTES;
  keywords?: string;
};

export function useGetEntityList<T>({ queryKey, entityBaseUrl, keywords }: UseGetEntityListParams) {
  const searchParams = useSearchParams();
  const _keywords = keywords || searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 50;
  const sort = searchParams.get("sort") || "";

  return useQuery({
    queryKey: [queryKey, _keywords, keywords, page, pageSize, sort, API_ROUTES[entityBaseUrl].toString()],
    queryFn: () =>
      getEntityList<T>({
        keywords: _keywords,
        page,
        pageSize,
        sort,
        entityBaseUrl: API_ROUTES[entityBaseUrl].toString(),
      }),
  });
}

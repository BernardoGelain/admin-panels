import { useInfiniteQuery } from "@tanstack/react-query";
import authorizedApi from "~/api/authorized-api";
import { GalleryModel } from "~/page-components/crud/galleries-page/types/gallery-model";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { PaginatedResponse } from "~/types/paginated-response";

type EntityResponse<T> = {
  body: PaginatedResponse<T>;
};

async function getEntityListInfinite<T>({
  keywords = "",
  page = 1,
  pageSize = 20,
  sort = "",
  entityBaseUrl,
}: {
  keywords?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  entityBaseUrl: string;
}): Promise<EntityResponse<T>> {
  const queryParams = new URLSearchParams();

  if (keywords) {
    queryParams.set("keywords", keywords);
  }

  if (sort) {
    queryParams.set("sort", sort);
  }

  queryParams.set("page", String(page));
  queryParams.set("pageSize", String(pageSize));

  const response = await authorizedApi.get<EntityResponse<T>>(
    `/${entityBaseUrl}?${queryParams.toString()}`
  );

  return response.data;
}

export function useGetInfiniteGalleries({
  keywords = "",
}: {
  keywords: string;
}) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.GALLERIES.LIST, keywords],
    queryFn: ({ pageParam = 1 }) =>
      getEntityListInfinite<GalleryModel>({
        entityBaseUrl: "galleries",
        page: pageParam,
        keywords,
      }),
    getNextPageParam: (lastPage, pages) => {
      const totalItems = lastPage.body.total;
      const currentPage = pages.length;
      const pageSize = lastPage.body.items.length;

      return totalItems > currentPage * pageSize ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const galleries = data?.pages.flatMap((page) => page.body.items) || [];

  return {
    galleries,
    fetchNextPage,
    hasNextPage,
  };
}

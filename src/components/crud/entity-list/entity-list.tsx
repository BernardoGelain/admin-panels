"use client";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { DataTable } from "~/components/ui/data-table/data-table";
import Link from "next/link";
import { UseQueryResult } from "@tanstack/react-query";
import { PaginatedResponse } from "~/types/paginated-response";
import { API_ROUTES } from "~/config/api-routes";

type Props = {
  entityName: string;
  entityBaseUrl: keyof typeof API_ROUTES;
  entityListQuery: UseQueryResult<{
    body: PaginatedResponse<unknown>;
  }>;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  entityColumns: any;
  addButtonText?: string;
  removeAddButton?: boolean;
  mockData?: any[];
};

export function EntityList({
  entityBaseUrl,
  entityListQuery,
  entityName,
  entityColumns,
  addButtonText = "Adicionar",
  removeAddButton,
  mockData,
}: Props) {
  const data = entityListQuery?.data?.body;

  const pageCount = data ? Math.ceil(data.total / data.pageSize) : 0;

  return (
    <Card>
      <CardHeader className="flex justify-between items-center flex-row w-full">
        <CardTitle className="text-primary">{entityName}</CardTitle>
        {!removeAddButton && (
          <div>
            <Link href={`/${entityBaseUrl.toLowerCase().replaceAll("_", "-")}/create`}>
              <Button>{addButtonText}</Button>
            </Link>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <DataTable
          isLoading={entityListQuery.isLoading}
          columns={entityColumns}
          data={data?.items ?? mockData ?? []}
          totalRecords={data?.total ?? 0}
          pageCount={pageCount}
        />
      </CardContent>
    </Card>
  );
}

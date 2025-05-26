"use client";

import { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalRecords: number;
}

export function DataTablePagination<TData>({ table, totalRecords }: DataTablePaginationProps<TData>) {
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (params: Record<string, string | number>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        newSearchParams.set(key, String(value));
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const updateURL = useCallback(
    (pageIndex: number, pageSize: number) => {
      const queryString = createQueryString({
        page: pageIndex + 1,
        size: pageSize,
      });

      window.history.pushState(null, "", `${window.location.pathname}?${queryString}`);
    },
    [createQueryString]
  );

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 10;

    if (page !== table.getState().pagination.pageIndex + 1) {
      table.setPageIndex(page - 1);
    }

    if (size !== table.getState().pagination.pageSize) {
      table.setPageSize(size);
    }
  }, [searchParams, table]);

  const handlePageSizeChange = (value: string) => {
    const newSize = Number(value);
    table.setPageSize(newSize);
    updateURL(table.getState().pagination.pageIndex, newSize);
  };

  const handlePreviousPage = () => {
    if (table.getCanPreviousPage()) {
      const newPageIndex = table.getState().pagination.pageIndex - 1;
      table.previousPage();
      updateURL(newPageIndex, table.getState().pagination.pageSize);
    }
  };

  const handleNextPage = () => {
    if (table.getCanNextPage()) {
      const newPageIndex = table.getState().pagination.pageIndex + 1;
      table.nextPage();
      updateURL(newPageIndex, table.getState().pagination.pageSize);
    }
  };

  return (
    <div className="flex items-center justify-between flex-col lg:flex-row">
      <div className="flex w-[100px] items-center justify-center text-sm font-semibold">
        Total <span className="ml-2 font-bold">{totalRecords}</span>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium hidden lg:block">Linhas por página</p>
          <Select value={`${table.getState().pagination.pageSize}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" className="h-8 w-8 p-0" onClick={handlePreviousPage} disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" onClick={handleNextPage} disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

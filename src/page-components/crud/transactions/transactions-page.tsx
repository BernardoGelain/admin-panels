"use client";
import { EntityList } from "~/components/crud/entity-list/entity-list";
import { transactionsColumns } from "./columns";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { TransactionModel } from "./types/transaction-model";
import { QUERY_KEYS } from "~/query-keys/query-keys";

export function TransactionsPage() {
  const transactionsQuery = useGetEntityList<TransactionModel>({
    entityBaseUrl: "TRANSACTIONS",
    queryKey: QUERY_KEYS.TRANSACTIONS.LIST,
  });

  return (
    <EntityList
      entityBaseUrl="TRANSACTIONS"
      entityColumns={transactionsColumns}
      entityListQuery={transactionsQuery}
      entityName="Transações"
      removeAddButton
    />
  );
}

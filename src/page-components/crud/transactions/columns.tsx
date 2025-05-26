"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TableRowPrimaryText } from "~/components/crud/table-components/table-row-primary-text/table-row-primary-text";
import { TransactionModel } from "./types/transaction-model";
import { formatCurrency } from "~/helpers/currency-formatter";
import { formatDate } from "~/helpers/format-date";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export const transactionsColumns: ColumnDef<TransactionModel>[] = [
  {
    accessorKey: "message",
    header: "Tipo de Transação",
    cell: (info) => {
      return (
        <TableRowPrimaryText>
          {info.getValue<string>() || "--"}
        </TableRowPrimaryText>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Valor da Transação",
    cell: (info) => {
      return <span>{formatCurrency(info.getValue<number>())}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Data de Criação",
    cell: (info) => {
      return (
        <span>
          {formatDate({
            date: info.getValue<string>(),
            addHours: true,
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;

      if (!transaction.id) return <></>;

      return (
        <Button variant="link" className="underline">
          <Link href={`/transactions/view/${transaction.id}`}>Visualizar</Link>
        </Button>
      );
    },
  },
];

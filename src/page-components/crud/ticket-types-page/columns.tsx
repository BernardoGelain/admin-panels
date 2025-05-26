"use client";

import { ColumnDef } from "@tanstack/react-table";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { EntityTableActions } from "~/components/crud/entity-table-actions/entity-table-actions";
import { TableRowPrimaryText } from "~/components/crud/table-components/table-row-primary-text/table-row-primary-text";
import { TicketTypeModel } from "./types/ticket-type-model";
import { formatCurrency } from "~/helpers/currency-formatter";

export const ticketTypesColumns: ColumnDef<TicketTypeModel>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: (info) => {
      return (
        <TableRowPrimaryText>{info.getValue<string>()}</TableRowPrimaryText>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: (info) => {
      return <span>{formatCurrency(info.getValue<number>())}</span>;
    },
  },
  {
    accessorKey: "organization.name",
    header: "Organizadora",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ticketType = row.original;

      if (!ticketType.id) return <></>;

      return (
        <EntityTableActions
          deleteSuccessMessage="Tipo de ingresso excluído com sucesso!"
          entityId={ticketType.id}
          entityUrl="TICKET_TYPES"
          queryKey={QUERY_KEYS.TICKET_TYPES.LIST}
        />
      );
    },
  },
];

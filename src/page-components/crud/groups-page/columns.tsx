"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GroupModel } from "./types/group-model";
import { TableRowPrimaryText } from "~/components/crud/table-components/table-row-primary-text/table-row-primary-text";
import { EntityTableActions } from "~/components/crud/entity-table-actions/entity-table-actions";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { Badge } from "~/components/ui/badge";

export const groupColumns: ColumnDef<GroupModel>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: (info) => <TableRowPrimaryText>{info.getValue<string>()}</TableRowPrimaryText>,
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: (info) => info.getValue<string>() ?? "—",
  },
  {
    accessorKey: "panels",
    header: "Painéis",
    cell: ({ row }) => {
      const panels = row.original.panels;

      if (!panels?.length) {
        return <span className="text-muted-foreground">Nenhum painel</span>;
      }

      return (
        <div className="flex flex-wrap gap-2">
          {panels.map((panel) => (
            <Badge key={panel.id} variant="outline">
              {panel.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const group = row.original;

      return (
        <EntityTableActions
          entityId={group.id}
          entityUrl="GROUPS"
          queryKey={QUERY_KEYS.GROUPS.LIST}
          deleteSuccessMessage="Grupo excluído com sucesso!"
        />
      );
    },
  },
];

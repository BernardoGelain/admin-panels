"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MessageModel } from "./types/message-model";
import { TableRowPrimaryText } from "~/components/crud/table-components/table-row-primary-text/table-row-primary-text";
import { EntityTableActions } from "~/components/crud/entity-table-actions/entity-table-actions";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { Badge } from "~/components/ui/badge";

export const messageColumns: ColumnDef<MessageModel>[] = [
  {
    accessorKey: "content",
    header: "Mensagem",
    cell: (info) => <TableRowPrimaryText>{info.getValue<string>()}</TableRowPrimaryText>,
  },
  {
    accessorKey: "groups",
    header: "Grupos",
    cell: ({ row }) => {
      const groups = row.original.groups;

      if (!groups?.length) return <span className="text-muted">Nenhum grupo</span>;

      return (
        <div className="flex flex-wrap gap-1">
          {groups.map((group) => (
            <Badge key={group.id} variant="secondary">
              {group.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "panels",
    header: "Paineis",
    cell: ({ row }) => {
      const panels = row.original.panels;

      if (!panels?.length) return <span className="text-muted">Nenhum painel</span>;

      return (
        <div className="flex flex-wrap gap-1">
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
      const message = row.original;

      if (!message.id) return null;

      return (
        <EntityTableActions
          entityId={message.id}
          entityUrl="MESSAGES"
          queryKey={QUERY_KEYS.MESSAGES.LIST}
          deleteSuccessMessage="Mensagem excluída com sucesso!"
        />
      );
    },
  },
];

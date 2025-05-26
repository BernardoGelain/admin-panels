"use client";

import { ColumnDef } from "@tanstack/react-table";

import { EntityTableActions } from "~/components/crud/entity-table-actions/entity-table-actions";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { TableRowPrimaryText } from "~/components/crud/table-components/table-row-primary-text/table-row-primary-text";
import { PanelModel } from "./types/panel-model";

export const panelColumns: ColumnDef<PanelModel>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: (info) => <TableRowPrimaryText>{info.getValue<string>()}</TableRowPrimaryText>,
  },
  {
    accessorKey: "groupId",
    header: "Grupo",
    cell: (info) => info.getValue<number | undefined>() ?? "—",
  },
  {
    accessorKey: "location.lat",
    header: "Latitude",
    cell: (info) => info.getValue<string>() ?? "—",
  },
  {
    accessorKey: "location.long",
    header: "Longitude",
    cell: (info) => info.getValue<string>() ?? "—",
  },
  {
    accessorKey: "location",
    header: "Localização",
    cell: ({ row }) => {
      const lat = row.original.location?.lat;
      const long = row.original.location?.long;

      if (!lat || !long) {
        return <span className="text-gray-500">Coordenadas não disponíveis</span>;
      }

      const mapsUrl = `https://www.google.com/maps?q=${lat},${long}`;
      return (
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline">
          Ver no Google Maps
        </a>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const panel = row.original;

      if (!panel.id) return null;

      return (
        <EntityTableActions
          deleteSuccessMessage="Painel excluído com sucesso!"
          entityId={panel.id}
          entityUrl="PANELS"
          queryKey={QUERY_KEYS.PANELS.LIST}
        />
      );
    },
  },
];

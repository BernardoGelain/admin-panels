"use client";
import { EntityList } from "~/components/crud/entity-list/entity-list";
import { ticketTypesColumns } from "./columns";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { TicketTypeModel } from "./types/ticket-type-model";

export function TicketTypesPage() {
  const ticketTypesQuery = useGetEntityList<TicketTypeModel>({
    entityBaseUrl: "TICKET_TYPES",
    queryKey: QUERY_KEYS.TICKET_TYPES.LIST,
  });

  return (
    <EntityList
      entityBaseUrl="TICKET_TYPES"
      entityColumns={ticketTypesColumns}
      entityListQuery={ticketTypesQuery}
      entityName="Tipos de Ingresso"
    />
  );
}

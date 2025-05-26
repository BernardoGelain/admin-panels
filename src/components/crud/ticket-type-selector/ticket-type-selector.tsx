import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { EntitySelector } from "~/components/crud/entity-selector/entity-selector";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { useDebounce } from "~/hooks/use-debounce";
import { TicketTypeModel } from "~/page-components/crud/ticket-types-page/types/ticket-type-model";
import { QUERY_KEYS } from "~/query-keys/query-keys";

export function TicketTypeSelector() {
  const form = useFormContext();

  const ticketTypeName = form.watch("ticketTypeName");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const ticketTypeQuery = useGetEntityList<TicketTypeModel>({
    entityBaseUrl: "TICKET_TYPES",
    queryKey: QUERY_KEYS.TICKET_TYPES.LIST,
    keywords: debouncedSearch || ticketTypeName,
  });

  const options = ticketTypeQuery.data?.body.items.map((ticketType) => ({
    label: ticketType.name,
    value: String(ticketType.id),
  }));

  return (
    <EntitySelector
      onSearch={setSearch}
      search={search || ticketTypeName}
      fieldName="ticketTypeId"
      label="Tipo de Ingresso"
      isLoading={ticketTypeQuery.isLoading}
      options={options ?? []}
    />
  );
}

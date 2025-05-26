import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { EntitySelector } from "~/components/crud/entity-selector/entity-selector";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { useDebounce } from "~/hooks/use-debounce";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { EventModel } from "~/types/entities/event-model";

export function EventsSelector() {
  const form = useFormContext();

  const eventName = form.watch("eventName");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const eventsQuery = useGetEntityList<EventModel>({
    entityBaseUrl: "EVENTS",
    queryKey: QUERY_KEYS.EVENTS.LIST,
    keywords: debouncedSearch || eventName,
  });

  const options = eventsQuery.data?.body.items.map((event) => ({
    label: event.name,
    value: String(event.id),
  }));

  return (
    <EntitySelector
      onSearch={setSearch}
      search={search || eventName}
      fieldName="eventId"
      label="Evento"
      isLoading={eventsQuery.isLoading}
      options={options ?? []}
    />
  );
}

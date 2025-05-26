import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { EntitySelector } from "~/components/crud/entity-selector/entity-selector";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { useDebounce } from "~/hooks/use-debounce";
import { ShowTimeModel } from "~/page-components/crud/showtimes-page/types/showtime-model";
import { QUERY_KEYS } from "~/query-keys/query-keys";

export function ShowtimeSelector() {
  const form = useFormContext();

  const showtimeName = form.watch("showtimeName");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const showtimeQuery = useGetEntityList<ShowTimeModel>({
    entityBaseUrl: "SHOWTIMES",
    queryKey: QUERY_KEYS.SHOW_TIMES.LIST,
    keywords: debouncedSearch || showtimeName,
  });

  const options = showtimeQuery.data?.body.items.map((showtime) => ({
    label: showtime.event.name,
    value: String(showtime.id),
  }));

  return (
    <EntitySelector
      onSearch={setSearch}
      search={search || showtimeName}
      fieldName="showtimeId"
      label="Sessão do Evento"
      isLoading={showtimeQuery.isLoading}
      options={options ?? []}
    />
  );
}

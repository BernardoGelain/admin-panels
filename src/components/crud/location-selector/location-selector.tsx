import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { EntitySelector } from "~/components/crud/entity-selector/entity-selector";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { useDebounce } from "~/hooks/use-debounce";
import { LocationModel } from "~/page-components/crud/locations-page/types/locations-model";
import { QUERY_KEYS } from "~/query-keys/query-keys";

export function LocationSelector() {
  const form = useFormContext();

  const locationName = form.watch("locationName");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const locationsQuery = useGetEntityList<LocationModel>({
    entityBaseUrl: "LOCATIONS",
    queryKey: QUERY_KEYS.LOCATIONS.LIST,
    keywords: debouncedSearch || locationName,
  });

  const options = locationsQuery.data?.body.items.map((location) => ({
    label: location.name,
    value: String(location.id),
  }));

  return (
    <EntitySelector
      onSearch={setSearch}
      search={search || locationName}
      fieldName="locationId"
      label="Local"
      isLoading={locationsQuery.isLoading}
      options={options ?? []}
    />
  );
}

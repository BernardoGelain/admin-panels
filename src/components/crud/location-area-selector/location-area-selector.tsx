import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { EntitySelector } from "~/components/crud/entity-selector/entity-selector";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { useDebounce } from "~/hooks/use-debounce";
import { LocationAreaModel } from "~/page-components/crud/location-areas-page/types/location-area-model";
import { QUERY_KEYS } from "~/query-keys/query-keys";

export function LocationAreaSelector() {
  const form = useFormContext();

  const locationAreaName = form.watch("locationAreaName");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const locationAreaQuery = useGetEntityList<LocationAreaModel>({
    entityBaseUrl: "LOCATION_AREAS",
    queryKey: QUERY_KEYS.LOCATION_AREAS.LIST,
    keywords: debouncedSearch || locationAreaName,
  });

  const options = locationAreaQuery.data?.body.items.map((locationArea) => ({
    label: locationArea.name,
    value: String(locationArea.id),
  }));

  return (
    <EntitySelector
      onSearch={setSearch}
      search={search || locationAreaName}
      fieldName="areaId"
      label="Setor"
      isLoading={locationAreaQuery.isLoading}
      options={options ?? []}
    />
  );
}

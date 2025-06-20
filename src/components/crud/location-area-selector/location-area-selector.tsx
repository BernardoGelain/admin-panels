import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { EntitySelector } from "~/components/crud/entity-selector/entity-selector";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { useDebounce } from "~/hooks/use-debounce";
import { GroupModel } from "~/page-components/crud/groups-page/types/group-model";

import { QUERY_KEYS } from "~/query-keys/query-keys";

export function LocationAreaSelector() {
  const form = useFormContext();

  const locationAreaName = form.watch("locationAreaName");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const locationAreaQuery = useGetEntityList<GroupModel>({
    entityBaseUrl: "GROUPS",
    queryKey: QUERY_KEYS.GROUPS.LIST,
    keywords: debouncedSearch || locationAreaName,
  });

  const options = locationAreaQuery.data?.data.map((locationArea) => ({
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

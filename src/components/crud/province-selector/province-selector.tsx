import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { EntitySelector } from "~/components/crud/entity-selector/entity-selector";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { useDebounce } from "~/hooks/use-debounce";
import { ProvinceModel } from "~/page-components/crud/provinces-page/types/province-model";
import { QUERY_KEYS } from "~/query-keys/query-keys";

export function ProvinceSelector() {
  const form = useFormContext();

  const provinceName = form.watch("provinceName");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const provincesQuery = useGetEntityList<ProvinceModel>({
    entityBaseUrl: "PROVINCES",
    queryKey: QUERY_KEYS.PROVINCES.LIST,
    keywords: debouncedSearch || provinceName,
  });

  const options = provincesQuery.data?.body.items.map((province) => ({
    label: province.name,
    value: String(province.id),
  }));

  return (
    <EntitySelector
      onSearch={setSearch}
      search={search || provinceName}
      fieldName="provinceId"
      label="Província"
      isLoading={provincesQuery.isLoading}
      options={options ?? []}
    />
  );
}

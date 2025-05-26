import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { EntitySelector } from "~/components/crud/entity-selector/entity-selector";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { useDebounce } from "~/hooks/use-debounce";
import { OrganizationModel } from "~/page-components/crud/organizations-page/types/organization-model";
import { QUERY_KEYS } from "~/query-keys/query-keys";

export function OrganizationSelector() {
  const form = useFormContext();

  const organizationName = form.watch("organizationName");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const organizationsQuery = useGetEntityList<OrganizationModel>({
    entityBaseUrl: "ORGANIZATIONS",
    queryKey: QUERY_KEYS.ORGANIZATIONS.LIST,
    keywords: debouncedSearch || organizationName,
  });

  const options = organizationsQuery.data?.body.items.map((organization) => ({
    label: organization.name,
    value: String(organization.id),
  }));

  return (
    <EntitySelector
      onSearch={setSearch}
      search={search || organizationName}
      fieldName="organizationId"
      label="Organizadora"
      isLoading={organizationsQuery.isLoading}
      options={options ?? []}
    />
  );
}

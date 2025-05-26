import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { EntitySelector } from "~/components/crud/entity-selector/entity-selector";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { useDebounce } from "~/hooks/use-debounce";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { UserModel } from "./types/user-model";

export function UserSelector() {
  const form = useFormContext();

  const userName = form.watch("userName");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const usersQuery = useGetEntityList<UserModel>({
    entityBaseUrl: "USERS",
    queryKey: QUERY_KEYS.USERS.LIST,
    keywords: debouncedSearch || userName,
  });

  const options = usersQuery.data?.body.items.map((user) => ({
    label: user.name,
    value: String(user.id),
  }));

  return (
    <EntitySelector
      onSearch={setSearch}
      search={search || userName}
      fieldName="userId"
      label="Usuário"
      isLoading={usersQuery.isLoading}
      options={options ?? []}
    />
  );
}

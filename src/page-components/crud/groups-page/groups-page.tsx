"use client";
import { EntityList } from "~/components/crud/entity-list/entity-list";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { QUERY_KEYS } from "~/query-keys/query-keys";

import { mockGroups } from "./mockGroups";
import { GroupModel } from "./types/group-model";
import { groupColumns } from "./columns";

export function GroupsPage() {
  const groupsQuery = useGetEntityList<GroupModel>({
    entityBaseUrl: "GROUPS",
    queryKey: QUERY_KEYS.GROUPS.LIST,
  });

  return <EntityList entityBaseUrl="GROUPS" entityColumns={groupColumns} entityListQuery={groupsQuery} mockData={mockGroups} entityName="Grupos" />;
}

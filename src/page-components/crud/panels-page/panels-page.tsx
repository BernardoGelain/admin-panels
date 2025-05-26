"use client";
import { EntityList } from "~/components/crud/entity-list/entity-list";

import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { PanelModel } from "./types/panel-model";
import { panelColumns } from "./columns";
import { mockPanels } from "./mock-panels";

export function PanelsPage() {
  const panelsQuery = useGetEntityList<PanelModel>({
    entityBaseUrl: "PANELS",
    queryKey: QUERY_KEYS.PANELS.LIST,
  });

  return <EntityList entityBaseUrl="PANELS" entityColumns={panelColumns} entityListQuery={panelsQuery} mockData={mockPanels} entityName="Painéis" />;
}

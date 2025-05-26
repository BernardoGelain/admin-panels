import { mockGroups } from "~/page-components/crud/groups-page/mockGroups";

export const allMockPanels = mockGroups.flatMap((group) =>
  group.panels.map((panel) => ({
    lat: Number(panel.lat),
    lng: Number(panel.long),
    label: panel.name,
  }))
);

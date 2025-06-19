import { useMemo } from "react";
import { PanelModel } from "~/page-components/crud/panels-page/types/panel-model";
import { PaginatedResponse } from "~/types/paginated-response";

type Coordinate = {
  lat: number;
  lng: number;
  label: string;
  online: boolean;
};

export const usePanelCoordinates = (panels?: PaginatedResponse<PanelModel> | undefined): Coordinate[] => {
  return useMemo(() => {
    if (!panels) return [];

    return panels.data
      .filter((panel: PanelModel) => panel.location?.lat != null && panel.location?.long != null)
      .map((panel: PanelModel) => ({
        lat: Number(panel.location.lat),
        lng: Number(panel.location.long),
        label: panel.name,
        online: panel.online,
      }));
  }, [panels]);
};

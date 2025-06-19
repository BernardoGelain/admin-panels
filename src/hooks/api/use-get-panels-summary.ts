import { useQuery } from "@tanstack/react-query";
import authorizedApi from "~/api/authorized-api";
import { QUERY_KEYS } from "~/query-keys/query-keys";

type PanelsSummary = {
  online: number;
  offline: number;
  total: number;
};

const getPanelsSummary = async () => {
  const response = await authorizedApi<PanelsSummary>("panels/summary");
  return response.data;
};

export const useGetPanelsSummary = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PANELS.SUMMARY],
    queryFn: getPanelsSummary,
  });
};

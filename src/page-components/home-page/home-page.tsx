"use client";

import { PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

import dynamic from "next/dynamic";
import { useGetPanelsSummary } from "~/hooks/api/use-get-panels-summary";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { PanelModel } from "../crud/panels-page/types/panel-model";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { usePanelCoordinates } from "~/hooks/use-panel-coordinates";

export function HomePage() {
  const { data } = useGetPanelsSummary();
  const { data: panelsData } = useGetEntityList<PanelModel>({
    entityBaseUrl: "PANELS",
    queryKey: QUERY_KEYS.PANELS.LIST,
  });
  const coordinates = usePanelCoordinates(panelsData);
  console.log(coordinates);
  const onlinePercentage = data ? (data?.online / data?.total) * 100 : 0;
  const offlinePercentage = data ? (data?.offline / data?.total) * 100 : 0;
  const Map = dynamic(() => import("~/components/map/map").then((mod) => mod.Map), {
    ssr: false,
  });
  return (
    <Card className="shadow-marcante-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-marcante-600">
          <PieChart className="h-5 w-5" />
          Status dos Painéis
        </CardTitle>
        <CardDescription>Distribuição atual dos painéis por status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Donut Chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#2076ad"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${onlinePercentage * 2.51} 251.2`}
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#94a3b8"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${offlinePercentage * 2.51} 251.2`}
                  strokeDashoffset={`-${onlinePercentage * 2.51}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-marcante-600">{data?.total}</div>
                  <div className="text-sm text-gray-500">Total</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legenda */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-marcante-600 rounded-full" />
              <div>
                <div className="text-sm font-medium">Online</div>
                <div className="text-xs text-gray-500">
                  {data?.online} painéis ({onlinePercentage.toFixed(1)}%)
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary-400 rounded-full" />
              <div>
                <div className="text-sm font-medium">Offline</div>
                <div className="text-xs text-gray-500">
                  {data?.offline} painéis ({offlinePercentage.toFixed(1)}%)
                </div>
              </div>
            </div>
          </div>

          {/* Barras de status */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Painéis Online</span>
                <span className="font-medium">{data?.online}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-marcante-600 h-2 rounded-full transition-all duration-500" style={{ width: `${onlinePercentage}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Painéis Offline</span>
                <span className="font-medium">{data?.online}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-secondary-400 h-2 rounded-full transition-all duration-500" style={{ width: `${offlinePercentage}%` }} />
              </div>
            </div>
          </div>

          {/* Mapa com todos os painéis */}
          <div className="pt-6">
            <h3 className="text-base font-semibold mb-2 text-foreground">Localização dos painéis</h3>
            <div className="h-[400px] w-full rounded-md overflow-hidden border">
              {coordinates?.length > 0 && <Map multiplePoints={coordinates} />}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

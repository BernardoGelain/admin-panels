"use client";

import { PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Map } from "~/components/map/map";
import { mockGroups } from "~/page-components/crud/groups-page/mockGroups";

const mockData = {
  online: 28,
  offline: 12,
  total: 40,
};

// Extrair todos os painéis com posição
const allMockPanels = mockGroups.flatMap((group) =>
  group.panels.map((panel) => ({
    lat: Number(panel.lat),
    lng: Number(panel.long),
    label: panel.name,
  }))
);

export function HomePage() {
  const { online, offline, total } = mockData;
  const onlinePercentage = (online / total) * 100;
  const offlinePercentage = (offline / total) * 100;

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
                  stroke="#ef4444"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${offlinePercentage * 2.51} 251.2`}
                  strokeDashoffset={`-${onlinePercentage * 2.51}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-marcante-600">{total}</div>
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
                  {online} painéis ({onlinePercentage.toFixed(1)}%)
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error-500 rounded-full" />
              <div>
                <div className="text-sm font-medium">Offline</div>
                <div className="text-xs text-gray-500">
                  {offline} painéis ({offlinePercentage.toFixed(1)}%)
                </div>
              </div>
            </div>
          </div>

          {/* Barras de status */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Painéis Online</span>
                <span className="font-medium">{online}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-marcante-600 h-2 rounded-full transition-all duration-500" style={{ width: `${onlinePercentage}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Painéis Offline</span>
                <span className="font-medium">{offline}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-error-500 h-2 rounded-full transition-all duration-500" style={{ width: `${offlinePercentage}%` }} />
              </div>
            </div>
          </div>

          {/* Mapa com todos os painéis */}
          <div className="pt-6">
            <h3 className="text-base font-semibold mb-2 text-foreground">Localização dos painéis</h3>
            <div className="h-[400px] w-full rounded-md overflow-hidden border">
              <Map multiplePoints={allMockPanels} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

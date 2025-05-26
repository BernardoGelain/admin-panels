import { GroupModel } from "./types/group-model";

export const mockGroups: GroupModel[] = [
  {
    id: 1,
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-10T12:00:00Z",
    name: "Grupo A",
    description: "Painéis da região central",
    panels: [
      {
        id: 1,
        name: "Painel Central",
        lat: "-23.550520",
        long: "-46.633308",
      },
      {
        id: 2,
        name: "Painel Leste",
        lat: "-23.559616",
        long: "-46.658842",
      },
    ],
  },
  {
    id: 2,
    createdAt: "2025-04-15T09:00:00Z",
    updatedAt: "2025-04-20T16:00:00Z",
    name: "Grupo B",
    description: "Painéis da zona norte",
    panels: [
      {
        id: 3,
        name: "Painel Norte",
        lat: "-23.520400",
        long: "-46.612200",
      },
    ],
  },
  {
    id: 3,
    createdAt: "2025-03-30T14:00:00Z",
    updatedAt: "2025-04-05T08:30:00Z",
    name: "Grupo C",
    description: "Painéis da zona sul",
    panels: [
      {
        id: 4,
        name: "Painel Sul",
        lat: "-23.579900",
        long: "-46.635900",
      },
      {
        id: 5,
        name: "Painel Oeste",
        lat: "-23.564000",
        long: "-46.654000",
      },
      {
        id: 6,
        name: "Painel Liberdade",
        lat: "-23.556700",
        long: "-46.635300",
      },
    ],
  },
];

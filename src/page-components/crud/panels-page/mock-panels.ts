import { PanelModel } from "./types/city-model";

export const mockPanels: PanelModel[] = [
  {
    id: 1,
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-10T15:30:00Z",
    name: "Painel Central",
    groupId: 1,
    location: {
      street: "Av. Central, 123",
      lat: "-23.550520",
      long: "-46.633308",
      point: {
        type: "Point",
        coordinates: [-46.633308, -23.55052],
      },
    },
  },
  {
    id: 2,
    createdAt: "2025-04-22T11:20:00Z",
    updatedAt: "2025-05-03T09:15:00Z",
    name: "Painel Leste",
    groupId: 2,
    location: {
      street: "Rua das Palmeiras, 456",
      lat: "-23.559616",
      long: "-46.658842",
      point: {
        type: "Point",
        coordinates: [-46.658842, -23.559616],
      },
    },
  },
  {
    id: 3,
    createdAt: "2025-04-15T09:40:00Z",
    updatedAt: "2025-04-28T17:00:00Z",
    name: "Painel Norte",
    location: {
      street: "Av. Brasil, 789",
      lat: "-23.520400",
      long: "-46.612200",
      point: {
        type: "Point",
        coordinates: [-46.6122, -23.5204],
      },
    },
  },
  {
    id: 4,
    createdAt: "2025-04-10T08:30:00Z",
    updatedAt: "2025-05-01T14:10:00Z",
    name: "Painel Sul",
    groupId: 1,
    location: {
      street: "Rua dos Andradas, 101",
      lat: "-23.579900",
      long: "-46.635900",
      point: {
        type: "Point",
        coordinates: [-46.6359, -23.5799],
      },
    },
  },
  {
    id: 5,
    createdAt: "2025-03-25T13:50:00Z",
    updatedAt: "2025-04-10T18:25:00Z",
    name: "Painel Oeste",
    groupId: 3,
    location: {
      street: "Av. das Nações, 202",
      lat: "-23.564000",
      long: "-46.654000",
      point: {
        type: "Point",
        coordinates: [-46.654, -23.564],
      },
    },
  },
  {
    id: 6,
    createdAt: "2025-03-15T12:20:00Z",
    updatedAt: "2025-04-05T10:45:00Z",
    name: "Painel Liberdade",
    groupId: 2,
    location: {
      street: "Rua Galvão Bueno, 303",
      lat: "-23.556700",
      long: "-46.635300",
      point: {
        type: "Point",
        coordinates: [-46.6353, -23.5567],
      },
    },
  },
  {
    id: 7,
    createdAt: "2025-03-10T14:10:00Z",
    updatedAt: "2025-03-30T12:05:00Z",
    name: "Painel Paulista",
    location: {
      street: "Av. Paulista, 1578",
      lat: "-23.561414",
      long: "-46.655881",
      point: {
        type: "Point",
        coordinates: [-46.655881, -23.561414],
      },
    },
  },
  {
    id: 8,
    createdAt: "2025-02-20T09:00:00Z",
    updatedAt: "2025-03-18T16:40:00Z",
    name: "Painel Moema",
    groupId: 1,
    location: {
      street: "Av. Ibirapuera, 221",
      lat: "-23.603409",
      long: "-46.670601",
      point: {
        type: "Point",
        coordinates: [-46.670601, -23.603409],
      },
    },
  },
  {
    id: 9,
    createdAt: "2025-01-15T08:15:00Z",
    updatedAt: "2025-02-25T11:30:00Z",
    name: "Painel Pinheiros",
    groupId: 3,
    location: {
      street: "Rua dos Pinheiros, 900",
      lat: "-23.564960",
      long: "-46.694710",
      point: {
        type: "Point",
        coordinates: [-46.69471, -23.56496],
      },
    },
  },
  {
    id: 10,
    createdAt: "2025-01-01T07:45:00Z",
    updatedAt: "2025-01-30T14:00:00Z",
    name: "Painel Vila Madalena",
    location: {
      street: "Rua Harmonia, 777",
      lat: "-23.561700",
      long: "-46.699200",
      point: {
        type: "Point",
        coordinates: [-46.6992, -23.5617],
      },
    },
  },
];

import { MessageModel } from "./types/message-model";

export const mockMessages: MessageModel[] = [
  {
    id: 1,
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-05T14:00:00Z",
    content: "Atenção! Manutenção programada amanhã às 10h.",
    panels: [
      { id: 1, name: "Painel Central" },
      { id: 2, name: "Painel Leste" },
    ],
    groups: [{ id: 1, name: "Grupo A" }],
  },
  {
    id: 2,
    createdAt: "2025-04-28T09:30:00Z",
    updatedAt: "2025-05-01T11:15:00Z",
    content: "Bem-vindos ao nosso novo sistema!",
    panels: [{ id: 3, name: "Painel Norte" }],
    groups: [],
  },
  {
    id: 3,
    createdAt: "2025-04-20T12:00:00Z",
    updatedAt: "2025-04-30T16:45:00Z",
    content: "Evento especial neste final de semana!",
    panels: [],
    groups: [
      { id: 2, name: "Grupo B" },
      { id: 3, name: "Grupo C" },
    ],
  },
  {
    id: 4,
    createdAt: "2025-04-15T08:45:00Z",
    updatedAt: "2025-04-22T10:30:00Z",
    content: "Evite filas: agende seu atendimento com antecedência.",
    panels: [
      { id: 4, name: "Painel Sul" },
      { id: 5, name: "Painel Oeste" },
      { id: 6, name: "Painel Liberdade" },
    ],
    groups: [],
  },
  {
    id: 5,
    createdAt: "2025-04-10T13:00:00Z",
    updatedAt: "2025-04-18T15:20:00Z",
    content: "Mensagem exclusiva para grupos internos.",
    panels: [],
    groups: [{ id: 4, name: "Grupo Interno" }],
  },
];

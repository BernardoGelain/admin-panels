export type MessageModel = {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  panels: Array<{
    id: number;
    name: string;
  }>;
  groups: Array<{
    id: number;
    name: string;
  }>;
};

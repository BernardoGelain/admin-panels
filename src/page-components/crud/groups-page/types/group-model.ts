export type GroupModel = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  panels: Array<{
    id: number;
    name: string;
    lat: string;
    long: string;
  }>;
};

export type PanelModel = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  groupId?: number;
  location: {
    street: string;
    lat: string;
    long: string;
    point: {
      type: "Point";
      coordinates: [number, number];
    };
  };
};

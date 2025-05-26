export type TicketTypeModel = {
  id: number;
  name: string;
  price: number;
  organizationId: number;
  ticketType: "APP" | "PRINT";
  ticketwithdraw: string;
  organization: {
    id: number;
    name: string;
  };
};

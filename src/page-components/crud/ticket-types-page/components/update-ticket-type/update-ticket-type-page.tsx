import { TicketTypeForm } from "../create-new-ticket-type/components/ticket-type-form/ticket-type-form";

export function UpdateTicketTypePage({
  params: { ticketTypeId },
}: {
  params: { ticketTypeId: string };
}) {
  return <TicketTypeForm ticketTypeId={ticketTypeId} />;
}

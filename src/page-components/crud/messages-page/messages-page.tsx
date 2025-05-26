"use client";
import { EntityList } from "~/components/crud/entity-list/entity-list";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { MessageModel } from "./types/message-model";
import { messageColumns } from "./columns";
import { mockMessages } from "./mockMessages";

export function MessagesPage() {
  const messagessQuery = useGetEntityList<MessageModel>({
    entityBaseUrl: "MESSAGES",
    queryKey: QUERY_KEYS.MESSAGES.LIST,
  });

  return (
    <EntityList
      entityBaseUrl="MESSAGES"
      entityColumns={messageColumns}
      entityListQuery={messagessQuery}
      mockData={mockMessages}
      entityName="Mensagens"
    />
  );
}

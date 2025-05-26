import { MessageForm } from "../create-new-message/components/message-form/message-form";

export function UpdateMessagePage({ params: { messageId } }: { params: { messageId: string } }) {
  return <MessageForm messageId={messageId} />;
}

import { Metadata } from "next";
import { MessagesPage } from "~/page-components/crud/messages-page/messages-page";

export const metadata: Metadata = {
  title: "Mensagens",
};

export default function Page() {
  return <MessagesPage />;
}

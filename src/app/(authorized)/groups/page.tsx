import { Metadata } from "next";
import { GroupsPage } from "~/page-components/crud/groups-page/groups-page";

export const metadata: Metadata = {
  title: "Grupos",
};

export default function Page() {
  return <GroupsPage />;
}

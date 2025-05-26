import { Metadata } from "next";
import { PanelsPage } from "~/page-components/crud/panels-page/panels-page";

export const metadata: Metadata = {
  title: "Cidades",
};

export default function Page() {
  return <PanelsPage />;
}

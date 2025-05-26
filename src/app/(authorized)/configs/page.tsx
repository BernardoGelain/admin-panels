import { Metadata } from "next";
import { UpdateConfigPage } from "~/page-components/crud/config-page/components/update-config-form/update-config-page";

export const metadata: Metadata = {
  title: "Configurações Gerais",
};

export default function Page() {
  return <UpdateConfigPage />;
}

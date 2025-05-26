import { Metadata } from "next";
import { AboutPage } from "~/page-components/crud/about-page/about-page";

export const metadata: Metadata = {
  title: "Sobre o aplicativo",
};

export default function Page() {
  return <AboutPage />;
}

import "./globals.css";
import Providers from "~/providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "~/components/ui/sonner";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.className} antialiased overflow-hidden`}>
        <Providers>
          <ReactQueryDevtools initialIsOpen={false} />
          <main className="antialiased">{children}</main>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}

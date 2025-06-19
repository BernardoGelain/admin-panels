"use client";

import { ArrowLeftIcon, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "~/components/header/header";
import { Sidebar } from "~/components/side-menu/side-menu";
import { Button } from "~/components/ui/button";
import withSuspense from "~/hoc/with-suspense";
import { cn } from "~/lib/utils";

function AuthorizedLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-shrink-0 w-full relative">
        <Header />
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex flex-grow overflow-hidden">
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 lg:relative lg:flex-shrink-0",
            "transform transition-transform duration-300 ease-in-out",
            "bg-background",
            "lg:transform-none",
            isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-16"
          )}
        >
          <Sidebar isCollapsed={!isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        {isSidebarOpen && <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

        <main className="flex-grow p-4 lg:p-8 overflow-y-auto w-full">
          {router.back && (
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4 flex gap-2">
              <ArrowLeftIcon size={16} />
              Voltar
            </Button>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

export default withSuspense(AuthorizedLayout);

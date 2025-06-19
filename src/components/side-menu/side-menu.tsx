"use client";

import { usePathname } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { MenuItem } from "./components/menu-item/menu-item";
import { menuStructure } from "./menu-items";
import { Button } from "../ui/button";
import { PanelLeftCloseIcon, PanelLeftIcon, X } from "lucide-react";
import { cn } from "~/lib/utils";

type SidebarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
};

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-full border-r ">
      <div className="px-3 py-2 border-b flex items-center justify-between">
        {!isCollapsed && <span className="font-semibold">Menu</span>}
        <Button
          variant="ghost"
          size="sm"
          className={cn("hidden lg:flex", isCollapsed ? "w-full justify-center" : "w-full justify-end")}
          onClick={onToggle}
        >
          {isCollapsed ? <PanelLeftIcon className="h-4 w-4" /> : <PanelLeftCloseIcon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={onToggle}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4 py-4 px-2">
        {menuStructure.map((item, index) => (
          <MenuItem key={index} {...item} currentPath={pathname} isCollapsed={isCollapsed} />
        ))}
      </div>
    </ScrollArea>
  );
}

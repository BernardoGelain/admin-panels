import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type MenuItemType = {
  label: string;
  href?: string;
  subItems?: MenuItemType[];
  icon?: React.ReactNode;
};

type Props = MenuItemType & {
  currentPath: string;
  isCollapsed: boolean;
};

export function MenuItem({
  label,
  subItems,
  href,
  currentPath,
  isCollapsed,
  icon,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (itemHref: string) => currentPath === itemHref;

  const hasActiveChild = (items: MenuItemType[]): boolean => {
    return items.some(
      (item) =>
        isActive(item.href || "") ||
        (item.subItems && hasActiveChild(item.subItems))
    );
  };

  const isCurrentItemActive = href
    ? isActive(href)
    : subItems
    ? hasActiveChild(subItems)
    : false;
  const isLeafItem = !subItems || subItems.length === 0;

  useEffect(() => {
    if (isCurrentItemActive && !isLeafItem && !isCollapsed) {
      setIsOpen(true);
    }
  }, [isCurrentItemActive, isLeafItem, isCollapsed]);

  useEffect(() => {
    if (isCollapsed) {
      setIsOpen(false);
    }
  }, [isCollapsed]);

  const buttonClasses = cn(
    "w-full",
    isCollapsed ? "justify-center p-2" : "justify-start",
    "text-sm lg:text-base",
    isCurrentItemActive && !isLeafItem && "bg-primary !text-white",
    isCurrentItemActive && "text-primary font-semibold"
  );

  return (
    <div>
      {href ? (
        <Link href={href} passHref>
          <Button
            variant="ghost"
            className={buttonClasses}
            title={isCollapsed ? label : undefined}
          >
            {icon}
            {!isCollapsed && (
              <span className="ml-2 text-wrap text-left max-w-md">{label}</span>
            )}
          </Button>
        </Link>
      ) : (
        <Button
          variant="ghost"
          className={buttonClasses}
          onClick={() => !isCollapsed && setIsOpen(!isOpen)}
          title={isCollapsed ? label : undefined}
        >
          {icon}
          {!isCollapsed && (
            <>
              <span className="ml-2 text-wrap text-left max-w-md">{label}</span>
              {subItems && (
                <span className="ml-auto">
                  {isOpen ? (
                    <ChevronDownIcon size={16} />
                  ) : (
                    <ChevronRightIcon size={16} />
                  )}
                </span>
              )}
            </>
          )}
        </Button>
      )}
      {isOpen && subItems && !isCollapsed && (
        <div className="ml-4 mt-1 space-y-1">
          {subItems.map((subItem, index) => (
            <MenuItem
              key={index}
              {...subItem}
              currentPath={currentPath}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
}

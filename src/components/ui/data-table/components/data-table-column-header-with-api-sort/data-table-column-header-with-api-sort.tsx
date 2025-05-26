import { Column } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowDownUpIcon, ArrowUpIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  fieldName: string; // Add this to specify the field name for the URL param
}

export function DataTableColumnHeaderWithApiSort<TData, TValue>({
  column,
  title,
  className,
  fieldName,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (sort: string) => {
    const params = new URLSearchParams(searchParams);

    // If the same sort is clicked again, remove it
    if (params.get("sort") === sort) {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }

    return params.toString();
  };

  const currentSort = searchParams.get("sort");
  const [currentField, currentDirection] = currentSort?.split(":") || [];
  const isCurrentField = currentField === fieldName;

  const handleSort = (direction: "asc" | "desc") => {
    const sort = `${fieldName}.${direction}`;
    const queryString = createQueryString(sort);
    router.push(`${pathname}?${queryString}`);
  };

  if (!column.getCanSort()) {
    return <div className={className}>{title}</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {isCurrentField && currentDirection === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : isCurrentField && currentDirection === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownUpIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleSort("asc")}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort("desc")}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useGetWhoAmI } from "~/hooks/api/use-get-who-am-i";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { APP_ROUTES } from "~/config/app-routes";

export function AvatarMenu() {
  const whoAmIQuery = useGetWhoAmI();
  const router = useRouter();
  const queryClient = useQueryClient();

  const user = whoAmIQuery.data?.body;

  const onLogout = () => {
    fetch("/logout").then(() => {
      queryClient.clear();
      router.push(APP_ROUTES.LOGIN);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar className="h-6 w-6">
            <AvatarImage src={user?.image} alt={user?.name} />
            <AvatarFallback>
              {user?.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuLabel className="-mt-3 text-xs font-normal">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

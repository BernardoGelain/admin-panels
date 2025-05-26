import { LayoutDashboard, MessageSquareMore, MonitorSmartphone, Phone, Table2 } from "lucide-react";
import { APP_ROUTES } from "~/config/app-routes";

// keep not-ready menus commented out, that way we can monitor what is done.

export const menuStructure = [
  {
    label: "Dashboard",
    href: APP_ROUTES.HOME,
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    label: "Painéis",
    icon: <MonitorSmartphone className="h-4 w-4" />,
    subItems: [
      {
        label: "Grupos",
        href: APP_ROUTES.GROUPS,
      },
      {
        label: "Painéis",
        href: APP_ROUTES.PANELS,
      },
    ],
  },
  {
    label: "Mensagens",

    icon: <MessageSquareMore className="h-4 w-4" />,
    subItems: [
      {
        label: "Plano de mensagens",
        href: APP_ROUTES.MESSAGES,
      },
      {
        label: "Configurações",
        href: APP_ROUTES.MESSAGES,
      },
    ],
  },
  {
    label: "Relatórios",

    icon: <Table2 className="h-4 w-4" />,
  },
  {
    label: "Suporte",
    href: APP_ROUTES.CONFIGS,
    icon: <Phone className="h-4 w-4" />,
  },
];

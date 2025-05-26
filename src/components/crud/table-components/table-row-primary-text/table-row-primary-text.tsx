import { ReactNode } from "react";

export function TableRowPrimaryText({ children }: { children: ReactNode }) {
  return <span className="text-primary font-semibold">{children}</span>;
}

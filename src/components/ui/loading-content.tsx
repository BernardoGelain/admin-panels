import { Loader2Icon } from "lucide-react";

export function LoadingContent({
  title = "Carregando...",
}: {
  title?: string;
}) {
  return (
    <div className="flex items-center gap-4 justify-center p-32">
      {title}
      <Loader2Icon className="h-6 w-6 animate-spin rounded-full stroke-secondary-foreground" />
    </div>
  );
}

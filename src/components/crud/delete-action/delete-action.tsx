import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useDeleteEntityMutation } from "~/components/crud/delete-action/hooks/use-delete-entity-mutation";

type Props = {
  entityId: number;
  queryKey: string;
  successMessage: string;
  baseUrl: string;
};

export function DeleteEntityAction({
  entityId,
  queryKey,
  successMessage,
  baseUrl,
}: Props) {
  const deleteEntityMutation = useDeleteEntityMutation({
    queryKey,
    successMessage,
  });

  return (
    <DropdownMenuItem
      onClick={() => deleteEntityMutation.mutateAsync({ baseUrl, entityId })}
    >
      Deletar
    </DropdownMenuItem>
  );
}

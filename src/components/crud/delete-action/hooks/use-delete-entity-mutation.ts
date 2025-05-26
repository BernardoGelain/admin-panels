import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import authorizedApi from "~/api/authorized-api";

interface DeleteEntityParams {
  entityId: number;
  baseUrl: string;
}

async function deleteEntity(params: DeleteEntityParams) {
  const response = await authorizedApi.delete(
    `/${params.baseUrl}/${params.entityId}`
  );
  return response;
}

type UseDeleteEntityMutationParams = {
  queryKey: string;
  successMessage: string;
};

export const useDeleteEntityMutation = ({
  queryKey,
  successMessage,
}: UseDeleteEntityMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEntity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      toast.success(successMessage);
    },
  });
};

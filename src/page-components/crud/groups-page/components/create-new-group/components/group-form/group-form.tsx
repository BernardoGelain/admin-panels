"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSubmitButton } from "~/components/form/form-submit-button/form-submit-button";
import { LoadingContent } from "~/components/ui/loading-content";
import { useGetEntityDetails } from "~/hooks/api/crud/use-get-entity-details";
import { useCreateEntityMutation } from "~/hooks/api/crud/use-create-entity-mutation";
import { useUpdateEntityMutation } from "~/hooks/api/crud/use-update-entity-mutation";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { ControlledTextInput } from "~/components/form/controlled-input/controlled-input";
import { MultiEntitySelector } from "~/components/crud/entity-multi-selector/entity-multi-selector";
import { GroupModel } from "~/page-components/crud/groups-page/types/group-model";
import { GroupFormValidation, GroupFormValues } from "./validation/group-form-validation";
import { Map } from "~/components/map/map";
type GroupFormPayload = {
  name: string;
  description: string;
  panelIds: number[];
};
export function GroupForm({ groupId }: { groupId?: string }) {
  const createMutation = useCreateEntityMutation<Partial<GroupModel>>({
    queryKey: "GROUPS",
    redirectPath: "GROUPS",
    route: "GROUPS",
    successMessage: "Grupo criado com sucesso",
  });

  const updateMutation = useUpdateEntityMutation<Partial<GroupModel>>({
    queryKey: "GROUPS",
    redirectPath: "GROUPS",
    route: "GROUPS",
    successMessage: "Grupo atualizado com sucesso",
  });

  const groupDetailsQuery = useGetEntityDetails<GroupModel>({
    entityId: Number(groupId),
    enabled: !!groupId,
    entityBaseUrl: "GROUPS",
    queryKey: QUERY_KEYS.GROUPS.DETAILS,
  });

  const groupForm = useForm<GroupFormPayload>({
    resolver: zodResolver(GroupFormValidation),
    mode: "all",
    values: groupDetailsQuery.data?.body && {
      name: groupDetailsQuery.data.body.name,
      description: groupDetailsQuery.data.body.description,
      panelIds: groupDetailsQuery.data.body.panels.map((p) => p.id),
    },
  });

  async function onSubmitGroupForm(data: GroupFormValues) {
    const payload: GroupFormPayload = {
      name: data.name,
      description: data.description,
      panelIds: data.panelIds ?? [],
    };

    if (groupId) {
      await updateMutation.mutateAsync({ body: payload, id: groupId });
      return;
    }

    await createMutation.mutateAsync(payload);
  }

  return (
    <div>
      {" "}
      <FormProvider {...groupForm}>
        <Card className="w-full h-max">
          <form onSubmit={groupForm.handleSubmit(onSubmitGroupForm)}>
            <CardHeader>
              <CardTitle className="text-primary">{groupId ? "Editar" : "Adicionar"} Grupo</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4" isLoading={groupDetailsQuery.isLoading} Loader={<LoadingContent />}>
              <ControlledTextInput name="name" label="Nome" />
              <ControlledTextInput name="description" label="Descrição" />
              <MultiEntitySelector
                name="panelIds"
                label="Painéis"
                options={[]} // Substituir por lista de painéis: { value, label }
                search=""
                onSearch={() => {}}
                isLoading={false}
              />
            </CardContent>

            <CardFooter>
              <FormSubmitButton>Salvar</FormSubmitButton>
            </CardFooter>
          </form>
        </Card>
      </FormProvider>{" "}
      <div className="z-0 mt-3">
        <Map
          key={1}
          multiplePoints={[
            { lat: -23.55052, lng: -46.633308, label: "Painel Central" },
            { lat: -23.559616, lng: -46.658842, label: "Painel Leste" },
            { lat: -23.5204, lng: -46.6122, label: "Painel Norte" },
            { lat: -23.5799, lng: -46.6359, label: "Painel Sul" },
            { lat: -23.564, lng: -46.654, label: "Painel Oeste" },
            { lat: -23.5567, lng: -46.6353, label: "Painel Liberdade" },
          ]}
        />
      </div>
    </div>
  );
}

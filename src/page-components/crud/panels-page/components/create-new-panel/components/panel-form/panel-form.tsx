"use client";
import { FormProvider, useForm } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormSubmitButton } from "~/components/form/form-submit-button/form-submit-button";
import { LoadingContent } from "~/components/ui/loading-content";
import { useGetEntityDetails } from "~/hooks/api/crud/use-get-entity-details";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { useCreateEntityMutation } from "~/hooks/api/crud/use-create-entity-mutation";
import { useUpdateEntityMutation } from "~/hooks/api/crud/use-update-entity-mutation";
import { ControlledTextInput } from "~/components/form/controlled-input/controlled-input";
import dynamic from "next/dynamic";
import { PanelModel } from "~/page-components/crud/panels-page/types/panel-model";
import { PanelFormValidation, PanelFormValues } from "./validation/panel-form-validation";

const Map = dynamic(() => import("~/components/map/map").then((mod) => mod.Map), {
  ssr: false,
});

export function PanelForm({ panelId }: { panelId?: string }) {
  const createPanelMutation = useCreateEntityMutation<Partial<PanelModel>>({
    queryKey: "PANELS",
    redirectPath: "PANELS",
    route: "PANELS",
    successMessage: "Painel criado com sucesso",
  });

  const updatePanelMutation = useUpdateEntityMutation<Partial<PanelModel>>({
    queryKey: "PANELS",
    redirectPath: "PANELS",
    route: "PANELS",
    successMessage: "Painel atualizado com sucesso",
  });

  const panelDetailsQuery = useGetEntityDetails<PanelModel>({
    entityId: Number(panelId),
    enabled: !!panelId,
    entityBaseUrl: "PANELS",
    queryKey: QUERY_KEYS.PANELS.DETAILS,
  });

  const panelForm = useForm<PanelFormValues>({
    resolver: zodResolver(PanelFormValidation),
    mode: "all",
    values: panelDetailsQuery.data && {
      name: panelDetailsQuery.data.name,
      street: panelDetailsQuery.data.location.street,
      lat: +panelDetailsQuery.data.location.lat,
      lng: +panelDetailsQuery.data.location.long,
    },
  });

  async function onSubmitPanelForm(data: Partial<PanelFormValues>) {
    const payload: Partial<PanelModel> = {
      name: data.name,
      location: {
        street: data.street,
        lat: String(data.lat),
        long: String(data.lng),
        point: {
          type: "Point",
          coordinates: [Number(data.lng), Number(data.lat)],
        },
      },
    };

    if (panelId) {
      await updatePanelMutation.mutateAsync({ body: payload, id: panelId });
      return;
    }

    await createPanelMutation.mutateAsync(payload);
  }

  const hasSelectedLatAndLng = panelForm.watch("lat") && panelForm.watch("lng");

  return (
    <FormProvider {...panelForm}>
      <Card className="w-full h-max">
        <form onSubmit={panelForm.handleSubmit(onSubmitPanelForm)}>
          <CardHeader>
            <CardTitle className="text-primary">{panelId ? "Editar" : "Adicionar"} Painel</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4" isLoading={panelDetailsQuery?.isLoading} Loader={<LoadingContent />}>
            <ControlledTextInput name="name" label="Nome" />
            <ControlledTextInput name="street" label="Rua" />
            <ControlledTextInput name="lat" label="Latitude" />
            <ControlledTextInput name="lng" label="Longitude" />

            <div className="z-0 mt-3">
              <Map
                key={panelForm.watch("lat") + panelForm.watch("lng")}
                initialPosition={
                  hasSelectedLatAndLng
                    ? {
                        lat: panelForm.watch("lat"),
                        lng: panelForm.watch("lng"),
                      }
                    : undefined
                }
              />
            </div>
          </CardContent>

          <CardFooter>
            <FormSubmitButton>Salvar</FormSubmitButton>
          </CardFooter>
        </form>
      </Card>
    </FormProvider>
  );
}

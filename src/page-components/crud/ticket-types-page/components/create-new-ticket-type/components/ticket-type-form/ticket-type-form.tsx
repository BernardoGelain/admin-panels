"use client";
import { FormProvider, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  TicketTypesFormValidation,
  TicketTypesFormValues,
} from "./validation/ticket-types-form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSubmitButton } from "~/components/form/form-submit-button/form-submit-button";
import { LoadingContent } from "~/components/ui/loading-content";
import { useGetEntityDetails } from "~/hooks/api/crud/use-get-entity-details";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { OrganizationSelector } from "~/components/crud/organization-selector/organization-selector";
import { ControlledTextInput } from "~/components/form/controlled-input/controlled-input";
import { useCreateEntityMutation } from "~/hooks/api/crud/use-create-entity-mutation";
import { useUpdateEntityMutation } from "~/hooks/api/crud/use-update-entity-mutation";
import { TicketTypeModel } from "~/page-components/crud/ticket-types-page/types/ticket-type-model";
import { ControlledTextArea } from "~/components/form/controlled-text-area/controlled-text-area";
import { TicketTypeSelector } from "../../../../../../../components/crud/ticket-type-selector/ticket-type-selector";

export function TicketTypeForm({ ticketTypeId }: { ticketTypeId?: string }) {
  const createTicketTypeMutation = useCreateEntityMutation<
    Partial<TicketTypeModel>
  >({
    queryKey: "TICKET_TYPES",
    redirectPath: "TICKET_TYPES",
    route: "TICKET_TYPES",
    successMessage: "Tipo de ingresso criado com sucesso",
  });
  const updateTicketTypeMutation = useUpdateEntityMutation<
    Partial<TicketTypeModel>
  >({
    queryKey: "TICKET_TYPES",
    redirectPath: "TICKET_TYPES",
    route: "TICKET_TYPES",
    successMessage: "Tipo de ingresso atualizado com sucesso",
  });
  const ticketTypeDetailsQuery = useGetEntityDetails<TicketTypeModel>({
    entityId: Number(ticketTypeId),
    enabled: !!ticketTypeId,
    entityBaseUrl: "TICKET_TYPES",
    queryKey: QUERY_KEYS.TICKET_TYPES.DETAILS,
  });

  const showtimeForm = useForm<
    TicketTypesFormValues & {
      organizationName: string;
    }
  >({
    resolver: zodResolver(TicketTypesFormValidation),
    mode: "all",
    values: ticketTypeDetailsQuery.data?.body && {
      organizationName: ticketTypeDetailsQuery.data.body.organization.name,
      name: ticketTypeDetailsQuery.data.body.name,
      organizationId: String(ticketTypeDetailsQuery.data.body.organization.id),
      price: String(ticketTypeDetailsQuery.data.body.price),
      ticketwithdraw: ticketTypeDetailsQuery.data.body.ticketwithdraw,
      ticketType: ticketTypeDetailsQuery.data.body.ticketType.toUpperCase() as
        | "APP"
        | "PRINT",
    },
  });

  async function onSubmitTicketTypeForm(data: TicketTypesFormValues) {
    const payload = {
      organizationId: Number(data.organizationId),
      name: data.name,
      price: +data.price,
      ticketType: data.ticketType,
      ticketwithdraw: data.ticketwithdraw,
    };

    if (ticketTypeId) {
      await updateTicketTypeMutation.mutateAsync({
        body: payload,
        id: ticketTypeId,
      });
      return;
    }

    await createTicketTypeMutation.mutateAsync(payload);
  }

  return (
    <FormProvider {...showtimeForm}>
      <Card className="w-full h-max">
        <form onSubmit={showtimeForm.handleSubmit(onSubmitTicketTypeForm)}>
          <CardHeader>
            <CardTitle className="text-primary">
              {ticketTypeId ? "Editar" : "Adicionar"} Tipo de Ingresso
            </CardTitle>
          </CardHeader>

          <CardContent
            className="flex flex-col gap-4"
            isLoading={ticketTypeDetailsQuery?.isLoading}
            Loader={<LoadingContent />}
          >
            <TicketTypeSelector />
            <ControlledTextInput name="name" label="Nome" />
            <ControlledTextInput name="price" label="Preço" />
            <OrganizationSelector />
            <ControlledTextArea
              label="Informações para retirada de ingresso"
              name="ticketwithdraw"
            />
          </CardContent>
          <CardFooter>
            <FormSubmitButton>Salvar</FormSubmitButton>
          </CardFooter>
        </form>
      </Card>
    </FormProvider>
  );
}

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

import { MessageModel } from "~/page-components/crud/messages-page/types/message-model";
import { MessageFormValidation, MessageFormValues } from "./validation/panel-form-validation";
import { MultiEntitySelector } from "~/components/crud/entity-multi-selector/entity-multi-selector";

export function MessageForm({ messageId }: { messageId?: string }) {
  const createMutation = useCreateEntityMutation<Partial<MessageModel>>({
    queryKey: "MESSAGES",
    redirectPath: "MESSAGES",
    route: "MESSAGES",
    successMessage: "Mensagem criada com sucesso",
  });

  const updateMutation = useUpdateEntityMutation<Partial<MessageModel>>({
    queryKey: "MESSAGES",
    redirectPath: "MESSAGES",
    route: "MESSAGES",
    successMessage: "Mensagem atualizada com sucesso",
  });

  const messageDetailsQuery = useGetEntityDetails<MessageModel>({
    entityId: Number(messageId),
    enabled: !!messageId,
    entityBaseUrl: "MESSAGES",
    queryKey: QUERY_KEYS.MESSAGES.DETAILS,
  });

  const messageForm = useForm<MessageFormValues>({
    resolver: zodResolver(MessageFormValidation),
    mode: "all",
    values: messageDetailsQuery.data?.body && {
      content: messageDetailsQuery.data.body.content,
      panelIds: messageDetailsQuery.data.body.panels.map((p) => p.id),
      groupIds: messageDetailsQuery.data.body.groups.map((g) => g.id),
    },
  });

  async function onSubmitMessageForm(data: MessageFormValues) {
    const payload: Partial<MessageModel> = {
      content: data.content,
      panels: data?.panelIds?.map((id) => ({ id, name: "" })) ?? [],
      groups: data?.groupIds?.map((id) => ({ id, name: "" })) ?? [],
    };

    if (messageId) {
      await updateMutation.mutateAsync({ body: payload, id: messageId });
      return;
    }

    await createMutation.mutateAsync(payload);
  }

  return (
    <FormProvider {...messageForm}>
      <Card className="w-full h-max">
        <form onSubmit={messageForm.handleSubmit(onSubmitMessageForm)}>
          <CardHeader>
            <CardTitle className="text-primary">{messageId ? "Editar" : "Adicionar"} Mensagem</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4" isLoading={messageDetailsQuery.isLoading} Loader={<LoadingContent />}>
            <ControlledTextInput name="content" label="Mensagem" />
            <MultiEntitySelector
              name="panelIds"
              label="Painéis"
              options={[]} // lista de grupos { value, label }
              search={""}
              onSearch={() => {}}
              isLoading={false}
            />
            <MultiEntitySelector
              name="groupIds"
              label="Grupos"
              options={[]} // lista de grupos { value, label }
              search={""}
              onSearch={() => {}}
              isLoading={false}
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

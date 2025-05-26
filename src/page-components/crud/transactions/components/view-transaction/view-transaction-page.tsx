"use client";
import { useGetEntityDetails } from "~/hooks/api/crud/use-get-entity-details";
import { TransactionModel } from "../../types/transaction-model";
import { QUERY_KEYS } from "~/query-keys/query-keys";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatCurrency } from "~/helpers/currency-formatter";

export function ViewTransactionPage({
  params: { transactionId },
}: {
  params: { transactionId: string };
}) {
  const transactionDetailsQuery = useGetEntityDetails<TransactionModel>({
    enabled: !!transactionId,
    entityBaseUrl: "TRANSACTIONS",
    entityId: Number(transactionId),
    queryKey: QUERY_KEYS.TRANSACTIONS.DETAILS,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualizar Transferência para Zukese Pay</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4">
          <p>Tipo de Transação</p>
          <p className="font-semibold">
            {transactionDetailsQuery.data?.body.type}
          </p>
        </div>
        <hr />
        <div className="flex gap-4">
          <p>Valor da Transação</p>
          <p className="font-semibold">
            {formatCurrency(Number(transactionDetailsQuery.data?.body.value))}
          </p>
        </div>
        <hr />
        <div className="flex gap-4">
          <p>Status da Transação</p>
          <p className="font-semibold">
            {transactionDetailsQuery.data?.body.status}
          </p>
        </div>
        <hr />
        <div className="flex gap-4">
          <p>Usuário da Carteira</p>
          <p className="font-semibold">mocked@mock.com</p>
        </div>
        <hr />
        <div className="flex gap-4">
          <p>Mensagem da transação</p>
          <p className="font-semibold">
            {transactionDetailsQuery.data?.body.message || "--"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export type TransactionModel = {
  id: number;
  createdAt: string;
  updatedAt: string;
  value: number;
  message: string;
  status: string;
  type: string;
  polymorphicCtypeId: number;
  walletId: number;
  contentType: {
    id: number;
    appLabel: string;
    model: string;
  };
};

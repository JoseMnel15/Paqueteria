export class DeliverPackageDto {
  deliveredByUserId!: number;
  amountPaid?: number;
  paymentMethod?: 'CASH' | 'CARD' | 'TRANSFER';
}

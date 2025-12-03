export class CreatePackageDto {
  trackingCode!: string;
  courierId!: number;
  clientId!: number;
  receivedByUserId!: number;
  amountDue?: number;
  notes?: string;
}

export class CreateHistoryDto {
  price: number;
  begin: Date;
  end: Date;
  vehicleId: number;
  clientId: number;
  isPaid: boolean;
}

import { IsInt, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  @Min(1)
  toUserId: number;

  // Amount is an integer (e.g., Rwandan Francs). No decimals.
  @IsInt()
  @Min(1)
  amount: number;
}

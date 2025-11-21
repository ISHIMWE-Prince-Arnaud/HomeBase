import { IsBoolean, IsInt, IsOptional, Min, ValidateIf } from 'class-validator';

export class MarkPurchasedDto {
  @IsOptional()
  @IsBoolean()
  createExpense?: boolean;

  @ValidateIf((o: MarkPurchasedDto) => !!o.createExpense)
  @IsInt()
  @Min(1)
  amount?: number; // integer currency units (e.g., RWF)

  @IsOptional()
  description?: string;
}

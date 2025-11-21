import {
  ArrayMinSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  totalAmount: number;

  // Optional; if omitted, defaults to now() in DB
  @IsOptional()
  @IsISO8601()
  date?: string;

  @IsInt()
  @Min(1)
  paidById: number;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  participants: number[];
}

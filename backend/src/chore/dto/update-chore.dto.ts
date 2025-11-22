import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateChoreDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isComplete?: boolean;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ValidateIf(
    (o: UpdateChoreDto) =>
      o.assignedToId !== null && o.assignedToId !== undefined,
  )
  @IsInt()
  @IsOptional()
  assignedToId?: number | null;
}

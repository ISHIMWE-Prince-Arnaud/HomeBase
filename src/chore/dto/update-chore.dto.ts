import { IsBoolean, IsInt, IsOptional, ValidateIf } from 'class-validator';

export class UpdateChoreDto {
  @IsBoolean()
  @IsOptional()
  isComplete?: boolean;

  @ValidateIf(
    (o: UpdateChoreDto) =>
      o.assignedToId !== null && o.assignedToId !== undefined,
  )
  @IsInt()
  @IsOptional()
  assignedToId?: number | null;
}

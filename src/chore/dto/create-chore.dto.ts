import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
} from 'class-validator';

export class CreateChoreDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsInt()
  @IsOptional()
  assignedToId?: number;
}

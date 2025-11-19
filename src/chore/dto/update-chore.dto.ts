import { IsBoolean } from 'class-validator';

export class UpdateChoreDto {
  @IsBoolean()
  isComplete: boolean;
}

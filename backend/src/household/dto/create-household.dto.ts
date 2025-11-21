import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHouseholdDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

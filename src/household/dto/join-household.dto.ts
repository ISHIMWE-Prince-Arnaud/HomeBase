import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class JoinHouseholdDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  inviteCode: string;
}

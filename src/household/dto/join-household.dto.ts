import { IsNotEmpty, IsString } from 'class-validator';

export class JoinHouseholdDto {
  @IsString()
  @IsNotEmpty()
  inviteCode: string;
}

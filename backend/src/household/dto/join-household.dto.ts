import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class JoinHouseholdDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @Matches(/^(?:[A-Z0-9]{8}|[A-Z0-9]{12})$/, {
    message:
      'inviteCode must be 8 or 12 characters long, using only uppercase letters and digits',
  })
  inviteCode: string;
}

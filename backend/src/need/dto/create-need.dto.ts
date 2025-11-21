import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNeedDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  quantity?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  category?: string;
}

import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  MinLength,
  MaxLength,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export class CreateChoreDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  @IsFutureDateString({ message: 'dueDate must be a future date-time' })
  dueDate?: string;

  @IsInt()
  @IsOptional()
  assignedToId?: number;
}

function IsFutureDateString(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    const target = (
      object as { constructor: new (...args: unknown[]) => unknown }
    ).constructor;
    registerDecorator({
      name: 'IsFutureDateString',
      target,
      propertyName,
      options,
      validator: {
        validate(value: unknown) {
          if (value === undefined || value === null) return true;
          if (typeof value !== 'string') return false;
          const date = new Date(value);
          return !Number.isNaN(date.getTime()) && date.getTime() > Date.now();
        },
      },
    });
  };
}

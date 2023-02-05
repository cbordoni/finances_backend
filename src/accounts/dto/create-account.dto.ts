import { Transform } from 'class-transformer';
import {
  IsBoolean, IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  openingBalance: number = 0.0;

  @IsOptional()
  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  bankOverdraft: number = 0.0;

  @IsOptional()
  @IsString()
  additionalData: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  defaultToBeDiscounted: boolean = false;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  toDisplayOnDashboard: boolean = true;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  toSumOnTotals: boolean = true;
}

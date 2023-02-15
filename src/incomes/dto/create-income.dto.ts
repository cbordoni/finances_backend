import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IncomeConfirmation } from '../entities/income.entity';

export class CreateIncomeDto {
  @IsNotEmpty()
  @Transform(({ value }) => Number.parseInt(value))
  @IsInt()
  accountId: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  description: string;

  @IsNotEmpty()
  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  confirmed = false;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value))
  @IsInt()
  automaticallyConfirm: IncomeConfirmation = IncomeConfirmation.DO_NOT_CONFIRM;

  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  ignoreOnTotals = false;
}

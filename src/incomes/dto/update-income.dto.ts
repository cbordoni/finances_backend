import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateIncomeDto } from './create-income.dto';

export class UpdateIncomeDto extends PartialType(CreateIncomeDto) {
  @IsNotEmpty()
  @Transform(({ value }) => Number.parseInt(value))
  @IsInt()
  id: number;
}

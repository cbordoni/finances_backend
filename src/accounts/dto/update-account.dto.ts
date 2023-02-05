import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @IsNotEmpty()
  @Transform(({ value }) => Number.parseInt(value))
  @IsInt()
  id: number;
}

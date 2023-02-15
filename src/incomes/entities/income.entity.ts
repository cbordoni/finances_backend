import { instanceToPlain, plainToClass } from 'class-transformer';
import { Account } from 'src/accounts/entities/account.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { CreateIncomeDto } from '../dto/create-income.dto';
import { UpdateIncomeDto } from '../dto/update-income.dto';

export enum IncomeConfirmation {
  DO_NOT_CONFIRM = 0,
  AT_THE_BEGINNING_OF_THE_DAY = 1,
  AT_THE_END_OF_THE_DAY = 2,
}

@Entity()
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: 'account_id' })
  accountId: Account;

  @Column({ length: 50 })
  description: string;

  @Column('double', { name: 'value' })
  value: number;

  @Column('date', { name: 'due_date' })
  dueDate: Date;

  @Column('datetime', { name: 'created_at', default: () => 'NOW()' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at', default: () => 'NOW()' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Column('boolean', { default: false })
  confirmed: boolean;

  @Column('enum', {
    name: 'automatically_confirm',
    enum: IncomeConfirmation,
    default: IncomeConfirmation.DO_NOT_CONFIRM,
  })
  automaticallyConfirm: IncomeConfirmation;

  @Column('boolean', { name: 'ingore_on_totals', default: false })
  ignoreOnTotals: boolean;

  static toModel(accountDto: CreateIncomeDto | UpdateIncomeDto): Income {
    const data = instanceToPlain(accountDto);
    return plainToClass(Income, data);
  }
}

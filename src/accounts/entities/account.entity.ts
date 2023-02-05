import { instanceToPlain, plainToClass } from 'class-transformer';
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column('double', { name: 'opening_balance', default: 0.0 })
  openingBalance: number;

  @Column('double', { name: 'bank_overdraft', default: 0.0 })
  bankOverdraft: number;

  @Column('text', { name: 'additional_data', nullable: true })
  additionalData: string;

  @Column('boolean', { name: 'default_to_be_discounted', default: false })
  defaultToBeDiscounted: boolean;

  @Column('boolean', { name: 'display_on_dashboard', default: true })
  toDisplayOnDashboard: boolean;

  @Column('boolean', { name: 'sum_on_totals', default: true })
  toSumOnTotals: boolean;

  @Column('datetime', { name: 'created_at', default: () => 'NOW()' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at', default: () => 'NOW()' })
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date;

  static toModel(accountDto: CreateAccountDto | UpdateAccountDto): Account {
    const data = instanceToPlain(accountDto);
    return plainToClass(Account, data);
  }
}

import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { CreateIncomeDto } from 'src/incomes/dto/create-income.dto';
import { UpdateIncomeDto } from 'src/incomes/dto/update-income.dto';
import { Income, IncomeConfirmation } from 'src/incomes/entities/income.entity';

export class IncomeRepositoryStub {
  private readonly _incomes: Income[] = [
    {
      id: 1,
      accountId: null as unknown as Account,
      description: 'Salário',
      value: 1000.0,
      dueDate: new Date('2023-02-05T'),
      confirmed: false,
      automaticallyConfirm: IncomeConfirmation.AT_THE_BEGINNING_OF_THE_DAY,
      ignoreOnTotals: true,
      createdAt: new Date('2023-02-05T15:18:49.000Z'),
      updatedAt: new Date('2023-02-05T15:18:49.000Z'),
      deletedAt: null,
    },
  ];

  get createDto(): CreateIncomeDto {
    return {
      accountId: 1,
      description: 'Salário',
      value: 1000.0,
      dueDate: new Date('2023-02-05T'),
      confirmed: false,
      automaticallyConfirm: IncomeConfirmation.AT_THE_BEGINNING_OF_THE_DAY,
      ignoreOnTotals: true,
    } as CreateIncomeDto;
  }

  get updateDto(): UpdateIncomeDto {
    return {
      ...(this.first as unknown as UpdateIncomeDto),
    };
  }

  get incomes(): Income[] {
    return this._incomes;
  }

  get first(): Income {
    return this._incomes.at(0);
  }

  get token(): string | Function {
    return getRepositoryToken(Income);
  }

  find() {
    return Promise.resolve(
      this._incomes.filter((income) => income.deletedAt === null),
    );
  }

  findOne(id: number) {
    const index = this._incomes.findIndex((income) => income.id === +id);

    return Promise.resolve(this._incomes.at(index));
  }

  save(income: Income) {
    this._incomes.push({ id: this._incomes.length + 1, ...income });
    return Promise.resolve(income);
  }

  update({ id }, income: Income) {
    const index = this._incomes.findIndex((income) => income.id === +id);
    this._incomes[index] = { ...income, updatedAt: new Date() };

    return {
      affected: this._incomes.filter((income) => income.id === +id).length,
    };
  }

  async softRemove(id: number) {
    const index = this._incomes.findIndex((income) => income.id === +id);
    this._incomes.at(index).deletedAt = new Date();

    return Promise.resolve(this._incomes.at(index));
  }
}

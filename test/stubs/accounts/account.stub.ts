import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { UpdateAccountDto } from 'src/accounts/dto/update-account.dto';
import { Account } from 'src/accounts/entities/account.entity';

export class AccountRepositoryStub {
  private readonly _accounts: Account[] = [
    {
      id: 1,
      name: 'Itaú',
      openingBalance: 0,
      bankOverdraft: 0,
      additionalData: null,
      defaultToBeDiscounted: false,
      toDisplayOnDashboard: true,
      toSumOnTotals: true,
      createdAt: new Date('2023-02-05T15:18:49.000Z'),
      updatedAt: new Date('2023-02-05T15:18:49.000Z'),
      deletedAt: null,
      incomes: [],
    },
  ];

  get createDto(): CreateAccountDto {
    const now = new Date();

    return {
      name: 'Iti',
      openingBalance: 2397.36,
      bankOverdraft: 0,
      additionalData: null,
      defaultToBeDiscounted: false,
      toDisplayOnDashboard: true,
      toSumOnTotals: true,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    } as Account;
  }

  get updateDto(): UpdateAccountDto {
    return {
      ...this.first,
    };
  }

  get accounts(): Account[] {
    return this._accounts;
  }

  get first(): Account {
    return this._accounts.at(0);
  }

  get token() {
    return getRepositoryToken(Account);
  }

  find() {
    return Promise.resolve(
      this._accounts.filter((account) => account.deletedAt === null),
    );
  }

  findOne(id: number) {
    const index = this._accounts.findIndex((account) => account.id === +id);

    return Promise.resolve(this._accounts.at(index));
  }

  save(account: Account) {
    this._accounts.push({ id: this._accounts.length + 1, ...account });
    return Promise.resolve(account);
  }

  update({ id }, account: Account) {
    const index = this._accounts.findIndex((account) => account.id === +id);
    this._accounts[index] = { ...account, updatedAt: new Date() };

    return {
      affected: this._accounts.filter((account) => account.id === +id).length,
    };
  }

  async softRemove(id: number) {
    const index = this._accounts.findIndex((account) => account.id === +id);
    this._accounts.at(index).deletedAt = new Date();

    return Promise.resolve(this._accounts.at(index));
  }
}

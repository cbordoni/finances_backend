import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountRepository.save(Account.toModel(createAccountDto));
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findOne(id: number): Promise<Account> {
    return this.accountRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<number> {
    const updateResult = await this.accountRepository.update(
      {
        id: id,
      },
      Account.toModel(updateAccountDto),
    );

    return Promise.resolve(updateResult.affected);
  }

  async remove(id: number): Promise<Account> {
    return this.accountRepository.softRemove(await this.findOne(id));
  }
}

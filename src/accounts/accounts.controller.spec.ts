import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepositoryStub } from 'test/stubs/accounts/account.stub';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

describe('AccountsController', () => {
  let controller: AccountsController;
  const accountStub = new AccountRepositoryStub();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        AccountsService,
        {
          provide: accountStub.token,
          useValue: accountStub,
        },
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of accounts', async () => {
    expect(await controller.findAll()).toMatchObject(accountStub.accounts);
  });

  it('should return an specific account', async () => {
    expect(
      await controller.findOne(accountStub.first.id.toString()),
    ).toMatchObject(accountStub.first);
  });

  it('should create an accounts', async () => {
    const createDto = accountStub.createDto;
    expect(await controller.create(createDto)).toMatchObject(createDto);
  });

  it('should update an account', async () => {
    const updateDto = accountStub.updateDto;
    expect(await controller.update(updateDto.id.toString(), updateDto)).toBe(1);
  });

  it('should remove an account', async () => {
    const removedAccount = await controller.remove(
      accountStub.first.id.toString(),
    );

    expect(removedAccount.deletedAt).not.toBeNull();
  });
});

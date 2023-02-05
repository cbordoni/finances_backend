import { Test, TestingModule } from '@nestjs/testing';
import { validate } from 'class-validator';
import { AccountRepositoryStub } from 'test/stubs/accounts/account.stub';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

describe('AppController', () => {
  let controller: AccountsController;
  let service: AccountsService;
  const accountStub = new AccountRepositoryStub();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        AccountsService,
        {
          provide: accountStub.token,
          useValue: accountStub,
        },
      ],
    }).compile();

    controller = app.get<AccountsController>(AccountsController);
    service = app.get<AccountsService>(AccountsService);
  });

  describe('findAll', () => {
    it('should return an array of accounts', async () => {
      expect(await controller.findAll()).toMatchObject(accountStub.accounts);
    });
  });

  describe('findOne', () => {
    it('should return an specific account', async () => {
      expect(
        await controller.findOne(accountStub.first.id.toString()),
      ).toMatchObject(accountStub.first);
    });
  });

  describe('create', () => {
    it('should create an accounts', async () => {
      const createDto = accountStub.createDto;
      expect(await controller.create(createDto)).toMatchObject(createDto);
    });
  });

  describe('update', () => {
    it('should update an account', async () => {
      const updateDto = accountStub.updateDto;
      expect(await controller.update(updateDto.id.toString(), updateDto)).toBe(
        1,
      );
    });
  });

  describe('remove', () => {
    it('should remove an account', async () => {
      const removedAccount = await controller.remove(
        accountStub.first.id.toString(),
      );

      expect(removedAccount.deletedAt).not.toBeNull();
    });
  });
});

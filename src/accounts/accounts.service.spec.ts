import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepositoryStub } from 'test/stubs/accounts/account.stub';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  const accountStub = new AccountRepositoryStub();
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: accountStub.token,
          useValue: accountStub,
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of accounts', async () => {
    const findResult = await service.findAll();
    expect(findResult).toMatchObject(accountStub.accounts);
  });

  it('should return an specific account', async () => {
    expect(await service.findOne(1)).toMatchObject(accountStub.first);
  });

  it('should create an account', async () => {
    const createDto = accountStub.createDto;
    expect(await service.create(createDto)).toMatchObject(createDto);

    const allAcounts = await service.findAll();
    expect(allAcounts.length).toBe(2);
  });

  it('should update an account', async () => {
    const updateDto = accountStub.updateDto;
    const oldName = updateDto.name;

    updateDto.id = 1;
    updateDto.name = `[Updated] ${updateDto.name}`;

    const updateResult = await service.update(+updateDto.id, updateDto);
    expect(updateResult).toBe(1);

    const updatedAccount = await accountStub.findOne(updateDto.id);
    expect(updatedAccount.name).not.toBe(oldName);
  });

  it('should soft delete an account', async () => {
    const deleteResult = await service.remove(accountStub.first.id);

    expect(deleteResult.deletedAt).not.toBeNull();
  });

  it('should not list an deleted account', async () => {
    const findResult = await service.findAll();

    expect(findResult.length).toBe(1);
  });
});

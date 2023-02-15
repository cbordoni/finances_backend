import { Test, TestingModule } from '@nestjs/testing';
import { IncomeRepositoryStub } from 'test/stubs/incomes/income.stub';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';

describe('IncomesController', () => {
  const incomeStub = new IncomeRepositoryStub();
  let controller: IncomesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomesController],
      providers: [
        IncomesService,
        {
          provide: incomeStub.token,
          useValue: incomeStub,
        },
      ],
    }).compile();

    controller = module.get<IncomesController>(IncomesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { IncomeRepositoryStub } from 'test/stubs/incomes/income.stub';
import { IncomesService } from './incomes.service';

describe('IncomesService', () => {
  const incomeStub = new IncomeRepositoryStub();
  let service: IncomesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncomesService,
        {
          provide: incomeStub.token,
          useValue: incomeStub,
        },
      ],
    }).compile();

    service = module.get<IncomesService>(IncomesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

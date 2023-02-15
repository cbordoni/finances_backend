import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Income } from './entities/income.entity';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(Income)
    private readonly incomeRepository: Repository<Income>,
  ) {}

  async create(CreateIncomeDto: CreateIncomeDto): Promise<Income> {
    return this.incomeRepository.save(Income.toModel(CreateIncomeDto));
  }

  async findAll(): Promise<Income[]> {
    return this.incomeRepository.find();
  }

  async findOne(id: number): Promise<Income> {
    return this.incomeRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateIncomeDto: UpdateIncomeDto): Promise<number> {
    const updateResult = await this.incomeRepository.update(
      {
        id: id,
      },
      Income.toModel(updateIncomeDto),
    );

    return Promise.resolve(updateResult.affected);
  }

  async remove(id: number): Promise<Income> {
    return this.incomeRepository.softRemove(await this.findOne(id));
  }
}

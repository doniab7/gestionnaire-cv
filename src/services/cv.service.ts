// src/services/cv.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Cv } from '../entities/cv.entity';
import { FilterDto } from '../dtos/filter.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) {}

  async findAll(): Promise<Cv[]> {
    return this.cvRepository.find();
  }

  async findOne(id: number): Promise<Cv> {
    return this.cvRepository.findOneBy({ id: id });
  }

  async findAllFiltered(filterDto: FilterDto): Promise<Cv[]> {
    const { query, age } = filterDto;
    return this.cvRepository
      .createQueryBuilder('cv')
      .where('cv.age = :age', { age })
      .andWhere(
        new Brackets((qb) => {
          qb.where('cv.name LIKE :query', { query: `%${query}%` })
            .orWhere('cv.firstname LIKE :query', { query: `%${query}%` })
            .orWhere('cv.job LIKE :query', { query: `%${query}%` });
        }),
      )
      .getMany();
  }

  async create(cv: Cv): Promise<Cv> {
    return this.cvRepository.save(cv);
  }

  async update(id: number, newData: Partial<Cv>): Promise<Cv> {
    await this.cvRepository.update(id, newData);
    return this.cvRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.cvRepository.delete(id);
  }
}

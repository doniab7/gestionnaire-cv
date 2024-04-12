// src/services/cv.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, In, Repository } from 'typeorm';
import { Cv } from '../entities/cv.entity';
import { FilterDto } from '../dtos/filter.dto';
import { User } from '../entities/user.entity';
import { Skill } from '../entities/skill.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    @InjectRepository(User) // Inject User repository
    private userRepository: Repository<User>,
    @InjectRepository(Skill) // Inject Skill repository
    private skillRepository: Repository<Skill>,
  ) {}

  async findAll(): Promise<Cv[]> {
    return this.cvRepository.find();
  }

  async findOne(id: number): Promise<Cv> {
    return this.cvRepository
      .createQueryBuilder('cv')
      .leftJoinAndSelect('cv.user', 'user')
      .leftJoinAndSelect('cv.skills', 'skills')
      .where('cv.id = :id', { id })
      .getOne();
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

  async findAllPaginated(page: number, pageSize: number): Promise<Cv[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.cvRepository.find({
      skip,
      take,
    });
  }

  async create(cv: Cv, userId: number, skillIds: number[]): Promise<Cv> {
    // Find the user by userId
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const skills = await this.skillRepository.find({
      where: { id: In(skillIds) },
    });

    if (skills.length !== skillIds.length) {
      /*console.log(skills.length);
      console.log(skills);
      console.log(skillIds.length);*/
      throw new Error('Some skills not found');
    }

    // Assign the user and skills to the cv
    cv.user = user;
    cv.skills = skills;

    // Save the cv
    return this.cvRepository.save(cv);
  }

  async update(id: number, newData: Partial<Cv>): Promise<Cv> {
    await this.cvRepository.update(id, newData);
    return this.cvRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.cvRepository.delete(id);
  }

  async findOneByIdAndSelect(id: number): Promise<Cv> {
    const cv = await this.cvRepository
      .createQueryBuilder('cv')
      .select(['cv.id', 'cv.path'])
      .where('cv.id = :id', { id })
      .getOne();

    if (!cv) {
      throw new NotFoundException('CV not found');
    }

    return cv;
  }
}

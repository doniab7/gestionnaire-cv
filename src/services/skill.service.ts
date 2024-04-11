// skill.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async findAll(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  async findById(id: number): Promise<Skill> {
    return this.skillRepository.findOneBy({ id: id });
  }

  async create(skill: Skill): Promise<Skill> {
    return this.skillRepository.save(skill);
  }

  async update(id: number, skillData: Partial<Skill>): Promise<Skill> {
    await this.skillRepository.update(id, skillData);
    return this.skillRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.skillRepository.delete(id);
  }
}

// skill.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SkillService } from '../services/skill.service';
import { Skill } from '../entities/skill.entity';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  findAll(): Promise<Skill[]> {
    return this.skillService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Skill> {
    return this.skillService.findById(id);
  }

  @Post()
  create(@Body() skill: Skill): Promise<Skill> {
    return this.skillService.create(skill);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() skillData: Partial<Skill>,
  ): Promise<Skill> {
    return this.skillService.update(id, skillData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.skillService.remove(id);
  }
}

// skill.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillController } from '../controllers/skill.controller';
import { SkillService } from '../services/skill.service';
import { Skill } from '../entities/skill.entity';
import { Cv } from '../entities/cv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skill, Cv])],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}

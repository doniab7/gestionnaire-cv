import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Cv } from '../entities/cv.entity';
import { User } from '../entities/user.entity';
import { Skill } from '../entities/skill.entity';
import { CvController } from '../controllers/cv.controller';
import { CvControllerV2 } from '../controllers/cv.controllerv2';
import { CvService } from '../services/cv.service';
import { UserModule } from './user.module';
import { SkillModule } from './skill.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cv, User, Skill]),
    PassportModule,
    UserModule,
    SkillModule,
  ],
  controllers: [CvController, CvControllerV2],
  providers: [CvService],
})
export class CvModule {}

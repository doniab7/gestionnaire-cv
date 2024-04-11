import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from '../entities/cv.entity';
import { CvController } from '../controllers/cv.controller';
import { CvService } from '../services/cv.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cv])],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}

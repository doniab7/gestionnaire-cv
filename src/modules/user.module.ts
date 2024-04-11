// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { Cv } from '../entities/cv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cv])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { User } from './entities/user.entity';
import { Skill } from './entities/skill.entity';
import { CvModule } from './modules/cv.module';
import { UserModule } from './modules/user.module';
import { SkillModule } from './modules/skill.module';

@Module({
  imports: [
    CvModule,
    UserModule,
    SkillModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sql123',
      database: 'test',
      entities: [Cv, User, Skill],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Cv, User, Skill]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

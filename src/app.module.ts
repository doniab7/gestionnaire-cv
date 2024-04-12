import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { Cv } from './entities/cv.entity';
import { User } from './entities/user.entity';
import { Skill } from './entities/skill.entity';
import { CvModule } from './modules/cv.module';
import { UserModule } from './modules/user.module';
import { SkillModule } from './modules/skill.module';
import { MulterConfigModule } from './modules/multer.module';
import { CvController } from './controllers/cv.controller';
import { CvService } from './services/cv.service';

@Module({
  imports: [
    CvModule,
    UserModule,
    SkillModule,
    MulterConfigModule,
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
  controllers: [AppController, CvController],
  providers: [AppService, CvService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('cv/v2'); // Remplacez 'second-cv' par le bon endpoint
  }
}

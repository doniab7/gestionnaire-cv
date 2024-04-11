import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity'; // Updated import path

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sql123',
      database: 'test',
      entities: [Cv],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Cv]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

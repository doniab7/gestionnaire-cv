import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.useStaticAssets(join(__dirname, '..', 'public', 'uploads'), {
    prefix: '/uploads',
  });
  // Configurer Passport
  app.use(passport.initialize());
  // Utiliser le tuyau de validation pour valider automatiquement les données d'entrée
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

// multer.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from '../middlewares/file-upload.middleware';

@Module({
  imports: [MulterModule.register(multerOptions)],
})
export class MulterConfigModule {}

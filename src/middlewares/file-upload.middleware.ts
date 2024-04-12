// file-upload.middleware.ts
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const timestamp = new Date().getTime();
  const randomName = `${timestamp}-${file.originalname}`;
  callback(null, randomName);
};

export const multerOptions = {
  limits: {
    fileSize: 1024 * 1024, // 1MB limit
  },
  fileFilter: imageFileFilter,
  storage: diskStorage({
    destination: './public/uploads',
    filename: editFileName,
  }),
};

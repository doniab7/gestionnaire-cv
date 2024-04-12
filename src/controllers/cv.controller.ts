// src/controllers/cv.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { CvService } from '../services/cv.service';
import { Cv } from '../entities/cv.entity';
import { FilterDto } from '../dtos/filter.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/middlewares/file-upload.middleware';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get()
  findAll(): Promise<Cv[]> {
    return this.cvService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string): Promise<Cv> {
    return this.cvService.findOne(+id);
  }

  @Get('filter')
  findAllFiltered(@Query() filterDto: FilterDto): Promise<Cv[]> {
    return this.cvService.findAllFiltered(filterDto);
  }

  @Get('all')
  async getAll(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<Cv[]> {
    return this.cvService.findAllPaginated(page, pageSize);
  }

  @Post()
  create(
    @Body() cv: Cv,
    @Body('userId') userId: number,
    @Body('skillIds') skillIds: number[],
  ): Promise<Cv> {
    return this.cvService.create(cv, userId, skillIds);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() newData: Partial<Cv>): Promise<Cv> {
    return this.cvService.update(+id, newData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cvService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@UploadedFile() file, @Body('cvId') cvId: number) {
    // Assurez-vous que le CV existe
    const existingCv = await this.cvService.findOneByIdAndSelect(cvId);
    if (!existingCv) {
      throw new NotFoundException('CV not found');
    }

    // Stockez le fichier dans le dossier uploads et récupérez le chemin du fichier
    const imagePath = file.path;

    // Mettez à jour l'attribut path du CV avec le chemin de l'image
    existingCv.path = imagePath;

    // Sauvegardez les modifications du CV dans la base de données
    await this.cvService.update(existingCv.id, existingCv);

    // Renvoyez une réponse avec le nom du fichier ou tout autre détail souhaité
    return { filename: file.filename };
  }
}

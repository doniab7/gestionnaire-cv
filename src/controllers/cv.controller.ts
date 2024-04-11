// src/controllers/cv.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CvService } from '../services/cv.service';
import { Cv } from '../entities/cv.entity';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get()
  findAll(): Promise<Cv[]> {
    return this.cvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cv> {
    return this.cvService.findOne(+id);
  }

  @Post()
  create(@Body() cv: Cv): Promise<Cv> {
    return this.cvService.create(cv);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() newData: Partial<Cv>): Promise<Cv> {
    return this.cvService.update(+id, newData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cvService.remove(+id);
  }
}

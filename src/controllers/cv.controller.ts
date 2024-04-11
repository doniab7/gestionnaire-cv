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
} from '@nestjs/common';
import { CvService } from '../services/cv.service';
import { Cv } from '../entities/cv.entity';
import { FilterDto } from '../dtos/filter.dto';

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
}

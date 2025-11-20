import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NeedService } from './need.service';
import { CreateNeedDto } from './dto/create-need.dto';
import { UpdateNeedDto } from './dto/update-need.dto';

@Controller('need')
export class NeedController {
  constructor(private readonly needService: NeedService) {}

  @Post()
  create(@Body() createNeedDto: CreateNeedDto) {
    return this.needService.create(createNeedDto);
  }

  @Get()
  findAll() {
    return this.needService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.needService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNeedDto: UpdateNeedDto) {
    return this.needService.update(+id, updateNeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.needService.remove(+id);
  }
}

import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdoptionService } from './adoption.service';
import { CreateAdoptionDto } from './create-adoption.dto';

@ApiTags('adoptions')
@Controller('adoptions')
export class AdoptionController {
  constructor(private readonly service: AdoptionService) {}

  @ApiOperation({ summary: 'Listar adopciones' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Obtener adopcion por id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    const item = this.service.findOne(id);
    if (!item) throw new NotFoundException('Adoption not found');
    return item;
  }

  @ApiOperation({ summary: 'Crear adopcion' })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateAdoptionDto) {
    return this.service.create(dto as any);
  }

  @ApiOperation({ summary: 'Actualizar adopcion' })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateAdoptionDto>) {
    const updated = this.service.update(id, dto as any);
    if (!updated) throw new NotFoundException('Adoption not found');
    return updated;
  }

  @ApiOperation({ summary: 'Eliminar adopcion' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    const removed = this.service.remove(id);
    if (!removed) throw new NotFoundException('Adoption not found');
    return { ok: true };
  }
}

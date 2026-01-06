import { Body, Controller, Get, NotFoundException, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({ summary: 'Crear usuario' })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto as any);
  }

  @ApiOperation({ summary: 'Listar usuarios' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Obtener usuario por id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOperation({ summary: 'Subir documentos' })
  @Post(':id/documents')
  @UseInterceptors(AnyFilesInterceptor())
  uploadDocs(@Param('id') id: string, @UploadedFiles() files: Express.Multer.File[]) {
    return this.service.addDocuments(id, files || []);
  }
}

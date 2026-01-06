import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan' })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Perez' })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: 'juan@example.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false })
  password?: string;
}

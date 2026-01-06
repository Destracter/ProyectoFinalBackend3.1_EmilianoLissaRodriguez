import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAdoptionDto {
  @ApiProperty({ example: 'pet-id-123' })
  @IsNotEmpty()
  petId: string;

  @ApiProperty({ example: 'user-id-123' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ required: false })
  date?: string;
}

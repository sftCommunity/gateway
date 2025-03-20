import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'The name of the permission',
    example: 'read_users',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

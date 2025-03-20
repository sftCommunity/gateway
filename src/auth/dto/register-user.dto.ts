import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'StrongP@ssw0rd!',
    minLength: 8,
    format: 'password',
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'Is the user active?',
    default: true,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  is_active: boolean = true;
}

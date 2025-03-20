import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'test@example.com',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'P@$$wOrd',
    required: true,
    type: String,
    minLength: 8,
  })
  @IsString()
  @IsStrongPassword()
  password: string;
}

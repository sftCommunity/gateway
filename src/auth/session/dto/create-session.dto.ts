import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  token: string;

  @IsString()
  @IsNotEmpty()
  user_agent: string;

  @IsString()
  @IsNotEmpty()
  ip_address: string;

  @IsOptional()
  expires_at: Date;

  @IsBoolean()
  @IsOptional()
  is_active: boolean = true;
}

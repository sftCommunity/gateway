import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ValidRoles } from 'src/auth/interfaces';
import { PaginationDto } from 'src/common/dto';

export class UserPaginationDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter users by active status',
    type: Boolean,
  })
  @IsOptional()
  is_active?: boolean;

  @ApiPropertyOptional({
    description: 'Filter users by roles',
    type: [String],
    enum: ValidRoles,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(ValidRoles, {
    each: true,
    message: `Invalid role. Allowed values: ${ValidRoles}`,
  })
  roles?: ValidRoles[];
}

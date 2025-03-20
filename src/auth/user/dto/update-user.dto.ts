import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsUUID } from 'class-validator';
import { RegisterUserDto } from 'src/auth/dto';

/**
 * Data Transfer Object (DTO) for updating a user.
 * Extends the `RegisterUserDto` with optional fields using `PartialType`.
 *
 * @extends PartialType(RegisterUserDto)
 *
 * @swagger
 * @property {string} id - The unique identifier of the user.
 *   - Must be a valid UUID.
 *   - Must be a string.
 */
export class UpdateUserDto extends PartialType(RegisterUserDto) {
  @IsString()
  @IsUUID()
  id: string;
}

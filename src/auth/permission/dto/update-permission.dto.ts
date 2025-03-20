import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';

/**
 * Data Transfer Object (DTO) for updating a permission.
 * 
 * This class extends the `PartialType` of `CreatePermissionDto`, 
 * making all properties of `CreatePermissionDto` optional for updates.
 * 
 * @extends PartialType(CreatePermissionDto)
 * 
 * @swagger
 * @description DTO used for updating permission details. All fields are optional.
 */
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}

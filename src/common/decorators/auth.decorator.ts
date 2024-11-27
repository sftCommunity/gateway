import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guards';
import { ValidRoles } from '../../auth/interfaces/valid-roles';
import { UserRoleGuard } from '../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard, UserRoleGuard),
  );
}

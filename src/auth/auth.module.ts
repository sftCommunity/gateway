import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { AuthController } from './auth.controller';
import { SeedController } from './seed/seed.controller';
import { SessionController } from './session/session.controller';
import { UserController } from './user/user.controller';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  controllers: [
    AuthController,
    UserController,
    SeedController,
    SessionController,
  ],
  imports: [NatsModule, RoleModule, PermissionModule],
})
export class AuthModule {}

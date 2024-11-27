import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { RoleController } from './role.controller';

@Module({
  controllers: [RoleController],
  imports: [NatsModule],
})
export class RoleModule {}

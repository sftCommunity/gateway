import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { PermissionController } from './permission.controller';

@Module({
  controllers: [PermissionController],
  imports: [NatsModule],
})
export class PermissionModule {}

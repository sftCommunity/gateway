import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [FilesController],
  imports: [NatsModule],
})
export class FilesModule {}

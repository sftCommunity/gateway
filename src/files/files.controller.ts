import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Auth } from 'src/common/decorators';

import { NATS_SERVICE } from 'src/config';

@Controller('files')
export class FilesController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Get(':filename')
  @Auth()
  async get_file(@Param('filename') filename: string) {
    return this.client.send('files.get.file', filename);
  }
}

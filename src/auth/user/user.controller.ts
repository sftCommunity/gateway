import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto';
import { NATS_SERVICE } from 'src/config';

@Controller('user')
export class UserController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get('find_all')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('user.find.all', paginationDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }
}

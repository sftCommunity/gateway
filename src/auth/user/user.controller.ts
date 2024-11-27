import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { UserPaginationDto } from './dto/user-pagination.dto';

@Controller('user')
export class UserController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get('find_all')
  findAll(@Query() userPaginationDto: UserPaginationDto) {
    return this.client.send('user.find.all', userPaginationDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.client.send('user.find.one', term).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }
}

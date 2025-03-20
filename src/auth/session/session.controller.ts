import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { Auth, User } from '../decorators';
import { JwtPayload } from '../interfaces';
import { CreateSessionDto } from './dto';

@Controller('session')
export class SessionController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('create')
  @Auth()
  createSession(
    @Body() createSessionDto: CreateSessionDto,
    @User()
    user: {
      id: string;
      name: string;
      email: string;
    },
  ) {
    return this.client
      .send('session.create', { ...createSessionDto, user_id: user.id })
      .pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      );
  }
}

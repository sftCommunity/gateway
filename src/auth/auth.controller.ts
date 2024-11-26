import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ValidRoles } from 'src/common/interfaces';
import { NATS_SERVICE } from 'src/config';
import { Auth, Token, User } from './decorators';
import { LoginUserDto, RegisterUserDto } from './dto';
import { CurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Get('verify')
  @Auth()
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    return { user, token };
  }

  @Get('create_session')
  @Auth()
  createSession(@Token() token: string) {
    return this.client.send('auth.create.session', token).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Get('execute_seed')
  @Auth(ValidRoles.SUPER_ADMIN)
  executeSeed(@Token() token: string) {
    return this.client.send('seed.execute.seed', token).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }
}

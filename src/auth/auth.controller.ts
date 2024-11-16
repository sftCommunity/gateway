import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  register() {
    return this.client.send('auth.register.user', {});
  }

  @Post('login')
  login() {
    return this.client.send('auth.login.user', {});
  }

  @Get('verify')
  verifyToken() {
    return this.client.send('auth.verify.user', {});
  }
}

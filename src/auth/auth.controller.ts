import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { Auth, Token, User } from './decorators';
import { LoginUserDto, RegisterUserDto } from './dto';
import { JwtPayload } from './interfaces';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({
    description: 'User registered successfully.',
    schema: {
      example: {
        name: 'John Doe',
        email: 'user@example.com',
        id: '661ee1d6-9fb1-451e-8d3c-7598ae2dd787',
        is_active: true,
        roles: ['user'],
        created_at: '2025-03-20T21:48:26.489Z',
        updated_at: '2025-03-20T21:48:26.489Z',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWVlMWQ2LTlmYjEtNDUxZS04ZDNjLTc1OThhZTJkZDc4NyIsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTc0MjUwNzMwNiwiZXhwIjoxNzQzODAzMzA2fQ.uuIU9oOphgLqEUpjJR9Bl_srRq-PMKRxMFIuRwnZM2k',
      },
    },
  })
  @ApiBody({
    type: RegisterUserDto,
    description: 'The data required to register a new user.',
    examples: {
      example1: {
        summary: 'Valid input',
        value: {
          email: 'user@example.com',
          password: 'securePassword123@',
          name: 'John Doe',
        },
      },
    },
  })
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiOkResponse({
    description: 'User logged in successfully.',
    schema: {
      example: {
        accessToken: 'jwt-token-example',
        refreshToken: 'refresh-token-example',
      },
    },
  })
  @ApiBody({
    type: LoginUserDto,
    description: 'The data required to log in a user.',
    examples: {
      example1: {
        summary: 'Valid input',
        value: {
          email: 'user@example.com',
          password: 'securePassword123@',
        },
      },
    },
  })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Get('verify')
  @Auth()
  @ApiOperation({ summary: 'Verify the validity of a token' })
  @ApiOkResponse({
    description: 'Token verified successfully.',
    schema: {
      example: {
        user: {
          id: '12345',
          name: 'John Doe',
          email: 'user@example.com',
        },
        token: 'jwt-token-example',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Token is invalid or expired.',
  })
  verifyToken(
    @User()
    user: {
      id: string;
      name: string;
      email: string;
    },
    @Token() token: string,
  ) {
    return { user, token };
  }
}

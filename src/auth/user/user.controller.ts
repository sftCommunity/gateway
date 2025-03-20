import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { RegisterUserDto } from '../dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPaginationDto } from './dto/user-pagination.dto';

@ApiTags('User') // Grouping the controller under the "User" tag in Swagger
@Controller('user')
export class UserController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Post()
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('user.create', registerUserDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @ApiOperation({ summary: 'Retrieve all users with pagination' })
  @ApiQuery({ type: UserPaginationDto })
  @ApiResponse({ status: 200, description: 'List of users retrieved successfully.' })
  @Get('find_all')
  findAll(@Query() userPaginationDto: UserPaginationDto) {
    return this.client.send('user.find.all', userPaginationDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @ApiOperation({ summary: 'Retrieve a single user by term' })
  @ApiParam({ name: 'term', description: 'Search term for the user' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.client.send('user.find.one', term).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @ApiOperation({ summary: 'Update an existing user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.client.send('user.update', updateUserDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the user to delete' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('user.delete', id).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }
}

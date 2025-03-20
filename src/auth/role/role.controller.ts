import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto';
import { NATS_SERVICE } from 'src/config';
import { CreateRoleDto } from '../dto';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Post('create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.client.send('role.create', createRoleDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @ApiOperation({ summary: 'Find a role by term' })
  @ApiParam({ name: 'term', description: 'Search term for the role', type: String })
  @ApiResponse({ status: 200, description: 'Role found.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.client.send('role.find.one', term).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @ApiOperation({ summary: 'Get all roles with pagination' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page', type: Number })
  @ApiResponse({ status: 200, description: 'List of roles.' })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('role.find.all', paginationDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @ApiOperation({ summary: 'Delete a role by term' })
  @ApiParam({ name: 'term', description: 'Search term for the role to delete', type: String })
  @ApiResponse({ status: 200, description: 'Role successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  @Delete(':term')
  delete(@Param('term') term: string) {
    return this.client.send('role.delete.one', term).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @ApiOperation({ summary: 'Delete all roles' })
  @ApiResponse({ status: 200, description: 'All roles successfully deleted.' })
  @Delete()
  deleteAll() {
    return this.client.send('role.delete.all', {}).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }
}

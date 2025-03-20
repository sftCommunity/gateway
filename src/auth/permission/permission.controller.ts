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
import { CreatePermissionDto } from './dto/create-permission.dto';

@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiResponse({ status: 201, description: 'Permission created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.client.send('permission.create', createPermissionDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Get(':term')
  @ApiOperation({ summary: 'Find a permission by term' })
  @ApiParam({ name: 'term', description: 'Search term for the permission' })
  @ApiResponse({ status: 200, description: 'Permission found.' })
  @ApiResponse({ status: 404, description: 'Permission not found.' })
  findOne(@Param('term') term: string) {
    return this.client.send('permission.find.one', term).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all permissions with pagination' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page' })
  @ApiResponse({ status: 200, description: 'Permissions retrieved successfully.' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('permission.find.all', paginationDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Delete(':term')
  @ApiOperation({ summary: 'Delete a permission by term' })
  @ApiParam({ name: 'term', description: 'Term of the permission to delete' })
  @ApiResponse({ status: 200, description: 'Permission deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Permission not found.' })
  delete(@Param('term') term: string) {
    return this.client.send('permission.delete.one', term).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all permissions' })
  @ApiResponse({ status: 200, description: 'All permissions deleted successfully.' })
  deleteAll() {
    return this.client.send('permission.delete.all', {}).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }
}

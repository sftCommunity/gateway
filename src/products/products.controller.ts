import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto';
import { PRODUCTS_SERVICE } from 'src/config';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE)
    private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send(
      { cmd: 'create_product' },
      createProductDto,
    );
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  @Get(':id')
  async findProductById(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );
      return product;
    } catch (e) {
      throw new RpcException(e);
    }
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsClient
      .send({ cmd: 'update_product' }, { id, ...updateProductDto })
      .pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }
}

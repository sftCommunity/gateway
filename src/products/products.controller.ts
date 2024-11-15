import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCTS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE)
    private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return {
      message: 'Product created',
    };
  }

  @Get()
  findAllProducts() {
    return this.productsClient.send({ cmd: 'find_all_products' }, {});
  }

  @Get(':id')
  findProductById(@Param('id') id: string) {
    return {
      message: `Product ${id} fetched`,
    };
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string) {
    return {
      message: `Product ${id} updated`,
    };
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return {
      message: `Product ${id} deleted`,
    };
  }
}

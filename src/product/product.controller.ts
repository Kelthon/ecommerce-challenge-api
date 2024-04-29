import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { FindOptionsOrderValue, Like } from 'typeorm';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/new')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('/all')
  findAll(
    @Query('name') name: string = '',
    @Query('limit') limit: number = 16,
    @Query('page') page: number = 0,
    @Query('sort') sort: keyof SearchProductDto,
    @Query('order') order: FindOptionsOrderValue = 'asc',
  ) {
    const orderBy: {
      [param in keyof SearchProductDto]?: FindOptionsOrderValue;
    } = { id: 'asc' };

    if (sort) {
      orderBy[sort] = order;
      // `http://localhost:3000/product?sort=${sortBy}&order=${order}&limit=${itemPerPage}&page=${0}`;
    }

    return this.productService.findAll(
      {
        where: [
          {
            name: Like(`%${name}%`),
          },
          {
            description: Like(`%${name}%`),
          },
        ],
        take: limit,
        skip: limit * page,
        order: orderBy,
      },
      page,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}

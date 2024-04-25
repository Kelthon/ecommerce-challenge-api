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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { FindOptionsOrderValue } from 'typeorm';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/new')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('/all')
  findAll(
    @Query('limit') limit: number = 16,
    @Query('page') page: number = 0,
    @Query('sort') sort: keyof SearchCategoryDto,
    @Query('order') order: FindOptionsOrderValue = 'asc',
  ) {
    const orderBy: {
      [param in keyof SearchCategoryDto]?: FindOptionsOrderValue;
    } = { id: 'ASC' };

    if (sort) {
      orderBy[sort] = order;
    }

    return this.categoryService.findAll({
      take: limit,
      skip: limit * page,
      order: orderBy,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue } from 'typeorm';
import { SearchCategoryDto } from './dto/search-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.repository.create(createCategoryDto);
    return this.repository.save(category);
  }

  async findAll(
    limit: number = 24,
    page?: number,
    sortBy?: keyof SearchCategoryDto,
    order: FindOptionsOrderValue = 'asc',
  ): Promise<{ data: Category[]; count: number }> {
    const orderBy: {
      [param in keyof SearchCategoryDto]?: FindOptionsOrderValue;
    } = { id: 'ASC' };

    if (sortBy) {
      orderBy[sortBy] = order;
    } else orderBy.id = order;

    const [result, total] = await this.repository.findAndCount({
      order: orderBy,
      take: limit,
      skip: page * limit,
    });

    return { data: result, count: total };
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

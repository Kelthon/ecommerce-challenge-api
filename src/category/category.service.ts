import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
    options?: FindManyOptions<Category>,
    page: number = 0,
  ): Promise<{ page: Category[]; count: number; index: number }> {
    const [result, total] = await this.repository.findAndCount(options);

    return { page: result, count: total, index: page };
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id: id },
      relations: ['product'],
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.repository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    const obj = await this.repository.findOneBy({ id });
    return this.repository.remove(obj);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.repository.create(createProductDto);
    return this.repository.save(product);
  }

  async findAll(options?: FindManyOptions<Product>, page: number = 0) {
    const [result, total] = await this.repository.findAndCount(options);

    return { page: result, count: total, index: page };
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id: id },
      relations: ['category'],
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.repository.update(id, updateProductDto);
  }

  async remove(id: number) {
    const obj = await this.repository.findOneBy({ id });
    return this.repository.remove(obj);
  }
}

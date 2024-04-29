import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  name: string;
  sku?: string;
  categoryId?: number;
  description?: string;
  large_description?: string;
  discount_percent?: number;
  discount_price?: number;
  is_new?: boolean;
  image_link?: string;
  other_image_link?: string;
  created_date?: Date;
  updated_date?: Date;
}

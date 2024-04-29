import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsDateString, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsString()
  image_link?: string;

  @IsDateString()
  created_date?: Date;

  @IsDateString()
  updated_date?: Date;
}

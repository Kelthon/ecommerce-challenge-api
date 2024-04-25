import { IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(3, 50)
  @IsString()
  name: string;

  @IsOptional()
  @Length(10, 250)
  @IsString()
  image_link: string;

  @IsOptional()
  @IsDateString()
  created_date: Date;

  @IsOptional()
  @IsDateString()
  updated_date: Date;
}

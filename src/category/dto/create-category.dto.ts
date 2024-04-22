import { IsDate, IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(3, 50)
  @IsString()
  name: string;

  @IsOptional()
  @Length(10, 250)
  @IsString()
  image_link: string;

  @IsOptional()
  @IsDate()
  created_date: Date;

  @IsOptional()
  @IsDate()
  updated_date: Date;
}

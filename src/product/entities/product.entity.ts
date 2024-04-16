import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column()
  category_id: string;

  @Column()
  description: string;

  @Column()
  large_description: string;

  @Column()
  price: number;

  @Column()
  discount_price: number;

  @Column()
  discount_percent: number;

  @Column()
  is_new: boolean;

  @Column()
  image_link: string;

  @Column()
  other_image_link: string;

  @Column()
  created_date: Date;

  @Column()
  updated_date: Date;
}

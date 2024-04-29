import { Category } from 'src/category/entities/category.entity';
import {
  AfterInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  sku: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  large_description: string;

  @Column({
    type: 'money',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'money',
    nullable: true,
  })
  discount_price: number;

  @Column({
    type: 'numeric',
    nullable: true,
  })
  discount_percent: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: () => 'TRUE',
  })
  is_new: boolean;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: false,
  })
  image_link: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  other_image_link: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @AfterInsert()
  afterInsert() {
    console.log(`A new product was created - [${this.id}]: ${this.name}`);
  }
}

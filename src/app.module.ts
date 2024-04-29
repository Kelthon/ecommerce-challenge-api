import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Category } from './category/entities/category.entity';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://ysgjgqzj:s_WStSNgmlwARB6YWOiNf_ZmaZ3k8Als@isabelle.db.elephantsql.com/ysgjgqzj',
      username: 'ysgjgqzj',
      password: 's_WStSNgmlwARB6YWOiNf_ZmaZ3k8Als',
      database: 'ecommerce-challenge-db',
      entities: [Category, Product],
      synchronize: true,
    }),
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

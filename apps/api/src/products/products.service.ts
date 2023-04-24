import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterQuery } from 'mongoose';
import { Products } from './entities/product.entity';
import { ProductsRepository } from '../repository/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  create(createProductDto: CreateProductDto) {
    return this.productsRepository.create(createProductDto);
  }

  findAll() {
    return this.productsRepository.find();
  }

  find(entityFilterQuery: FilterQuery<Products>) {
    return this.productsRepository.find(entityFilterQuery);
  }

  findOne(entityFilterQuery: FilterQuery<Products>) {
    return this.productsRepository.findOne(entityFilterQuery);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsRepository.findOneAndUpdate({ id }, updateProductDto);
  }

  remove(id: string) {
    return this.productsRepository.deleteOne({ id });
  }
}

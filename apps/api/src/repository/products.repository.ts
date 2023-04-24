import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProductsDocument,
  Products,
} from '../products/entities/product.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class ProductsRepository extends BaseRepository<ProductsDocument> {
  constructor(
    @InjectModel(Products.name)
    ProductsModel: Model<ProductsDocument>
  ) {
    super(ProductsModel);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from '../user/entities/user.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name)
    UserModel: Model<UserDocument>
  ) {
    super(UserModel);
  }
}

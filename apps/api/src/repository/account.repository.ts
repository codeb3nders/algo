import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountDocument, Account } from '../account/entities/account.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class AccountRepository extends BaseRepository<AccountDocument> {
  constructor(
    @InjectModel(Account.name)
    AccountModel: Model<AccountDocument>
  ) {
    super(AccountModel);
  }
}

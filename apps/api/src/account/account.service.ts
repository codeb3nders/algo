import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repository/account.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { FilterQuery } from 'mongoose';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private accountService: AccountRepository) {}
  async create(createAccountDto: CreateAccountDto) {
    return await this.accountService.create(createAccountDto);
  }

  findOne(entityFilterQuery: FilterQuery<Account>) {
    return this.accountService.findOne(entityFilterQuery);
  }

  findAll() {
    return this.accountService.find();
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return this.accountService.findOneAndUpdate({ id }, updateAccountDto);
  }

  remove(id: string) {
    return this.accountService.deleteOne({ id });
  }
}

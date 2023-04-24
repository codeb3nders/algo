import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '../repository/user.repository';
import { FilterQuery } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(entityFilterQuery: FilterQuery<User>) {
    return this.userRepository.findOne(entityFilterQuery);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.findOneAndUpdate({ id }, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.deleteOne({ id });
  }
}

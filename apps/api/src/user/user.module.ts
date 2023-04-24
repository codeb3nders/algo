import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from '../repository/user.repository';
import { UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    AccountModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],

  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}

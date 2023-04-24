import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccountService } from '../account/account.service';
import { encodePassWord } from '../utils/data/encoder';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly accountService: AccountService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { email, password: rawPassword } = createUserDto;

    const password = await encodePassWord(rawPassword);

    createUserDto.password = password;

    const user = await this.accountService.findOne({ businessEmail: email });

    createUserDto.accountId = user.id;
    createUserDto.access = 'admin';

    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

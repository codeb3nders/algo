import { IsNotEmpty, IsEmail, IsEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEmpty()
  access: string;

  @IsEmpty()
  accountId;
}

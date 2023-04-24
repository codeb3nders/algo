import { IsNotEmpty } from 'class-validator';
export class CreateAccountDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  middleName: string;

  @IsNotEmpty()
  contactNumber: string;

  @IsNotEmpty()
  businessName: string;

  @IsNotEmpty()
  businessEmail: string;

  @IsNotEmpty()
  businessAddress: string;

  @IsNotEmpty()
  businessContactNumber: string;
}

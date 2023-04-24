import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateProductDto {
  @IsNotEmpty()
  accountId: string;

  @IsNotEmpty()
  group: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  linkInventory: object;
}

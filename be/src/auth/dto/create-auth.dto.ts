import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}

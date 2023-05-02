import {IsEmail, IsNotEmpty, Length, MaxLength} from "class-validator";

export class RegisterUser {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(128)
  firstname: string;

  @IsNotEmpty()
  @MaxLength(128)
  lastname: string;

  @Length(6, 128)
  password: string;
}
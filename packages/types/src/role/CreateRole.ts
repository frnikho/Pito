import {IsNotEmpty, IsOptional, MaxLength} from "class-validator";

export class CreateRole {
  @IsNotEmpty()
  @MaxLength(128)
  name: string;

  @IsOptional()
  @MaxLength(255)
  description?: string;
}
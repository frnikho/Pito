import {IsOptional, IsPhoneNumber, Length, Max, Min} from "class-validator";

export class UpdateUser {
  @IsOptional()
  @Length(3, 64)
  firstname?: string;

  @IsOptional()
  @Length(3, 64)
  lastname?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @Length(0, 128)
  address?: string;

  @IsOptional()
  @Length(0, 64)
  city?: string;

  @IsOptional()
  @Min(0)
  @Max(200000)
  ahr?: number;

  @IsOptional()
  @Length(0, 64)
  crn?: string;
}
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateLinkDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsUUID()
  token: string;

  @IsOptional()
  name?: string;
};

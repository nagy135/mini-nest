import { IsNotEmpty, IsUUID } from "class-validator"

export class DeleteLinkDto {
  @IsNotEmpty()
  @IsUUID()
  token: string;
};

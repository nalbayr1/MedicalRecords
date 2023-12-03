import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDeckDto {
  @IsString()
  @IsNotEmpty({ message: "Content cannot be empty" })
  title: string;

  @IsOptional()
  @IsString()
  image?: string;
}

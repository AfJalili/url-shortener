import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ShortenUrlRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}

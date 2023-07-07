import { IsNotEmpty, IsUrl } from 'class-validator';

export class ShortenUrlRequestDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
}

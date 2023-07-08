import { ApiResponseProperty } from '@nestjs/swagger';

export class ShortenUrlResponseDto {
  @ApiResponseProperty()
  id: string;
}

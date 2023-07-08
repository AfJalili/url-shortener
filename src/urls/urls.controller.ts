import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { ShortenUrlRequestDto } from './dto/shorten-url-request.dto';
import { ShortenUrlResponseDto } from './dto/shorten-url-response.dto';
import { isURL } from 'class-validator';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('shorten')
  async shortenUrl(
    @Body() requestDto: ShortenUrlRequestDto,
  ): Promise<ShortenUrlResponseDto> {
    if (!isURL(requestDto.url)) {
      throw new BadRequestException('String must be a valid URL');
    }
    return {
      id: await this.urlsService.shortenUrl(requestDto.url),
    };
  }

  @Get(':id')
  @Redirect()
  async redirect(@Param('id') id: string) {
    const url: string = await this.urlsService.findOne(id);
    if (!url) {
      throw new NotFoundException('There is no such URL!');
    }
    return { url };
  }
}

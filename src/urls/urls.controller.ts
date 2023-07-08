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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
@ApiTags('urls')
@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @ApiOperation({ summary: 'Shorten a URL' })
  @ApiBody({ type: ShortenUrlRequestDto })
  @ApiResponse({ status: 200, type: ShortenUrlResponseDto })
  @Throttle(60, 60)
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

  @ApiOperation({ summary: 'Redirect to a URL' })
  @ApiParam({ name: 'id', description: 'ID of the URL' })
  @ApiResponse({ status: 200, description: 'URL Found' })
  @ApiResponse({ status: 404, description: 'URL Not Found' })
  @Throttle(20, 60)
  @Redirect()
  @Get(':id')
  async redirect(@Param('id') id: string) {
    const url: string = await this.urlsService.findOne(id);
    if (!url) {
      throw new NotFoundException('There is no such URL!');
    }
    return { url };
  }
}

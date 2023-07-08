import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ShortenUrlRequestDto } from './dto/shorten-url-request.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UrlsController', () => {
  let controller: UrlsController;
  let service: UrlsService;

  const mockService: Partial<UrlsService> = {
    shortenUrl: (longUrl: string) => Promise.resolve('shortUrl'),
    findOne: (id: string) =>
      id === 'shortUrl' ? Promise.resolve('longUrl') : undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlsController],
      providers: [{ provide: UrlsService, useValue: mockService }],
    }).compile();

    controller = module.get<UrlsController>(UrlsController);
    service = module.get<UrlsService>(UrlsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('shortenUrl', () => {
    it('should shorten valid url', async () => {
      const dto = new ShortenUrlRequestDto();
      dto.url = 'http://google.com';

      expect(await controller.shortenUrl(dto)).toEqual({ id: 'shortUrl' });
    });

    it('should fail if url is invalid', async () => {
      const dto = new ShortenUrlRequestDto();
      dto.url = 'invalidUrl';

      await expect(controller.shortenUrl(dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('redirect', () => {
    it('should redirect if url is valid', async () => {
      const response = await controller.redirect('shortUrl');

      expect(response).toEqual({ url: 'longUrl' });
    });

    it('should fail if url does not exist', async () => {
      await expect(controller.redirect('doesNotExist')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

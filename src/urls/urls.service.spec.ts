import { Test, TestingModule } from '@nestjs/testing';
import { UrlsService } from './urls.service';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
const mockCacheManager = {
  get: jest.fn(),
  set: jest.fn(),
};

const mockConfigService = {
  get: jest.fn().mockReturnValue({ keyLength: 8, cacheTtl: 60 }),
};

describe('UrlsService', () => {
  let service: UrlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlsService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<UrlsService>(UrlsService);
  });

  it('should generate a new id when url is not already shortened', async () => {
    jest.spyOn(mockCacheManager, 'get').mockResolvedValueOnce(undefined);
    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    const url = 'http://test.com';
    const id = await service.shortenUrl(url);

    expect(id).toBeDefined();
    expect(id.length).toBe(8);
    expect(mockCacheManager.set).toHaveBeenCalledWith(id, url, 60);
    expect(mockCacheManager.set).toHaveBeenCalledWith(url, id, 60);
  });

  it('should return the url for a given id that exists in cache', async () => {
    jest
      .spyOn(mockCacheManager, 'get')
      .mockResolvedValueOnce('http://test.com'); // Mocking the cache to always return 'http://test.com'

    const url = await service.findOne('testId');

    expect(url).toBe('http://test.com');
    expect(mockCacheManager.get).toHaveBeenCalledWith('testId');
  });
});

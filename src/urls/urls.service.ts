import { Inject, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { UrlsModuleOptions } from '../config/types';
@Injectable()
export class UrlsService {
  private readonly options: UrlsModuleOptions;
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {
    this.options =
      this.configService.get<UrlsModuleOptions>('urlsModuleOptions');
  }
  async shortenUrl(url: string): Promise<string> {
    let id: string | undefined = await this.cacheManager.get(url);
    if (!id) {
      id = nanoid(this.options.keyLength);
      await Promise.all([
        this.cacheManager.set(id, url, this.options.cacheTtl),
        this.cacheManager.set(url, id, this.options.cacheTtl),
      ]);
    }
    return id;
  }

  findOne(id: string): Promise<string | undefined> {
    return this.cacheManager.get(id);
  }
}

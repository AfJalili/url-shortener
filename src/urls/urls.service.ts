import { Inject, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Injectable()
export class UrlsService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async shortenUrl(url: string): Promise<string> {
    let id: string | undefined = await this.cacheManager.get(url);
    if (!id) {
      id = nanoid(8); //todo import size from config;
      await Promise.all([
        this.cacheManager.set(id, url, 0),
        this.cacheManager.set(url, id, 0),
      ]);
    }
    return id;
  }

  findOne(id: string): Promise<string | undefined> {
    return this.cacheManager.get(id);
  }
}

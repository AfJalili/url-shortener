import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlsService {
  async shortenUrl(url: string): Promise<string> {
    const id = nanoid(8);
    // todo add redis
    // todo check if the url already exists
    // await this.cache.set(id, url);
    return id;
  }

  async findOne(id: string): Promise<string> {
    // todo find url in redis
    return 'url';
  }
}
